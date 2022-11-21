import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getContacts, getFilterValue } from "./selectors";

axios.defaults.baseURL = "https://637bba2c72f3ce38ea93d189.mockapi.io";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (name, number, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", {name, number});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// export const filterContacts = createAsyncThunk(
//     "contacts/filterContacts",
//     async (getFilterValue, thunkAPI) => {
//         try {

//         }
//     }
// )