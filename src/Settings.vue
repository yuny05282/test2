<template>
  <v-ons-page>
    <div>
    <div id="runner-top">
    <div class="c-calender">
      <div class="c-calender__heading">
        <div class="c-calender__prev" @click="goPrevMonth"><</div>
        <div class="c-calender__current">
          {{ yearMonth }}
        </div>
        <div class="c-calender__next" @click="goNextMonth">></div>
      </div>

      <table class="calendar">
        <tr>
          <th>日</th>
          <th>月</th>
          <th>火</th>
          <th>水</th>
          <th>木</th>
          <th>金</th>
          <th>土</th>
        </tr>
        <template v-for="week in calendarData">
          <tr>
            <template v-for="day in week">
              <td class="sunday" v-if="day.day < todayDate && current == 0" align="center" v-bind:class='{goneDay: day["check"]}' @click="push(day.day, yearMonth)">{{ day["day"] }}</td>
              <td v-if="day.day > todayDate && current == 0" align="center" class='glay'>{{ day["day"] }}</td>
              <td v-if="day.day == todayDate && current == 0" align="center" class='today'>{{ day["day"] }}</td>
              <td v-if="current < 0" align="center" v-bind:class='{goneDay: day["check"]}' @click="push(day.day, yearMonth)">{{ day["day"] }}</td>
              <td v-if="current > 0" align="center" class='glay'>{{ day["day"] }}</td>
            </template>
          </tr>
        </template>
      </table>
      </div>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import moment from 'moment'
import dayData from "./dayData.vue"
export default {
  data: () => ({
    current: 0,
    todayDate: "",
    todayMonth: ""
  }),
  created: function() {
    this.todayDate = moment().date();
    this.todayMonth = moment().date();
  },
  computed: {
    currentMoment() {
      return moment().add(this.current, 'months')
    },
    yearMonth() {
      return this.currentMoment.format('YYYY-MM')
    },
    goneDays(){
      return this.$store.state.goneDays
    },
    calendarData() {
      // この月に何日まであるかを算出
      const numOfMonth = this.currentMoment.endOf('month').date()
      // この月の1日〜最終日までの配列
      const daysOfMonth = [...Array(numOfMonth).keys()].map(i => ++i)
      // 1日の曜日（0~6の数値で取得）
      const firstWeekDay = this.currentMoment.startOf('month').weekday()

      // 週ごとの二次元配列を生成
      const data = [...Array(6)].map((empty, weekIndex) =>
        [...Array(7)].map((empty, dayIndex) => {
          const i = 7 * weekIndex + dayIndex - firstWeekDay
          if (i < 0 || daysOfMonth[i] === undefined) {
            return { day: null, check: null}
          }
          var date = moment(this.yearMonth).add('days', i).format("YYYY-MM-DD");
          var check = this.goneDays.some(item => item === date)
          return { day: daysOfMonth[i], check: check}
        })
      )
      // 全てnullの配列があれば除去する
      return data.filter(week => week.filter(day => day != null).length > 0)
    },
  },
  methods: {
    goNextMonth() {
      this.current++
    },
    goPrevMonth() {
      this.current--
    },
    push(day,yearMonth) {
      console.log(yearMonth)
      if (day == null){
        return null;
      };
      var date = moment(yearMonth).add('days', day-1).format("YYYY-MM-DD") 
      var pageToPush = {
        extends: dayData,
        data() {
          return {
            date: date
          };
        }
      };
      this.$store.dispatch('setDay', date);
      this.pageStack.push(pageToPush);
    },
    checkGone(day,yearMonth) {
      var date = moment(yearMonth).add('days', day-1).format("YYYY-MM-DD");
      if (this.$store.goneDays) {
      var check = this.$store.goneDays.some(item => item === date)
      return check
      }
    }
  },
  props: ["pageStack"]
}
</script>

<style>
.goneDay {
  background-color: #ff3c4136;
}
.today {
  background: #fffb00b5;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}
#runner-top > * {
    width: 100%;
    margin: 10px auto;
    padding: 2px;
    border-radius: 16px;
}
.c-calender {
    box-sizing: border-box;
    width: 100%;
    font-size: 1em;
    background-color: white;
}
.calendar {
  width:100%;
  height:250px;
}
.c-calender__heading {
    width:100%;
    display: flex;
    height: 26px;
    margin-bottom: 8px;
    line-height: 26px;
    text-align: center;
}
.c-calender__current {
    flex-basis: 60%;
}
.c-calender__prev, .c-calender__next {
    flex-basis: 20%;
    display: block;
    background: #eee;
    border-radius: 8px;
    text-decoration: none;
}
td:first-child {
    color: #ff9c78;
}
td:last-child {
    color: #56a1ff;
}
th:first-child {
    color: #ff9c78;
}
th:last-child {
    color: #56a1ff;
}
.glay {
  color: #6f6f6fb5;
}
</style>