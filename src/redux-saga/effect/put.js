import { createEffect, effectTypes } from "../effectHelper";
export function put(action) {
  return createEffect(effectTypes.PUT, {
    action,
  });
}

export function runPut(env, effect, next) {
  const { action } = effect.payload;
  const { dispatch } = env.store;
  const res = dispatch(action);
  next(res);
}
