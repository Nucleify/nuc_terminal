import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucTerminal(app: App<Element>): void {
  app.component(
    'nuc-terminal',
    defineAsyncComponent(() => import('./index.vue'))
  )
}
