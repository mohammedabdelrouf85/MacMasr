/**
 * WaveDivider — SVG wave transition between sections
 * @param {string} fromColor  - hex/color of the section above
 * @param {string} toColor    - hex/color of the section below
 * @param {boolean} flip      - mirror the wave vertically
 */
const WaveDivider = ({ fromColor = '#ffffff', toColor = '#1a1a1a', flip = false }) => (
  <div
    className="w-full overflow-hidden leading-none -mb-px"
    style={{ background: fromColor, lineHeight: 0 }}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      className="w-full block"
      style={{
        height: 64,
        transform: flip ? 'scaleY(-1)' : undefined,
        display: 'block',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
        fill={toColor}
      />
    </svg>
  </div>
)

export default WaveDivider
