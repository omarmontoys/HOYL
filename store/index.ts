import Vuex, { Store } from "vuex";

export interface RootState {}
export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: () => {},
  },
  modules: {    
  },
});
const createStore = (): Store<RootState> => {
  return store;
};
export default createStore;