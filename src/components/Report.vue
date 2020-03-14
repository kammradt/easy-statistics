<template>
  <div>
    <v-text-field
            class="my-6 font-weight-light title"
            :label="$t('input.label')"
            v-model="numbers"
    />

    <v-card tile>
      <div class="text-center pt-3">
        <span class="display-1 font-weight-light" v-text="$t('card.title')"/> <br>
        <span class="subtitle-2 grey--text pt-1" v-text="$t('card.subtitle')"/>
      </div>
      <v-card-text>
        <v-row class="pb-3">
          <v-col @click="copy(ordered)" cols="12">
            <v-btn block tile outlined v-text="$t(`report.ordered`)"/>
            <v-card @click="({})" v-text="ordered" outlined tile class="text-wrap text-center"/>
          </v-col>

          <v-col v-for="(result, operation) in report" :key="operation" @click="copy(result)">
            <v-btn block tile outlined v-text="$t(`report.${operation}`)"/>
            <v-btn block tile outlined text v-text="result"/>
          </v-col>

          <v-col cols="12" class="mt-3">
            <div class="text-center pt-3 pb-3">
              <span class="display-1 font-weight-light" v-text="$t('card.frequency.title')"/> <br>
              <span class="subtitle-2 grey--text pt-1" v-text="$t('card.frequency.subtitle')"/>
            </div>
            <v-switch :label="$t('card.frequency.switch_interval')" inset flat v-model="useContinuousInterval" />
            <v-simple-table v-if="!useContinuousInterval">
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left" v-text="$t('card.frequency.number')"/>
                  <th class="text-left" v-text="$t('card.frequency.absolute')"/>
                  <th class="text-left" v-text="$t('card.frequency.relative')"/>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(frequency, number) in frequencyReport" :key="number">
                  <td v-text="number">
                  <td :key="type" v-for="(value, type) in frequency"
                      v-text="getFormattedFrequency(value, type)" @click="copy(value)"/>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>

        <CardFooter/>

      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  import {filter, generateReport, getFrequencyReport, order} from "../services/statistics";
  import CardFooter from "./CardFooter";

  export default {
    name: "Report",
    components: {
      CardFooter
    },
    data: () => ({
      numbers: '',
      useContinuousInterval: false
    }),
    created() {
      this.numbers = '10, 20, 50, 30, 30, 30'
      document.title = this.$t('title')
    },
    methods: {
      copy(value) {
        navigator.clipboard.writeText(value)
      },
      getFormattedFrequency(value, type) {
        let quantity = value > 1 ? 'plural' : 'singular'
        let formats = {
          relative_frequency: '%',
          absolute_frequency: this.$t(`card.frequency.absolute_description.${quantity}`),
          numbers: ''
        }
        return `${value} ${formats[type]}`
      },
    },
    computed: {
      listOfNumbers() {
        return this.numbers !== ''
            ? filter(this.numbers)
            : [1, 2, 3]
      },
      report() {
        return generateReport(this.listOfNumbers);
      },
      frequencyReport() {
        return getFrequencyReport(this.listOfNumbers, this.useContinuousInterval)
      },
      ordered() {
        return order(this.listOfNumbers)
      }
    }
  }
</script>
