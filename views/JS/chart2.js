const data = {
    labels: ['Apples', 'Bananas', 'Grapes', 'Oranges'],
    datasets: [{
        data: [15, 30, 45, 10], // Sizes as percentages
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
    }]
};

// Configuration options
const options = {
    cutoutPercentage: 70,
    rotation: -Math.PI / 2,
    circumference: 2 * Math.PI
};

// Get the canvas element
const ctx = document.getElementById('myChart2').getContext('2d');

// Create the doughnut chart
const myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});