import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {  useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { Mail, Lock, User, LogIn } from "lucide-react"; // Using Lucide icons


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
    window.location.href = import.meta.env.VITE_API_GOOGLE_REDIRECT//"https://localhost:7234/api/Account/GoogleLogin?returnUrl=http://localhost:5173/index"
  }

  function changeState(){
      setShowLogin(!showLogin);
       // Reset fields when toggling between login and register
    setEmail("");
    setPassword("");
    setUsername("");
      //console.log(showLogin)
  }

  return (
    <div className={cn("flex flex-col max-w-md mx-auto w-full", className)} {...props}>
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {showLogin ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-center">
          {showLogin
            ? "Enter your credentials to sign in"
            : "Fill in your details to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!showLogin && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                <User size={16} />
                Username
              </Label>
              <Input
                id="username"
                placeholder="A unique username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail size={16} />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock size={16} />
                Password
              </Label>
              {showLogin && (
                <a
                  href="sendPasswordReset"
                  className="text-xs text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Button type="submit" className="w-full font-semibold flex items-center justify-center gap-2">
            <LogIn size={18} />
            {showLogin ? "Sign In" : "Create Account"}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button 
            type="button"
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={loginWithGoogle}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span>Google</span>
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-center text-muted-foreground">
          {showLogin ? "Don't have an account?" : "Already have an account?"}
          <Button
            variant="link"
            className="underline-offset-4 hover:underline p-0 h-auto font-normal bg-slate-200"
            onClick={changeState}
          >
            {showLogin ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
  )
}
export default AuthForm
