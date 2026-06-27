import React from 'react';
import './TourCard.css';

export interface TourData {
  id: string;
  imageUrl: string;
  city: string;
  duration: string;
  durationLabel: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
}

interface TourCardUiLabels {
  seeDetails: string;
  priceFrom: string;
  reviews: string;
  currency: string;
}

interface TourCardProps extends TourData {
  ui: TourCardUiLabels;
}

export default function TourCard({
  imageUrl,
  title,
  city,
  durationLabel,
  price,
  rating,
  reviewCount,
  ui,
}: TourCardProps) {
  const barWidth = Math.min(((rating - 4) / 1) * 100, 100);

  return (
    <div className="tour-card">
      <div className="tour-card-image-wrapper">
        <img src={imageUrl} alt={title} className="tour-card-image" />
      </div>
      <div className="tour-card-content">
        <h3 className="tour-card-title">{title}</h3>
        <div className="tour-card-meta-row">
          <div className="tour-card-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-pin">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{city}</span>
          </div>
          <span className="tour-card-meta-sep">•</span>
          <span className="tour-card-duration">{durationLabel}</span>
        </div>
        <div className="tour-card-rating">
          <span className="rating-score">{rating}</span>
          <span className="rating-star">★</span>
          <div className="rating-bar-track">
            <div className="rating-bar-fill" style={{ width: `${barWidth}%` }} />
          </div>
          <span className="rating-reviews">({reviewCount} {ui.reviews})</span>
        </div>
        <div className="tour-card-footer">
          <div className="tour-card-price-box">
            <span className="price-label">{ui.priceFrom} </span>
            <span className="price-current">{ui.currency} {price}</span>
          </div>
          <button className="tour-card-cta">{ui.seeDetails}</button>
        </div>
      </div>
    </div>
  );
}