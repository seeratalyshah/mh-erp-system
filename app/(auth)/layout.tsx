import { withGuestGuard } from "@/hoc/with-guest-guard";
import AuthLayout from "@/layouts/auth-layout";

export default withGuestGuard(AuthLayout);
