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

      usersReceived: (users, action) => 
        Object.assign({}, users.list, {list: action.payload, loading: false})
          // users.list = action.payload;
          // users.loading = false;
      ,

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
      }
  },
});

export default slice.reducer;

const { usersRequested, usersReceived, usersRequestFailed, updateUsersData } = slice.actions;

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
