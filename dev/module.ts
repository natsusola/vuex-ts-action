import { TActionContext } from '../src';

const state = {
  name: 'user1',
  age: 20,
};
type State = typeof state;

// cannot use MutationTree
const mutations = {
  updateName(state: State, name: string) {
    state.name = name;
  },
  updateAge(state: State, age: number) {
    state.age = age;
  },
};

// cannot use ActionTree
type TActionCtx = TActionContext<typeof mutations, typeof actions>;
const actions = {
  patchName(ctx: TActionCtx, payload: { name: string }) {
    ctx.commit('updateName', payload.name);

    ctx.commit('rootMutation', 'any', { root: true }); // no suggestion and type checking
  },
  patchAge(ctx: TActionCtx, payload: { age: number }) {
    ctx.commit('updateAge', payload.age);
  },
  patchUser(ctx: TActionCtx, payload: { name: string, age: number }) {
    ctx.dispatch('patchName', { name: payload.name });
    ctx.dispatch('patchAge', { age: payload.age });

    ctx.dispatch('rootAction', 'any', { root: true }); // no suggestion and type checking
  },
};

export const module = {
  namespaced: true,
  state,
  mutations,
  actions,
};
