import { Metadata } from "next";
import OrganizadoresClient from "./OrganizadoresClient";

export const metadata: Metadata = {
  title: "Tecnología Interactiva para Fiestas y Eventos | Salones y Organizadores | Eventos Kronitt",
  description:
    "Sumá tecnología interactiva en vivo a tus fiestas: invitaciones 3D, trivia en pantallas gigantes y mural de fotos por QR. Cero descargas, llave en mano para salones y escala mayorista por volumen.",
};

export default function OrganizadoresPage() {
  return <OrganizadoresClient />;
}
