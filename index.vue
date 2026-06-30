<template>
  <ad-popover
    dismissable
    :icon="variant === 'sidebar' ? undefined : 'prime:code'"
    :position="position"
    :popover-class="
      variant === 'sidebar'
        ? 'terminal-popover terminal-popover-sidebar'
        : 'terminal-popover'
    "
    :button-text="variant === 'sidebar' ? undefined : isMobile() ? '' : 'Terminal'"
    button-class="terminal-popover-toggle"
  >
    <template v-if="variant === 'sidebar'" #trigger="{ toggle }">
      <button type="button" class="nuc-sidebar-link" @click="toggle">
        <ad-icon icon="prime:code" size="1.25em" />
        <span>Terminal</span>
      </button>
    </template>

    <div class="terminal-popover-container">
      <ad-terminal
        prompt="supabase >"
        welcome-message="The ''help'' command displays help"
      />
    </div>
  </ad-popover>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    position: PositionType
    variant?: 'default' | 'sidebar'
  }>(),
  {
    variant: 'default',
  }
)
</script>

<style lang="scss">
@import 'index';
</style>
