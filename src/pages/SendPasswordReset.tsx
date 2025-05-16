import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
 
const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
export function SendPasswordReset() {
    const {toast} = useToast()
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const email = values.email;
    try{
        const response = await fetch(`${import.meta.env.VITE_SEND_FORGOT_PASSWORD}` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          if(response.ok){
            //await login(email, password);
            navigate(`/index`)
            toast({
                title: "Please Check your email",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })

    
          }

    }catch(e){
        toast({
            title: "an unexpected error occured please try again later",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
    }
 


    console.log(values)
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
          ) : (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>email</FormLabel>
                        <FormControl>
                            <Input placeholder="user@email.com" {...field} />
                        </FormControl>
                        <FormDescription>
                            please enter your email to get the password reset link.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                </Form>


          )
          
          
          
          }

    </>

    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //     <FormField
    //       control={form.control}
    //       name="email"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>email</FormLabel>
    //           <FormControl>
    //             <Input placeholder="user@email.com" {...field} />
    //           </FormControl>
    //           <FormDescription>
    //             please enter your email to get the password reset link.
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </Form>
  )



}