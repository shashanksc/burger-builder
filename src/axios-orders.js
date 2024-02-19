import axios from 'axios';
const instance = axios.create({
baseURL : 'https://burgerbuilder-3b5ce-default-rtdb.firebaseio.com/'
})
export default instance