import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        return axios.defaults.headers.common["Authorization"] = token;
    } else {
       return delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthToken;