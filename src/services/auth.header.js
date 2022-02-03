export default function authHeader() {
    let userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.token) {
        // for Node.js Express back-end
        return {
            'Authorization': 'Bearer ' + userData.token,
            "Content-type": "application/json"
        };
    } else {
        return {};
    }
}