<template>
  <div>
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
               small rounded class="title"  @click="setLanguageTo(language.lang)"/>
        <v-btn small rounded class="title" link target="_blank" href="https://github.com/kammradt/easy-statistics">
          <v-icon v-text="'mdi-xml'"/>
        </v-btn>
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
                  clearable @click:clear="onErase"
          />
          <v-card tile>
            <div class="text-center pt-3">
              <span class="display-1 font-weight-light" v-text="'Statistic Report 📊'"/> <br>
              <span class="subtitle-2 grey--text pt-1" v-text="$t('card.subtitle')"/>
            </div>
            <v-card-text>
              <v-row>
                <v-col @click="copy(ordered)" cols="12">
                  <v-btn block tile outlined v-text="$t(`report.ordered`)"/>
                  <v-card @click="({})" v-text="ordered" outlined tile class="text-wrap text-center"/>
                </v-col>

                <v-col v-for="(result, operation) in report" :key="operation" @click="copy(result)">
                  <v-btn block tile outlined v-text="$t(`report.${operation}`)"/>
                  <v-btn block tile outlined text v-text="result"/>
                </v-col>
                <br>

                <v-col cols="12">
                  <div class="text-center pt-3">
                    <span class="display-1 font-weight-light" v-text="'Frequency Distribution 📈'"/> <br>
                    <span class="subtitle-2 grey--text pt-1" v-text="'The number value, absolute frequency and the relative in percentage 📉'"/>
                  </div>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th class="text-left">Number</th>
                        <th class="text-left">Absolute</th>
                        <th class="text-left">Relative</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(frequency, number) in frequencyReport" :key="number">
                        <td>{{ number }}</td>
                        <td :key="type" v-for="(value, type) in frequency">{{value}}</td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              <br>

              <span v-text="$t('future')"/>
              <a href='https://github.com/kammradt/easy-statistics' target='_blank' v-text="$t('future_link')"/>
            </v-card-text>
          </v-card>


        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
  import {filter, generateReport, getFrequencyReport, order} from "../services/statistics";

  export default {
    name: "Home",
    data: () => ({
      numbers: '',
      languages: [
        {emoji: '🇧🇷', lang: 'br'},
        {emoji: '🇺🇸', lang: 'en'},
        {emoji: '🇪🇸', lang: 'es'}
      ]
    }),
    created() {
      this.numbers = '10, 20, 50, 30, 30, 30'
      document.title = this.$t('title')
    },
    methods: {
      copy(value) {
        navigator.clipboard.writeText(value)
      },
      setLanguageTo(language) {
        this.$i18n.locale = language
        document.title = this.$t('title')
      },
      onErase() {
        this.numbers = '1, 2, 3'
        setTimeout(() => this.numbers = '', 50)
      }
    },
    computed: {
      listOfNumbers() {
        return filter(this.numbers)
      },
      report() {
        return generateReport(this.listOfNumbers);
      },
      frequencyReport() {
        return getFrequencyReport(this.listOfNumbers)
      },
      ordered() {
        return order(this.listOfNumbers)
      }
    }
  };
</script>