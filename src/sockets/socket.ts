import * as io from 'socket.io-client';
// import { API_URL } from '../http';

// export const socket = io.connect('https://api.araratchess.com');
// export const API_URL = 'http://localhost:8089/';
// export const socket = io.connect('https://test3.araratchess.com/');

const API_URL =
  window.location.host == 'puzzle.araratchess.com'
    ? 'https://api.araratchess.com/'
    : 'https://test3.araratchess.com/';
// const API_URL2 = "http://localhost:8087/"

export const socket = io.connect(API_URL, {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  },
});

// export const seansSocket = io.connect(API_URL2, {path: '/seans'});
// export const socket = seansSocket;
export const SERVER_URI = 'https://apijitsi.araratchess.com/';
// export const SERVER_URI = 'http://localhost:4000/';
