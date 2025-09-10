import ReduxProvider from "@/components/ReduxProvider";
import Header from "@/components/Header";
import './globals.css'


export const metadata = {
  title: 'My Pharmacy App',
  description: 'Built with Next.js, Redux, and Prisma',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ReduxProvider>
          <Header />
          <main className="p-6">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}