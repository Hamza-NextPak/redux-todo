let initialState = {
  list: [
    {
      title: "Slack updates",
      items: [
        "----START OF DAY----",
        "BEFORE LEAVING FOR BREAK",
        "----END OF DAY----",
      ],
    },
  ],
};

const TODO = (state = initialState, { type, payload }) => {
  switch (type) {
    case "Submitted":

      return {
        ...state,

        list: [...state.list, payload],
      };

    case "Deleted":
      return {
        ...state,

        list: [...state.list.filter((elem, index) => index !== payload)],
      };

    case "Updated":
      const { data, index } = payload;

      const clone = { ...state };

      clone.list[index] = data;

      console.log(state.list);
      return {
        ...state,

        list: [...clone.list],
      };

    default:
      return state;
  }
};

export default TODO;
