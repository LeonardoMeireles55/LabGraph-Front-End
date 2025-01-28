export interface AuthFormData {
  identifier: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoCompleteProps?: string;
}

export interface SubmitButtonProps {
  text?: string;
}
