function initChart(chart){
    const ctx = document.getElementById('myChart');

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['FSAW', 'FSPW', 'FSOC', 'FSMA', 'FSAR', 'DSNL', 'DSNS', 'DSHS', 'DSHU', 'DSSP', 'DVUP', 'DVCC', 'SCIS'],
        datasets: [{
          label: '# of Classes',
          data: [28, 10, 15, 30, 37, 48, 36, 54, 69, 65, 70, 61, 57],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    }

function shapeDataForLineChart(array) {
    return array.reduce((collection, item) => {
        if(!collection[item.gen_ed]) {
        colection[item.gen_ed] = [item]
        } else {
        collecion[item.category].push(item);
        }
        return collection;
    }, {});
    }

async function mainEvent () {
    const results = await fetch('https://api.umd.io/v1/courses');
    const storedList = await results.json();
    const chartTarget = document.querySelector('#myChart')
    initChart(chartTarget);
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());