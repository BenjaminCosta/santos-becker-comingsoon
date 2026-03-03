import videoDesktop from './assets/video-desktop.mp4'
import videoMobile from './assets/video-mobile.mp4'

const links = [
  { label: 'WhatsApp',  href: 'https://wa.me/525566177712',                        newTab: true  },
  { label: 'Instagram', href: 'https://www.instagram.com/santosbecker_sc/',         newTab: true  },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/santos-becker/',    newTab: true  },
  { label: 'Email',     href: 'mailto:info@santosbecker.com',                       newTab: false },
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
        {links.map(({ label, href, newTab }) => (
          <a
            key={label}
            href={href}
            className="cs-btn"
            {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}
