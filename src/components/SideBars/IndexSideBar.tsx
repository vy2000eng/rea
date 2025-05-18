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
    <SidebarProvider>


      <AppSidebar isSearchResults={false}  />
      <SidebarTrigger className="absolute top-4 left-4 z-50 bg-slate-200" />
      <SidebarInset>
      
          <Index />
          
      </SidebarInset>
    </SidebarProvider>
  )
}