'use client'

import { type JSX } from 'react'

import { AdIcon, AdPopover, AdTerminal, isMobile } from 'nucleify'

import './_index.scss'

export interface NucTerminalProps {
  position: PositionType
  variant?: 'default' | 'sidebar'
}

export const NucTerminal = ({
  position,
  variant = 'default',
}: NucTerminalProps): JSX.Element => {
  return (
    <AdPopover
      dismissable
      icon={variant === 'sidebar' ? undefined : 'prime:code'}
      position={position}
      popoverClass={
        variant === 'sidebar'
          ? 'terminal-popover terminal-popover-sidebar'
          : 'terminal-popover'
      }
      buttonText={
        variant === 'sidebar' ? undefined : isMobile() ? '' : 'Terminal'
      }
      buttonClass="terminal-popover-toggle"
      renderTrigger={
        variant === 'sidebar'
          ? (toggle) => (
              <button
                type="button"
                className="nuc-sidebar-link"
                onClick={toggle}
              >
                <AdIcon icon="prime:code" size="1.25em" />
                <span>Terminal</span>
              </button>
            )
          : undefined
      }
    >
      <div className="terminal-popover-container">
        <AdTerminal
          prompt="artisan >"
          welcomeMessage="The 'help' command displays help"
        />
      </div>
    </AdPopover>
  )
}

export default NucTerminal
