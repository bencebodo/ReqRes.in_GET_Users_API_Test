import {test, expect} from '@playwright/test';
import { ApiUsersService } from '../services/api-users-service';

test.describe('ReqRes API Felhasználók lekérdezése', () => {
    let apiUsersService: ApiUsersService;

    test.beforeEach(async ({ request }) => {
        apiUsersService = new ApiUsersService(request);
    });

    test('[GET] Alapértelmezett lekérdezés: [https://reqres.in/api/users], 1 oldalt és 6 találatot ad vissza', async () => {
        let responseData: any;

        await test.step('1. Alapértelmezett végpont [https://reqres.in/api/users] lekérdezése (GET)', async () => {
        responseData = await apiUsersService.getUsers();
        });

        await test.step('2. Végpont válasz kiértékelése: \nA válasz az első oldalt adja vissza\nA visszaadott felhasználók száma 6', () => {
        expect(responseData.page).toBe(1);
        expect(responseData.data).toHaveLength(6);
        });
    });

    test('[GET] Dinamikus lekérdezés: [https://reqres.in/api/users/?page=1&per_page=\"total\"], 1 oldalt és 12 találatot ad vissza', async () => {
        let initialData: any;
        let totalValue: any;
        let responseData: any;
        
        await test.step('1. Alapértelmezett végpont [https://reqres.in/api/users] lekérdezése (GET) és \"total\" érték lementése', async () => {
        initialData = await apiUsersService.getUsers();
        totalValue = initialData.total;
        });

        await test.step('2. Dinamikus végpont [https://reqres.in/api/users/?page=1&per_page=\"total\"] lekérdezése (GET)', async () => {
        responseData = await apiUsersService.getUsers(1, totalValue);
        });

        await test.step('3. Dinamikus végpont válaszának kiértékelése', async () => {
        expect(responseData.total_pages).toBe(1);
        expect(responseData.data).toHaveLength(totalValue);
        });
    });

    test('[GET] Dinamikus lekérdezés: [https://reqres.in/api/users/?page=2], második oldal megjelenítése és 6 találatot ad vissza', async () => {
        let initialData: any;
        let initialDataUsers: any;
        let responseData: any;
        let responseDataUsers: any;
        
        await test.step('1. Alapértelmezett végpont [https://reqres.in/api/users] lekérdezése (GET) és \"data\" tömb lementése', async () => {
        initialData = await apiUsersService.getUsers();
        initialDataUsers = initialData.data;
        });
        
        await test.step('2. Dinamikus végpont [https://reqres.in/api/users/?page=2] lekérdezése (GET)', async () => {
        responseData = await apiUsersService.getUsers(2);
        responseDataUsers = responseData.data;
        });

        await test.step('3. Alapértelmezett és dinamikus végpont kiértékelése', async () => {
        expect(responseData.page).toBe(2);
        expect(responseDataUsers[0].id).not.toBe(initialDataUsers[0].id)
        });
    })
})

