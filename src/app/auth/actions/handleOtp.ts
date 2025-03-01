import fetchWithAuth from "@/lib/fetchWithAuth"; 
 
interface IOtp{ 
    code: string;
}

export const handleOtp = async (otpData: IOtp) => {
    try {
        const response = await fetchWithAuth('/auth/verify-email', {
            method: 'POST',
            body: JSON.stringify(otpData),
        }); 
      const data = await response.json();       
      return data;
    } catch (error) {  
      return error 
    }
};  