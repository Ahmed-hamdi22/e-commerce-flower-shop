import Sidebar from "@/components/layout/dashboard/sidebar";
import getToken from "@/lib/utils/get-token";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function DashboardLayout({ children, params }: LayoutProps) {
  const token = await getToken();

  if (!token) {
    redirect(`/${params.locale}`);
  }

  return (
    <div className="min-h-screen overflow-x-hidden lg:flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="w-full pt-16 lg:ml-72 lg:pt-0 rtl:lg:ml-0 rtl:lg:mr-72">
        {/* Content */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
