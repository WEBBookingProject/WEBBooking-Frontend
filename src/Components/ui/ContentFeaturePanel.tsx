// Компонент: ContentFeaturePanel
// Файл: src/components/ui/ContentFeaturePanel.tsx
// Призначення: відображення блоку фіч на HomePage
// ============================================

import React, { JSX } from "react";
import "./ContentFeaturePanel.css";

export interface FeatureItemData {
  title: string;
  iconSrc: string;
  alt?: string;
}

interface PageFeaturePanelProps {
  features: FeatureItemData[];
  ariaLabel?: string;
}

export default function ContentFeaturePanel({
  features,
  ariaLabel,
}: PageFeaturePanelProps): JSX.Element {
  return (
    <div
      className="page-feature-panel"
      role="region"
      aria-label={ariaLabel || "Feature panel"}
    >
      <div className="panel-inner">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            title={feature.title}
            iconSrc={feature.iconSrc}
            alt={feature.alt}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureItem({
  title,
  iconSrc,
  alt,
}: {
  title: string;
  iconSrc: string;
  alt?: string;
}) {
  return (
    <div className="feature-item" role="button" tabIndex={0}>
      <div className="icon-wrap">
        <img src={iconSrc} alt={alt ?? title} className="feature-icon" />
      </div>
      <div className="feature-title">{title}</div>
    </div>
  );
}
