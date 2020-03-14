<template>
  <div>
    <Toolbar />
    <v-container grid-list-sm>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="6">
          <IntroductionText/>
          <Report />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import Toolbar from "../components/Toolbar";
  import Report from "../components/Report";
  import IntroductionText from "./IntroductionText";

  export default {
    name: "Home",
    components: {
      IntroductionText,
      Toolbar,
      Report
    }
  };
</script>