export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d{4,}).+$/;
    return passwordRegex.test(password);
};

export const getPasswordErrorMessage = (): string => {
    return "Password must contain at least 4 characters and one special character.";
};
