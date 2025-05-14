import React, { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

interface AuthLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full">
      <Header />
      <div className="flex h-[calc(100vh-56px)] w-full">
        <Sidebar />
        <div className="w-full p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
