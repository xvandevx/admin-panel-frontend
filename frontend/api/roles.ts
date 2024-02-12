import {RoleInterface} from "~/backendTypes/role";

export default (axios: any, config: any) => ({
    async add(formData: RoleInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/roles`, req);
        return data;
    },
    async update(id: number, formData: RoleInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/roles/${id}`, req);
        return data;
    },
    async get(): Promise<RoleInterface[]> {
        const {data} = await axios.get(`${config.API_URL}/roles`);
        return data;
    },
    async delete(id: number) {
        await axios.delete(`${config.API_URL}/roles/${id}`);
    }
});