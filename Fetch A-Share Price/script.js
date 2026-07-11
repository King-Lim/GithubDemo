const chartDom = document.getElementById('chartBox');
const myChart = echarts.init(chartDom);
const tableDom = document.querySelector('#stockTable tbody');
const btn = document.getElementById('searchBtn');
const input = document.getElementById('stockCode');

// 点击查询
btn.addEventListener('click', getStockData);
// 回车查询
input.addEventListener('keydown', e => e.key === 'Enter' && getStockData())

async function getStockData() {
    const code = input.value.trim();
    if (!code) return alert('请输入股票代码');
    // 免费公开股票历史日线接口（示例密钥仅支持演示，自己去https://www.mairuiapi.com/getlicence申请免费key替换）
    const baseKey = 'B6B19BE5-9D91-4D2E-A814-769E1423632C';
    //const apiUrl = `https://api.mairuiapi.com/hszb/dayline/${code}/30/${baseKey}`;
    const apiUrl = ` https://api.mairuiapi.com/hsstock/real/time/${code}/${baseKey}`

    try {
        const res = await fetch(apiUrl);
        const json = await res.json();

        // ====================== 这里是你要的 console.log ======================
        console.log('✅ 接口请求成功，返回结果：', json);
        console.log('📊 返回数据类型：', typeof json);
        console.log('📦 是否为数组：', Array.isArray(json));
        // ====================================================================

        // 增加数据校验，防止接口404/报错导致页面崩溃
        if (!json || !Array.isArray(json)) {
            alert('接口返回数据格式错误，不是数组！');
            return;
        }

        renderChart(json);
        renderTable(json);
        
    } catch (err) {
        alert('接口请求失败：' + err.message);
        console.error(err);
    }
}

// 渲染ECharts折线图（收盘价波动曲线）
function renderChart(dataArr) {
    // 倒序：日期从小到大
    const sortData = dataArr.reverse();
    const xData = []; // X轴日期
    const closeData = []; // 收盘价
    const openData = []; // 开盘价

    sortData.forEach(item => {
        xData.push(item.date);
        closeData.push(item.close);
        openData.push(item.open);
    })

    const option = {
        title: { text: `股票${input.value}近30个交易日价格走势` },
        tooltip: { trigger: 'axis' },
        legend: { data: ['收盘价', '开盘价'] },
        xAxis: { type: 'category', data: xData, axisLabel: { rotate: 30 } },
        yAxis: { type: 'value' },
        series: [
            { name: '收盘价', type: 'line', data: closeData, smooth: true, itemStyle: { color: '#f5222d' } },
            { name: '开盘价', type: 'line', data: openData, smooth: true, itemStyle: { color: '#1677ff' } }
        ]
    }
    myChart.setOption(option);
}

// 渲染表格
function renderTable(dataArr) {
    tableDom.innerHTML = '';
    dataArr.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${item.date}</td>
      <td>${item.open}</td>
      <td>${item.close}</td>
      <td>${item.high}</td>
      <td>${item.low}</td>
      <td>${item.volume}</td>
    `;
        tableDom.appendChild(tr);
    })
}

// 窗口缩放自适应图表
window.addEventListener('resize', () => myChart.resize())

// 页面默认加载一次数据
getStockData();