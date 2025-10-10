// ============================================
// Файл: src/components/layouts/MainLayout.tsx
// Компонент: MainLayout
// Використовується: обгортка для сторінок 
// Опис: Основний лейаут сайту з Header, Footer та головним контентом
// ============================================

import Header from "./HeaderDetails";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  background?: string;
}

export default function MainLayout({ children, background }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}