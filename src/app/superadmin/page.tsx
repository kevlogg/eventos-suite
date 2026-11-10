import { redirect } from "next/navigation";
import { isSuperadminAuthenticated, setSuperadminSession, timingSafePasswordCheck } from "@/lib/auth";
import { getAllEvents } from "@/lib/events-service";
import { getAllInvitations } from "@/modules/invitacion/services/invitation-service";
import type { InvitationRecord } from "@/lib/schemas/invitation.schema";
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

  const [events, allInvitations] = await Promise.all([
    getAllEvents(),
    getAllInvitations(),
  ]);

  const invitationsMap: Record<string, InvitationRecord> = {};
  for (const inv of allInvitations) {
    if (inv.slug) invitationsMap[inv.slug.toLowerCase()] = inv;
    if ((inv as any).eventId) invitationsMap[(inv as any).eventId] = inv;
    if (inv.id) invitationsMap[inv.id] = inv;
  }

  return <SuperAdminDashboard events={events} invitationsMap={invitationsMap} />;
}

