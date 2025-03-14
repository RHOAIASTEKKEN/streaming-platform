import type * as React from "react"

interface TiktokIconProps extends React.SVGAttributes<SVGElement> {}

export const TiktokIcon = (props: TiktokIconProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-tiktok"
    {...props}
  >
    <path d="M9 12V2H7v10"></path>
    <path d="M16 8H7"></path>
    <path d="M16 2H14v6"></path>
    <path d="M9 12H16v6"></path>
    <path d="M16 18v4"></path>
    <circle cx="19" cy="5" r="2"></circle>
  </svg>
)

