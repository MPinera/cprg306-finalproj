import "./globals.css";
import { ThemeProvider } from "./weatheria/components/theme";

export const metadata = {
  title: "Weather ForeCast",
  description: "Web Development 2 Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900 transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
