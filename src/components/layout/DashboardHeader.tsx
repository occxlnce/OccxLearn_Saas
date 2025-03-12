
import React from 'react';
import { BellIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

type DashboardHeaderProps = {
  pageTitle: string;
};

const DashboardHeader = ({ pageTitle }: DashboardHeaderProps) => {
  return (
    <header className="bg-black border-b border-border sticky top-0 z-50">
      <div className="container h-16 px-4 flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold text-white">{pageTitle}</h1>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div>
                  <p className="font-medium">New content available</p>
                  <p className="text-sm text-muted-foreground">Teacher uploaded new study materials</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div>
                  <p className="font-medium">Attendance updated</p>
                  <p className="text-sm text-muted-foreground">Your attendance record has been updated</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center cursor-pointer">
                <span className="text-primary">View all notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
