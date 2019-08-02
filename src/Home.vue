<template>
  <v-ons-page>
    <v-ons-card>
    <div style="text-align: right;">
    <v-ons-select v-model="selected" modifier="material" style="text-align: right;">
    <option>今週</option>
    <option>{{nowMonth}}</option>
    <option>3ヶ月</option>
    <option>6ヶ月</option>
    <option>1年</option>
    </v-ons-select >
    </div>
    <div v-if="$store.state.monthGreet > 0 ">
      <PieChart :pieChartData="pieChartData" :options="options"></PieChart>
    <p style="text-align: center"> {{start}} ~ {{end}} </p>
    <table class="analyeze">
    <tr>
      <td>
        声かけ数
      </td>
      <td>
      {{$store.state.monthGreet }} 回
      </td>
    </tr>
    <tr>
      <td>
        オープン率
      </td>
      <td>
      {{ (Math.round(($store.state.monthOpen + $store.state.monthLineGet + $store.state.monthTakeOut + $store.state.monthClosing) / $store.state.monthGreet * 1000) / 10) || 0 }} %
      </td>
    </tr>
    <tr>
      <td>
        即数
      </td>
      <td>
      {{$store.state.monthClosing }}
      </td>
    </tr>
    </table>
    </p>
    </div>
    <div v-else>
      声かけはありません
    </div>
    <button @click="download(arrToCSV(), 'test.csv')">csv</button>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import Vuex from 'vuex'
import moment from 'moment';
import PieChart from 'components/PieChart.vue'
import LineChart from 'components/LineChart.vue'

export default {
  data() {
    return {
      title: "My app",
      chat: [],
      count: 0,
      selected: "今月",
      nowMonth: "",
      start: "",
      end: "",
      first: true,
      // グラフオプション
      options : {
          title: {
              display: true,
              text: '集計'
          }
      },
      options2: {
      title: {
        display: true,
        text: 'オープン率'
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: 100,
            suggestedMin: 0,
            stepSize: 10,
            callback: function(value, index, values){
              return  value +  '%'
            }
          }
        }]
      }
    }
    };
  },
  mounted: function(){
    this.nowMonth = moment().month() + 1  + "月";
    this.selected = this.nowMonth ;
    this.end = moment().format("YYYY-MM-DD");
  },
  components: {
    PieChart,
    LineChart
  },
  computed: {
    pieChartData() {
      return {
          // ラベル
          labels: ["ガンシカ", "オープン", "番ゲ", "連れ出し","即"],
          // データ詳細
          datasets: [{
              label: '今月の集計',
              data: [this.$store.state.monthIgnore, 
              this.$store.state.monthOpen, 
              this.$store.state.monthLineGet,
              this.$store.state.monthTakeOut,
              this.$store.state.monthClosing],
              backgroundColor: [
                 'rgba(255, 100, 130, 0.2)',
                 'rgba(100, 130, 255, 0.2)',
                 'rgba(130, 255, 100, 0.2)',
                 'rgba(230, 210, 85, 0.2)',
                 'rgba(230, 110, 35, 0.2)'
              ]
          }]
      }
    },
    lineChartData(){
      return {
        labels: [1,2,3,4,5,6,7,8,9],
        datasets: [
          {
            label: '',
            data: [1,2,null, 4, 5,6 ,null ,8, 9],
            borderColor: "rgba(255,0,0,1)",
            backgroundColor: "rgba(0,0,0,0)"
          }
        ],
      }
    }
  },
  methods: {
    arrToCSV() {
      const arr = [
      ['ご利用年月日', 'ご利用"箇所', 'ご,利,用,額'],
      ['2017/01/29', '', '""345'],
      ['2017/02/01', '"ＡＭ"ＡＺＯＮ．ＣＯ．ＪＰ', '7,362'],
      ];
      return arr
      .map(row => row.map(str => '"' + (str ? str.replace(/"/g,     '""') : '') + '"')
      )
      .map(row => row.join(','))
      .join('\n');
    },
    download(data, name) {
  const anchor = document.createElement('a');
  if (window.URL && anchor.download !== undefined) {
    // utf8
    const bom = '\uFEFF';
    const blob = new Blob([bom, data], { type: 'text/csv' });
    anchor.download = name;

    // window.URL.createObjectURLを利用
    // https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL
    anchor.href = window.URL.createObjectURL(blob);

    // これでも可
    // anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(bom + data);

    // firefoxでは一度addしないと動かない
    document.body.appendChild(anchor);
    anchor.click();
    anchor.parentNode.removeChild(anchor);
  }
  }
  },
  watch: {
    selected: function(val, oldval) {
      this.start = moment().endOf('month').format("YYYY-MM-DD");
      this.end = moment().endOf('month').format("YYYY-MM-DD");
      if (val == "今週") {
        this.start = moment().subtract(1, 'day').startOf('week').add(1, 'day').format("YYYY-MM-DD");
        this.end = moment().subtract(1, 'day').endOf('week').add(1, 'day').format("YYYY-MM-DD");
      } else if (val == this.nowMonth) {
        this.start = moment().startOf('month').format("YYYY-MM-DD");
        this.end = moment().endOf('month').format("YYYY-MM-DD");
      } else if (val == "3ヶ月") {
        this.start = moment().subtract(2, 'months').startOf('month').format("YYYY-MM-DD");
        this.end = moment().endOf('month').format("YYYY-MM-DD");
      } else if (val == "6ヶ月") {
        this.start = moment().subtract(5, 'months').startOf('month').format("YYYY-MM-DD");
        this.end = moment().endOf('month').format("YYYY-MM-DD");
      } else if (val == "1年") {
        this.start = moment().subtract(11, 'months').startOf('month').format("YYYY-MM-DD");
        this.end = moment().endOf('month').format("YYYY-MM-DD");
      }
      if (this.first == true) {
        this.first = false;
      } else {
        this.$store.dispatch('getData', this.start);
      }
    }
  }
}

</script>
