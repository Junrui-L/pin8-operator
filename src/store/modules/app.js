import {
  SET_USERINFO,
  CLEAR_USERINFO
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
    },
    [CLEAR_USERINFO]: (state) => {
      userStore.clear('userInfo');
      state.userInfo = null;
    },
  },
  actions: {
    setUserInfo: ({ commit }, userInfo) => {
      commit(SET_USERINFO, userInfo)
    },
    clearUserInfo:({commit})=>{
      commit(CLEAR_USERINFO)
    }
  }
};

export default app;
