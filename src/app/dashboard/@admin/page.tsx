import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import Loading from "@/components/loading";
import React, { Suspense } from "react";

const AdminDashboardPage = () => {
  // const isTenantSet = cookies().has("tenant");
  // console.log(isTenantSet);
  return (
    <Suspense fallback={<Loading />}>
      
      <AdminDashboard />
    </Suspense>
  );
};

export default AdminDashboardPage;
