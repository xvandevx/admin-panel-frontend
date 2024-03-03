export default (axios: any, config: any) => ({
    async generate() {
        const {data} = await axios.post(`${config.API_URL}/backup`);
        return data;
    },
    async list() {
        const {data} = await axios.get(`${config.API_URL}/backup`);
        return data;
    },
    async restore(name: string) {
        const {data} = await axios.put(`${config.API_URL}/backup/${name}`);
        return data;
    },
    async delete(name: string) {
        await axios.delete(`${config.API_URL}/backup/${name}`);
    }
});