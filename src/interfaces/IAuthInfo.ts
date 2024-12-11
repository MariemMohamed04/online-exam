/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IAuthInfo {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  rePassword?: string;
  newPassword?: string
  phone?: string;
  resetCode?: any
}