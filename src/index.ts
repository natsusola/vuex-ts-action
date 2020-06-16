import { MutationTree, ActionTree, ActionHandler } from 'vuex';

type HasParam<P> = P extends undefined ? void : P;

type DispatchParamType<T> = T extends ActionHandler<any, any>
  ? HasParam<Parameters<T>[1]>
  : never;

type DispatchReturnType<T> = T extends ActionHandler<any, any>
  ? ReturnType<T>
  : never;

interface Dispatch<A extends ActionTree<any, any>> {
  <T extends keyof A>(type: T, payload: DispatchParamType<A[T]>): Promise<DispatchReturnType<A[T]>>;
  (type: string, payload: any, options: { root: boolean }): any;
}

interface Commit<M extends MutationTree<any>> {
  <T extends keyof M>(type: T, payload: HasParam<Parameters<M[T]>[1]>): void;
  (type: string, payload: any, options: { root: boolean }): void;
}

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
