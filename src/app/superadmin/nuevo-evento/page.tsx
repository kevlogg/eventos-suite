import { redirect } from "next/navigation";
import { isSuperadminAuthenticated } from "@/lib/auth";
import NuevoEventoClient from "./NuevoEventoClient";

export const dynamic = "force-dynamic";

export default async function NuevoEventoPage() {
  const isAuth = await isSuperadminAuthenticated();
  if (!isAuth) {
    redirect("/superadmin");
  }

  return <NuevoEventoClient />;
}

