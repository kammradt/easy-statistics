<template>
  <div>
    <v-text-field
            :label="$t('input.label')"
            class="my-6 font-weight-light title"
            v-model="numbers"
    />

    <v-card tile>
      <div class="text-center pt-3">
        <span class="display-1 font-weight-light" v-text="$t('card.title')"/> <br>
        <span class="subtitle-2 grey--text pt-1" v-text="$t('card.subtitle')"/>
      </div>
      <v-card-text>
        <v-row class="pb-3">
          <StatisticalReport :list-of-numbers="listOfNumbers"/>
          <v-col class="mt-3">
            <FrequencyReport :list-of-numbers="listOfNumbers"/>
          </v-col>
        </v-row>

        <CardFooter/>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  import {filter} from "../../services/statistics";
  import CardFooter from "../commom/CardFooter";
  import StatisticalReport from "./StatisticalReport";
  import FrequencyReport from "./FrequencyReport";

  export default {
    name: "Report",
    components: {
      StatisticalReport,
      FrequencyReport,
      CardFooter
    },
    data: () => ({
      numbers: '',
    }),
    created() {
      this.numbers = '10, 20, 50, 30, 30, 30'
      document.title = this.$t('title')
    },
    methods: {
      copy(value) {
        navigator.clipboard.writeText(value)
      },
    },
    computed: {
      listOfNumbers() {
        return this.numbers !== ''
            ? filter(this.numbers)
            : [1, 2, 3]
      }
    }
  }
</script>
