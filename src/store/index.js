import Vue from 'vue';
import Vuex from 'vuex';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedBoat: null,
    formData: {
      name: '',
      phone: '',
      email: '',
      comments: ''
    },
    documentId: null,
  },
  mutations: {
    SET_FORM_DATA(state, payload) {
      state.formData = payload;
    },
    SET_DOCUMENT_ID(state, documentId) {
      state.documentId = documentId;
    },
    RESET_FORM(state) {
      state.formData = {
        name: '',
        phone: '',
        email: '',
        comments: ''
      };
      state.selectedBoat = null;
    }
  },
  actions: {
    async submitForm({ commit, state }) {
      try {
        const formData = {
          ...state.formData,
          selectedBoat: state.selectedBoat
        };

        const docRef = await addDoc(collection(db, 'boatDetails'), formData);
        commit('SET_DOCUMENT_ID', docRef.id);
        commit('RESET_FORM');

        return docRef.id;
      } catch (error) {
        console.error('Error saving data:', error);
        throw error;
      }
    },

    async fetchDocumentId({ commit, state }) {
      const collectionName = 'boatDetails';
      const q = query(collection(db, collectionName),
        where('name', '==', state.formData.name),
        where('phone', '==', state.formData.phone),
        where('email', '==', state.formData.email),
        where('comments', '==', state.formData.comments),
        where('selectedBoat', '==', state.selectedBoat));

      const querySnapshot = await getDocs(q);
      let documentId = null;

      querySnapshot.forEach((doc) => {
        documentId = doc.id;
      });

      commit('SET_DOCUMENT_ID', documentId);
    }
  },
  getters: {
    getFormData: (state) => state.formData,
    getDocumentId: (state) => state.documentId
  }
});
