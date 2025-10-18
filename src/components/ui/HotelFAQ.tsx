// ============================================
// Компонент: HotelFAQ
// Опис: Відображає розділ поширених запитань (FAQ)
// ============================================

import React from 'react';
import { HotelView } from '../../models/HotelView';
import './HotelFAQ.css';

interface Props {
  hotel: HotelView;
}

const HotelFAQ: React.FC<Props> = ({ hotel }) => {
  const faqList = [
    { q: 'Сommon question', a: 'Answer.' },
    { q: 'Сommon question', a: 'Answer.' },
    { q: 'Сommon question', a: 'Answer.' },
  ];

  return (
    <section className="faq-section">
      {/* Ліва частина — заголовок */}
      <div className="faq-left">FAQs</div>

      {/* Права частина — перелік запитань */}
      <div className="faq-right">
        {faqList.map((item, idx) => (
          <details key={idx} className="faq-item">
            <summary className="faq-question">
              <span>{item.q}</span>
              <img src="/icons/ui/back.svg" alt="expand" className="faq-icon" />
            </summary>
            <p className="faq-answer">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default HotelFAQ;