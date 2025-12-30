import type { App } from 'vue'

import { NucTerminal } from '.'

export function registerNucTerminal(app: App<Element>): void {
  app.component('nuc-terminal', NucTerminal)
}
