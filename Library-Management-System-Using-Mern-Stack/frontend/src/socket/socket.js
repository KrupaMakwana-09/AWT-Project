import { io } from 'socket.io-client';

// Change this to your backend server URL
const URL = 'http://localhost:5001'; 

export const socket = io(URL, {
    autoConnect: false
});
