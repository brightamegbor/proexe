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
          users.list = users.list.length ? [...users.list, ...action.payload] : action.payload;
          
          users.list = users.list.filter((val,id,array) => array.findIndex(va => va.id === val.id) === id);
          console.log(users.list);
          users.loading = false;
      },

      usersRequestFailed: (users, action) => {
          users.loading = false;
      },

      updateUsersData: (state, action) => {

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

      sortUserDataById: (state, action) => {

        const usersState = current(state);
        const users = usersState.list.concat().sort((a, b) => a.id - b.id);

        state.list = [
          ...users
        ];
      },

      sortUserDataByUsername: (state, action) => {

        const usersState = current(state);
        const sortBy = action.by;
        const users = usersState.list.concat().sort(
          (a, b) => sortBy === "a-z" ? 
          a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username));

        state.list = [
          ...users
        ];
      },
  },
});

export default slice.reducer;

const { usersRequested, usersReceived, usersRequestFailed, 
  updateUsersData, addUserData, removeUserData, sortUserDataByUsername,
  sortUserDataById } = slice.actions;

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

export const sortUsersbyId = (sortBy) => {
  return {
    type: sortUserDataById.type,
    by: sortBy
   }
}

export const sortUsersbyUsername = (sortBy) => {
  return {
    type: sortUserDataByUsername.type,
    by: sortBy
   }
}
