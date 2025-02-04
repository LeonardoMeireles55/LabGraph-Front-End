const handleLogout = async () => {
  try {
    const response = await fetch('/api/logout', { method: 'POST' });
    if (response.ok) {
      document.cookie = 'tokenJWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      console.log('Logout successful');
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export default handleLogout;
