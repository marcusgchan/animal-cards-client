import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

const cardServices = {
  addCard(card) {
    return axios.post(`${BASE_URL}/cards`, card);
  },
  getCards() {
    return axios.get(`${BASE_URL}/cards`);
  },
  getCard(id) {
    return axios.get(`${BASE_URL}/cards/${id}`);
  },
  modifyCard(id, card) {
    return axios.put(`${BASE_URL}/cards/${id}`, card);
  },
};

export default cardServices;
