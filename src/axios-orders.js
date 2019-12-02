import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://the-burguer-builder-app.firebaseio.com/',
});

export default instance;
