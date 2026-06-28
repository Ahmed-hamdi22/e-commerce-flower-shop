import React from "react";
import ProfileForm from "./_components/profile-form";
import { fetchUserData } from "@/lib/apis/auth/profile.api";

export default async function ProfilePage() {
  // Variables
  const userData = (await fetchUserData()) || undefined;

  return (
    <div className="my-20 container">
      {/* Profile Form */}
      <ProfileForm initialData={userData} />
    </div>
  );
}
