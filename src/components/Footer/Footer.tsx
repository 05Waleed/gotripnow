import './Footer.css'
import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
    dict: {
        logo: {
            tagline: string;
        };
        social: {
            facebook: string;
            instagram: string;
            tiktok: string;
            x: string;
        };
        payment: {
            label: string;
        };
        quickLinks: {
            title: string;
            home: string;
            findTours: string;
            about: string;
            blog: string;
            contact: string;
            tourPlanner: string;
        };
        explore: {
            title: string;
            interlaken: string;
            grindelwald: string;
            zermatt: string;
            zurich: string;
            lucerne: string;
            lauterbrunnen: string;
        };
        support: {
            title: string;
            helpCenter: string;
            faq: string;
            terms: string;
            privacy: string;
            cookies: string;
        };
        bottom: {
            rights: string;
            registered: string;
        };
    };
}

export default function Footer({ dict }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-wrapper">

            {/* ── Decorative mountain silhouette ───────────────────── */}
            <svg
                className="footer-bg-svg"
                viewBox="0 0 1440 320"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMax slice"
                aria-hidden="true"
            >
                <path
                    fill="white"
                    fillOpacity="0.4"
                    d="M0 260 L60 230 L100 245 L140 210 L190 230 L230 200 L280 220 L320 185 L370 205 L410 175 L460 195 L510 160 L560 180 L600 150 L650 170 L700 135 L750 158 L800 140 L850 160 L900 125 L950 148 L1000 130 L1050 150 L1100 118 L1150 140 L1200 155 L1250 130 L1300 148 L1350 138 L1400 155 L1440 145 L1440 320 L0 320 Z"
                />
                <path
                    fill="white"
                    fillOpacity="0.6"
                    d="M0 300 L40 275 L80 288 L130 255 L175 272 L220 248 L270 265 L310 238 L360 258 L400 228 L450 250 L490 220 L545 242 L585 215 L635 238 L680 205 L725 228 L775 200 L820 222 L865 195 L915 218 L960 192 L1005 215 L1055 188 L1100 210 L1150 228 L1195 205 L1240 222 L1290 210 L1340 228 L1390 215 L1440 225 L1440 320 L0 320 Z"
                />
                <path
                    fill="white"
                    fillOpacity="1"
                    d="M0 320 L0 305 L50 285 L95 298 L145 272 L195 290 L240 268 L290 282 L340 260 L385 276 L435 255 L480 270 L530 250 L575 265 L625 244 L670 260 L720 240 L765 256 L815 238 L860 252 L910 235 L955 250 L1005 232 L1050 248 L1100 265 L1145 248 L1195 262 L1245 248 L1295 262 L1345 252 L1395 265 L1440 258 L1440 320 Z"
                />
            </svg>

            <div className="footer-inner large-screen-max-width">
                <div className="footer-grid">

                    {/* Brand column */}
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo-text">
                            <span className="go-trip">GoTrip</span>
                            <span className="now">Now</span>
                        </Link>
                        <p>{dict.logo.tagline}</p>

                        <div className="footer-social">
                            <Link href="https://facebook.com" aria-label={dict.social.facebook} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </Link>
                            <Link href="https://instagram.com" aria-label={dict.social.instagram} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </Link>
                            <Link href="https://tiktok.com" aria-label={dict.social.tiktok} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.07a4.85 4.85 0 0 1-1-.38z" />
                                </svg>
                            </Link>
                            <Link href="https://x.com" aria-label={dict.social.x} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                        </div>

                        {/* Payment methods */}
                        <div className="footer-payment">
                            <span className="footer-payment-label">{dict.payment.label}</span>
                            <div className="footer-payment-icons">
                                <Image src="/assets/visa.svg" alt="Visa" width={48} height={30} />
                                <Image src="/assets/mastercard.svg" alt="Mastercard" width={48} height={30} />
                                <Image src="/assets/google-pay.svg" alt="Google Pay" width={48} height={30} />
                                <Image src="/assets/apple-pay1.svg" alt="Apple Pay" width={48} height={30} />
                            </div>
                        </div>
                    </div>

                    {/* Quick Links column */}
                    <div className="footer-col">
                        <h3>{dict.quickLinks.title}</h3>
                        <hr className="footer-col-divider" />
                        <ul>
                            <li><Link href="/">{dict.quickLinks.home}</Link></li>
                            <li><Link href="/tours">{dict.quickLinks.findTours}</Link></li>
                            <li><Link href="/about">{dict.quickLinks.about}</Link></li>
                            <li><Link href="/blog">{dict.quickLinks.blog}</Link></li>
                            <li><Link href="/contact">{dict.quickLinks.contact}</Link></li>
                            <li><Link href="/planner">{dict.quickLinks.tourPlanner}</Link></li>
                        </ul>
                    </div>

                    {/* Explore column */}
                    <div className="footer-col">
                        <h3>{dict.explore.title}</h3>
                        <hr className="footer-col-divider" />
                        <ul>
                            <li><Link href="/destinations/interlaken">{dict.explore.interlaken}</Link></li>
                            <li><Link href="/destinations/grindelwald">{dict.explore.grindelwald}</Link></li>
                            <li><Link href="/destinations/zermatt">{dict.explore.zermatt}</Link></li>
                            <li><Link href="/destinations/zurich">{dict.explore.zurich}</Link></li>
                            <li><Link href="/destinations/lucerne">{dict.explore.lucerne}</Link></li>
                            <li><Link href="/destinations/lauterbrunnen">{dict.explore.lauterbrunnen}</Link></li>
                        </ul>
                    </div>

                    {/* Support column */}
                    <div className="footer-col">
                        <h3>{dict.support.title}</h3>
                        <hr className="footer-col-divider" />
                        <ul>
                            <li><Link href="/help">{dict.support.helpCenter}</Link></li>
                            <li><Link href="/faq">{dict.support.faq}</Link></li>
                            <li><Link href="/terms">{dict.support.terms}</Link></li>
                            <li><Link href="/privacy">{dict.support.privacy}</Link></li>
                            <li><Link href="/cookies">{dict.support.cookies}</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <p>© {currentYear} GoTrip Now. {dict.bottom.rights} {dict.bottom.registered}</p>
                </div>
            </div>
        </footer>
    );
}