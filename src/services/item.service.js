import { itemAxios } from '../http-common';

class ItemService {
    getAll() {
        return itemAxios.get("/");
    }

    get(id) {
        return itemAxios.get(`/${id}`);
    }

    create(data) {
        return itemAxios.post("/", data);
    }

    update(data) {
        return itemAxios.put("/", data);
    }

    delete(id) {
        return itemAxios.delete(`/${id}`);
    }

    deleteAll() {
        return itemAxios.delete(`/`);
    }

    findByTitle(title) {
        return itemAxios.get(`/search?title=${title}`);
    }

    upVote(id) {
        return itemAxios.put(`/vote/${id}/UP`);
    }

    downVote(id) {
        return itemAxios.put(`/vote/${id}/DOWN`);
    }
}

export default new ItemService();