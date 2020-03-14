<template>
  <v-toolbar color="#F6F6F6">
    <v-toolbar-title class="font-weight-light" v-text="$t('title')"/>
    <v-spacer/>
    <v-speed-dial absolute direction="bottom" right>
      <template v-slot:activator>
        <v-btn icon large>
          <v-icon v-text="'mdi-earth'"/>
        </v-btn>
      </template>
      <v-btn :key="language.lang" @click="setLanguageTo(language.lang)" class="title"
             rounded small v-for="language in languages" v-text="language.emoji"/>
      <v-btn class="title" href="https://github.com/kammradt/easy-statistics" link rounded small target="_blank">
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

