<template>
  <v-ons-navigator :page-stack="pageStack">
    <component v-for="page in pageStack" :is="page" :key="page" :page-stack="pageStack"></component>
  </v-ons-navigator>
</template>
<script>
import appTabbar from './AppTabbar.vue';
  export default{
    data() {
      return {
        pageStack: [appTabbar]
      };
    },
    methods: {
    }
  };
</script>
