import fetchWithAuth from "@/lib/fetchWithAuth";
import Cookies from "js-cookie";  

interface IProps{ 
    email: string;
    password: string; 
}
export const handleLogin = async (loginData: IProps) => {
    try {
        const response = await fetchWithAuth('/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
        });
     
      const data = await response.json();    
      if (response?.status === 200) {
        const { accessToken, refreshToken } = data?.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
        Cookies.set('name', data?.data?.user?.name, { secure: false, sameSite: 'none' });
      }
      return data;
    } catch (error) { 
      return error;
    }};  