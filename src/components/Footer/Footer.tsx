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
     
    </footer>
  )
}