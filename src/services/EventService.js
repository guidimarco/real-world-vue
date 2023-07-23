import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/guidimarco/real-world-vue-mock',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents() {
        return apiClient.get('/events')
    }
}
