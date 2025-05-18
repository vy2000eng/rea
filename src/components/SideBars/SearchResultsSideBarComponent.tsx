import { AppSidebar } from "@/components/SideBars/IndexSideBarComponent"
import { useParams } from "react-router-dom";
import { useState } from "react";


import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SearchResults } from "@/pages/Results";
//import { PropertyCards } from "@/Model/PropCardsInterface";

export default function SearchResultsSideBar({isSample}: { isSample: boolean }) {
    const {location,id}                                                = useParams                      (  );
  
  //const [childData, setChildData] = useState<PropertyCards[]>([]);
  const [activeChildTitle,setActiveChildTitle] = useState<string>("All locations")

//   const handleDataFromChild = (data:PropertyCards[]) => {
//     setChildData(data);
//     console.log("Received from child:", data);
//   };

  const handleActiveTitleFromChild = (activeTitle:string)=>{
    console.log("Property in SearchResult SideBar"+ activeTitle)  
    setActiveChildTitle(activeTitle)

  }

  return (
    <SidebarProvider>


        <AppSidebar isSearchResults = {true}  sendActiveTitleToParent={handleActiveTitleFromChild}/>
        <SidebarTrigger className="absolute top-4 left-4 z-50 bg-slate-200" />
            <SidebarInset>
                <div className="flex flex-col h-screen">
                    <SearchResults isSample={isSample} location={location} id={id} activeTitle={activeChildTitle}/> 
                </div>
            </SidebarInset>
    </SidebarProvider>
  )
}