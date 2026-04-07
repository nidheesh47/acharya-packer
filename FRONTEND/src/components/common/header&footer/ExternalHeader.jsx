import { NavLink, useLocation } from "react-router";
import { useEffect, useState, useRef } from "react";
import {
  Package,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  UserCog,
  ListOrdered,
  Scan,
  Key,
  BarChart,
  Calendar,
  PlusCircle,
  ShoppingCart,
  LayoutDashboard,
  Plus,
  User as UserIcon,
  Maximize2,
  Minimize2,
} from "lucide-react";

export default function AdminHeader({
  sidebarCollapsed,
  setSidebarCollapsed,
  isMobile,
  mobileMenuOpen,
  toggleMobileMenu,
}) {
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Define paths where header should be hidden
  const hideHeaderPaths = [
    "/user/login",
    "/packing/order/scan/page",
    "/app/overallstatus",
    "/app",
    "/test",
  ];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  // Fullscreen functionality
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    setToken(storedToken);

    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);
        setRole(parsed.role);
        setAdminName(parsed.name || parsed.email?.split("@")[0] || "User");
      } catch {
        setRole(null);
        setAdminName("");
      }
    }
  }, []);

  // Handle body scroll when mobile sidebar is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (mobileMenuOpen) {
      document.body.classList.add("mobile-sidebar-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("mobile-sidebar-open");
      document.body.style.overflow = originalOverflow || "unset";
    }

    return () => {
      document.body.classList.remove("mobile-sidebar-open");
      document.body.style.overflow = originalOverflow || "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin");
    window.location.href = "/user/login";
  };

  const logisticsMenu = ["admin", "logistics"].includes(role)
    ? [
        {
          to: "/order/all",
          label: "All Orders",
          icon: <ShoppingCart className="w-5 h-5" />,
        },
        {
          to: "/sku-pending-summary",
          label: "Pick & Pack Summary",
          icon: <Package className="w-5 h-5" />,
        },
        {
          to: "/order/manual-add",
          label: "Create Order",
          icon: <Plus className="w-5 h-5" />,
        },
        {
          to: "/orders/bulk-import",
          label: "Order Import",
          icon: <PlusCircle className="w-5 h-5" />,
        },
        {
          to: "/all/sku/list",
          label: "All SKU List",
          icon: <ListOrdered className="w-5 h-5" />,
        },
        ...(role === "logistics"
          ? [
              {
                to: "/order/stats/dashboard",
                label: "Order Overview",
                icon: <BarChart className="w-5 h-5" />,
              },
            ]
          : []),
        {
          to: "/admin/list",
          label: "Access",
          icon: <UserCog className="w-5 h-5" />,
        },
      ]
    : [];

  const packingMenu = ["admin", "logistics", "packing"].includes(role)
    ? [
        ...(role === "packing"
          ? [
              {
                to: "/packing/order/scan/page",
                label: "Order Scan",
                icon: <Scan className="w-5 h-5" />,
              },
              {
                to: "/packing/my/status",
                label: "My Status",
                icon: <Calendar className="w-5 h-5" />,
              },
              {
                to: "/user/password/update",
                label: "Change Password",
                icon: <Key className="w-5 h-5" />,
              },
            ]
          : []),
        ...(role === "admin" || role === "logistics"
          ? [
              {
                to: "/packing/total/status",
                label: "Total Status",
                icon: <BarChart className="w-5 h-5" />,
              },
              {
                to: "/packing/daily/status",
                label: "Daily Status",
                icon: <Calendar className="w-5 h-5" />,
              },
            ]
          : []),
      ]
    : [];

  if (shouldHideHeader) {
    return null;
  }

  const isSidebarExpanded =
    !sidebarCollapsed || (sidebarCollapsed && isHovered);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Package className="w-5 h-5" />
              </div>
              <h1 className="font-bold text-lg">PackScan</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Fullscreen Button - Mobile */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
            {token && (
              <>
                <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${role === "admin" ? "bg-purple-400" : role === "logistics" ? "bg-blue-400" : "bg-emerald-400"}`}
                  ></div>
                  <span className="text-xs font-medium capitalize">{role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleMobileMenu}
          aria-label="Close sidebar"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full z-50 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-80`}
        aria-label="Mobile navigation"
      >
        <div className="relative h-full flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-b-3xl"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-white">PackScan</h1>
                  <p className="text-xs text-blue-100">Enterprise Edition</p>
                </div>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* User Profile */}
            {token && (
              <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">
                      {adminName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${role === "admin" ? "bg-purple-400" : role === "logistics" ? "bg-blue-400" : "bg-emerald-400"}`}
                      ></div>
                      <p className="text-xs text-blue-200 capitalize truncate">
                        {role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-20">
            <nav className="space-y-1">
              {/* Dashboard Link */}
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
                onClick={toggleMobileMenu}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </NavLink>

              {/* Logistics Menu Section */}
              {logisticsMenu.length > 0 && (
                <div className="pt-4">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Order Management
                  </p>
                  {logisticsMenu.map((i) => (
                    <NavLink
                      key={i.to}
                      to={i.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium shadow-sm"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                      onClick={toggleMobileMenu}
                    >
                      {i.icon}
                      <span>{i.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}

              {/* Packing Menu Section */}
              {packingMenu.length > 0 && (
                <div className="pt-4">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Packing Operations
                  </p>
                  {packingMenu.map((i) => (
                    <NavLink
                      key={i.to}
                      to={i.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium shadow-sm"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                      onClick={toggleMobileMenu}
                    >
                      {i.icon}
                      <span>{i.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </nav>
          </div>

          {/* Logout Button */}
          {token && (
            <div className="sticky bottom-0 p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        onMouseEnter={() => sidebarCollapsed && setIsHovered(true)}
        onMouseLeave={() => sidebarCollapsed && setIsHovered(false)}
        className={`hidden md:flex fixed h-full z-30 flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 shadow-xl`}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div
          className={`relative p-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 ${isSidebarExpanded ? "" : "flex justify-center"}`}
        >
          {isSidebarExpanded ? (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h1 className="font-bold text-lg text-white">PackScan</h1>
              </div>
              {role && (
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${role === "admin" ? "bg-purple-400" : role === "logistics" ? "bg-blue-400" : "bg-emerald-400"}`}
                  ></div>
                  <p className="text-xs text-blue-100 capitalize">{role}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 ${
              isSidebarExpanded ? "block" : "block"
            }`}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* User Profile */}
        {token && isSidebarExpanded && (
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  {adminName}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Dashboard Link */}
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center ${isSidebarExpanded ? "px-4" : "justify-center px-2"} py-3 mb-1 text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-r-2 border-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <LayoutDashboard
              className={`w-5 h-5 ${isSidebarExpanded ? "mx-3" : ""}`}
            />
            {isSidebarExpanded && <span>Dashboard</span>}
          </NavLink>

          {/* Logistics Menu */}
          {logisticsMenu.length > 0 && isSidebarExpanded && (
            <div className="mt-4 px-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Order Management
              </p>
              {logisticsMenu.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  {i.icon}
                  <span>{i.label}</span>
                </NavLink>
              ))}
            </div>
          )}

          {/* Packing Menu */}
          {packingMenu.length > 0 && isSidebarExpanded && (
            <div className="mt-4 px-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Packing Operations
              </p>
              {packingMenu.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  {i.icon}
                  <span>{i.label}</span>
                </NavLink>
              ))}
            </div>
          )}

          {/* Collapsed View Icons */}
          {!isSidebarExpanded && (
            <div className="space-y-1 px-2">
              {logisticsMenu.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  className={({ isActive }) =>
                    `flex items-center justify-center p-3 my-1 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                  title={i.label}
                >
                  {i.icon}
                </NavLink>
              ))}
              {packingMenu.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  className={({ isActive }) =>
                    `flex items-center justify-center p-3 my-1 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                  title={i.label}
                >
                  {i.icon}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Fullscreen and Logout */}
        <div
          className={`p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white space-y-2 ${isSidebarExpanded ? "" : "flex flex-col items-center"}`}
        >
          {/* Fullscreen Button - Desktop */}
          <button
            onClick={toggleFullscreen}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 ${
              isSidebarExpanded ? "w-full" : "w-10 h-10 p-0"
            }`}
            title={
              !isSidebarExpanded
                ? isFullscreen
                  ? "Exit fullscreen"
                  : "Enter fullscreen"
                : ""
            }
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
            {isSidebarExpanded && (
              <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
            )}
          </button>

          {/* Logout Button */}
          {token && (
            <button
              onClick={handleLogout}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 ${
                isSidebarExpanded ? "w-full" : "w-10 h-10 p-0"
              }`}
              title={!isSidebarExpanded ? "Logout" : ""}
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
              {isSidebarExpanded && <span>Logout</span>}
            </button>
          )}
        </div>
      </aside>

      <style jsx>{`
        @media (max-width: 640px) {
          button,
          [role="button"] {
            min-height: 44px;
          }
        }
      `}</style>
    </>
  );
}
