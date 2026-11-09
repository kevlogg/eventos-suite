import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events-service";
import TvTriviaClient from "./TvTriviaClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "TV Trivia no encontrada" };

  return {
    title: `Pantalla TV Trivia - ${event.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function EventTvTriviaPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event || !event.enabledModules.trivia) {
    notFound();
  }

  return <TvTriviaClient event={event} />;
}

