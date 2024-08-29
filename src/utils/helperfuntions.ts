import bcrypt from "bcryptjs";

interface Params {
  key: string;
  value: string;
}

export const setItem = ({ key, value }: Params) => {
  localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  return value;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

// Function to hash a password
export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

// Function to compare a password with a hashed password
export const comparePassword = async ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error);
    return false;
  }
};

export const isEmpty = (initialValues: object) =>
  Object.values(initialValues).every((value) => !value);

// Debounce function for React with TypeScript
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
