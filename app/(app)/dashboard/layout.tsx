import { withAuthGuard } from "@/hoc/with-auth-guard";
import DashboardLayout from "@/layouts/dashboard-layout";

export default withAuthGuard(DashboardLayout);
