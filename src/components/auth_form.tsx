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
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"


export function AuthForm({ className, ...props}: React.ComponentPropsWithoutRef<"div">) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const navigate = useNavigate()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(showLogin){
      console.log("logging in...")

      try {
        console.log(email)
        console.log(password)
         await login(email, password);
         navigate(`/index`)


      } catch (error) {
        // Show error message
      }


    }
  
  };

    function changeState(){
        setShowLogin(!showLogin);
        console.log(showLogin)
    }

  




  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {showLogin ?
          <div>
             <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            
            
               
          </div>:
          <div>
             <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Enter your email, username, and password below to login to your account
              </CardDescription>
           

          </div>
          }
       
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {!showLogin && <div>
                  <Label htmlFor="email">username</Label>
                    <Input
                      id="username"
                      type="username"
                      placeholder="a unique username"
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  
                  
                  
                  </div>}
                <Label htmlFor="email">Email</Label>
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
                    href="#"
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
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
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
