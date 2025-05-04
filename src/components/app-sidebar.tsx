import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"
import { useEffect,useState} from "react"

import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import { UserSearchModel } from "@/Model/UserSearchModel"
import { UserModel } from "@/Model/UserModel"
import { Separator } from "@radix-ui/react-separator"


// This is sample data.


// const data = {
//   navMain: [
//     {
//       title: "Profile",
//       url: "#",
//       items: [
//         {
//           title: "Installation",
//           url: "#",
//         },
    
//       ],
//     },
//     {
//       title: "Searches",
//       url: "#",
//       items: [
//         {
//           title: "Routing",
//           url: "#",
//         },
//         {
//           title: "Data Fetching",
//           url: "#",
//           isActive: true,
//         },

//       ],
//     },

//   ],
// }


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {accessToken,logout} = useAuth();
  const [searchQueries, setSearchQueries ]= useState<UserSearchModel[]>()
  const [userData,setUserData] = useState<UserModel>();


  useEffect(()=>{


    const fetchUserQueries = async () =>{
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
        console.log(data)



    }
    const fetchUserInfo = async () =>{
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
      //setSearchQueries(data["userSearchQueries"])
      console.log(data)

    }



    fetchUserQueries()
    fetchUserInfo()
  },[])

  async function handleLogout(){
    logout();


  }
  



  return (
    <Sidebar {...props} className="border-r bg-gray-50">
      {/* Improved header with better styling */}
      <SidebarHeader className="p-4">
        <div className="flex-1">
          <div className="text-base font-medium">{userData?.email || "mike2@gmail.com"}</div>
          <div className="text-xs text-blue-600 font-medium mt-1">
            {userData?.credits || 5} credits remaining
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-3">
        {/* Moved search history heading lower with more space */}
        <div className="mb-5 mt-4">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium px-2">Recent Searches</h3>
        </div>
        
        <SidebarGroup>
          <SidebarMenu>
            {searchQueries?.map((item, index) => {
              // Create a more readable search label
              const searchTerms = item.googleGeneratedSearchQuery.split(" ");
              const searchLabel = searchTerms.slice(1, 4).join(" ");
              
              return (
                <Collapsible
                  key={index}
                  defaultOpen={index === 0}
                  className="mb-2.5"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className="w-full rounded-md bg-white shadow-sm hover:bg-gray-100 p-3"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="truncate text-sm font-medium">{searchLabel}</span>
                          {/* Removing the plus/minus icons as requested */}
                          <span className="flex-shrink-0 ml-2 text-gray-400 text-xs">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="pl-4 pr-2 py-3 bg-white rounded-md mt-1 shadow-sm text-sm text-gray-600">
                        <p className="line-clamp-2">{item.originalQuery}</p>
                      </div>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 mt-auto">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button className="flex items-center justify-center w-full py-1.5 text-xs bg-gray-200 hover:bg-gray-300 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/></svg>
            Clear History
          </button>
          <button className="flex items-center justify-center w-full py-1.5 text-xs bg-gray-200 hover:bg-gray-300 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
            Buy Credits
          </button>
        </div>
        <button 
        onClick={handleLogout}
        className="flex items-center justify-center w-full py-2 text-xs text-rose-600 hover:text-rose-700 rounded-md border border-rose-200 hover:bg-rose-50 bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Log Out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
