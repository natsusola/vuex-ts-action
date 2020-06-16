# vuex-ts-action
Make vuex action context typed.  
Give you suggestions and type checking when you use action context.

## Example
**suggest mutation/action type**  
![](assets/m1.jpg)

**suggest mutation/action parameter**  
If mutation/action doesn't need payload, please pass `undefined`.  
![](assets/m2.jpg)

**alert when calling unexisted mutation/action**  
![](assets/m3.jpg)

**call root mutation/action**  
no suggestions and type checking  
![](assets/m4.jpg)

## Usage
```ts
import { TActionContext } from 'vuex-ts-action';

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
}

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
    ctx.dispatch('patchName', { name: payload.name});
    ctx.dispatch('patchAge', { age: payload.age });

    ctx.dispatch('rootAction', 'any', { root: true }); // no suggestion and type checking
  }
};
```

**TActionContext**  
```ts
export interface TActionContext<
  M extends MutationTree<S>,
  A extends ActionTree<S, any> = any,
  S = any,
  G = any,
  RG = any,
> {
  state: S;
  rootState: any;
  commit: Commit<M>;
  dispatch: Dispatch<A>;
  getters: G;
  rootGetters: RG;
}
```

## Notice
- Doesn't support `ActionObject`.

- Your can use this plugin with [vuex-tstore](https://github.com/stevethedev/vuex-tstore) or [vuex-ts-enhance](https://github.com/zWingz/vuex-ts-enhance) to get suggestions and type checking in components without changing the structure of vuex store.
