import firebase from "../config/Firebase";
export const Submitted = (value) => {
  firebase.firestore().collection("todos").add(value);
  return {
    type: "Submitted",
    payload: value,
  };
};



export const getTodo = () => async (dispatch) => {
  firebase
    .firestore()
    .collection("todos")
    .onSnapshot((query) => {
      let temp = [];
      query.forEach((doc) => {
        temp.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch({ type: "getTodo", payload: temp });
      console.log(temp);
    });
};
// (value) => {
// };

export const Deleted = (id, index) => async (dispatch) => {
  console.log(id);
  firebase.firestore().collection("todos").doc(id).delete();
  return {
    type: "Deleted",
    payload: index,
  };
};

export const Updated = (data, index) => async (dispatch) => {
    firebase.firestore().collection("todos").doc(data.id).update({
      title: data.title,
      items: data.items,
    });
  return {
    type: "Updated",

    payload: {
      data,
      index,
    },
  };
};
