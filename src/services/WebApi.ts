import axios from 'axios';

export default {
  addMessage(userId: number, text: string, isPrivate: boolean) {
    return axios.get('http://localhost:3001/addMessage');
  },
  getMessages() {
    return axios.get('http://localhost:3001/messages');
  },
};
