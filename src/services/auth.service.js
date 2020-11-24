import { userAxios } from '../http-common';

class AuthService {
    login(email, password) {
        return userAxios
            .post('/authenticate', {
                email,
                password
            })
            .then(response => {
                if (response.data.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, email, password) {
        return userAxios.post('/register', {
            name,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();