import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const EmailConfirmation= ({

}) => {
    const{userId,code} = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' | null }>({
    text: '',
    type: null,
  });


  useEffect(()=>{
    const sendConfirmationEmail = async () => {
 
        setMessage({ text: '', type: null });
    
        try {
          setIsSubmitting(true);
          setMessage({ text: 'Sending confirmation email...', type: 'info' });
     
  
          const response = await fetch(`${import.meta.env.VITE_CONFIRM_EMAIL_ENDPOINT}${import.meta.env.VITE_CONFIRM_EMAIL_PARAM_1}${userId}${import.meta.env.VITE_CONFIRM_EMAIL_PARAM_2}${code}` , {
            method: 'GET'
          });
          
          if (response.ok) {
            setMessage({ 
              text: 'Thank you for confirming your email!', 
              type: 'success' 
            });
          } else {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Failed with status: ${response.status}`);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
          setMessage({ text: errorMessage, type: 'error' });
        } finally {
          setIsSubmitting(false);
        }
      };
     sendConfirmationEmail()

  }, [])


  return (
    <>
    {isSubmitting? 
    
    <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading schools...</div>
    </div>
    
    :
    
        <div className={`email-confirmation-container`}>

        {message.text && (
            <div 
                className={`p-3 rounded ${
                message.type === 'success' ? 'bg-green-100 text-green-800' : 
                message.type === 'error' ? 'bg-red-100 text-red-800' : 
                'bg-blue-100 text-blue-800'
                }`}>
                {message.text}
            </div>
        )}
        </div>
    }
    </>

  );
};

export default EmailConfirmation;