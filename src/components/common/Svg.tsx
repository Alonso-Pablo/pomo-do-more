const enterArrowSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="12"
    viewBox="0 0 11 12"
    fill="none"
  >
    <path
      d="M8.99997 1C8.99997 0.447715 9.44768 0 9.99997 0C10.5523 0 11 0.447715 11 1V9C11 9.55228 10.5523 10 9.99997 10C9.44768 10 8.99997 9.55229 8.99997 9V1Z"
      fill="white"
    />
    <path
      d="M9.99997 8C10.5523 8 11 8.44772 11 9C11 9.55229 10.5523 10 9.99997 10L1.99997 10C1.44769 10 0.999969 9.55228 0.999969 9C0.999969 8.44771 1.44769 8 1.99997 8L9.99997 8Z"
      fill="white"
    />
    <rect
      x="2"
      y="10.4"
      width="2"
      height="4"
      rx="1"
      transform="rotate(-135 2 10.4)"
      fill="white"
    />
    <rect
      x="0.600006"
      y="9"
      width="2"
      height="4"
      rx="1"
      transform="rotate(-45 0.600006 9)"
      fill="white"
    />
  </svg>
)

const moreOptionsSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="4"
    height="20"
    viewBox="0 0 4 20"
    fill="none"
  >
    <rect fill="#C1C1C1" y="8" width="4" height="4" rx="2" />
    <rect fill="#C1C1C1" y="8" width="4" height="4" rx="2" />
    <rect fill="#C1C1C1" y="16" width="4" height="4" rx="2" />
    <rect fill="#C1C1C1" y="16" width="4" height="4" rx="2" />
    <rect fill="#C1C1C1" width="4" height="4" rx="2" />
    <rect fill="#C1C1C1" width="4" height="4" rx="2" />
  </svg>
)

const cancelSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <rect x="4" width="2" height="10" rx="1" fill="#D35A44" />
    <rect
      x="10"
      y="4"
      width="2"
      height="10"
      rx="1"
      transform="rotate(90 10 4)"
      fill="#D35A44"
    />
  </svg>
)

const grippypart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="20"
    viewBox="0 0 10 20"
    fill="none"
  >
    <rect y="8" width="4" height="4" rx="2" />
    <rect y="16" width="4" height="4" rx="2" />
    <rect width="4" height="4" rx="2" />
    <rect x="6" y="8" width="4" height="4" rx="2" />
    <rect x="6" y="16" width="4" height="4" rx="2" />
    <rect x="6" width="4" height="4" rx="2" />
  </svg>
)

export { enterArrowSvg, moreOptionsSvg, cancelSvg, grippypart }
