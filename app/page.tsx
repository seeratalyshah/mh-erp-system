// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/sign-in");        // ⬅ instant, server-side redirect
}
