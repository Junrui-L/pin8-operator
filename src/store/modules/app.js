import {
  SET_USERINFO,
  CLEAR_USERINFO,
  SET_SELECTAUDITID
} from '../mutation-types';
import { Ls } from '@/uitls'

const userStore = Ls('userStore', 'localStorage')

const app = {
  state: {
    userInfo: userStore.get('userInfo') || null,         //用户信息
    selectAuditId: userStore.get('selectAuditId') || null
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
    [SET_SELECTAUDITID]: (state, selectAuditId) => {
      if (selectAuditId) {
        userStore.set('selectAuditId', selectAuditId);
        state.selectAuditId = selectAuditId;
      }
    }
  },
  actions: {
    setUserInfo: ({ commit }, userInfo) => {
      commit(SET_USERINFO, userInfo)
    },
    clearUserInfo: ({ commit }) => {
      commit(CLEAR_USERINFO)
    },
    setSelectAuditId:({commit}, selectAuditId)=>{
      commit(SET_SELECTAUDITID,selectAuditId)
    }
  }
};

export default app;
