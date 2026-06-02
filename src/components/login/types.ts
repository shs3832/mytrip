export type ILogin = {
  handleLogin: () => void;
  handleSignUp: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
};
