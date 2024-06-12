import {PetsInterface} from "~/backendTypes/pets";

export default (axios: any, config: any) => ({
    async add(formData: PetsInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/pets`, req);
        return data;
    },
    async update(id: number, formData: PetsInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/pets/${id}`, req);
        return data;
    },
    async get(): Promise<PetsInterface> {
        const {data} = await axios.get(`${config.API_URL}/pets`);
        return data;
    },
    async delete(id: number) {
        await axios.delete(`${config.API_URL}/pets/${id}`);
    }
});