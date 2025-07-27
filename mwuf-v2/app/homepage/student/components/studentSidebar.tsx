import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

import { useRouter, useSearchParams } from "next/navigation"

export function StudentSidebar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const studentEmail = searchParams.get('email')

    return (
        <Sidebar>
        <SidebarHeader className="p-5">
            <div className="flex items-center space-x-2">
            <div>
                <p className="text-3xl font-sans text-green-900 font-extrabold">Student Portal</p>
                <p className="text-xs text-muted-foreground truncate">
                {studentEmail || 'student@example.com'}
                </p>
            </div>
            </div>
        </SidebarHeader>
        </Sidebar>
    )
}