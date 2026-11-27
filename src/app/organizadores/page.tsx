import { Metadata } from "next";
import OrganizadoresClient from "./OrganizadoresClient";

export const metadata: Metadata = {
  title: "Alianzas para Salones & Event Planners | Eventos Kronitt",
  description:
    "Sumá tecnología interactiva en vivo a tus eventos: invitaciones digitales con sobre 3D, trivia en pantallas gigantes y mural de fotos rotativo por QR. Comisiones de hasta el 20% y tarifas mayoristas para salones.",
};

export default function OrganizadoresPage() {
  return <OrganizadoresClient />;
}
