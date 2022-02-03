import { userAxios } from '../http-common';

class AuthService {
    login(email, password) {
        return userAxios
            .post('/signin', {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, email, password) {
        return userAxios.post('/signup', {
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