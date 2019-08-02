<script>
import { Pie } from 'vue-chartjs'

export default {
  name: 'PieChart',
  extends: Pie,
  props: ['pieChartData','options'],
  mounted: function(){
      this.renderChart(this.pieChartData, this.options)
  },
  watch : {
  	  pieChartData : function(val) {
  	  	  this.renderChart(this.pieChartData, this.options)
  	  },
  	  options : function(val) {
  	  	  this.renderChart(this.pieChartData, this.options)
  	  }
  }
}
</script>