// store/modules/boats.js
export default {
  state: {
    boats: []
  },
  mutations: {
    ADD_BOAT(state, boat) {
      state.boats.push(boat);
    },
    SET_BOATS(state, boats) {
      state.boats = boats;
    }
  },
  actions: {
    addBoat({ commit }, boat) {
      commit('ADD_BOAT', boat);
    },
    setBoats({ commit }, boats) {
      commit('SET_BOATS', boats);
    }
  },
  getters: {
    allBoats: (state) => state.boats,
  }
};
