<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: ['lineChartData','options'],
  mounted: function(){
      this.renderChart(this.lineChartData, this.options)
  },
  watch : {
  	  lineChartData : function(val) {
  	  	  this.renderChart(this.lineChartData, this.options)
  	  },
  	  options : function(val) {
  	  	  this.renderChart(this.lineChartData, this.options)
  	  }
  }
}
</script>