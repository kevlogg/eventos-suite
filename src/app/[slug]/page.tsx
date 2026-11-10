import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events-service";
import { getInvitationBySlug, createDefaultInvitationFromEvent } from "@/modules/invitacion/services/invitation-service";
import GuestPortalClient from "./GuestPortalClient";
import InvitationView from "@/components/invitation/InvitationView";
import EventPartyFloatingBar from "@/components/invitation/EventPartyFloatingBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Evento no encontrado" };

  const invitation = await getInvitationBySlug(slug);
  if (invitation) {
    return {
      title: invitation.headline || `${event.title} - Invitación`,
      description: invitation.subheadline || `Te invitamos a ser parte de ${event.title}.`,
    };
  }

  return {
    title: `${event.title} - Invitación y Fiesta`,
    description: `Te invitamos a ser parte de ${event.title}. Confirmá tu asistencia y disfrutá de la fiesta.`,
  };
}

export default async function EventGuestPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // If the invitation module is active, render the full thematic invitation template
  if (event.enabledModules.invitacion) {
    let invitation = await getInvitationBySlug(slug);
    if (!invitation) {
      invitation = createDefaultInvitationFromEvent(event);
    }

    return (
      <div className="relative w-full min-h-screen">
        <InvitationView invitation={invitation} />
        <EventPartyFloatingBar event={event} />
      </div>
    );
  }

  // Fallback to guest activity portal if invitation module is disabled
  return <GuestPortalClient event={event} />;
}


