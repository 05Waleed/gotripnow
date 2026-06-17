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
    /** Currently selected currency code, e.g. "CHF". */
    value: string;
    /** Called with the new currency code once the user picks one. */
    onChange: (code: string) => void;
}

/**
 * Renders only the grid of currency options. Controlled component on
 * purpose (value/onChange) so the parent decides where the currency
 * actually lives — e.g. plain state today, a global context later —
 * without this file needing to change.
 */
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