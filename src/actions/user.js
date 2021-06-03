// action list
export const CHANGE_USER_INFORMATIONS = 'CHANGE_USER_INFORMATIONS';
export const REHYDRATE = 'REHYDRATE';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LAUCH_INSCRIPTION_FORM = ' LAUCH_INSCRIPTION_FORM';
export const LOGIN_FROM_REHYDRATE = 'LOGIN_FROM_REHYDRATE';
export const SAVE_NEW_MAIL = 'SAVE_NEW_MAIL';
export const SAVE_NEW_PHONE = 'SAVE_NEW_PHONE';
export const CHANGE_USER_MAIL = 'CHANGE_USER_MAIL';
export const CHANGE_USER_PHONE = 'CHANGE_USER_PHONE';
export const CLEAN_INPUT_SIGNUP = 'CLEAN_INPUT_SIGNUP';

// action creators
export const changeUserInformations = (value, name) => ({
  type: CHANGE_USER_INFORMATIONS,
  value,
  name,
});

export const rehydrate = () => ({
  type: REHYDRATE,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const login = (accessToken) => ({
  type: LOGIN,
  accessToken,
});

export const logout = () => ({
  type: LOGOUT,
});

export const lauchInscriptionForm = () => ({
  type: LAUCH_INSCRIPTION_FORM,
});

export const saveNewMail = (mail) => ({
  type: SAVE_NEW_MAIL,
  mail,
});

export const saveNewPhone = (phone) => ({
  type: SAVE_NEW_PHONE,
  phone,
});

export const changeUserMail = (querry, value) => ({
  type: CHANGE_USER_MAIL,
  querry,
  value,
});

export const changeUserPhone = (querry, value) => ({
  type: CHANGE_USER_PHONE,
  querry,
  value,
});

export const cleanInputSignUp = () => ({
  type: CLEAN_INPUT_SIGNUP,
});
