<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">{{ date }}</div>
    </v-ons-toolbar>
    <v-ons-card>
    <p style="text-align: center">
    {{ date }}の声かけ数
      {{$store.state.setGreet}} </br>
    </p>
    <div v-if="$store.state.setGreet > 0">
      <PieChart :pieChartData="pieChartData" :options="options"></PieChart>
    </div>
    <div v-else>
      声かけはありません
    </div>
    </v-ons-card>
    <div v-if="date != $store.state.today">
    <v-ons-card>
    <table>
      <tr>
        <td class="td-button">
          <div class="btn-push" @click="setIgnorePlus">
          ガンシカ
          </div>
        </td>
        <td>
        <p> <span class="count">{{$store.state.setIgnore}} </span>回</p>
        </td>
        <td>
        {{ Math.round($store.state.setIgnore/ $store.state.setGreet * 100) || 0 }} %
        </td>
        <td>
          <div class="btn-circle-3d" @click="setIgnoreMinus">-</div>
        </td>
      </tr>
      <tr>
        <td class="td-button">
        <div class="btn-push" color="blue" @click="setOpenPlus">オープン</div>
        </td>
        <td><p><span class="count">{{$store.state.setOpen}} </span>回</p>
        </td>
        <td>
        {{ Math.round($store.state.setOpen/ $store.state.setGreet * 100) || 0 }} %
        </td>
        <td>
        <div class="btn-circle-3d" @click="setOpenMinus">-</div>
        </td>
      </tr>
      <tr>
        <td class="td-button">
        <div class="btn-push" @click="setLineGetPlus">番ゲ</div>
        </td>
        <td><p><span class="count">{{$store.state.setLineGet}} </span>回</p>
        </td>
        <td>
        {{ Math.round($store.state.setLineGet / $store.state.setGreet * 100) || 0 }} %
        </td>
        <td>
        <div class="btn-circle-3d" @click="setLineGetMinus">-</div>
        </td>
      </tr>
      <tr>
        <td class="td-button">
        <div class="btn-push" @click="setTakeOutPlus">連れ出し</div>
        </td>
        <td><p><span class="count"> {{$store.state.setTakeOut}} </span>回</p>
        </td>
        <td>
      {{ Math.round($store.state.setTakeOut / $store.state.setGreet * 100) || 0}} %
        </td>
        <td>
      <div class="btn-circle-3d" @click="setTakeOutMinus">-</div>
        </td>
      </tr>
      <tr>
        <td class="td-button">
          <div class="btn-push" @click="openModal()">即</div>
        </td>
        <td><p><span class="count">{{$store.state.setClosing}} </span>回</p>
        </td>
        <td>
          {{ Math.round($store.state.setClosing / $store.state.setGreet * 100) || 0}} %
        </td>
        <td>
          <div class="btn-circle-3d" @click="setClosingMinus">-</div>
        </td>
      </tr> 
    </table>
    </v-ons-card>
    <v-ons-card @click="openMemo()" class="memo">
    <h4>メモ</h4>
    <hr>
    <p style="white-space: pre-line"> {{$store.state.setMemo}} </p>
    </v-ons-card>
    </div>
    <div id="modal-open">
      <v-ons-dialog cancelable :visible.sync="dialogVisible">
        <p>即りましたか？</p>
        <button @click="openModal2(); setClosingPlus();">はい</button>
        <button @click="dialogVisible = false">いいえ</button>
      </v-ons-dialog>
    </div>
    <div id="modal-open2">
      <v-ons-dialog cancelable :visible.sync="dialogVisible2">
        <p>おめでとうございます！</p>
          <button @click="twi()">
            Twitterでつぶやく
          </button>
      </v-ons-dialog>
    </div>
    <div id="modal-open3">
      <v-ons-dialog cancelable :visible.sync="dialogMemo">
        <p>メモ</p>
        <textarea id="Memo" v-model="$store.state.setMemo"></textarea>
        <button @click="dialogMemo = false; ">閉じる</button>
      </v-ons-dialog>
    </div>
  </v-ons-page>
</template>

<script>
import Vuex from 'vuex'
import moment from 'moment';
import PieChart from 'components/PieChart.vue'

export default {
  data() {
    return {
      date: "",
      first: true,
      total: null,
      title: "My app",
      intarval: false,
      chat: [],
      count: 0,
      dialogVisible: false,
      dialogVisible2: false,
      dialogMemo: false,
      // グラフオプション
      options : {
        title: {
            display: true,
            text: '集計'
        },
      }
    };
  },
  mounted() {
    this.total = this.$store.state.setGreet
  },
  components: {
    PieChart
  },
  computed: {
    pieChartData() { 
      return {
          // ラベル
          labels: ["ガンシカ", "オープン", "番ゲ", "連れ出し","即"],
          // データ詳細
          datasets: [{
              label: '集計',
              data: [this.$store.state.setIgnore, this.$store.state.setOpen, this.$store.state.setLineGet,this.$store.state.setTakeOut,this.$store.state.setClosing],
              backgroundColor: [
                 'rgba(255, 100, 130, 0.2)',
                 'rgba(100, 130, 255, 0.2)',
                 'rgba(130, 255, 100, 0.2)',
                 'rgba(230, 210, 85, 0.2)',
                 'rgba(230, 110, 35, 0.2)'
              ]
          }]
      }
    }
  },
  methods: {
    setIgnorePlus() {
      if ( this.intarval == false ) {
        this.intarval == true;
        this.$store.commit("setIgnorePlus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.$store.dispatch("pushGoneDaysOnSet",this.date)
        this.total++
        this.intarval == false;
      }
    },
    setIgnoreMinus() {
      if (this.$store.state.setIgnore > 0 && this.intarval == false) {
        this.intarval == true;
        this.$store.commit("setIgnoreMinus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.total--
        this.intarval == false;
      }
    },
    setOpenPlus() {
      if ( this.intarval == false ) {
        this.intarval == true;
        this.$store.commit("setOpenPlus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.$store.dispatch("pushGoneDaysOnSet",this.date)
        this.total++
        this.intarval == false;
      }
    },
     setOpenMinus() {
      if (this.$store.state.setOpen > 0 && this.intarval == false ) {
        this.intarval == true;
        this.$store.commit("setOpenMinus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.total--
        this.intarval == false;
      }
    },
    setLineGetPlus() {
      if ( this.intarval == false ) {
        this.intarval == true;
        this.$store.commit("setLineGetPlus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.$store.dispatch("pushGoneDaysOnSet",this.date)
        this.total++
        this.intarval == false;
      }
    },
    setLineGetMinus() {
      if (this.$store.state.setLineGet > 0 && this.intarval == false ){
        this.intarval == true;
        this.$store.commit("setLineGetMinus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.total--
        this.intarval == false;
      }
    },
    setTakeOutPlus() {
      if ( this.intarval == false ) {
        this.intarval == true;
        this.$store.commit("setTakeOutPlus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.$store.dispatch("pushGoneDaysOnSet",this.date)
        this.total++
        this.intarval == false;      
      }
    },
    setTakeOutMinus() {
      if (this.$store.state.setTakeOut > 0 && this.intarval == false ) {
        this.intarval == true;
        this.$store.commit("setTakeOutMinus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.total--
        this.intarval == false;
      }
    },
    setClosingPlus() {
      if ( this.intarval == false ) {
        this.intarval == true;
        this.$store.commit("setClosingPlus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.$store.dispatch("pushGoneDaysOnSet",this.date)
        this.total++
        this.intarval == false;      
      }
    },
    setClosingMinus() {
      if (this.$store.state.setClosing > 0 && this.intarval == false ) {
        this.intarval == true;
        this.$store.commit("setClosingMinus", this.date);
        this.$store.dispatch('insertDay', this.date);
        this.total--
        this.intarval == false;
      }
    },
    openModal() {
      this.dialogVisible = true
    },
    openModal2() {
      this.dialogVisible = false
      this.dialogVisible2 = true
    },
    openMemo() {
      this.dialogMemo = true
    },
    twi(){
      var twilinkhref= "https://twitter.com/intent/tweet?text=即りました！ --Nカウンターから送信";
      cordova.InAppBrowser.open(twilinkhref, "_system");
    }
  },
  watch: {
    dialogMemo: function(val, oldval) {
      if (val == false) {
        this.$store.dispatch('insertDay', this.date);
        this.$store.dispatch("pushGoneDaysOnSet",this.date);
      };
    }
  },
/*
  watch: {
    total: function(newValue, oldValue) {
       if (newValue > 0 && oldValue == 0 ) {
           console.log("pushGoneDays2")
           this.$store.dispatch("pushGoneDays",this.date)
       }
    }
  },
*/
  props: ["pageStack"]
}
</script>
