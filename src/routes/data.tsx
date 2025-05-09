import axios, { AxiosResponse } from 'axios';

export default class ApiData {
    public static async getLinkedInOptions(): Promise<AxiosResponse> {
        return await axios
            .get(import.meta.env.VITE_LINKEDIN_OPTIONS!)
            .catch((err) => {
                console.error(err);
                throw err;
            });
    }
}
