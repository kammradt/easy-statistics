<template>
  <div>
    <v-toolbar color="#F6F6F6">
      <v-toolbar-title class="font-weight-light display-1" v-text="$t('title')"/>
      <v-spacer/>
      <v-speed-dial direction="bottom">
        <template v-slot:activator>
          <v-btn text right icon large>
            <v-icon v-text="'mdi-earth'"/>
          </v-btn>
        </template>
        <v-btn fab v-for="language in languages" :key="language.lang" v-text="language.emoji"
               @click="setLanguageTo(language.lang)" class="display-1"/>
      </v-speed-dial>
    </v-toolbar>
    <v-container grid-list-sm>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="6">
          <span class="font-weight-light subtitle-2" v-text="$t('subtitle.first')"/> <br>
          <span class="font-weight-light subtitle-2" v-text="$t('subtitle.second')"/>
          <v-text-field
                  class="my-6 font-weight-light title"
                  :label="$t('input.label')"
                  v-model="numbers"
                  clearable
          />
          <v-card tile>
            <div class="text-center pt-3">
              <span class="display-1 font-weight-light" v-text="$t('card.title')"/> <br>
              <span class="subtitle-2 grey--text pt-1" v-text="$t('card.subtitle')"/>
            </div>
            <v-card-text>
              <v-row>
                <v-col @click="copy(result)" v-for="(result, operation) in report" :key="operation" cols="12">
                  <v-btn block tile outlined v-text="$t(`report.${operation}`)"/>

                  <v-card v-if="operation === 'ordered'"
                          @click="({})" v-text="result"
                          outlined tile class="text-wrap text-center"/>
                  <v-btn v-else block tile outlined text v-text="result"/>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
  import {filter, generateReport} from "../services/statistics";

  export default {
    name: "Home",
    data: () => ({
      numbers: '',
      languages: [
        {
          emoji: '🇧🇷',
          lang: 'br'
        },
        {
          emoji: '🇺🇸',
          lang: 'en'
        }
      ]
    }),
    created() {
      this.numbers = '10, 20, 50, 30, 30, 30'
    },
    methods: {
      copy(value) {
        navigator.clipboard.writeText(value)
      },
      setLanguageTo(language) {
        this.$i18n.locale = language
      }
    },
    computed: {
      listOfNumbers() {
        return filter(this.numbers)
      },
      report() {
        return generateReport(this.listOfNumbers);
      }
    }
  };
</script>