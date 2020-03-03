import axios from 'axios'

const url = 'http://localhost:5000';

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer: ${token}`;
}

export default {
    setToken (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer: ${token}`;
    },
    async login (userData) {
        return axios.post(`${url}/user/login`, userData);
    },
    async logOut (/*token*/) {
        return axios.post(`${url}/user/logout`, {}, /*{ headers: { Authorization: `Bearer: ${token}` } }*/)
    },
    async getTrains (offset) {
        return axios.post(`${url}/trains`, { offset: offset })
    }
}
