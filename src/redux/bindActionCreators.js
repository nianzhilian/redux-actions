/**
 *
 * @param {*} obj 对象或者是函数  当是对象时 最终返回的是actionCreater的映射关系 只要调用内部会自动dispatch
 * 当是一个函数时 该方法返回的是一个函数 直接调用 时 内部会自动dispatch
 * @param {*} dispatch
 */
export default function (obj, dispatch) {
  if (typeof obj === "function") {
    return getAutoDispatch(obj, dispatch);
  } else if (typeof obj === "object") {
    let result = {};
    for (const key in obj) {
      if (!Object.hasOwn(obj, key)) continue;
      result[key] = getAutoDispatch(obj[key],dispatch);
    }
    return result;
  } else {
    throw new TypeError("报错了");
  }
}

function getAutoDispatch(actionCreater, dispatch) {
  return function (...args) {
    const action = actionCreater(...args);
    console.log(action)
    dispatch(action);
  };
}
