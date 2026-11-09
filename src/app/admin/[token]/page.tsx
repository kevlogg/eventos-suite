import { notFound } from "next/navigation";
import { getEventByToken } from "@/lib/events-service";
import OrganizerDashboard from "./OrganizerDashboard";

interface PageProps {
  params: Promise<{ token: string }>;
}

export const dynamic = "force-dynamic";

export default async function AdminEventPage({ params }: PageProps) {
  const { token } = await params;
  const event = await getEventByToken(token);

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4">
            ⚠️
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Acceso no válido</h1>
          <p className="text-sm text-slate-400 mb-6">
            El enlace o token de organizador no corresponde a ningún evento activo. Verificá el link provisto por tu coordinador.
          </p>
        </div>
      </div>
    );
  }

  return <OrganizerDashboard event={event} />;
}

