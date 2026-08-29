export const validateRequired = (value, fieldName) => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }

  return "";
};

export const validateEmail = (email) => {
  const value = email.trim();

  if (!value) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return "Please enter a valid email";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};