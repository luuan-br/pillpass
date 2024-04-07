const createApp=Vue["createApp"];createApp({data(){return{ranges:[{label:"Gastos com Medicamentos",value:700,min:0,max:2e3,discount:.8,position:"10px"},{label:"Gastos com Higiene Pessoal",value:50,min:0,max:2e3,discount:.5,position:"10px"},{label:"Gastos com Beleza e Cosmético",value:50,min:0,max:2e3,discount:.3,position:"10px"}]}},computed:{total(){return this.ranges.reduce((e,a)=>e+Number(a.value),0)},totalWithDiscount(){var e=this.ranges.reduce((e,a)=>e+Number(a.value)-Number(a.value)*a.discount,0);return Number(e).toFixed(0)}},methods:{setValue(e){var a=this.ranges[e].value,s=this.ranges[e].min,t=this.ranges[e].max,a=Number(100*(a-s)/(t-s));this.ranges[e].position=`calc(${a}% + (${10-.2*a}px))`},changeValueRange(e,a){e=e.replaceAll(/\D/g,"")||0;this.ranges[a].value=e>this.ranges[a].max?this.ranges[a].max:e,this.setValue(a)}},mounted(){this.ranges.forEach((e,a)=>{this.setValue(a)})}}).mount("#savings-calculator");