import videoDesktop from './assets/video-desktop.mp4'
import videoMobile from './assets/video-mobile.mp4'
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const links = [
  { icon: <FaWhatsapp />,   label: 'WhatsApp',  href: 'https://wa.me/525566177712',                     newTab: true  },
  { icon: <FaInstagram />,  label: 'Instagram', href: 'https://www.instagram.com/santosbecker_sc/',      newTab: true  },
  { icon: <FaLinkedinIn />, label: 'LinkedIn',  href: 'https://www.linkedin.com/company/santos-becker/', newTab: true  },
  { icon: <MdEmail />,      label: 'Email',     href: 'mailto:info@santosbecker.com',                    newTab: false },
]

export default function ComingSoon() {
  return (
    <div className="cs-wrapper">
      <video className="cs-video cs-video--desktop" autoPlay muted loop playsInline>
        <source src={videoDesktop} type="video/mp4" />
      </video>
      <video className="cs-video cs-video--mobile" autoPlay muted loop playsInline>
        <source src={videoMobile} type="video/mp4" />
      </video>

      <nav className="cs-buttons">
        {links.map(({ icon, label, href, newTab }) => (
          <a
            key={label}
            href={href}
            className="cs-btn"
            aria-label={label}
            title={label}
            {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {icon}
          </a>
        ))}
      </nav>
    </div>
  )
}
