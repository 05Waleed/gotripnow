import React from 'react';

interface HeroProps {
    dict: {
        title: string;
        subtitle: string;
        placeholder: string;
        button: string;
    };
}

export default function Hero({ dict }: HeroProps) {
    return (
        <section>
            <div>
                <h1>
                    {dict.title}
                </h1>
                <p>
                    {dict.subtitle}
                </p>
                <div>
                    <input
                        type="text"
                        placeholder={dict.placeholder}
                    />
                    <button>
                        {dict.button}
                    </button>
                </div>
            </div>
        </section>
    );
}