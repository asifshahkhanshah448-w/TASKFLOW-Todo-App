import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TASKFLOW - Organize Your Day. Own Your Goals.',
  description: 'Organize Your Day. Own Your Goals. A sleek, modern To-Do list web application built with HTML5, CSS3, and Vanilla JavaScript.',
  openGraph: {
    title: 'TASKFLOW - Organize Your Day. Own Your Goals.',
    description: 'Organize Your Day. Own Your Goals. A sleek, modern To-Do list web application built with HTML5, CSS3, and Vanilla JavaScript.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TASKFLOW - Organize Your Day. Own Your Goals.',
    description: 'Organize Your Day. Own Your Goals. A sleek, modern To-Do list web application built with HTML5, CSS3, and Vanilla JavaScript.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
