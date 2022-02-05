import { createSlice, current } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "users",
  initialState: {
      list: [],
      loading: false,
  },

  reducers: {
      usersRequested: (users, action) => {
          users.loading = true;
      },

      usersReceived: (users, action) => {
        // Object.assign({}, users.list, {list: action.payload, loading: false})
          users.list = action.payload;
          users.loading = false;
      },

      usersRequestFailed: (users, action) => {
          users.loading = false;
      },

      updateUsersData: (state, action) => {
        // if(user.id !== action.id) return user;

        const usersState = current(state);
        const user = action.user;
        console.log(usersState);
        console.log(user.id);
        const users = usersState.list.filter(u => u.id !== user.id);

        state.list = [
          ...users,
          {
            ...user,
          }
        ];
        // return [
        //   ...users,
        //   {
        //     list: state.list,
        //     loading: false
        //   }
        // ];
      },

      addUserData: (state, action) => {

        const usersState = current(state);
        const user = action.user;
        const users = usersState.list;

        state.list = [
          ...users,
          {
            ...user,
          }
        ];
      },

      removeUserData: (state, action) => {

        const usersState = current(state);
        const user = action.user;
        const users = usersState.list.filter(u => u.id !== user.id);

        state.list = [
          ...users
        ];
      },
  },
});

export default slice.reducer;

const { usersRequested, usersReceived, usersRequestFailed, 
  updateUsersData, addUserData, removeUserData } = slice.actions;

const url = "/data";

export const loadUsers = () => (dispatch) => {
  return dispatch(
      apiCallBegan({
          url,
          onStart: usersRequested.type,
          onSuccess: usersReceived.type,
          onError: usersRequestFailed.type,
      })
  );
};


export const updateUsers = (user) => {
  return {
    type: updateUsersData.type,
    user
   }
}

export const addUser = (user) => {
  return {
    type: addUserData.type,
    user
   }
}

export const removeUser = (user) => {
  return {
    type: removeUserData.type,
    user
   }
}
