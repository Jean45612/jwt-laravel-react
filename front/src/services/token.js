export default {

    setToken(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isValid() { //ACA HAGO LA VALIDACION DEL TOKEN YA QUE EL TOKEN ESTA DIVIDIDO EN 3 PARTES SEPARADAS POR PUNTOS        
        const token = this.getToken();

        var iss = {
            login: process.env.REACT_APP_API_URL + 'login',
            register: process.env.REACT_APP_API_URL + 'register',
            refresh: process.env.REACT_APP_API_URL + 'refresh'
        };

        if (token) {
            const payload = this.payload(token);
            if (payload) {
                return Object.values(iss).indexOf(payload.iss) > -1 ? true : false; //COMPARO SI LAS URL DE LA QUE OBTUVE EL TOKEN SON LAS MISMAS A LA DE MI BACKEND
            }
        }
    },

    expired() {
        return this.payload(this.getToken());
    },

    payload(token) {
        const payload = token.split('.')[1]; //OBTENEMOS EL CONTENIDO DEL TOKEN YA QUE EL CONTENIDO SE ENCUENTRA EN EL CENTRO

        return this.decode(payload);
    },

    decode(payload) {
        return JSON.parse(atob(payload));
    },

    loggedIn() {
        if (this.isValid() && this.getUser()) {
            return true;
        }

        return false;
    },

    remove() {
        localStorage.clear();
    }
};