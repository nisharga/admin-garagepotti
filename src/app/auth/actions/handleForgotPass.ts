import fetchWithAuth from "@/lib/fetchWithAuth"; 
 
interface IProps{ 
    email: string; 
}

export const handleForgetPass = async (email: IProps) => {
    try {
        const response = await fetchWithAuth('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify(email),
          }); 
      const data = await response.json();       
      return data;
    } catch (error) {  
      return error 
    }
};  