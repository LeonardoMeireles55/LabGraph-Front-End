import { NextRouter } from 'next/router';

const handleLogout = async (router: NextRouter) => {
  try {
    const response = await fetch('/api/logout', { method: 'POST' });
    if (response.ok) {
      console.log('Logout successful');
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export default handleLogout;
