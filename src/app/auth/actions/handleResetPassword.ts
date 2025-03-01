import fetchWithAuth from "@/lib/fetchWithAuth"; 
 
interface IUser{ 
    password: string; 
    code: string; 
}

export const handleResetPassword = async (restPassData: IUser) => {
    try {
        const response = await fetchWithAuth('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify(restPassData),
          }); 
      const data = await response.json();       
      return data;
    } catch (error) {  
      return error 
    }
};  