const ctx = document.getElementById('myChart1');

Chart.defaults.font.size = 19;
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Sales in ₹',
      data: [2200,4300,1100,7280,4238,9248,2685],
      borderWidth: 1,
      pointHoverRadius: 10 // Increase the size of the point on hover
    }]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: 'white' // Change color of legend labels
        },
        onClick: (e, legendItem, legend) => {
          // Do nothing on legend label click
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white' // Change font color of y-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)' // Change color and opacity of y-axis grid lines
        }
      },
      x: {
        ticks: {
          color: 'white' // Change font color of x-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)' // Change color and opacity of x-axis grid lines
        }
      }
    },
    labels: {
      // This more specific font property overrides the global property
      font: {
        size: 19
      },
      ticks: {
        color: 'white' // Change font color of y-axis labels
      },
    },
    tooltips: {
      backgroundColor: 'rgba(0,0,0,0.8)', // Customize tooltip background color
      bodyColor: 'white', // Customize text color within tooltip
      titleColor: 'white', // Customize title color within tooltip
      caretPadding: 10, // Increase padding of the caret
      cornerRadius: 5 // Adjust tooltip box corner radius
    },
    responsive: true,
    maintainAspectRatio: false,
    height: 1020,
    width: 252
  }
});
