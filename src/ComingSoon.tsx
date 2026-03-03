import { useEffect, useMemo, useRef, useState } from 'react'
import videoDesktop from './assets/video-desktop.mp4'
import videoMobile from './assets/video-mobile.mp4'
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const links = [
  { icon: <FaWhatsapp />,   label: 'WhatsApp',  href: 'https://wa.me/525566177712',                       newTab: true },
  { icon: <FaInstagram />,  label: 'Instagram', href: 'https://www.instagram.com/santosbecker_sc/',        newTab: true },
  { icon: <FaLinkedinIn />, label: 'LinkedIn',  href: 'https://www.linkedin.com/company/santos-becker/',  newTab: true },
  { icon: <FaYoutube />,    label: 'YouTube',   href: 'https://www.youtube.com/@SantosBeckerSIC',          newTab: true },
]

function isIOS() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

export default function ComingSoon() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 768px)').matches
      : false
  )
  const [needsTap, setNeedsTap] = useState(false)

  // Sync mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const src = useMemo(
    () => (isMobile ? videoMobile : videoDesktop),
    [isMobile]
  )

  const tryPlay = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play()
      .then(() => setNeedsTap(false))
      .catch(() => setNeedsTap(true))
  }

  // Attempt autoplay when source is ready
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onCanPlay = () => tryPlay()
    v.addEventListener('canplay', onCanPlay)
    tryPlay()
    return () => v.removeEventListener('canplay', onCanPlay)
  }, [src])

  // Any tap/click on the wrapper forces play (works even when overlay is on top)
  const handleUserGesture = () => {
    if (!needsTap) return
    tryPlay()
  }

  return (
    <div
      className="cs-wrapper"
      onClick={handleUserGesture}
      onTouchStart={handleUserGesture}
    >
      <video
        ref={videoRef}
        key={isMobile ? 'mobile' : 'desktop'}
        className="cs-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>

      {needsTap && isIOS() && (
        <div className="cs-tap-hint"></div>
      )}

      <div className="cs-overlay">
        <a href="mailto:info@santosbecker.com" className="cs-email-btn">
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