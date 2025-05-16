import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Index } from "@/pages/Index"

export default function Page() {
  return (
    <SidebarProvider>


      <AppSidebar />
      <SidebarTrigger className="absolute top-4 left-4 z-50 bg-slate-200" />
      <SidebarInset>
      
          <Index />
      </SidebarInset>
    </SidebarProvider>
  )
}