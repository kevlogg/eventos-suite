import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events-service";
import TriviaPlayerClient from "./TriviaPlayerClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Trivia no encontrada" };

  return {
    title: `Trivia en Vivo - ${event.title}`,
    description: `Participá en la trivia en vivo de ${event.title} desde tu celular.`,
  };
}

export default async function EventTriviaPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event || !event.enabledModules.trivia) {
    notFound();
  }

  return <TriviaPlayerClient event={event} />;
}
