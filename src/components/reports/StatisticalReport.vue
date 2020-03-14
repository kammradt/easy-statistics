<template>
  <v-row>
    <v-col @click="copy(ordered)" cols="12">
      <v-btn block tile outlined v-text="$t(`report.ordered`)"/>
      <v-card @click="({})" v-text="ordered" outlined tile class="text-wrap text-center"/>
    </v-col>
    <v-col v-for="(result, operation) in report" :key="operation" @click="copy(result)">
      <v-btn block tile outlined v-text="$t(`report.${operation}`)"/>
      <v-btn block tile outlined text v-text="result"/>
    </v-col>
  </v-row>
</template>

<script>
  import {generateReport, order} from "../../services/statistics";

  export default {
    name: "StatisticalReport",
    props: {
      listOfNumbers: Array
    },
    computed: {
      report() {
        return generateReport(this.listOfNumbers);
      },
      ordered() {
        return order(this.listOfNumbers)
      }
    },
    methods: {
      copy(value) {
        navigator.clipboard.writeText(value)
      },
    }
  }
</script>

<style scoped>

</style>