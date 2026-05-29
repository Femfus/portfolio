import { Mail } from 'lucide-react'

/* Inline SVG brand icons (lucide-react no longer ships brand logos) */
function GithubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function DribbbleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.175 10.175 0 004.393-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4a10.05 10.05 0 006.29 2.166c1.42 0 2.77-.29 4.006-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248a65.7 65.7 0 00-3.8-5.928A10.14 10.14 0 001.964 9.915zM7.23 3.265a72.7 72.7 0 013.84 6.005c4.11-1.54 5.85-3.87 6.03-4.13A10.1 10.1 0 0012 1.836a10.04 10.04 0 00-4.77 1.43zm11.58 3.12c-.21.29-2.1 2.74-6.36 4.47.24.49.47.985.68 1.485.075.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.36-6.38-.1-.15-.21-.29-.32-.435z" />
    </svg>
  )
}

const socials = [
  { Icon: GithubIcon,   href: 'https://github.com',       label: 'GitHub'   },
  { Icon: LinkedinIcon,  href: 'https://linkedin.com',     label: 'LinkedIn' },
  { Icon: TwitterIcon,   href: 'https://twitter.com',      label: 'Twitter'  },
  { Icon: DribbbleIcon,  href: 'https://dribbble.com',     label: 'Dribbble' },
  { Icon: Mail,          href: 'mailto:hello@example.com', label: 'Email'    },
]

export default function SocialIcons() {
  return (
    <div id="social-icons" className="flex items-center gap-4">
      {socials.map(({ Icon, href, label }, i) => (
        <a
          key={label}
          id={`social-${label.toLowerCase()}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="
            animate-fade-slide-up
            text-white/40 hover:text-white
            transition-all duration-300 ease-out
            hover:scale-110
          "
          style={{ animationDelay: `${(i + 5) * 0.1}s` }}
        >
          <Icon size={20} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  )
}
