import * as React from "react"
import { useEffect,useState} from "react"

import {
  Sidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import { UserSearchModel } from "@/Model/UserSearchModel"
import { UserModel } from "@/Model/UserModel"


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


export function AppSidebar() {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  



  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>
    
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 overflow-y-auto bg-white border-r`}
      >
        {/* Header */}
        <div className="p-3 sm:p-4 border-b">
          <div className="flex-1">
            <div className="text-base font-medium truncate">{userData?.email || "na"}</div>
            <div className="text-xs text-blue-600 font-medium mt-1">
              {userData?.credits || 'na'} credits remaining
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-2 sm:p-3">
          {/* Search history heading */}
          <div className="mb-3 mt-2 sm:mb-5 sm:mt-4">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium px-2">Recent Searches</h3>
          </div>
          
          <div>
            {searchQueries?.map((item, index) => {
              return (
                <div 
                  key={index}
                  className="mb-2 w-full"
                >
                  <button 
                    className="w-full rounded-md bg-white shadow-sm hover:bg-gray-100 p-2 sm:p-3 text-left"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="truncate text-sm font-medium">{item.originalQuery || "Search"}</span>
                      <span className="flex-shrink-0 ml-2 text-gray-400 text-xs hidden sm:inline">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-3 sm:p-4 mt-auto border-t absolute bottom-0 w-full bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
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
            className="flex items-center justify-center w-full py-2 text-xs text-rose-600 hover:text-rose-700 rounded-md border border-rose-200 hover:bg-rose-50 bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log Out
          </button>
        </div>
      </div>
      
      {/* Overlay to close sidebar when clicking outside on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
