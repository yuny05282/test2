<template>
  <v-ons-page>
      <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">Nカウンターについて</div>
    </v-ons-toolbar>
    Nカウンターは最高のアプリです。<br>
    Nカウンターで簡単に即れます。
  </v-ons-page>
</template>

<script>
import Vuex from 'vuex'
import moment from 'moment';
import PieChart from 'components/PieChart.vue'

export default {
  data() {
    return {
      title: "My app",
      chat: [],
      count: 0,
      // グラフオプション
      options : {
          title: {
              display: true,
              text: '今月の集計'
          },
      }
    };
  },
  components: {
    PieChart
  },
  computed: {
    pieChartData() { 
      return {
          // ラベル
          labels: ["ガンシカ", "オープン", "番ゲ", "連れ出し"],
          // データ詳細
          datasets: [{
              label: '今月の集計',
              data: [this.$store.state.monthIgnore, this.$store.state.monthOpen, this.$store.state.monthLineGet,this.$store.state.monthTakeOut],
              backgroundColor: [
                 'rgba(255, 100, 130, 0.2)',
                 'rgba(100, 130, 255, 0.2)',
                 'rgba(130, 255, 100, 0.2)',
                 'rgba(230, 210, 85, 0.2)'
              ]
          }]
      }
    }
  },
  methods: {
    level() {
      if (this.$store.state.monthTakeOut > 0) {
        return "中級者";
      }
      else {
        return "初心者";
      }
    }
  },
  props: ['pageStack']
}
</script>
