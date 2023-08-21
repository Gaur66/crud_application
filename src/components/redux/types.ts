// types.ts
import { Contact } from './contactSlice';

export interface RootState {
  contact: {
    contacts: Contact[];
  };
}
