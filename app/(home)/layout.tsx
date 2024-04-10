export const metadata = {
  title: "간편 병역신체검사",
  description: "Military physical examinataion",
  image: "https://military-phyisical-exam.pages.dev/assets/grade4_2/5.webp",
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
