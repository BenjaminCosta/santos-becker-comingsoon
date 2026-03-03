import videoDesktop from './assets/video-desktop.mp4'
import videoMobile from './assets/video-mobile.mp4'
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const links = [
  { icon: <FaWhatsapp />,   label: 'WhatsApp',  href: 'https://wa.me/525566177712',                        newTab: true  },
  { icon: <FaInstagram />,  label: 'Instagram', href: 'https://www.instagram.com/santosbecker_sc/',         newTab: true  },
  { icon: <FaLinkedinIn />, label: 'LinkedIn',  href: 'https://www.linkedin.com/company/santos-becker/',   newTab: true  },
  { icon: <FaYoutube />,    label: 'YouTube',   href: 'https://www.youtube.com/@SantosBeckerSIC',           newTab: true  },
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

      <div className="cs-overlay">
        <a
  href="mailto:info@santosbecker.com"
  className="cs-email-btn"
  onClick={() => {
  setTimeout(() => {
    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=info@santosbecker.com',
      '_blank',
      'noreferrer'
    )
  }, 300)
}}
>
  ENVIAR CORREO
</a>
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
    </div>
  )
}
