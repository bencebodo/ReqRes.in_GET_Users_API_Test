export const APP_CONFIG = {
    api: {
        baseUrl: 'https://reqres.in/api',
        defaultHeaders: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': process.env.X_API_KEY || 'https://app.reqres.in/api-keys'
        }
    }
}