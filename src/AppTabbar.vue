<template id="appTabbar">
  <v-ons-page>
    <v-ons-toolbar class="toolbar--material">
      <div class="left">
        <v-ons-toolbar-button @click="menuIsOpen = !menuIsOpen">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center"> {{title}} </div>
    </v-ons-toolbar>
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="250px" side="left"
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen">
        <v-ons-page>        
        <v-ons-list>
          <v-ons-list-header>Menu</v-ons-list-header>
          <v-ons-list-item>
            <div @click="pushContent();" class="center">お問い合わせ</div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div @click="pushAbout();" class="center">Nカウンターについて</div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div @click="pushData();" class="center">データ引き継ぎ</div>
          </v-ons-list-item>
        </v-ons-list></v-ons-page>
      </v-ons-splitter-side>
            <v-ons-splitter-content>
        <transition :name="slideDirection" mode="in-out" appear>
          
        </transition>

    <v-ons-tabbar class="tabbar--material" swipeable position="bottom" :tabs="tabs" :index.sync="activeIndex">
      <template slot="pages">
        <component v-for="tab in tabs" :is="tab.page" :key="tab.page" :page-stack="pageStack"></component>
      </template>
    </v-ons-tabbar>
          </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>                  
import settingsPage from 'Settings';
import homePage from 'Home';
import newsPage from 'News';
import contact from 'Contact';
import about from 'About';
import data from 'Data';
import Vuex from 'vuex';

export default {
  data() {
    return {
      activeIndex: 0,
      menuIsOpen: false,
      tabs: [
        {
          icon: "ion-ios-stopwatch",
          label: "カウンター",
          page: newsPage
        },
        {
          icon: "edit",
          label: "統計",
          page: homePage,
          key: "Home"
        },
        {
          icon: "ion-ios-calendar",
          label: "カレンダー",
          page: settingsPage
        }
      ]
    };
  },
  props: ["pageStack"],
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    pushContent() {
      var pageToPush = {
        extends: contact,
        data() {
          return {
          };
        }
      };
      this.pageStack.push(pageToPush);
    },
    pushAbout() {
      var pageToPush = {
        extends: about,
        data() {
          return {
          };
        }
      };
      this.pageStack.push(pageToPush);
    },
    pushData() {
      var pageToPush = {
        extends: data,
        data() {
          return {
          };
        }
      };
      this.pageStack.push(pageToPush);
    }
  },
    computed: {
      title() {
        return this.tabs[this.activeIndex].label;
      }
    },
    watch: {
      activeIndex: function(newValue, oldValue){
        if (newValue == 1) {
          this.$store.dispatch("initMonth")
        }
      }
    }
  
};
</script>