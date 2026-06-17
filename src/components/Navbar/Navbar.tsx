import LanguageSelector from './LanguageSelector';

interface NavbarProps {
  dict: {
    home: string;
    tours: string;
    about: string;
    contact: string;
  };
}

export default function Navbar({ dict }: NavbarProps) {
  return (
    <nav>
      <div>
        <div>
          GoTripNow
        </div>

        <div>
          <ul>
            <li><a href="#">{dict.home}</a></li>
            <li><a href="#">{dict.tours}</a></li>
            <li><a href="#">{dict.about}</a></li>
            <li><a href="#">{dict.contact}</a></li>
          </ul>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  )
}