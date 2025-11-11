import Sidebar from '../../../component/Sidebar';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6  min-h-screen">
        {children}
      </main>
    </div>
  );
}
