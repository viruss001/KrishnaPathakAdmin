"use client";

import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Home Section" },
    { href: "/dashboard/analytics", label: "Analytics" },
    { href: "/dashboard/blog", label: "Blogs Section" },
    { href: "/dashboard/price", label: "Price Section" },
    { href: "/dashboard/policy", label: "Policy Section" },
    { href: "/dashboard/contactUsdata", label: "Contact-us Section" },
    { href: "/dashboard/deletedUserdata", label: "Deleted User Section" },
    { href: "/dashboard/studykitDownloaders", label: "Studykit downloaded data" },
  ];

  return (
    <aside className="w-64 bg-[#0B2545] text-white rounded-r-2xl p-4 flex flex-col sticky top-0 h-screen">
      <h1 className="text-lg font-bold mb-8">Krishna Kumar Pathak</h1>

      <nav className="flex flex-col gap-4 flex-1">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={`p-2 rounded-lg font-semibold transition-colors duration-200 ${
              pathname === href
                ? "bg-blue-900"
                : "hover:bg-blue-900 text-gray-200"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => alert("Logging out...")}
        className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded-lg font-semibold transition-colors duration-200"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
