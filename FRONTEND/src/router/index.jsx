import { createBrowserRouter } from "react-router";
import AdminLayout from "../layout/AdminLayout.jsx";
import AdminDashboard from "../pages/DashBoard/AdminDashboard.jsx";
import NotFound from "../pages/error/NotFound.jsx";

// Import all pages
import AdminList from "../pages/admin.list.jsx";
import AllSkuList from "../pages/all.sku.list.jsx";
import CreateSku from "../pages/create.sku.jsx";
import LogisticsSignup from "../pages/logistics.signup.jsx";
import OrderAll from "../pages/order.all.jsx";
import OrderManualAdd from "../pages/order.manual-add.jsx";
import OrderScanPage from "../pages/order.scan.page.jsx";
import OrderStatsDashboard from "../pages/order.stats.dashboard.jsx";
import OrdersBulkImport from "../pages/orders.bulk-import.jsx";
import PackingDailyStatus from "../pages/packing.daily.status.jsx";
import PackingMyStatus from "../pages/packing.my.status.jsx";
import PackingOrderScanPage from "../pages/packing.order.scan.page.jsx";
import PackingSignup from "../pages/packing.signup.jsx";
import PackingTotalStatus from "../pages/packing.total.status.jsx";
import SkuPendingSummary from "../pages/sku-pending-summary.jsx";
import SkuBulkImport from "../pages/sku.bulk-import.jsx";
import Unauthorized from "../pages/unauthorized.jsx";
import UserLogin from "../pages/user.login.jsx";
import UserPasswordUpdate from "../pages/user.password.update.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "app",
        element: <AdminDashboard />,
      },
      {
        path: "admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "user/login",
        element: <UserLogin />,
      },
      {
        path: "admin/list",
        element: <AdminList />,
      },
      {
        path: "all/sku/list",
        element: <AllSkuList />,
      },
      {
        path: "create/sku",
        element: <CreateSku />,
      },
      {
        path: "logistics/signup",
        element: <LogisticsSignup />,
      },
      {
        path: "order/all",
        element: <OrderAll />,
      },
      {
        path: "order/manual-add",
        element: <OrderManualAdd />,
      },
      {
        path: "order/scan",
        element: <OrderScanPage />,
      },
      {
        path: "order/stats/dashboard",
        element: <OrderStatsDashboard />,
      },
      {
        path: "orders/bulk-import",
        element: <OrdersBulkImport />,
      },
      {
        path: "packing/daily/status",
        element: <PackingDailyStatus />,
      },
      {
        path: "packing/my/status",
        element: <PackingMyStatus />,
      },
      {
        path: "packing/order/scan/page",
        element: <PackingOrderScanPage />,
      },
      {
        path: "packing/signup",
        element: <PackingSignup />,
      },
      {
        path: "packing/total/status",
        element: <PackingTotalStatus />,
      },
      {
        path: "sku-pending-summary",
        element: <SkuPendingSummary />,
      },
      {
        path: "sku/bulk-import",
        element: <SkuBulkImport />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "user/password/update",
        element: <UserPasswordUpdate />,
      },
      // The "Catch-all" 404 route inside the layout
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
