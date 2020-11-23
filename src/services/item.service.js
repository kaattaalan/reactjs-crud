import { itemAxios } from '../http-common';

class ItemService {
    getAll() {
        return itemAxios.get("/");
    }

    get(id) {
        return itemAxios.get(`/${id}`);
    }

    create(data, callBack) {
        return itemAxios.post("/", data).then(callBack);
    }

    update(data, callBack) {
        return itemAxios.put("/", data).then(callBack);
    }

    delete(id, callBack) {
        return itemAxios.delete(`/${id}`).then(callBack);
    }

    deleteAll() {
        return itemAxios.delete(`/`);
    }

    findByTitle(title) {
        return itemAxios.get(`/?title=${title}`);
    }
}

export default new ItemService();