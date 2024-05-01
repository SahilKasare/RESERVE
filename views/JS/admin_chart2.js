// Get the canvas element
var ctx = document.getElementById('myDoughnutChart').getContext('2d');

// Define data for the chart
var data = {
  labels: ['Red', 'Green', 'Blue'],
  datasets: [{
    label: 'My Doughnut Chart',
    data: [30, 20, 50], // Example data values (percentages)
    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'], // Colors for each segment
    hoverOffset: 4 // Spacing when hovering over segments
  }]
};

// Configure options for the chart
var options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '%';
        }
      }
    }
  }
};

// Create the doughnut chart
var myDoughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: options
});
