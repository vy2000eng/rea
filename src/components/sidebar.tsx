import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Index } from "@/pages/Index"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <Index/>
 
      </SidebarInset>
    </SidebarProvider>
  )
}