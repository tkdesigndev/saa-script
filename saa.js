$(document).ready(function(){ $('.ertag .w-dyn-item').each(function() {$(this).attr('id', 'item-'+ $(this).children('.idtext').text().trim());}); });
$(document).ready(function(){ $('.barchart .w-dyn-item').each(function() {$(this).attr('id', 'bc-'+ $(this).children('.bctext').text().trim());}); });
$(document).ready(function(){ $('.barchart .w-dyn-item').each(function() {$(this).attr('id', 'ml-'+ $(this).children('.mltext').text().trim());}); });

$(function(){

  /* Initial bar chart */
  var chartDom = document.getElementById('barChart');
  var myChart = echarts.init(chartDom);
  var option;	

  option = {
        xAxis: {
        type: 'category',
        axisLine: {
            show: false
        },
        axisTick: undefined,
        axisLabel: {
        interval: false,
        margin: 15,
        formatter: function (value, index) {
            return option.series[0].data[index] + '%\n\n' + value;
        }
        },
        splitLine: {
            show: false
        },
        data: [
            'Aktien',
            'Anleihen',
            'Private Equity',
            'Private Debt',
             'Immobilien',
             'Gold',
             'Liquidität'
         ]
         },
         yAxis: {
            show: false,
            max: 100
         },
         series: [
                    {
                        data: [0,0,0,0,0,0,0],
                        type: 'bar',
                        barMaxWidth: 40,
                        showBackground: true,
                        color: '#012E5D',
                        backgroundStyle: {
                        color: '#ECEEF2'
                        },
                        barBorderRadius: [0, 0, 5, 5]
                    }
                    ]
         };
  option && myChart.setOption(option);

  /* Initial multi-bar chart */
  var multiChartDom = document.getElementById('multiBar');
  var multiChart = echarts.init(multiChartDom);
  var multiOption;

  var xLabels = [
  'Jahr 2018',
  'Jahr 2019',
  'Euro-Krise',
  'Tech-Blase',
  'Finanzkrise'
];
var xDates = [
  '03.02 - 03.03',
  '07.07 - 03.09',
  '04.11 - 09.11',
  '02.20- 04.20',
  '12.20- 12.21'
];
multiOption = {
  legend: {
    bottom: 0
  },
  tooltip: {},
  dataset: {
    source: [
      ['product', 'SAA Portfolio', 'MSCI AC WORLD E', 'DAX 40 Performance'],
      ['Jahr 2018', 0, 0, 0],
      ['Jahr 2019', 0, 0, 0],
      ['Euro-Krise', 0, 0, 0],
      ['Tech-Blase', 0, 0, 0],
      ['Finanzkrise', 0, 0, 0]
    ]
  },
  xAxis: {
    type: 'category',
    position: 'top',
    axisTick: undefined,
    axisLabel: {
      formatter: function (value, index) {
        return xLabels[index] + '\n' + xDates[index];
      }
    }
  },
  yAxis: { show: false },
  series: [
    {
      barGap: '50%',
      type: 'bar',
      color: '#FF9947',
      barMaxWidth: 25,
      label: { normal: { color: '#384B76', show: true, position: 'bottom' } }
    },
    {
      barGap: '50%',
      type: 'bar',
      color: '#002E5D',
      barMaxWidth: 25,
      label: { normal: { color: '#384B76', show: true, position: 'bottom' } }
    },
    {
      barGap: '50%',
      type: 'bar',
      color: '#838CAA',
      barMaxWidth: 25,
      label: { normal: { color: '#384B76', show: true, position: 'bottom' } }
    }
  ]
};

multiOption && multiChart.setOption(multiOption);


  $(".saa-fake-submit").on('click', function(e){
     e.preventDefault();
     
     /* Define selections */
     let mio = $('#mio').val();
     let group_1 = $('input[name="group_1"]:checked').val();
     let group_2 = $('input[name="group_2"]:checked').val();
     let group_3 = $('input[name="group_3"]:checked').val();
     
     /* Determine result */
     let result = "";
     if(group_2 == "Langfristig" && group_3 == "Ja") {
       if(group_1 == "Konservativ") { result = "AI-R1"; }
       if(group_1 == "Ausgewogen") { result = "AI-R2"; }
       if(group_1 == "Rendite") { result = "AI-R3"; }
       if(group_1 == "Spekulativ") { result = "AI-R4"; }
       $("h2.saa-result").html(result);
     } else {
       if(group_1 == "Konservativ") { result = "R1"; }
       if(group_1 == "Ausgewogen") { result = "R2"; }
       if(group_1 == "Rendite") { result = "R3"; }
       if(group_1 == "Spekulativ") { result = "R4"; }
       $("h2.saa-result").html(result);
     }
     
     /* Set headline stats */
     $("div.initial").hide();
     $(".ertag .w-dyn-item div").hide();
     $("#item-" + result + " div").show();
     
     /* Activate button */
     $(".saa-modal-button").css("background-color","#FF9947");
     $(".saa-modal-button").css("border-color","#FF9947");

     /* Populate hidden fields */
     $('input#SAA-AMOUNT').val(mio);
     $('input#SAA-RISK').val(group_1);
     $('input#SAA-INV-HORIZONT').val(group_2);
     $('input#SAA-ILLIQUID-ASSETS').val(group_3);
     $('input#SAA-MODEL-RESULT').val(result);

     /* Initial bar chart variables */   
     var b1 = 0; var b2 = 0; var b3 = 0; var b4 = 0; var b5 = 0; var b6 = 0; var b7 = 0;
     
     /* Update bar chart */
     b1 = $("#bc-" + result + " p.aktien").text();
     b2 = $("#bc-" + result + " p.anleihen").text();
     b3 = $("#bc-" + result + " p.pe").text();
     b4 = $("#bc-" + result + " p.pd").text();
     b5 = $("#bc-" + result + " p.immob").text();
     b6 = $("#bc-" + result + " p.gold").text();
     b7 = $("#bc-" + result + " p.liq").text();
     			
                option = {
                    xAxis: {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: undefined,
                    axisLabel: {
                        interval: false,
                        margin: 15,
                        formatter: function (value, index) {
                        return option.series[0].data[index] + '%\n\n' + value;
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: [
                        'Aktien',
                        'Anleihen',
                        'Private Equity',
                        'Private Debt',
                        'Immobilien',
                        'Gold',
                        'Liquidität'
                    ]
                    },
                    yAxis: {
                    show: false,
                    max: 100
                    },
                    series: [
                    {
                        data: [b1, b2, b3, b4, b5, b6, b7],
                        type: 'bar',
                        barMaxWidth: 30,
                        showBackground: true,
                        color: '#012E5D',
                        backgroundStyle: {
                        color: '#ECEEF2'
                        },
                        barBorderRadius: [0, 0, 5, 5]
                    }
                    ]
                };
                
                option && myChart.setOption(option);

        /* Initial multi bar chart */  
        var m1 = 0; var m2 = 0; var m3 = 0; var m4 = 0; var m5 = 0; var m6 = 0; var m7 = 0; var m8 = 0; var m9 = 0; var m10 = 0; var m11 = 0; var m12 = 0;
        
        /* Update multi bar chart */
        m1 = $("#ml-" + result + " p.2018-saa1").text();
        m2 = $("#ml-" + result + " p.2018-msci").text();
        m3 = $("#ml-" + result + " p.2018-dax").text();        
        
        m4 = $("#ml-" + result + " p.2019-saa1").text();
        m5 = $("#ml-" + result + " p.2019-msci").text();
        m6 = $("#ml-" + result + " p.2019-dax").text();

        m7 = $("#ml-" + result + " p.ek-saa1").text();
        m8 = $("#ml-" + result + " p.ek-msci").text();
        m9 = $("#ml-" + result + " p.ek-dax").text();

        m10 = $("#ml-" + result + " p.tb-saa1").text();
        m11 = $("#ml-" + result + " p.tb-msci").text();
        m12 = $("#ml-" + result + " p.tb-dax").text();

        m13 = $("#ml-" + result + " p.fk-saa1").text();
        m14 = $("#ml-" + result + " p.fk-msci").text();
        m15 = $("#ml-" + result + " p.fk-dax").text();

        multiOption = {
        legend: {
            bottom: 0
        },
        tooltip: {},
        dataset: {
            source: [
            ['product', 'SAA Portfolio', 'MSCI AC WORLD E', 'DAX 40 Performance'],
            ['Jahr 2018', m1, m2, m3],
            ['Jahr 2019', m4, m5, m6],
            ['Euro-Krise', m7, m8, m9],
            ['Tech-Blase', m10, m11, m12],
            ['Finanzkrise', m13, m14, m15]
                ]
            },
            xAxis: {
                type: 'category',
                position: 'top',
                axisTick: undefined,
                axisLabel: {
                formatter: function (value, index) {
                    return xLabels[index] + '\n' + xDates[index];
                }
                }
            },
            yAxis: { show: false },
            series: [
                {
                barGap: '50%',
                type: 'bar',
                color: '#FF9947',
                barMaxWidth: 25,
                label: { normal: { color: '#384B76', show: true, position: 'bottom' } }
                },
                {
                barGap: '50%',
                type: 'bar',
                color: '#002E5D',
                barMaxWidth: 25,
                label: { normal: { color: '#384B76', show: true, position: 'bottom' } }
                },
                {
                barGap: '50%',
                type: 'bar',
                color: '#838CAA',
                barMaxWidth: 25,
                label: { normal: { color: '#384B76', show: true, position: 'bottom' } }
                }
            ]
            };

            multiOption && multiChart.setOption(multiOption);

            });
})

let timeStamp = new Date().toLocaleString();
let formatDate2 = timeStamp.replace(new RegExp('/', 'g'), '-');
$("input[name='Opt In Timestamp saa-website-tool']").val(formatDate2);
