import { Outlet, useLocation } from "react-router";
import ExternalFooter from "../components/common/header&footer/ExternalFooter";
import AdminSidebar from "../components/common/header&footer/ExternalHeader";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check if current path is login page
  const isLoginPage = location.pathname === "/user/login";

  // Check if path should hide header
  const hideHeaderPaths = [
    "/user/login",
    "/packing/order/scan/page",
    "/app/overallstatus",
    "/app",
    "/test",
  ];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  // Check mobile screen and load saved sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState));
    }

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Handle body scroll when mobile sidebar is open - FIXED VERSION
  useEffect(() => {
    // Store original overflow value
    const originalOverflow = document.body.style.overflow;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    // Cleanup function
    return () => {
      // Only restore if we actually changed it
      if (mobileMenuOpen) {
        document.body.style.overflow = originalOverflow || "unset";
      }
    };
  }, [mobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // ✅ Login page (no sidebar / footer)
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="w-full">{children || <Outlet />}</main>
      </div>
    );
  }

  // If header should be hidden, render without sidebar
  if (shouldHideHeader) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="w-full">{children || <Outlet />}</main>
        <ExternalFooter />
      </div>
    );
  }

  // Calculate main content margin based on sidebar state
  const getMainMargin = () => {
    if (isMobile) return 0;
    return sidebarCollapsed ? "ml-20" : "ml-64";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header - Only visible on mobile when sidebar is not hidden */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 h-16">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
      )}

      {/* Main layout with sidebar */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <AdminSidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        {/* Overlay for mobile sidebar */}
        {isMobile && mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Main content area */}
        <main
          className={`
            flex-1 
            bg-gray-50 
            overflow-auto
            transition-all 
            duration-300 
            ease-in-out
            ${getMainMargin()}
            ${isMobile ? "mt-16" : ""}
          `}
        >
          {/* Removed all padding and spacing - content goes edge to edge */}
          <div className="w-full">{children || <Outlet />}</div>

          {/* Footer */}
          <ExternalFooter />
        </main>
      </div>
    </div>
  );
}
