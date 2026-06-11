import type { Metadata } from 'next';
import './globals.css';
import './styles/home-auth.css';
import './styles/my-fan-clubs.css';
import './styles/fan-clubs.css';
import './styles/chat.css';

export const metadata: Metadata = {
  title: 'LunarFan',
  description: 'LunarFan fan-creator interaction platform homepage'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
