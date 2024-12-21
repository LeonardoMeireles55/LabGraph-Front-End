export const useAuth = () => {
    const getToken = () => {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('tokenJWT='));
      return tokenCookie ? tokenCookie.split('=')[1] : null;
    };
    return { getToken };
  };