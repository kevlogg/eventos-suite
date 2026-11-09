import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events-service";
import LiveMuralClient from "./LiveMuralClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Mural no encontrado" };

  return {
    title: `Mural de Fotos en Vivo - ${event.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function EventLiveMuralPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event || !event.enabledModules.fotos) {
    notFound();
  }

  return <LiveMuralClient event={event} />;
}

