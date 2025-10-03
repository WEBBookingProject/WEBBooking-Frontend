// ============================================
// Файл: src/components/layouts/MainLayout.tsx
// Компонент: MainLayout
// Використовується: обгортка для сторінок Home, Search
// Опис: Основний лейаут сайту з Header, Footer та головним контентом
// ============================================

import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  background?: string;
}

export default function MainLayout({ children, background }: MainLayoutProps) {
  return (
    <div className="main-layout">
      {/* Верхній блок: Header з опційним фоном */}
      <Header bgImage={background} />

      {/* Основний контент сторінки */}
      <main>{children}</main>

      {/* Нижній блок: Footer */}
      <Footer />
    </div>
  );
}
