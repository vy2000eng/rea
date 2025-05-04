import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
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
      <SidebarInset>

        <Index/>
 
      </SidebarInset>
    </SidebarProvider>
  )
}