export default function authHeader() {
    let userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.accessToken) {
        // for Node.js Express back-end
        return {
            'Authorization': 'Bearer ' + userData.accessToken,
            "Content-type": "application/json"
        };
    } else {
        return {};
    }
}