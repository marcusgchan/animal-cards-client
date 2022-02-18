import axios from "axios";

const BASE_URL = "/api/cards";

const cardServices = {
  addCard(card) {
    return axios.post(`${BASE_URL}`, card);
  },
  getCards() {
    return axios.get(`${BASE_URL}`);
  },
  getCard(id) {
    return axios.get(`${BASE_URL}/${id}`);
  },
  modifyCard(id, card) {
    return axios.put(`${BASE_URL}/${id}`, card);
  },
  deleteCard(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  },
};

export default cardServices;
