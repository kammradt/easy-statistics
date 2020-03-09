<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato");
#app {
  background-color: #F6F6F6;
  font-family: "Lato", serif;
}
</style>