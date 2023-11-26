import './globals.css'
import { Header } from '@/components/globals/Header'
import { GeistSans } from "geist/font/sans";
import { Footer } from '@/components/globals/Footer';

export const metadata = {
  title: 'gymrat',
  description: 'myfitrainer is a free workout tracker & planner. Build your routines and track your progress.',
}
const addClarityScriptToHead = () => {
  const clarityScript = `
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "jwq9tl681c");
  `;

  return {
    __html: clarityScript,
  };
};

export default function RootLayout({ children }) {
  const clarityScript = addClarityScriptToHead();
  return (
    <html lang="en">
      <head>
      <script dangerouslySetInnerHTML={clarityScript} />
      </head>
      <body className={GeistSans.className}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
    
  )
}
