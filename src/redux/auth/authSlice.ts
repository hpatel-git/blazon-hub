import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KeycloakProfile } from 'keycloak-js';
import type { RootState } from '../store';

interface AuthState {
  userProfile?: KeycloakProfile;
  userToken?: String;
}

// Define the initial state using that type
const initialState: AuthState = {
  userProfile: undefined,
  userToken: undefined
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserProfile: (state, action: PayloadAction<KeycloakProfile>) => {
      state.userProfile = action.payload;
    },
    updateUserToken: (state, action: PayloadAction<String | undefined>) => {
      state.userToken = action.payload;
    }
  }
});

export const { updateUserProfile, updateUserToken } = authSlice.actions;

export const currentUserProfile = (state: RootState) => state.auth.userProfile;

export default authSlice;
