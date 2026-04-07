(data)=>{
console.log(data);
var  option = {
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
      
    ]
  },
  series: [
    {
      //name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
};
if(data){
  console.log(data.indicator)
  option  = {
    title: {
            text: '***雷达图',
            left: 'left',
            textStyle: {
              color: '#FFFFFF',  // 标题字体颜色设置为白色
              fontSize: 22
            }
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 60,
            data: ['技控点合格率', '自控'],
            textStyle: {
              color: '#FFFFFF'  // 图例文字颜色也设为白色
            }
          },
          label: {
            show: true,
            position: 'top',
            distance: 5,
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: [4, 6],
            borderRadius: 4
          },
          radar: {
            shape: 'circle',
            center: ['40%', '55%'],
            radius: '75%',
            indicator: [
        {
            "name": "尼龙车间",
            "max": 100,
            "min": 70
        },
        {
            "name": "氨化车间",
            "max": 100,
            "min": 70
        },
        {
            "name": "氯化车间",
            "max": 100,
            "min": 70
        },
        {
            "name": "氯碱车间",
            "max": 100,
            "min": 70
        },
        {
            "name": "酯化车间",
            "max": 100,
            "min": 70
        }
    ],
            axisName: {
              color: '#FFFFFF',
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                color: ['#ffffff', '#cccccc', '#eeeeee']
              }
            }
          },
          series: [
            {
              //name: '***雷达图',
              type: 'radar',
              data: [
                {
                  name: "技控点合格率",
                  value: [
                      99.18,
                      99.37,
                      99.85,
                      98.11,
                      99.81
                  ],
                  itemStyle: {
                    color: 'rgba(242, 207, 67, 1)'
                  },
                  lineStyle: {
                    color: 'rgba(242, 207, 67, 1)'
                  }
                },
                {
                  name: "技控点合格率",
                  value: [
                      99.18,
                      99.37,
                      99.85,
                      98.11,
                      99.81
                  ],
                  itemStyle: {
                    color: 'rgba(48, 148, 229, 1)'
                  },
                  lineStyle: {
                    color: 'rgba(48, 148, 229, 1)'
                  }
                }
              ]
            }
            ]
    }
}

return option
}