import { AppSidebar } from "@/components/SideBars/IndexSideBarComponent"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Index } from "@/pages/Index"
// import { useState } from "react";

export default function IndexSideBar() {
  // const [childData, setChildData] = useState([]);
  // const handleDataFromChild = (data:[]) => {
  //   setChildData(data);
  //   console.log("Received from child:", data);
  // };



  return (
    <SidebarProvider className="bg-white overflow-hidden">

    <div className="flex place-items-cente h-screen  w-full  bg-white">
      <AppSidebar isSearchResults={false}  />
      <SidebarTrigger className="absolute top-4 left-4 z-50 bg-slate-200" />
      <SidebarInset className="bg-white">
      
          <Index />
          
      </SidebarInset>

    </div>
    
    </SidebarProvider>
  )
}