import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

const AdminPage = async () => {
  if (!(await isAdmin())) {
    return redirect("/");
  }

  const Admin = dynamic(() => import("@/components/admin/MainAdmin"));

  return <Admin />;
};

export default AdminPage;
