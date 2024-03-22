import {KnowledgeInterface} from "~/backendTypes/knowledge";

export default (axios: any, config: any) => ({
    async add(formData: KnowledgeInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/knowledges`, req);
        return data;
    },
    async update(id: number, formData: KnowledgeInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/knowledges/${id}`, req);
        return data;
    },
    async get(): Promise<KnowledgeInterface[]> {
        const {data} = await axios.get(`${config.API_URL}/knowledges`);
        return data;
    },
    async delete(id: number) {
        await axios.delete(`${config.API_URL}/knowledges/${id}`);
    }
});