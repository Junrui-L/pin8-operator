import {
  SET_USERINFO
} from '../mutation-types';
import { Ls } from '@/uitls'

const userStore = Ls('userStore', 'localStorage')

const app = {
  state: {
    userInfo: userStore.get('userInfo') || null
  },
  mutations: {
    [SET_USERINFO]: (state, userInfo) => {
      if (userInfo) {
        userStore.set('userInfo', userInfo);
        state.userInfo = userInfo;
      }
    }
  },
  actions: {
    setUserInfo: ({ commit }, userInfo) => {
      commit(SET_USERINFO, userInfo)
    }
  }
};

export default app;
