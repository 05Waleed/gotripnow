import React from 'react';
import './TourCard.css';

interface TourCardProps {
  image: string;
  title: string;
  location: string;
  duration: string;
  rating: string;
  reviewCount: number;
  price: string;
  ctaText?: string;
  ctaColor?: string;
}

export default function TourCard({
  image,
  title,
  location,
  duration,
  rating,
  reviewCount,
  price,
  ctaText = 'See Details',
  ctaColor = '#cc2029',
}: TourCardProps) {
  const ratingNum = parseFloat(rating);
  const barWidth = Math.min(((ratingNum - 4) / 1) * 100, 100);

  return (
    <div className="tour-card">
      <div className="tour-card-image-wrapper">
        <img src={image} alt={title} className="tour-card-image" />
      </div>
      <div className="tour-card-content">
        <h3 className="tour-card-title">{title}</h3>

        <div className="tour-card-meta-row">
          <div className="tour-card-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-pin">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location}</span>
          </div>
          <span className="tour-card-meta-sep">•</span>
          <span className="tour-card-duration">{duration}</span>
        </div>

        <div className="tour-card-rating">
          <span className="rating-score">{rating}</span>
          <span className="rating-star">★</span>
          <div className="rating-bar-track">
            <div className="rating-bar-fill" style={{ width: `${barWidth}%` }} />
          </div>
          <span className="rating-reviews">({reviewCount} reviews)</span>
        </div>

        <div className="tour-card-footer">
          <div className="tour-card-price-box">
            <span className="price-label">Price: </span>
            <span className="price-current">CHF {price}</span>
          </div>
          <button
            className="tour-card-cta"
            style={{ backgroundColor: ctaColor, borderColor: ctaColor }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}