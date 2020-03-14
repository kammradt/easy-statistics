<template>
  <div>
    <Toolbar/>
    <v-container grid-list-sm>
      <v-row justify="center">
        <v-col cols="12" md="6" sm="10">
          <IntroductionText/>
          <Report/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import Toolbar from "../components/commom/Toolbar";
  import Report from "../components/reports/Report";
  import IntroductionText from "../components/reports/IntroductionText";

  export default {
    name: "Home",
    components: {
      IntroductionText,
      Toolbar,
      Report
    }
  };
</script>