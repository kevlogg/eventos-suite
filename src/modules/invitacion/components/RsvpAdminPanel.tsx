"use client";

import { useEffect, useState } from "react";
import { SuiteEvent, RSVP } from "@/types";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Utensils, 
  MessageSquare, 
  Download, 
  Search,
  RefreshCw
} from "lucide-react";

interface Props {
  event: SuiteEvent;
}

export default function RsvpAdminPanel({ event }: Props) {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadRsvps() {
    setLoading(true);
    try {
      const res = await fetch(`/api/rsvp?eventId=${event.id}`);
      const data = await res.json();
      if (data.rsvps) {
        setRsvps(data.rsvps);
      }
    } catch (err) {
      console.error("Error loading rsvps:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRsvps();
  }, [event.id]);

  const attendingRsvps = rsvps.filter((r) => r.attending);
  const nonAttendingRsvps = rsvps.filter((r) => !r.attending);
  const totalAttendingGuests = attendingRsvps.reduce(
    (acc, curr) => acc + 1 + (curr.companionsCount || 0),
    0
  );
  const dietaryCount = attendingRsvps.filter((r) => r.dietaryRestrictions && r.dietaryRestrictions.trim().length > 0).length;

  const filtered = rsvps.filter(
    (r) =>
      r.guestName.toLowerCase().includes(search.toLowerCase()) ||
      (r.companionNames && r.companionNames.toLowerCase().includes(search.toLowerCase())) ||
      (r.dietaryRestrictions && r.dietaryRestrictions.toLowerCase().includes(search.toLowerCase()))
  );

  function exportCsv() {
    const headers = ["Nombre", "Asiste", "Acompañantes", "Nombres Acompañantes", "Restricción Alimentaria", "Mensaje", "Fecha"];
    const rows = rsvps.map((r) => [
      `"${r.guestName.replace(/"/g, '""')}"`,
      r.attending ? "SI" : "NO",
      r.companionsCount || 0,
      `"${(r.companionNames || "").replace(/"/g, '""')}"`,
      `"${(r.dietaryRestrictions || "").replace(/"/g, '""')}"`,
      `"${(r.message || "").replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString("es-AR")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `rsvps_${event.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Invitados & Confirmaciones (RSVP)</h2>
          <p className="text-xs text-slate-400 mt-0.5">Control en tiempo real de los asistentes a la fiesta.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadRsvps()}
            disabled={loading}
            className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl transition-colors cursor-pointer"
            title="Actualizar lista"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-indigo-400" : ""}`} />
          </button>

          <button
            onClick={exportCsv}
            className="px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Total Confirmados</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalAttendingGuests}</div>
          <span className="text-[11px] text-slate-500">{attendingRsvps.length} respuestas afirmativas</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <UserX className="w-4 h-4 text-rose-400" />
            <span>No Asisten</span>
          </div>
          <div className="text-2xl font-bold text-white">{nonAttendingRsvps.length}</div>
          <span className="text-[11px] text-slate-500">invitados declinaron</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>Menús Especiales</span>
          </div>
          <div className="text-2xl font-bold text-white">{dietaryCount}</div>
          <span className="text-[11px] text-slate-500">celíacos / veganos / otros</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Respuestas Totales</span>
          </div>
          <div className="text-2xl font-bold text-white">{rsvps.length}</div>
          <span className="text-[11px] text-slate-500">enviadas al sistema</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, acompañante o restricción alimentaria..."
          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
      </div>

      {/* Guests Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Invitado</th>
                <th className="py-3 px-4">Asistencia</th>
                <th className="py-3 px-4">Acompañantes</th>
                <th className="py-3 px-4">Menú Especial</th>
                <th className="py-3 px-4">Mensaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                    {search ? "No se encontraron coincidencias." : "Aún no hay respuestas registradas."}
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">
                      {r.guestName}
                    </td>
                    <td className="py-3 px-4">
                      {r.attending ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                          Confirmó
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
                          No asiste
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {r.companionsCount > 0 ? (
                        <div>
                          <span className="font-semibold text-white">+{r.companionsCount}</span>
                          {r.companionNames && (
                            <span className="text-slate-400 block text-xs">({r.companionNames})</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500">Solo</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {r.dietaryRestrictions ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium">
                          {r.dietaryRestrictions}
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-xs max-w-xs truncate" title={r.message}>
                      {r.message ? (
                        <span className="italic flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{r.message}</span>
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

