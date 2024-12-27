export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}

export interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autocomplete?: string;
}

export interface SubmitButtonProps {
  text?: string;
}
