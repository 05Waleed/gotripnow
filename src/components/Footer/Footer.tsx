import React from 'react'

interface FooterProps {
  dict: {
    rights: string;
    privacy: string;
    terms: string;
  };
}

export default function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        {/* Rights notice */}
        <div>
          © {currentYear} GoTripNow. {dict.rights}
        </div>

        {/* Footer Links */}
        <div className="flex gap-4">
          <a href="#">{dict.privacy}</a>
          <a href="#">{dict.terms}</a>
        </div>
      </div>
    </footer>
  )
}