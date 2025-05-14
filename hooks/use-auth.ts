import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DUMMY_USER = {
  email: "demo@sellora.com",
  password: "1234",
};

export const useLogin = () => {
  const { setAuth, setLoading } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      await new Promise((r) => setTimeout(r, 500)); // fake latency

      if (
        payload.email === DUMMY_USER.email &&
        payload.password === DUMMY_USER.password
      ) {
        return { email: DUMMY_USER.email };
      }
      throw new Error("Invalid credentials");
    },
    onMutate: () => setLoading(true),
    onSuccess: (user: any) => {
      setAuth(user);
      router.push("/dashboard");
      toast.success("Logged in successfully");
    },
    onError: (err: unknown) => {
      toast.error(
        err instanceof Error ? err.message : "Login failed, try again"
      );
    },
    onSettled: () => setLoading(false),
  });
};

export const useLogout = () => {
  const logout = useAuthStore((s: any) => s.logout);
  return () => {
    logout();
    toast.success("Logged out");
  };
};
