import { APIRequestContext } from "@playwright/test";
import { APP_CONFIG } from "../utils/contants";

export class ApiUsersService {
    private request: APIRequestContext;
    private baseUrl: string = APP_CONFIG.api.baseUrl;

    constructor(request: APIRequestContext){
        this.request = request;
    }

    async getUsers(page?: number, per_page?: number) {
        const queryParams: { [key: string]: number } = {};
        let url = `${this.baseUrl}/users`

        if (page !== undefined) {
            queryParams.page = page;
        }
        
        if (per_page !== undefined) {
            queryParams.per_page = per_page;
        }

        const response = await this.request.get(`${this.baseUrl}/users`, {
            params: queryParams,
            headers: APP_CONFIG.api.defaultHeaders
        });

        if (!response.ok()) {
            throw new Error(`API hiba történt. Státuszkód: ${response.status()}`);
        }

        return await response.json();
    }
}