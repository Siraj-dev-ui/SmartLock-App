// src/socket.js
import {io} from 'socket.io-client';
import {BASE_URL_LOCAL} from '../Utils/Urls';

const socket = io(BASE_URL_LOCAL); // e.g., 'http://192.168.1.100:3000'

export default socket;
