import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {  useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"


export function AuthForm({ className, ...props}: React.ComponentPropsWithoutRef<"div">) {
  const { login,register } = useAuth();
  const [username, setUsername] = useState('');
  const navigate = useNavigate()
  const {toast} = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(showLogin){
      try {
        console.log(email)
        console.log(password)
         await login(email, password);
         navigate(`/index`)
      } catch (error) {
        toast({
          title: "an unexpected error occured, please try again later!",
        })
      }
    }else{
      try{
        await register(email, username,password)

      }catch(e){
        
        toast({
          title: "please try a different email, username, or password",
        })
      }
   
    }
  
  };
  async function loginWithGoogle(){
    window.location.href = "https://localhost:7234/api/Account/GoogleLogin?returnUrl=http://localhost:5173/index"
  }

  function changeState(){
      setShowLogin(!showLogin);
      console.log(showLogin)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card >
        <CardHeader>
          {showLogin ?
          <div>
             <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Login to Your Account
            </CardDescription>
            
            
               
          </div>:
          <div>
             <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Register An Account
              </CardDescription>
           

          </div>
          }
       
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {!showLogin && 
                  <div >
                    <div className="flex flex-row py-2">
                      <Label htmlFor="email">Username</Label>

                    </div>
                      <Input
                        id="username"
                        type="username"
                        placeholder="a unique username"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                  </div>
                }
                <div className="flex flex-row py-2">
                  <Label htmlFor="email">Email</Label>

                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="sendPasswordReset"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password" required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                
                />
              </div>
              {showLogin?
               <Button type="submit" className="w-full">
                Login
              </Button>
                :
                <Button type="submit" className="w-full">
                Register
              </Button>
              }
              
              <Button variant="outline" className="w-full" onClick={loginWithGoogle}>
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {showLogin ? 
              <div>
                Don&apos;t have an account?{" "}
              <Button onClick ={changeState}>
                Register
              </Button>

              </div>:
               <div>
                already have an account?{" "}
              <Button onClick ={changeState}>
                login
              </Button>

               </div>  
            }
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default AuthForm
