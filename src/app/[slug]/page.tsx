import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events-service";
import GuestPortalClient from "./GuestPortalClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Evento no encontrado" };

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

  return <GuestPortalClient event={event} />;
}
