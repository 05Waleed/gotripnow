'use client';
import React, { useState } from 'react';
import './TourPassengerField.css';
import type { HeroDict } from '../../Hero/Hero';

type TravelersDict = HeroDict['search']['travelers'];

interface TourPassengerFieldProps {
    dict: TravelersDict;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

function PersonIcon({ size = 20 }: { size?: number }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    );
}

function ChildIcon() {
    return (
        <svg viewBox="2 4 20 17" width="15" height="15" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    );
}

export default function TourPassengerField({ dict, isOpen, onOpen, onClose }: TourPassengerFieldProps) {
    const [adults, setAdults] = useState(1);
    const [kids, setKids] = useState(0);
    const total = adults + kids;

    return (
        <div className="tpf-wrapper">
            <div
                className={`tpf-input-container${isOpen ? ' active' : ''}`}
                onClick={isOpen ? onClose : onOpen}
            >
                <span className="tpf-field-icon"><PersonIcon size={20} /></span>
                <span className="tpf-icon-sep" />
                <span className="tpf-display-value">
                    {total} {total === 1 ? dict.triggerSingular : dict.triggerPlural}
                </span>
            </div>

            {isOpen && (
                <div className="tpf-dropdown">
                    <div className="tpf-dropdown-title">{dict.dropdownTitle}</div>

                    <div className="tpf-stepper-list">
                        {/* Adults */}
                        <div className="tpf-counter-row">
                            <div className="tpf-meta-container">
                                <div className="tpf-icon-container"><PersonIcon size={17} /></div>
                                <div className="tpf-text-container">
                                    <span className="tpf-label">{dict.adults.label}</span>
                                    <span className="tpf-description">{dict.adults.description}</span>
                                </div>
                            </div>
                            <div className="tpf-controls">
                                <button type="button" className="tpf-btn"
                                    onClick={(e) => { e.stopPropagation(); if (adults > 1) setAdults((n) => n - 1); }}
                                    disabled={adults <= 1} aria-label="Remove adult">−</button>
                                <span className="tpf-count">{adults}</span>
                                <button type="button" className="tpf-btn"
                                    onClick={(e) => { e.stopPropagation(); setAdults((n) => n + 1); }}
                                    aria-label="Add adult">+</button>
                            </div>
                        </div>

                        {/* Children */}
                        <div className="tpf-counter-row">
                            <div className="tpf-meta-container">
                                <div className="tpf-icon-container"><ChildIcon /></div>
                                <div className="tpf-text-container">
                                    <span className="tpf-label">{dict.children.label}</span>
                                    <span className="tpf-description">{dict.children.description}</span>
                                </div>
                            </div>
                            <div className="tpf-controls">
                                <button type="button" className="tpf-btn"
                                    onClick={(e) => { e.stopPropagation(); if (kids > 0) setKids((n) => n - 1); }}
                                    disabled={kids <= 0} aria-label="Remove child">−</button>
                                <span className="tpf-count">{kids}</span>
                                <button type="button" className="tpf-btn"
                                    onClick={(e) => { e.stopPropagation(); setKids((n) => n + 1); }}
                                    aria-label="Add child">+</button>
                            </div>
                        </div>
                    </div>

                    <div className="tpf-done-row">
                        <button type="button" className="tpf-done-btn"
                            onClick={(e) => { e.stopPropagation(); onClose(); }}>
                            {dict.done}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}