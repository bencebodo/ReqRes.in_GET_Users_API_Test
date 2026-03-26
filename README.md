# ReqRes API Tesztautomatizációs Projekt

Ez a projekt a [ReqRes](https://reqres.in/) nyílt teszt API végpontjainak automatizált tesztelését tartalmazza. A keretrendszer **Playwright** és **TypeScript** alapokon nyugszik, és a jól karbantartható, objektum-orientált **Service réteg (Service Object Model)** architektúrát használja.

A projekt kifejezetten **API tesztelésre van optimalizálva**, így böngészőmotorok (Chromium, Firefox, WebKit) nélkül, maximális sebességgel fut.

---

## Lefedett Tesztesetek

A tesztcsomag jelenleg a `/users` (Felhasználók) végpont `GET` metódusait fedi le, különös tekintettel a lapozási (pagination) logikára és a dinamikus paraméterezésre:

1. **Alapértelmezett lekérdezés**
   - Végpont hívása paraméterek nélkül.
   - Asszertáció: Az 1. oldalt adja vissza, pontosan 6 felhasználóval.

2. **Dinamikus lekérdezés (Összes elem egy oldalon)**
   - A `total` (összes elem) értékének dinamikus lekérése, majd a `per_page` paraméter beállítása erre az értékre.
   - Asszertáció: A válasz 1 egyetlen oldalt ad vissza, a tömb mérete pedig megegyezik a `total` értékkel.

3. **Lapozás (Pagination) ellenőrzése**
   - A 2. oldal lekérése (`page=2`).
   - Asszertáció: A válasz a 2. oldalt adja vissza, és a kapott felhasználók (memóriacím/ID alapján) garantáltan eltérnek az 1. oldal adataitól.

---

## Projekt Struktúra (Architektúra)

- `/src/services/` - Az API hívásokat (üzleti logikát és URL paraméterezést) összefogó Service osztályok (pl. `ApiUsersService`).
- `/src/tests/` - A tényleges tesztfájlok (`.spec.ts`), amelyek a Service-eket példányosítják és a kiértékelést (assert) végzik.
- `playwright.config.ts` - Playwright konfiguráció, optimalizálva API futtatásra (böngészők kikapcsolva, `baseURL` beállítva).
- `.env` - (Lokális) Környezeti változók és titkos kulcsok tárhelye.

---

## Telepítés és Konfiguráció

A projekt futtatásához [Node.js](https://nodejs.org/) szükséges.

1. **Függőségek telepítése:**
   A projekt gyökerében futtasd az alábbi parancsot:
   ```bash
   npm install
   ```

2. **Környezeti változók (.env) beállítása:**
   Hozz létre egy `.env` fájlt a projekt gyökerében. A projekt a `dotenv` csomagot használja a konfigurációk (pl. jövőbeli API kulcsok) beolvasásához.
   Igényelj API kulcsot a (https://app.reqres.in/api-keys) oldalon.
   A `.env` fájlban be kell állítani a következő környezeti változót:

   **X_API_KEY=A_fenti_linken_igényelt_API_kulcs**

---

## Tesztek Futtatása

Mivel a projekt API-only, a tesztek a háttérben (headless módon) futnak le a beépített Node.js futtatókörnyezetben.

**Összes teszt futtatása:**
```bash
npx playwright test
```

**Tesztek futtatása a beépített UI felületen (Debugoláshoz):**
```bash
npx playwright test --ui
```

---

## Riportok megtekintése

A Playwright minden futtatás után egy részletes, step-alapú HTML riportot generál, amely pontosan mutatja az API kérések folyamatát és a válaszok validációját.

A riport megnyitásához használd ezt a parancsot:
```bash
npx playwright show-report
```