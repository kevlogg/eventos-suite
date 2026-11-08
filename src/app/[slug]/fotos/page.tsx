import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events-service";
import PhotoUploadClient from "./PhotoUploadClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Fotos no encontradas" };

  return {
    title: `Subir Fotos - ${event.title}`,
    description: `Compartí tus fotos en vivo para proyectarlas en la pantalla de ${event.title}.`,
  };
}

export default async function EventFotosPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event || !event.enabledModules.fotos) {
    notFound();
  }

  return <PhotoUploadClient event={event} />;
}
