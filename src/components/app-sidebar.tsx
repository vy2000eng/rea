import { useEffect,useState} from "react"


import { useAuth } from "@/context/AuthContext"
import { UserSearchModel } from "@/Model/UserSearchModel"
import { UserModel } from "@/Model/UserModel"
import { useNavigate } from "react-router-dom";
import { Trash2,CircleDollarSign,LogOut,UserCheck,UserX,Search,ChevronRight,User, } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useToast } from "@/hooks/use-toast";


export function AppSidebar() {
  const {accessToken,logout} = useAuth();
  const [searchQueries, setSearchQueries ]= useState<UserSearchModel[]>()
  const [userData,setUserData] = useState<UserModel>();
  const navigate = useNavigate()
  const { toast } = useToast()


  function  retrievePreviousSearch(id:number){
    navigate(`/userQueryById/${id}`)
  }

  async function deletedSearchById(id:number){
    try{
      const response = await fetch (`${import.meta.env.VITE_DELETE_USER_QURY_BY_ID}${id}` ,
        {
          method:'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      if (!response.ok) throw new Error    (`HTTP error! status: ${response.status}`);
      setSearchQueries(prevItems => prevItems?.filter(item => item.placeId !== id));

    }catch(e){
      toast({
        title: "an unexpected error occured, please try again later!",
      })

    }
   

  }

  async function ResendConfirmationEmail(){
    const email = userData?.email;
    try{
      const response = await fetch (`${import.meta.env.VITE_RESEND_CONFIRMATION_EMAIL}` ,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({email}),
        }
      );
      if(response.ok){
        toast({
          title: "Please Check your email",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })  
      }

    }catch(e){
      toast({
        title: "an unexpected error occured, please try again later!",
      })
    }
  }

  useEffect(()=>{

    const fetchUserQueries = async () =>{
      try{
        const response = await fetch (`${import.meta.env.VITE_GET_USER_QUERIES_ENDPOINT}` ,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        if (!response.ok) throw new Error    (`HTTP error! status: ${response.status}`);
        const data  = await response.json();
        setSearchQueries(data["userSearchQueries"])

      }catch(e){
        toast({
          title: "an unexpected error occured, please try again later!",
        })
      }
    }
    const fetchUserInfo = async () =>{
      try{
        const response = await fetch (`${import.meta.env.VITE_GET_USER_INFO}` ,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        if (!response.ok) throw new Error    (`HTTP error! status: ${response.status}`);
        const data  = await response.json();
        setUserData(data)

      }catch(e){
        toast({
          title: "an unexpected error occured, please try again later!",
        })
      }
    }

    fetchUserQueries()
    fetchUserInfo()
  },[])

  async function handleLogout(){
    logout();


  }
  const profileItems = [
    {
      title: "Account Confirmed",
      icon: UserCheck,
      action: () => ResendConfirmationEmail()
    },
    {
      title: "Delete Account",
      icon: UserX,
      action: () => console.log("Delete account")
    },
  ]

  return (
    
    <Sidebar className="border-r border-gray-200 bg-white">

    <SidebarHeader className="border-b border-gray-200 bg-gray-50">

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1">
          <div className="text-base font-semibold text-gray-900 truncate">
            {userData?.username || "Username"}
          </div>
          <div className="text-sm text-blue-600 font-medium mt-0.5">
            {userData?.credits || '0'} credits remaining
          </div>
        </div>
      </div>
    </SidebarHeader>
    
    <SidebarContent className="px-2 py-2">
      <SidebarGroup>
        <SidebarMenu>
             {/* Profile Collapsible */}
             <Collapsible className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="hover:bg-slate-100 transition-colors bg-white">
                  <User className="mr-2 h-4 w-4 text-slate-600" />
                  <span className="font-medium text-slate-700">Profile</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-400 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="py-1">
                <SidebarMenuSub>
                  
                  {profileItems.map((item, index) => (
                    <>
                    {index == 0 ? 
                      <SidebarMenuSubItem key={index}>
                        <>
                        {userData?.isEmailConfirmed 
                        ? 
                        <>
                        <div className="flex items-center justify-between w-full hover:bg-slate-100 rounded-sm py-2 bg-green-700">
                          <SidebarMenuSubButton 
                            className="flex-grow hover:bg-transparent min-h-[35px]"
                            onClick={item.action}
                          >
                            <div className="flex flex-col items-start w-full">
                              <span className="text-sm font-medium text-slate-700 truncate max-w-full">

                                Account Confirmed
                              </span>
                            
                            </div>
                          </SidebarMenuSubButton>
                          <item.icon className="h-4 w-4 text-slate-600 mr-2" />
                        </div>

                        </>
                        :
                        <>
                        <div className="flex items-center justify-between w-full hover:bg-slate-100 rounded-sm py-2 bg-red-700">
                          <SidebarMenuSubButton 
                            className="flex-grow hover:bg-transparent min-h-[35px]"
                            onClick={item.action}
                          >
                            <div className="flex flex-col items-start w-full">
                              <span className="text-sm font-medium text-slate-700 truncate max-w-full">

                                Please Confirm Your Account
                              </span>
                            
                            </div>
                          </SidebarMenuSubButton>
                          <item.icon className="h-4 w-4 text-slate-600 mr-2" />
                        </div>
                        </>
                        }
                        
                        </>
              
                      </SidebarMenuSubItem>
                    : 
                      <SidebarMenuSubItem key={index}>
                        <div className="flex items-center justify-between w-full hover:bg-slate-100 rounded-sm py-2">
                          <SidebarMenuSubButton 
                            className="flex-grow hover:bg-transparent min-h-[35px]"
                            onClick={item.action}
                          >
                            <div className="flex flex-col items-start w-full">
                              <span className="text-sm font-medium text-slate-700 truncate max-w-full">
                                {item.title}
                              </span>
                            
                            </div>
                          </SidebarMenuSubButton>
                          <item.icon className="h-4 w-4 text-slate-600 mr-2" />
                        </div>
                      </SidebarMenuSubItem>
                    }
                    </>
                  ))}

                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* Recent Searches Collapsible */}
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="hover:bg-slate-100 transition-colors bg-white">
                  <Search className="mr-2 h-4 w-4 text-slate-600" />
                  <span className="font-medium text-slate-700">Recent Searches</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-400 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="py-1">
                <SidebarMenuSub>
                  {searchQueries?.map((item) => (
                    <SidebarMenuSubItem key={item.placeId}>
                      <div className="flex items-center justify-between w-full hover:bg-slate-100 rounded-sm py-2">
                        <SidebarMenuSubButton 
                          className="flex-grow hover:bg-transparent min-h-[30px]"
                          onClick={() => retrievePreviousSearch(item.placeId)}
                        >
                          <div className="flex flex-col items-start w-full">
                            <span className="text-sm font-medium text-slate-700 truncate max-w-full">
                              {item.originalQuery || "Search"}
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </SidebarMenuSubButton>
                        <button
                          className="p-2.5 text-red-600 hover:bg-red-100 rounded transition-colors bg-white border border-slate-200 mt-2 mb-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletedSearchById(item.placeId)}}
                          title="Delete search"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter className="border-t border-gray-200 bg-gray-50 p-2">
      <SidebarMenu>
  
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="bg-slate-200">
            <button className="flex items-center justify-center w-full hover:bg-gray-100 transition-colors">
              <CircleDollarSign className="mr-2 h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Buy Credits</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="bg-slate-200">
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center w-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>

  );
}
