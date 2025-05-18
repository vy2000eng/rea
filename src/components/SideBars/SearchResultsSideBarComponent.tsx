import { AppSidebar } from "@/components/SideBars/IndexSideBarComponent"
import { useParams } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SearchResults } from "@/pages/Results";

export default function SearchResultsSideBar({isSample}: { isSample: boolean }) {
    const {location,id}                                                = useParams                      (  );

  return (
    <SidebarProvider>


      <AppSidebar />
      <SidebarTrigger className="absolute top-4 left-4 z-50 bg-slate-200" />
      <SidebarInset>
        <SearchResults isSample={isSample} location={location} id={id}/> 
      
          
      </SidebarInset>
    </SidebarProvider>
  )
}