import {PostInterface} from "~/backendTypes/blog/post";

export default (axios: any, config: any) => ({
    async add(formData: PostInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/blog/posts`, req);
        return data;
    },
    async update(id: number, formData: PostInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/blog/posts/${id}`, req);
        return data;
    },
    async get(): Promise<PostInterface> {
        const {data} = await axios.get(`${config.API_URL}/blog/posts`);
        return data;
    },
    async getByCode(code: string) {
        const {data} = await axios.get(`${config.API_URL}/blog/posts/${code}`);
        return data;
    },
    async delete(id: number) {
        await axios.delete(`${config.API_URL}/blog/posts/${id}`);
    }
});
