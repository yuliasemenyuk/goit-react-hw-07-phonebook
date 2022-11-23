import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const contactsSlice = createSlice({
  name: "state",
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null
    },
    filter: ""
  },
  reducers: {
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled] (state, action) {
      state.contacts.isLoading = false;
      console.log(state.contacts);
      state.contacts.error = null;
      state.contacts.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled] (state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled] (state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const index = state.contacts.items.findIndex(
        contact => contact.id === action.payload.id);
        state.contacts.items.splice(index, 1);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { filterContacts } = contactsSlice.actions;


// const initialState = {
//   contacts: [],
//   filter: "",
// };

// const contactsSlice = createSlice({
//   name: "state",
//   initialState,
//   reducers: {
//     addContact: {
//       reducer(state, action) {
//         state.contacts.push(action.payload);
//       },
//       prepare(name, number) {
//         return {
//           payload: {
//             name,
//             number,
//             id: nanoid(),
//           },
//         };
//       },
//     },
//     deleteContact(state, action) {
//       const index = state.contacts.findIndex(
//         (contact) => contact.id === action.payload
//       );
//       state.contacts.splice(index, 1);
//     },
//     filterContacts: {
//       reducer(state, action) {
//         state.filter = action.payload;
//       },
//     },
//   },
// });

// const persistConfig = {
//   key: "contacts",
//   storage,
// };

// export const Reducer = persistReducer(persistConfig, contactsSlice.reducer);

// export const { addContact, deleteContact, filterContacts } =
//   contactsSlice.actions;
