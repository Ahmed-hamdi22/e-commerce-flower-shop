import React from "react";
import NavigationSection from "./components/navigation-section";
import UserSection from "./components/user-section";
import { fetchUserData } from "@/lib/apis/auth/profile.api";

export default async function Sidebar() {
  // Variables
  const userData = (await fetchUserData()) || undefined;

  return (
    <aside className="w-72 flex justify-between items-center flex-col p-6 border-r border-custom-rose-100 bg-custom-rose-25 fixed top-0 bottom-0">
      {/* Navs */}
      <NavigationSection />

      {/* User */}
      <UserSection userData={userData} />
    </aside>
  );
}
