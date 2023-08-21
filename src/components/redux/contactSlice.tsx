// contactSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
 
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contact', // Use singular name for clarity
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact, index) => index !== parseInt(action.payload));
    },
    updateContact: (state, action: PayloadAction<{ index: number; updatedContact: Contact }>) => {
      const { index, updatedContact } = action.payload;
      state.contacts[index] = updatedContact;
    
  },
  },
});

export const { addContact,deleteContact,updateContact } = contactSlice.actions;

export default contactSlice.reducer;
