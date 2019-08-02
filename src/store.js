import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
 
Vue.use(Vuex)
var STORAGE_KEY = 'vue-todo';

var db = null;

const store = new Vuex.Store({
  state: {
    database: null,
    todayGreet: 0,
    todayIgnore: 0,
    todayOpen: 0,
    todayTakeOut: 0,
    todayLineGet: 0,
    todayClosing: 0,
    todayMemo: "",
    monthGreet: 0,
    monthIgnore: 0,
    monthOpen: 0,
    monthTakeOut: 0,
    monthLineGet: 0,
    monthClosing: 0,
    totalIgnore: 0,
    totalOpen: 0,
    totalTakeOut: 0,
    totalLineGet: 0,
    totalClosing: 0,
    setGreet: 0,
    setIgnore: 0,
    setOpen: 0,
    setTakeOut: 0,
    setLineGet: 0,
    setClosing: 0,
    setMemo: "",
    test: 0,
    today: "",
    test: "test",
    goneDays: [],
    lineChartData: [],
    lineChartLabel: []
  },
  getters: {
    setGreet(state) { return state.setGreet }
  },
  mutations: {
    init(state, data) {
      state.database = data.database;
    },
    showCount(state, count) {
      state.todayIgnore = count[0];
      state.todayOpen = count[1];
      state.todayLineGet = count[2];
      state.todayTakeOut = count[3];
      state.todayClosing = count[4];
      state.todayMemo = count[5];
      console.log(count)
      for (var i = 0; i < count.length - 1 ; i++) {
        state.todayGreet = state.todayGreet + count[i];
        console.log(count[i])
      }
    },
    setToday(state, day) {
      state.today = day;
    },
    todayIgnorePlus(state) {
      state.todayIgnore++
      state.monthIgnore++
      state.todayGreet++
      state.monthGreet++
    },
    todayIgnoreMinus(state) {
      state.todayIgnore--
      state.monthIgnore--
      state.todayGreet--
      state.monthGreet--
    },
    todayOpenPlus(state) {
      state.todayOpen++
      state.monthOpen++
      state.todayGreet++
      state.monthGreet++
    },
    todayOpenMinus(state) {
      state.todayOpen--
      state.monthOpen--
      state.todayGreet--
      state.monthGreet--
    },
    todayLineGetPlus(state) {
      state.todayLineGet++
      state.monthLineGet++
      state.todayGreet++
      state.monthGreet++
    },
    todayLineGetMinus(state) {
      state.todayLineGet--
      state.monthLineGet--
      state.todayGreet--
      state.monthGreet--
    },
    todayTakeOutPlus(state) {
      state.todayTakeOut++
      state.monthTakeOut++
      state.todayGreet++
      state.monthGreet++
    },
    todayTakeOutMinus(state) {
      state.todayTakeOut--
      state.monthTakeOut--
      state.todayGreet--
      state.monthGreet--
    },
    todayClosingPlus(state) {
      state.todayClosing++
      state.monthClosing++
      state.todayGreet++
      state.monthGreet++
    },
    todayClosingMinus(state) {
      state.todayClosing--
      state.monthClosing--
      state.todayGreet--
      state.monthGreet--
    },
    setIgnorePlus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");
      state.setIgnore++
      state.setGreet++
      if ( yearMonth == todayYearMonth) {
        state.monthIgnore++
        state.monthGreet++
      }
    },
    setIgnoreMinus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");
      state.setIgnore--
      state.setGreet--
      if ( yearMonth == todayYearMonth) {
        state.monthIgnore--
        state.monthGreet--
      }
    },
    setOpenPlus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");
      state.setOpen++
      state.setGreet++
      if ( yearMonth == todayYearMonth) {
        state.monthOpen++
        state.monthGreet++
      }
    },
    setOpenMinus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");      
      state.setOpen--
      state.setGreet--
      if ( yearMonth == todayYearMonth) {
        state.monthOpen--
        state.monthGreet--
      }
    },
    setLineGetPlus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");      
      state.setLineGet++
      state.setGreet++
      if ( yearMonth == todayYearMonth) {
        state.monthLineGet++
        state.monthGreet++
      }
    },
    setLineGetMinus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");      
      state.setLineGet--
      state.setGreet--
      if ( yearMonth == todayYearMonth) {
        state.monthLineGet--
        state.monthGreet--
      }
    },
    setTakeOutPlus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");      
      state.setTakeOut++
      state.setGreet++
      if ( yearMonth == todayYearMonth) {
        state.monthTakeOut++
        state.monthGreet++
      }
    },
    setTakeOutMinus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");      
      state.setTakeOut--
      state.setGreet--
      if ( yearMonth == todayYearMonth) {
        state.monthTakeOut--
        state.monthGreet--
      }
    },
    setClosingPlus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");      
      state.setClosing++
      state.setGreet++
      if ( yearMonth == todayYearMonth) {
        state.monthClosing++
        state.monthGreet++
      }
    },
    setClosingMinus(state, date) {
      var yearMonth = moment(date).format("YYYY-MM");
      var todayYearMonth = moment(state.today).format("YYYY-MM");      
      state.setClosing--
      state.setGreet--
      if ( yearMonth == todayYearMonth) {
        state.monthClosing--
        state.monthGreet--
      }
    },
    totalIgnorePlus(state) {
      state.totalIgnore++
    },
    totalIgnoreMinus(state) {
      state.totalIgnore--
    },
    totalOpenPlus(state) {
      state.totalOpen++
    },
    totalOpenMinus(state) {
      state.totalOpen--
    },
    totalTakeOutPlus(state) {
      state.totalTakeOut++
    },
    totalTakeOutMinus(state) {
      state.totalTakeOut--
    }
  },
  actions: {
    init(context) {
    document.addEventListener('deviceready', function() {
    context.state.today = moment().format("YYYY-MM-DD");
    // プラグインのテスト
    sqlitePlugin.selfTest(function() {
    // テスト成功
    // データベースを開く
    db = sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
    // テーブル作成のSQL実行
    db.executeSql("CREATE TABLE IF NOT EXISTS Test (date date primary key, ignore integer, open integer, lineGet integer, takeOut integer)", [], function(res) {
      // テーブル作成成功

      db.executeSql("alter table Test add column closing integer", [], function(rs) {
      }, 
      function(error) {
      });
      db.executeSql("alter table Test add column memo string", [], function(rs) {
      }, 
      function(error) {
      });


      // データ取得のSQL実行

      context.commit("init", { database: db });
      var start = moment().startOf('month').format("YYYY-MM-DD");
      var end = moment().endOf('month').format("YYYY-MM-DD");

      db.executeSql("SELECT * FROM Test WHERE date = ?", [context.state.today], function(rs) {
        // 取得したデータを表示
        context.commit("showCount",
          [rs.rows.item(0).ignore,
          rs.rows.item(0).open,
          rs.rows.item(0).lineGet,
          rs.rows.item(0).takeOut,
          rs.rows.item(0).closing,
          rs.rows.item(0).memo]);
      }, function(error) {
        // データ取得失敗
          alert(error.message);
        })

      db.executeSql("SELECT * FROM Test WHERE date BETWEEN ? AND ?", [start, context.state.today], function(rs) {
        context.state.test = rs;
        for (var i = 0; i < rs.rows.length; i++) {
          context.state.monthIgnore = context.state.monthIgnore + rs.rows.item(i).ignore;
          context.state.monthOpen = context.state.monthOpen + rs.rows.item(i).open;
          context.state.monthLineGet = context.state.monthLineGet + rs.rows.item(i).lineGet;
          context.state.monthTakeOut = context.state.monthTakeOut + rs.rows.item(i).takeOut;
          context.state.monthClosing = context.state.monthClosing + rs.rows.item(i).closing;
          context.state.monthGreet = context.state.monthGreet + rs.rows.item(i).ignore + rs.rows.item(i).open + rs.rows.item(i).lineGet + rs.rows.item(i).takeOut + rs.rows.item(i).closing;
        }
      }, 
      function(error) {
        // データ取得失敗
        alert(error.message);
      });


      db.executeSql("SELECT * FROM Test WHERE date BETWEEN ? AND ?", [start,end], function(rs) {
        context.state.test = rs;
        for (var i = 0; i < rs.rows.length; i++) {
          context.state.lineChartData.push((rs.rows.item(i).open + rs.rows.item(i).lineGet + rs.rows.item(i).takeOut)*100/(rs.rows.item(i).ignore + rs.rows.item(i).open + rs.rows.item(i).lineGet + rs.rows.item(i).takeOut))
          context.state.lineChartLabel.push(rs.rows.item(i).date)
        }
      }, 
      function(error) {
        // データ取得失敗
        alert(error.message);
      });

      db.executeSql("SELECT * FROM Test", [], function(rs) {
        for (var i = 0; i < rs.rows.length; i++) {
          context.state.goneDays.push(rs.rows.item(i).date);
        }
      }, 
      function(error) {
        // データ取得失敗
        alert(error.message);
      });
      
        }, function(error) {
        // テーブル作成失敗
          alert(error.message);
        });
      }, function(error) {
    // プラグインテスト失敗
      alert(error.message);
    });
    });
    },
    initGoneDays(context) {
      context.state.database.executeSql("SELECT * FROM Test", [], function(rs) {
        for (var i = 0; i < rs.rows.length; i++) {
          context.state.goneDays.push(rs.rows.item(i).date);
        }
      }, 
      function(error) {
        // データ取得失敗
        alert(error.message);
      })
    },
    initMonth(context) {
      console.log("initMonth");
      var start = moment().startOf('month');
      var end = moment().endOf('month');
      context.state.database.executeSql("SELECT * FROM Test WHERE date BETWEEN ? and ?", [start, end], function(rs) {
        for (var i = 0; i < rs.rows.length; i++) {
          context.state.monthIgnore = context.state.monthIgnore + rs.rows.item(i).ignore;
          context.state.monthOpen = context.state.monthOpen + rs.rows.item(i).open;
          context.state.monthLineGet = context.state.monthLineGet + rs.rows.item(i).lineGet;
          context.state.monthTakeOut = context.state.monthTakeOut + rs.rows.item(i).takeOut;
          context.state.monthClosing = context.state.monthClosing + rs.rows.item(i).closing;
          context.state.monthGreet = context.state.monthGreet + rs.rows.item(i).ignore + rs.rows.item(i).open + rs.rows.item(i).lineGet + rs.rows.item(i).takeOut + rs.rows.item(i).closing;
        }
      }, 
      function(error) {
        // データ取得失敗
        alert(error.message);
      })
    },
    insert(context, data) {
      if (context.state.todayGreet > 0 || context.state.todayMemo != "" ) {
        context.state.database.executeSql("INSERT or REPLACE INTO Test (date, ignore, open, lineGet, takeOut, closing, memo) values (?, ?, ?, ?, ?, ?, ?)", [
        context.state.today, 
        context.state.todayIgnore,
        context.state.todayOpen,
        context.state.todayLineGet,
        context.state.todayTakeOut,
        context.state.todayClosing,
        context.state.todayMemo
        ], function(res) {
        }, function(error) {
        // SQL失敗
        alert(error.message);
      });
      } else {        
        context.state.database.executeSql("DELETE FROM Test WHERE date = ?", [context.state.today], function(rs) {
        var res = context.state.goneDays.filter(function(a) {
          return a !== context.state.today;
        });
        context.state.goneDays = res;
        }, function(error) {
          alert(error.message);
        })
      }
    },
      insertMemo(context) {
        context.state.database.executeSql("INSERT or REPLACE INTO Test (date, ignore, open, lineGet, takeOut, closing, memo) values (?, ?, ?, ?, ?, ?, ?)", [
        context.state.today, 
        context.state.todayIgnore,
        context.state.todayOpen,
        context.state.todayLineGet,
        context.state.todayTakeOut,
        context.state.todayClosing,
        context.state.todayMemo
        ], function(res) {
        }, function(error) {
        // SQL失敗
        alert(error.message);
      });
    },
    insertDay(context, day) {
      if (context.state.setGreet > 0 || context.state.setMemo != "" ) {
        context.state.database.executeSql("INSERT or REPLACE INTO Test (date, ignore, open, lineGet, takeOut, closing, memo) values (?, ?, ?, ?, ?, ?, ?)", [
        day, 
        context.state.setIgnore,
        context.state.setOpen,
        context.state.setLineGet,
        context.state.setTakeOut,
        context.state.setClosing,
        context.state.setMemo
        ], function(res) {
        }, function(error) {
        // SQL失敗
        alert(error.message);
        });
      } else {
        context.state.database.executeSql("DELETE FROM Test WHERE date = ?", [day], function(rs) {
        var res = context.state.goneDays.filter(function(a) {
          return a !== day;
        });
        context.state.goneDays = res;
      }, function(error) {
          alert(error.message);
      })
      }
    },
    setDay(context, day) {
        context.state.database.executeSql("SELECT * FROM Test WHERE date = ?", [day], function(rs) {
          if (rs.rows.length > 0) { 
            context.state.setIgnore = rs.rows.item(0).ignore;
            context.state.setOpen = rs.rows.item(0).open;
            context.state.setLineGet = rs.rows.item(0).lineGet;
            context.state.setTakeOut = rs.rows.item(0).takeOut;
            context.state.setClosing = rs.rows.item(0).closing;
            context.state.setMemo = rs.rows.item(0).memo;
            context.state.setGreet =  rs.rows.item(0).ignore + rs.rows.item(0).open + rs.rows.item(0).lineGet + rs.rows.item(0).takeOut + rs.rows.item(0).closing
          } else {
            context.state.setIgnore = 0;
            context.state.setOpen = 0;
            context.state.setLineGet = 0;
            context.state.setTakeOut = 0;
            context.state.setClosing = 0;
            context.state.setGreet =  0;
            context.state.setMemo = "";
          }
        }, function(error) {
          // データ取得失敗
            alert(error.message);
          })
      },
    deleteRecord(context, date) {
      console.log(234234)
      context.state.database.executeSql("DELETE FROM Test WHERE date = ?", [date], function(rs) {
        var res = context.state.goneDays.filter(function(a) {
          return a !== date;
        });
        context.state.goneDays = res;
      }, function(error) {
        alert(error.message);
      })
    },
    pushGoneDays(context) {
      if (context.state.todayGreet == 1 ) {
        context.state.goneDays.push(context.state.today)
      }
    },
    pushGoneDaysOnSet(context, date) {
      if (context.state.setGreet == 1 || (context.state.setMemo != "" && context.state.setGreet == 0 )) {
        context.state.goneDays.push(date)
      }
    },
    getData(context,start) {
      context.state.database.executeSql("SELECT * FROM Test WHERE date BETWEEN ? AND ?", [start, context.state.today], function(rs) {
        context.state.test = rs;
        context.state.monthIgnore = 0;
        context.state.monthOpen = 0;
        context.state.monthLineGet = 0;
        context.state.monthTakeOut = 0;
        context.state.monthClosing = 0;
        context.state.monthGreet = 0;
        for (var i = 0; i < rs.rows.length; i++) {
          context.state.monthIgnore = context.state.monthIgnore + rs.rows.item(i).ignore;
          context.state.monthOpen = context.state.monthOpen + rs.rows.item(i).open;
          context.state.monthLineGet = context.state.monthLineGet + rs.rows.item(i).lineGet;
          context.state.monthTakeOut = context.state.monthTakeOut + rs.rows.item(i).takeOut;
          context.state.monthClosing = context.state.monthClosing + rs.rows.item(i).closing;
          context.state.monthGreet = context.state.monthGreet + rs.rows.item(i).ignore + rs.rows.item(i).open + rs.rows.item(i).lineGet + rs.rows.item(i).takeOut + rs.rows.item(i).closing;
        }
      }, 
      function(error) {
        // データ取得失敗
        alert(error.message);
      });
    }
    }
  })

Vue.prototype.$store = store;

module.exports = store;
