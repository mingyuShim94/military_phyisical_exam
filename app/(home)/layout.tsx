export const metadata = {
  title: "간편 병역신체검사",
  description: "Military physical examinataion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
