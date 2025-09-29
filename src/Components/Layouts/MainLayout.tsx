import Header from "./Header";
import Footer from "./Footer";
import "./MainLayout.css"

interface MainLayoutProps {
  children: React.ReactNode;
  background?: string;
}

export default function MainLayout({ children}: MainLayoutProps) {
  return (
    <div>
      <Header  />
      <main >{children}</main>
      <Footer />
    </div>
  );
}