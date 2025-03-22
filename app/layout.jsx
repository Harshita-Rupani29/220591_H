import "./styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
