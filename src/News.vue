<template>
  <v-ons-page>
    <div class="main">
    <ons-card>
    <div class="header">
    本日の声かけ数<span class="todayCount">   {{$store.state.todayGreet}}  </span> 回</div>
    <div class="calender">
    <table>
      <tr>
        <td class="td-button">
          <div class="btn-push" @click="todayIgnorePlus">
          ガンシカ
          </div>
        </td>
        <td>
        <p> <span class="count">{{$store.state.todayIgnore}} </span>回</p>
        </td>
        <td>
        {{ Math.round($store.state.todayIgnore/ $store.state.todayGreet * 100) || 0 }} %
        </td>
        <td>
          <div class="btn-circle-3d" @click="todayIgnoreMinus">-</div>
        </td>
      </tr>
      <tr>
        <td class="td-button">
        <div class="btn-push" color="blue" @click="todayOpenPlus">オープン</div>
        </td>
        <td><p><span class="count">{{$store.state.todayOpen}} </span>回</p>
        </td>
        <td>
        {{ Math.round($store.state.todayOpen/ $store.state.todayGreet * 100) || 0 }} %
        </td>
        <td>
        <div class="btn-circle-3d" @click="todayOpenMinus">-</div>
        </td>
      </tr>
      <tr>
        <td class="td-button">
        <div class="btn-push" @click="todayLineGetPlus">番ゲ</div>
        </td>
        <td><p><span class="count">{{$store.state.todayLineGet}} </span>回</p>
        </td>
        <td>
        {{ Math.round($store.state.todayLineGet / $store.state.todayGreet * 100) || 0 }} %
        </td>
        <td>
        <div class="btn-circle-3d" @click="todayLineGetMinus">-</div>
        </td>
      </tr>
      <tr>
        <td class="td-button">
        <div class="btn-push" @click="todayTakeOutPlus">連れ出し</div>
        </td>
        <td><p><span class="count"> {{$store.state.todayTakeOut}} </span>回</p>
        </td>
        <td>
      {{ Math.round($store.state.todayTakeOut / $store.state.todayGreet * 100) || 0}} %
        </td>
        <td>
      <div class="btn-circle-3d" @click="todayTakeOutMinus">-</div>
        </td>
      </tr>
      <tr>
        <td class="td-button">
          <div class="btn-push" @click="openModal()">即</div>
        </td>
        <td><p><span class="count">{{$store.state.todayClosing}} </span>回</p>
        </td>
        <td>
          {{ Math.round($store.state.todayClosing / $store.state.todayGreet * 100) || 0}} %
        </td>
        <td>
          <div class="btn-circle-3d" @click="todayClosingMinus">-</div>
        </td>
      </tr> 
    </table>
    </div>
    </ons-card>
    </div>
    <v-ons-card @click="openMemo()" class="memo">
    <h4>メモ</h4>
    <hr>
    <p style="white-space: pre-line"> {{$store.state.todayMemo}} </p>
    </v-ons-card>
      <div id="modal-open">
        <v-ons-dialog cancelable :visible.sync="dialogVisible">
          <p>即りましたか？</p>
          <button @click="openModal2(); todayClosingPlus();">はい</button>
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
          <textarea id="Memo" v-model="$store.state.todayMemo"></textarea>
          <div style="text-align: right">
          <button @click="dialogMemo = false; ">閉じる</button>
          </div>
        </v-ons-dialog>
      </div>

  </v-ons-page>
</template>

<script>
import Vuex from 'vuex'

export default {
  data() {
    return {
      title: "My app",
      chat: [],
      count: 0,
      dialogVisible: false,
      dialogVisible2: false,
      dialogMemo: false,
      memo: ""
    };
  },
  methods: {
    initDB() {
      this.$store.dispatch('init')
    },
    todayIgnorePlus() {
      this.$store.commit("todayIgnorePlus");
      this.$store.dispatch('insert');
      this.$store.dispatch("pushGoneDays");
    },
    todayIgnoreMinus() {
      if (this.$store.state.todayIgnore > 0) {
        this.$store.commit("todayIgnoreMinus");
        this.$store.dispatch('insert');
      }
    },
    todayOpenPlus() {
      this.$store.commit("todayOpenPlus");
      this.$store.dispatch('insert');
      this.$store.dispatch("pushGoneDays");
    },
     todayOpenMinus() {
      if (this.$store.state.todayOpen > 0) {
        this.$store.commit("todayOpenMinus");
        this.$store.dispatch('insert');
      }
    },
    todayLineGetPlus() {
      this.$store.commit("todayLineGetPlus");
      this.$store.dispatch('insert');
      this.$store.dispatch("pushGoneDays");
    },
    todayLineGetMinus() {
      if (this.$store.state.todayLineGet > 0) {
        this.$store.commit("todayLineGetMinus");
        this.$store.dispatch('insert');
      }
    },
    todayTakeOutPlus() {
      this.$store.commit("todayTakeOutPlus");
      this.$store.dispatch('insert');
      this.$store.dispatch("pushGoneDays")
    },
    todayTakeOutMinus() {
      if (this.$store.state.todayTakeOut > 0) {
        this.$store.commit("todayTakeOutMinus");
        this.$store.dispatch('insert');
      }
    },
    todayClosingPlus() {
      this.$store.commit("todayClosingPlus");
      this.$store.dispatch('insert');
      this.$store.dispatch("pushGoneDays")
    },
    todayClosingMinus() {
      if (this.$store.state.todayClosing > 0) {
        this.$store.commit("todayClosingMinus");
        this.$store.dispatch('insert');
      }
    },
    todayMemo() {
      this.$store.dispatch('insertMemo');
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
        this.$store.dispatch('insert');
      };
    }
  }
}
</script>

<style>
* {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-box-shadow: none;
    box-shadow: none;   
    outline: none;
}
.main{
  
}
.btn-push {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  background-color: #ffad36;
  font-size: 16px;
  color: #FFF;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 24px;
  border-radius: 4px;
  border-bottom: 2px solid #d37800;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
}

.btn-push:active {
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
    border-bottom: none;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
    background-color: #ffa300;
}

.btn-circle-3d {
  display: inline-block;
  text-decoration: none;
  background: #ff8181;
  color: #FFF;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 1px #bd6565;
  transition: .4s;
}

.btn-circle-3d:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  border-bottom: none;
}

table {
  width: 90%; 
}
p {
  color: #363636;
}
.calender {
  text-align: center;
}

td.td-button{
  padding-bottom: 10px;
  height: 20px;
}
.todayCount {
  font-size: 2.5em; 
}
.count {
  font-size: 1.7em; 
}
.header {
  text-align: center;
  margin-bottom: 5px;
}
#Memo
{
    height: 200px;
    width: 300px;
}
</style>