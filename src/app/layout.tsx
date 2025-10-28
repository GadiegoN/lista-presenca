import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

export const metadata = {
  title: "Lista de Presença",
  description: "Sistema de presenças com Next.js + Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
