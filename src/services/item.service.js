import http from "../http-common";
import authHeader from './auth.header';

class ItemService {
    getAll() {
        return http.get("/");
    }

    get(id) {
        return http.get(`/${id}`);
    }

    create(data) {
        return http.post("/", data);
    }

    update(data) {
        return http.put("/", data);
    }

    delete(id) {
        return http.delete(`/${id}`);
    }

    deleteAll() {
        return http.delete(`/`);
    }

    findByTitle(title) {
        return http.get(`/?title=${title}`);
    }
}

export default new ItemService();