export const validateField = (field: string, value: string) => {
  switch (field) {
    case 'username':
      if (value.length < 8) {
        return "Username must be at least 8 characters";
      }
      if (value.length > 20) {
        return "Username must not exceed 20 characters";
      }
      break;
    case 'firstName':
      if (value.length > 20) {
        return "First name must not exceed 20 characters";
      }
      break;
    case 'lastName':
      if (value.length > 20) {
        return "Last name must not exceed 20 characters";
      }
      break;
  }
  return "";
};