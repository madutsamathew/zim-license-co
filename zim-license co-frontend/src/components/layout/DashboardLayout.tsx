import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Building2,
  FileText,
  DollarSign,
  BarChart3,
  Map,
  Bell,
  Settings,
  Users,
  Shield,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'admin' | 'regulator' | 'user';
}

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenuItems = () => {
    const commonItems = [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Notifications", url: "/notifications", icon: Bell },
    ];

    if (userRole === 'admin') {
      return [
        ...commonItems,
        { title: "User Management", url: "/admin/users", icon: Users },
        { title: "Role Management", url: "/admin/roles", icon: Shield },
        { title: "System Settings", url: "/admin/settings", icon: Settings },
      ];
    }

    if (userRole === 'regulator') {
      return [
        ...commonItems,
        { title: "Companies", url: "/companies", icon: Building2 },
        { title: "Licenses", url: "/licenses", icon: FileText },
        { title: "Fee Management", url: "/fees", icon: DollarSign },
        { title: "Reports", url: "/reports", icon: BarChart3 },
        { title: "Map View", url: "/map", icon: Map },
      ];
    }

    // User role
    return [
      ...commonItems,
      { title: "My Licenses", url: "/my-licenses", icon: FileText },
      { title: "Apply for License", url: "/apply", icon: FileText },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-border">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            isActive ? "bg-sidebar-accent" : ""
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <Navbar userRole={userRole} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto bg-background">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
