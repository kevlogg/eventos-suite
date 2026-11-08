export type EventModule = "invitacion" | "trivia" | "fotos";

export interface EnabledModules {
  invitacion: boolean;
  trivia: boolean;
  fotos: boolean;
}

export interface SuiteEvent {
  id: string;
  slug: string; // e.g. "casamiento-lucas-y-flor"
  title: string; // e.g. "Lucas & Flor - Nuestro Casamiento"
  date: string;
  location?: string;
  adminToken: string; // Secret token for organizer panel access: /admin/[token]
  enabledModules: EnabledModules;
  createdAt: string;
  updatedAt: string;
}

// RSVP / Invitación types
export interface RSVP {
  id: string;
  eventId: string;
  guestName: string;
  attending: boolean;
  companionsCount: number;
  companionNames?: string;
  dietaryRestrictions?: string;
  message?: string;
  createdAt: string;
}

// Trivia types
export interface TriviaQuestion {
  id: number;
  eventId: string;
  orderNum: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TriviaPlayer {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  score: number;
  totalTimeMs: number;
  isFinished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Fotos QR types
export interface EventPhoto {
  id: string;
  eventId: string;
  photoUrl: string;
  authorName: string;
  tableNumber?: number;
  caption?: string;
  approved: boolean;
  createdAt: string;
}
