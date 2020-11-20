export default function authHeader() {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.token) {
        // for Node.js Express back-end
        return {
            'x-access-token': userData.token,
            "Content-type": "application/json"
        };
    } else {
        return {};
    }
}