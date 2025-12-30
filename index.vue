<template>
  <ad-popover
    dismissable
    icon="prime:code"
    :position="position"
    popover-class="terminal-popover"
    button-text="Terminal"
    button-class="terminal-popover-toggle"
  >
    <ad-terminal
      prompt="artisan >"
      welcome-message="The ''help'' command displays help"
    />
  </ad-popover>
</template>

<script setup lang="ts">
defineProps<{
  position: PositionType
}>()
</script>

<style lang="scss">
@import 'index';
</style>