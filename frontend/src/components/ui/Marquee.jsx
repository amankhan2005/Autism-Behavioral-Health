// Seamless right-to-left auto-scroll. Renders children twice; the track shifts
// -50% so the second copy lines up perfectly with the first. Pauses on hover.
export default function Marquee({ children, duration = 32, className = '', pauseOnHover = true, ariaLabel }) {
  return (
    <div
      className={`marquee-mask group/marquee overflow-hidden ${className}`}
      role="marquee"
      aria-label={ariaLabel}
    >
      <div
        className={`flex w-max animate-marquee ${pauseOnHover ? 'group-hover/marquee:[animation-play-state:paused]' : ''}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <div className="flex shrink-0 items-center" aria-hidden="false">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
