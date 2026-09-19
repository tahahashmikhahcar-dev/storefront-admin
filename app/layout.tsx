import "./globals.css";

export const metadata = {
  title: "NovaCart",
  description: "Modern storefront with admin dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
