// const ctx = document.getElementById('myChart1');

// Chart.defaults.font.size = 19;
// new Chart(ctx, {
//   type: 'bar', // Change type to 'bar' for bar chart
//   data: {
//     labels: ['Car parking', 'car washing', 'denting and painting', 'ev charging', 'car inspection'],
//     datasets: [{
//       label: 'Sales in ₹',
//       data: [0, 0, 0, 0, 0],
//       backgroundColor: 'rgba(54, 162, 235, 0.2)', // Background color of bars
//       borderColor: 'rgba(54, 162, 235, 1)', // Border color of bars
//       borderWidth: 1.5,
//       hoverBackgroundColor: 'rgba(75,192,192,0.4)', // Background color on hover
//       hoverBorderColor: 'rgba(75,192,192,1)', // Border color on hover
//     }]
//   },
//   options: {
//     plugins: {
//       legend: {
//         labels: {
//           color: 'white' // Change color of legend labels
//         },
//         onClick: (e, legendItem, legend) => {
//           // Do nothing on legend label click
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           color: 'white' // Change font color of y-axis labels
//         },
//         grid: {
//           color: 'rgba(255, 255, 255, 0.1)' // Change color and opacity of y-axis grid lines
//         }
//       },
//       x: {
//         ticks: {
//           color: 'white' // Change font color of x-axis labels
//         },
//         grid: {
//           color: 'rgba(255, 255, 255, 0.1)' // Change color and opacity of x-axis grid lines
//         }
//       }
//     },
//     labels: {
//       // This more specific font property overrides the global property
//       font: {
//         size: 19
//       },
//       ticks: {
//         color: 'white' // Change font color of y-axis labels
//       },
//     },
//     tooltips: {
//       backgroundColor: 'rgba(0,0,0,0.8)', // Customize tooltip background color
//       bodyColor: 'white', // Customize text color within tooltip
//       titleColor: 'white', // Customize title color within tooltip
//       caretPadding: 10, // Increase padding of the caret
//       cornerRadius: 5 // Adjust tooltip box corner radius
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     height: 1020,
//     width: 252
//   }
// });


const ctx = document.getElementById('myChart1');

Chart.defaults.font.size = 19;

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Car parking', 'EV charging', 'Car cleaning', 'Car inspection', 'Denting and painting'],
        datasets: [{
            label: 'Sales in ₹',
            data: bookingCounts, // Use the bookingCounts array here
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1.5,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)',
        }]
    },
    options: {
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
    }

});
