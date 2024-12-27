import { NextRouter } from "next/router";

const handleLogout = async (router: NextRouter) => {
    try {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
            document.cookie = 'tokenJWT=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
            router.push('/login');
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

export default handleLogout;