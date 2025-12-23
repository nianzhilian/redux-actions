/**
 *
 * @param {*} obj
 * @returns reducers 创建函数 返回一个新的reducer
 */
export default function (obj) {
  return function (state = {}, action) {
    let result = {};
    for (const key in obj) {
      if (!Object.hasOwn(obj, key)) continue;

      const reducer = obj[key];

      result[key] = reducer(state[key], action);
    }
    return result;
  };
}
