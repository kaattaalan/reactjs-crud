import { commentAxios } from '../http-common';

class CommentService {
    getAll(itemId) {
        return commentAxios.get(`/item/${itemId}`);
    }

    get(id) {
        return commentAxios.get(`/${id}`);
    }

    create(data) {
        return commentAxios.post("/", data);
    }

    update(data) {
        return commentAxios.put("/", data);
    }

    delete(id) {
        return commentAxios.delete(`/${id}`);
    }
}

export default new CommentService();