<template>
  <v-toolbar color="#F6F6F6">
    <v-toolbar-title class="font-weight-light" v-text="$t('title')"/>
    <v-spacer/>
    <v-speed-dial direction="bottom" absolute right>
      <template v-slot:activator>
        <v-btn icon large>
          <v-icon v-text="'mdi-earth'"/>
        </v-btn>
      </template>
      <v-btn v-for="language in languages" :key="language.lang" v-text="language.emoji"
             small rounded class="title" @click="setLanguageTo(language.lang)"/>
      <v-btn small rounded class="title" link target="_blank" href="https://github.com/kammradt/easy-statistics">
        <v-icon v-text="'mdi-xml'"/>
      </v-btn>
    </v-speed-dial>
  </v-toolbar>
</template>

<script>
  export default {
    name: "Toolbar",
    data: () => ({
      languages: [
        {emoji: '🇧🇷', lang: 'br'},
        {emoji: '🇺🇸', lang: 'en'},
        {emoji: '🇪🇸', lang: 'es'}
      ]
    }),
    methods: {
      setLanguageTo(language) {
        this.$i18n.locale = language
        document.title = this.$t('title')
      },
    }
  }
</script>

