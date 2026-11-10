import { NextRequest, NextResponse } from "next/server";
import { EVENT_DATA } from "@/config/event";
import { getInvitationBySlug } from "@/modules/invitacion/services/invitation-service";

function formatIcsLocalDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function formatIcsUtc(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  let invitation = null;
  if (slug) {
    invitation = await getInvitationBySlug(slug);
  }

  const targetDateStr = invitation?.targetDate || EVENT_DATA.targetDate;
  const headline = invitation?.headline || EVENT_DATA.headline;
  const subheadline = invitation?.subheadline || EVENT_DATA.subheadline;
  const venueName = invitation?.venueName || EVENT_DATA.venue.name;
  const venueAddress = invitation?.venueAddress || EVENT_DATA.venue.address;
  const personName = invitation?.personName || EVENT_DATA.personName;
  const fileSlug = invitation?.slug || "evento";

  const startDate = new Date(targetDateStr);
  const isValidDate = !isNaN(startDate.getTime());
  const actualStart = isValidDate ? startDate : new Date();
  const actualEnd = new Date(actualStart.getTime() + 4 * 60 * 60 * 1000); // +4 hours

  const dtStart = formatIcsLocalDate(actualStart);
  const dtEnd = formatIcsLocalDate(actualEnd);
  const now = formatIcsUtc(new Date());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invitacion Digital//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:America/Argentina/Buenos_Aires",
    "X-LIC-LOCATION:America/Argentina/Buenos_Aires",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:-0300",
    "TZOFFSETTO:-0300",
    "TZNAME:-03",
    "DTSTART:19700101T000000",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${fileSlug}-${now}@invitaciondigital.app`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=America/Argentina/Buenos_Aires:${dtStart}`,
    `DTEND;TZID=America/Argentina/Buenos_Aires:${dtEnd}`,
    `SUMMARY:${escapeIcsText(headline)}`,
    `DESCRIPTION:${escapeIcsText(subheadline)}`,
    `LOCATION:${escapeIcsText(`${venueName}, ${venueAddress}`)}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Mañana es el evento de ${personName}! 🎉`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileSlug}.ics"`,
      "Cache-Control": "no-cache",
    },
  });
}
