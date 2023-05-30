import { createSlice } from "@reduxjs/toolkit";
import accountsInitial from "../data/accounts";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    value: accountsInitial,
  },
  reducers: {
    enable: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.find((x) => x.id === action.payload.id).enabled = true;
      state.value.find((x) => x.id === action.payload.id).username =
        action.payload.username;
    },
    disable: (state, action) => {
      state.value.find((x) => x.id === action.payload.id).enabled = false;
      state.value.find((x) => x.id === action.payload.id).username =
        action.payload.username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { enable, disable } = accountSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount))
//     }, 1000)
//   }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAccount = (state) => state.account.value;

export default accountSlice.reducer;

