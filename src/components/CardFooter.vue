<template>
  <div>
    <span v-text="$t('future')"/>
    <a href='https://github.com/kammradt/easy-statistics' target='_blank' v-text="$t('future_link')"/>
  </div>
</template>
<script>
  export default {
    name: 'CardFooter'
  }
</script>