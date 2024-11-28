import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vercel.svg" />
        <title>CS Data Entry Tool</title>
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
