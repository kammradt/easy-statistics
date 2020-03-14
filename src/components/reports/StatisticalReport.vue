<template>
  <v-row>
    <v-col @click="copy(ordered)" cols="12">
      <v-btn block outlined tile v-text="$t(`report.ordered`)"/>
      <v-card @click="({})" class="text-wrap text-center" outlined tile v-text="ordered"/>
    </v-col>
    <v-col :key="operation" @click="copy(result)" v-for="(result, operation) in report">
      <v-btn block outlined tile v-text="$t(`report.${operation}`)"/>
      <v-btn block outlined text tile v-text="result"/>
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