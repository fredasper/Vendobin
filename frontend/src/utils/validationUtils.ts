export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateForm = (data: Record<string, any>, schema: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    const value = data[key];
    const rules = schema[key];

    if (rules.required && !value) {
      errors[key] = `${key} is required`;
    }

    if (rules.minLength && value?.length < rules.minLength) {
      errors[key] = `${key} must be at least ${rules.minLength} characters`;
    }

    if (rules.type === 'email' && !validateEmail(value)) {
      errors[key] = 'Invalid email';
    }
  });

  return errors;
};
