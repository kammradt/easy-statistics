<template>
  <div>
    <v-switch :label="$t('card.frequency.switch_interval')" inset flat v-model="useContinuousInterval"/>

    <v-simple-table v-if="useContinuousInterval">
      <template v-slot:default>
        <thead>
        <tr>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <th v-on="on" class="text-left" v-text="$t('card.frequency.range')"/>
            </template>
            <span v-text="$t('card.frequency.range_rule')" />
          </v-tooltip>
          <th class="text-left" v-text="$t('card.frequency.numbers')"/>
          <th class="text-left" v-text="$t('card.frequency.absolute')"/>
          <th class="text-left" v-text="$t('card.frequency.relative')"/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(values, range) in frequencyReport" :key="range">
          <td v-text="range"/>
          <td :key="type" v-for="(value, type) in values"
              v-text="getFormattedFrequency(value, type)" @click="copy(value)"/>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-simple-table v-else>
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
  </div>

</template>

<script>
  import {getFrequencyReport} from "../services/statistics";

  export default {
    name: "DiscreteReport",
    data: () => ({
      useContinuousInterval: false
    }),
    props: {
      listOfNumbers: Array
    },
    computed: {
      frequencyReport() {
        return getFrequencyReport(this.listOfNumbers, this.useContinuousInterval)
      },
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
    }
  }
</script>

<style scoped>

</style>