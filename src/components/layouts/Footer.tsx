// ============================================
// Компонент: Footer
// Використовується: на MainLayout
// ============================================
import { useState } from "react";
import "./Footer.css";

interface FooterSection {
  title: string;
  items: string[];
}

const footerSections: FooterSection[] = [
  {
    title: "Destinations",
    items: [
      "Countries",
      "Regions",
      "Cities",
      "Districts",
      "Airports",
      "Hotels",
      "Places of interest",
    ],
  },
  {
    title: "Accommodation Types",
    items: [
      "Homes",
      "Apartments",
      "Resorts",
      "Villas",
      "Hostels",
      "B&Bs",
      "Guest houses",
    ],
  },
  {
    title: "Discover",
    items: [
      "Unique places to stay",
      "All destinations",
      "All flight destinations",
      "All car hire locations",
      "Discover",
      "Reviews",
      "Awards",
    ],
  },
  {
    title: "Services",
    items: [
      "Car hire",
      "Flight finder",
      "Restaurant reservations",
      "For Travel Agents",
    ],
  },
  {
    title: "About & Support",
    items: [
      "Coronavirus (COVID-19) FAQs",
      "About Booking.com",
      "Customer Service help",
      "Partner help",
      "Careers",
      "Sustainability",
      "Press centre",
      "Safety resource centre",
      "Investor relations",
      "Terms & Conditions",
      "Partner dispute",
      "How we work",
      "Privacy & Cookie Statement",
      "MSA Statement",
      "Corporate contact",
      "We Price Match",
    ],
  },
];

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <footer className="footer">
      <div className="central-container">
        {footerSections.map((section, index) => (
          <div key={index} className="footer-column">
            {/* Mobile collapsible header */}
            <div
              className="footer-column-header"
              onClick={() => toggleSection(index)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedSections.has(index)}
            >
              <span>{section.title}</span>
              <span
                className={`chevron ${
                  expandedSections.has(index) ? "expanded" : ""
                }`}
              >
                ▼
              </span>
            </div>

            {/* Content - visible on desktop, collapsible on mobile */}
            <div
              className={`footer-column-content ${
                expandedSections.has(index) ? "expanded" : ""
              }`}
            >
              {section.items.map((item, itemIndex) => (
                <span key={itemIndex}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
