import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';


const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})


const PasswordReset= () => {
    const {email, code} = useParams()
    const [isLoading,setIsLoading] = useState(false) 


    if (!email || !code) {
        return <div>Invalid reset link</div>;
    }

    const decodedEmail = decodeURIComponent(email);
    const decodedCode = decodeURIComponent(code);

    const navigate = useNavigate()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        password: "",
        confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try{
            var newPassword = values.confirmPassword;
            const response = await fetch(`${import.meta.env.VITE_SEND_RESET_PASSWORD}` , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: decodedEmail,
                    resetCode: decodedCode,
                    newPassword: newPassword 
                  })
              });
              if(response.ok){
                setIsLoading(false)
                navigate(`/index`)
                toast({
                    title: "password has been reset successfully!",
                  })
              }
        }catch(e){
            setIsLoading(false)
            navigate(`/index`)
            toast({
                title: "an unexpected error occured, please try again later!",
              })
        }
    }

  return (
    <>
       {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Email...
            </>
          ) :(
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Reset Password</Button>
            </form>
          </Form>

          )}
    
    
    
    
    </>

  );
};

export default PasswordReset;