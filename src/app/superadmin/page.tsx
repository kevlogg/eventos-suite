import { redirect } from "next/navigation";
import { isSuperadminAuthenticated, setSuperadminSession, timingSafePasswordCheck } from "@/lib/auth";
import { getAllEvents } from "@/lib/events-service";
import SuperAdminLoginForm from "./SuperAdminLoginForm";
import SuperAdminDashboard from "./SuperAdminDashboard";

export const dynamic = "force-dynamic";

interface SuperAdminPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SuperAdminPage({ searchParams }: SuperAdminPageProps) {
  const isAuth = await isSuperadminAuthenticated();

  if (!isAuth) {
    const params = await searchParams;
    const providedKey = Array.isArray(params.key) ? params.key[0] : params.key;

    if (providedKey && timingSafePasswordCheck(providedKey)) {
      await setSuperadminSession();
      redirect("/superadmin");
    }

    return <SuperAdminLoginForm />;
  }

  const events = await getAllEvents();

  return <SuperAdminDashboard events={events} />;
}

