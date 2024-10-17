import Vuex, { Store } from "vuex";
import UserModule from "./modules/user.module";

export interface RootState {}
export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: () => {},
  },
  modules: {   
    UserModule
  },
});
const createStore = (): Store<RootState> => {
  return store;
};
export default createStore;
