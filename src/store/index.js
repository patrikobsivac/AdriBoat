import Vue from 'vue';
import Vuex from 'vuex';
import boats from './modules/boats';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    boats
  },
  state: {
    name: '',
    phone: '',
    email: '',
    comments: '',
  },
  mutations: {
    setNameSurname(state, name) {
      state.firstName = name;
    },
    setPhoneNumber(state, phone) {
      state.phone = phone;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
  },
  actions: {
    updateNameSurname({ commit }, name) {
      commit('setNameSurname', name);
    },
    updatePhoneNumber({ commit }, phone) {
      commit('setPhoneNumber', phone);
    },
    updateEmail({ commit }, email) {
      commit('setEmail', email);
    },
    updateComments({ commit }, comments) {
      commit('setComments', comments);
    },
  },
  getters: {
    getNameSurname: state => state.name,
    getPhoneNumber: state => state.phone,
    getEmail: state => state.email,
    getComments: state => state.comments,
  },
});