import {PageInterface} from "~/backendTypes/page";

export default (axios: any, config: any) => ({
    async add(formData: PageInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/pages`, req,  {withCredentials: true});
        return data;
    },
    async update(id: number, formData: PageInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/pages/${id}`, req,  {withCredentials: true});
        return data;
    },
    async get(): Promise<PageInterface[]> {
        const {data} = await axios.get(`${config.API_URL}/pages`,  {withCredentials: true});
        return data;
    },
    async getByCode(code: string): Promise<PageInterface[]> {
        const {data} = await axios.get(`${config.API_URL}/pages/${code}`,  {withCredentials: true});
        return data;
    },
    async delete(id: number) {
        await axios.delete(`${config.API_URL}/pages/${id}`, {withCredentials: true});
    }
});
