import Cookies from 'js-cookie';

const BASE_API = process.env.NEXT_PUBLIC_API_URL;

const fetchWithAuth = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {
    let accessToken = Cookies.get('accessToken');

    if (!accessToken && typeof window === 'undefined') {
        // Handle server-side environment correctly
        const { cookies } = await import('next/headers');
        const serverCookies = await cookies(); // ✅ Await this
        accessToken = serverCookies.get('accessToken')?.value || '';
    }

    // Add Authorization header if accessToken exists
    const headers: HeadersInit = {
        ...(options.headers || {}),
        Authorization: accessToken ? accessToken : '',
        'Content-Type': 'application/json'
    };

    const config = {
        ...options,
        headers
    };

    try {
        let response = await fetch(`${BASE_API}${endpoint}`, config);

        // Handle unauthorized (401) responses and refresh token
        if (
            response.status === 401 &&
            endpoint !== '/auth/login' &&
            endpoint !== '/auth/register'
        ) {
            const refreshToken = Cookies.get('refreshToken');
            if (refreshToken) {
                // Attempt to refresh the token
                const refreshResponse = await fetch(
                    `${BASE_API}/auth/refresh-token`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `${refreshToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (refreshResponse.ok) {
                    const {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    } = await refreshResponse.json();

                    // Update cookies
                    Cookies.set('accessToken', newAccessToken, {
                        secure: true,
                        sameSite: 'Strict',
                        expires: 7
                    });
                    Cookies.set('refreshToken', newRefreshToken, {
                        secure: true,
                        sameSite: 'Strict',
                        expires: 7
                    });

                    // Retry original request with new access token
                    config.headers = {
                        ...config.headers,
                        Authorization: `${newAccessToken}`
                    };
                    response = await fetch(`${BASE_API}${endpoint}`, config);
                } else {
                    throw new Error('Unauthorized');
                }
            } else {
                throw new Error('No refresh token available');
            }
        }

        return response;
    } catch (error) {
        throw error;
    }
};

export default fetchWithAuth;
