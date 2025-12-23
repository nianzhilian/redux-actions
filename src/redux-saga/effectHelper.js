const specialEffectName = "@@redux-saga/IO";

export const effectTypes = {
  TAKE: "TAKE",
  PUT: "PUT",
  ALL: "ALL",
  FORK:'FORK',
  DELAY: "DELAY",
  CALL: "CALL",
  SELECT: "SELECT",
  CANCEL:'CANCEL',
  TAKEEVERY:'TAKEEVERY'
};

export function createEffect(type, payload) {
  return {
    [specialEffectName]: true,
    type,
    payload,
  };
}

export function isEffect(obj) {
  if (typeof obj != "object") {
    return false;
  }
  if (obj[specialEffectName]) {
    return true;
  }
  return false;
}
