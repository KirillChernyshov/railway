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
    async getRecords (path, offset, limit) {
        return axios.post(`${url}/${path}`, { offset: offset, limit: limit })
    },
    async deleteRecord (path, id) {
        return axios.delete(`${url}/${path}/${id}`);
    },
    async addRecord (path, data) {
        return axios.post(`${url}/${path}/add`, { data: data });
    },
    async editRecord (path, data) {
        return axios.post(`${url}/${path}/edit`, { data: data });
    },
    async getFreeRecords (path) {
        return axios.get(`${url}/${path}/free`);
    },
    async updateCompositionRelations (path, data, id) {
        return axios.post(`${url}/compositions/update/${path}/${id}`, data);
    },
    async updateRouteRelations (path, data, id) {
        return axios.post(`${url}/routes/update/${path}/${id}`, data);
    },
    async getStations (id) {
        return axios.get(`${url}/stations/${id}`);
    },
    async getTimetable () {
        return axios.get(`${url}/timetable`);
    }
}
