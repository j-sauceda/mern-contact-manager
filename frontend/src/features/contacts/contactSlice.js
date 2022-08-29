import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactService from './contactService';

const initialState = {
  contacts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};


// Create new contact
export const createContact = createAsyncThunk(
  'contacts/create',
  async (contactData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.createContact(contactData, token);
    }
    catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get user contacts
export const getContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.getContacts(token);
    }
    catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Update user contact
export const updateContact = createAsyncThunk(
  'contacts/update',
  async (contact, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      let contactData = { name:contact.name, phone:contact.phone, email:contact.email, relation:contact.relation }
      return await contactService.updateContact(contact._id, contactData, token);
    }
    catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Delete user contact
export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.deleteContact(id, token);
    }
    catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// define contact slice
export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // create contact
      .addCase(createContact.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contacts.push(action.payload)
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // get contacts
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contacts = action.payload
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // update contact
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contacts[state.contacts.findIndex(contact => contact._id === action.payload._id)] = action.payload
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // delete contact
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload.id
        )
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})


export const { reset } = contactSlice.actions;
export default contactSlice.reducer;