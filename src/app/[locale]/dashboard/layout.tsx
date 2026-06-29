import Sidebar from "@/components/layout/dashboard/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: LayoutProps) {
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
