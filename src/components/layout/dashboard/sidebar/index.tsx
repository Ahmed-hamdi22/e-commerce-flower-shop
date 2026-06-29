import React from "react";
import NavigationSection from "./components/navigation-section";
import UserSection from "./components/user-section";
import { fetchUserData } from "@/lib/apis/auth/profile.api";
import MobileDashboardMenu from "./components/mobile-dashboard-menu";

export default async function Sidebar() {
  // Variables
  const userData = (await fetchUserData()) || undefined;

  return (
    <>
      <aside className="fixed bottom-0 top-0 hidden w-72 flex-col items-center justify-between border-r border-custom-rose-100 bg-custom-rose-25 p-6 lg:flex">
        {/* Navs */}
        <NavigationSection />

        {/* User */}
        <UserSection userData={userData} />
      </aside>

      <MobileDashboardMenu userData={userData} />
    </>
  );
}
