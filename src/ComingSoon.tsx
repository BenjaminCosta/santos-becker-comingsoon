import { useEffect, useRef, useState } from 'react'
import videoDesktop from './assets/video-desktop.mp4'
import videoMobile from './assets/video-mobile.mp4'
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const links = [
  { icon: <FaWhatsapp />,   label: 'WhatsApp',  href: 'https://wa.me/525566177712',                        newTab: true },
  { icon: <FaInstagram />,  label: 'Instagram', href: 'https://www.instagram.com/santosbecker_sc/',         newTab: true },
  { icon: <FaLinkedinIn />, label: 'LinkedIn',  href: 'https://www.linkedin.com/company/santos-becker/',   newTab: true },
  { icon: <FaYoutube />,    label: 'YouTube',   href: 'https://www.youtube.com/@SantosBeckerSIC',           newTab: true },
]

export default function ComingSoon() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  )

  // Keep isMobile in sync on resize
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Try autoplay as soon as the video source is ready
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const tryPlay = () => v.play().catch(() => {})
    v.addEventListener('canplay', tryPlay, { once: true })
    tryPlay()
    return () => v.removeEventListener('canplay', tryPlay)
  }, [isMobile]) // re-run when source swaps

  // iOS fallback: first user gesture triggers play
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onGesture = () => v.play().catch(() => {})
    window.addEventListener('touchstart', onGesture, { once: true })
    window.addEventListener('click',      onGesture, { once: true })
    return () => {
      window.removeEventListener('touchstart', onGesture)
      window.removeEventListener('click',      onGesture)
    }
  }, [isMobile])

  return (
    <div className="cs-wrapper">
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
        <source src={isMobile ? videoMobile : videoDesktop} type="video/mp4" />
      </video>

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