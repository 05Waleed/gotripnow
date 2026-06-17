"use client";
import React from "react";
import "./CurrencySelector.css";

export interface Currency {
    code: string;
    label: string;
}

export const currencies: Currency[] = [
    { code: "CHF", label: "Swiss Franc" },
    { code: "EUR", label: "Euro" },
    { code: "USD", label: "US Dollar" },
    { code: "GBP", label: "British Pound" },
];

interface CurrencySelectorProps {
    value: string;
    onChange: (code: string) => void;
}

export default function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
    return (
        <div className="currency-grid">
            {currencies.map((curr) => (
                <button
                    key={curr.code}
                    type="button"
                    className={`currency-option ${curr.code === value ? "active" : ""}`}
                    onClick={() => onChange(curr.code)}
                >
                    <span>{curr.code} - {curr.label}</span>
                    {curr.code === value && <span className="currency-check">✓</span>}
                </button>
            ))}
        </div>
    );
}