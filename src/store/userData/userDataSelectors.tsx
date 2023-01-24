import { RootState } from '..';

export const userIdSelector = (state: RootState) => state.user.userId;
export const userAdminSelector = (state: RootState) => state.user.isAdmin;
export const userEmailSelector = (state: RootState) => state.user.email;
export const userPhoneSelector = (state: RootState) => state.user.phone;
export const usernameSelector = (state: RootState) => state.user.userName;
export const userDataSelector = (state: RootState) => state.user.userData;
