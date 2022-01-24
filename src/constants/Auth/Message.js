const AUTH_ERROR_MESSAGES = {
  USERNAME_REQUIRED: "Username is required",
  USERNAME_INVALID_SHORT_LENGTH: "Username must be at least 6 characters",
  USERNAME_INVALID_LONG_LENGTH: "Username must not exceed 20 characters",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_INVALID_SHORT_LENGTH: "Password must be at least 6 characters",
  PASSWORD_INVALID_LONG_LENGTH: "Password must not exceed 40 characters",
  CONFIRM_PASSWORD_REQUIRED: "Confirm password is required",
  CONFIRM_PASSWORD_NOT_MATCH: "Confirm password does not match",

  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Email is invalid",
};
const AUTH_SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: "Register Successfully",
  LOGIN_SUCCESS: "Login Successfully",
};

export { AUTH_ERROR_MESSAGES, AUTH_SUCCESS_MESSAGES };
