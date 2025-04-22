import "./globals.css";

export const metadata = {
  title: "Weather ForeCast",
  description: "Web Development 2 Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
