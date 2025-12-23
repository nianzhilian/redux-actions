const initState = {
  current: 1,
  pageSize: 15,
  type: 4,
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case "search":
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
