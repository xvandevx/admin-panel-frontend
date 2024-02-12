import {WorkInterface} from "~/backendTypes/work";

export default (axios: any, config: any) => ({
    async add(formData: WorkInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/works`, req);
        return data;
    },
    async update(id: number, formData: WorkInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/works/${id}`, req);
        return data;
    },
    async get(): Promise<WorkInterface[]> {
        const {data} = await axios.get(`${config.API_URL}/works`);
        return data;
    },
    async delete(id: number) {
        await axios.delete(`${config.API_URL}/works/${id}`);
    }
});