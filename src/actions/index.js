export const Submitted = (value) => {
  return {
    type: "Submitted",
    payload: value,
  };
};

export const Deleted = (index) => {
  return {
    type: "Deleted",
    payload: index,
  };
};

export const Updated = (data, index) => {
  return {
    type: "Updated",

    payload: {
      data,
      index
    },
  };
};
