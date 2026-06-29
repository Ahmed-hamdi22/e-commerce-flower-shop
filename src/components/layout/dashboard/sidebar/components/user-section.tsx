import ProfileIcon from "@/components/common/profile-icon";
import { getUniqueBgColor } from "@/lib/utils/dashboard/get-unique-bg-color";
import Image from "next/image";
import React from "react";
import { LuEllipsisVertical } from "react-icons/lu";

export default function UserSection({ userData }: { userData?: User }) {
  // Variables
  const avatarColor = getUniqueBgColor(userData?._id);
  const userInitial = userData?.firstName?.[0]?.toUpperCase();

  return (
    <div className="h-16 w-full border-t pt-4 flex items-center justify-between lg:w-60">
      <div className="flex min-w-0 justify-center items-center">
        {/* Profile picture */}
        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
          {userData?.photo ? (
            <Image
              src={userData.photo}
              alt="User profile"
              width={54}
              height={54}
              className="object-cover w-full h-full"
            />
          ) : (
            <div
              className="w-full h-full rounded-full flex items-center justify-center "
              style={{ backgroundColor: avatarColor }}
            >
              <span className="text-white text-xl font-bold">{userInitial}</span>
            </div>
          )}
        </div>

        {/* User data */}
        <div className="ml-2 min-w-0 flex-1 lg:w-32">
          {/* Name */}
          <p className="text-sm font-bold truncate capitalize">
            {userData?.firstName} {userData?.lastName}
          </p>

          {/* Email */}
          <p className="text-xs text-custom-black/50 font-semibold break-all">{userData?.email}</p>
        </div>
      </div>

      {/* Profile menu */}
      <ProfileIcon
        icon={<LuEllipsisVertical className="text-custom-black/50" />}
        links={[{ href: "/profile", label: "profile" }]}
        showSignOut={true}
      />
    </div>
  );
}
