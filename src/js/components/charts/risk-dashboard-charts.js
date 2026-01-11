import ApexCharts from "apexcharts";

// Risk Level Distribution Chart (Doughnut)
const riskLevelChart = () => {
  // Detect dark mode
  const isDarkMode = document.documentElement.classList.contains('dark') || 
                     document.body.classList.contains('dark');
  
  const textColor = isDarkMode ? '#E5E7EB' : '#6B7280';
  const valueColor = isDarkMode ? '#F9FAFB' : '#111827';
  
  const options = {
    series: [9, 28, 27],
    chart: {
      type: "donut",
      height: 260,
      fontFamily: "Outfit, sans-serif",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    labels: ["High", "Medium", "Low"],
    colors: ["#374151", "#6B7280", "#9CA3AF"], // Neutral gray colors: dark, medium, light
    legend: {
      position: "bottom",
      fontFamily: "Outfit, sans-serif",
      fontSize: "14px",
      labels: {
        colors: textColor,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "Outfit, sans-serif",
        fontWeight: 500,
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 500,
              color: textColor,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 600,
              color: valueColor,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              label: "Total Risks",
              fontSize: "14px",
              fontWeight: 500,
              color: textColor,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.15,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "Outfit, sans-serif",
      },
      y: {
        formatter: function (val, opts) {
          return val + " risks";
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSelector = document.querySelector("#riskLevelChart");
  if (chartSelector) {
    // Clear any existing chart instance
    if (chartSelector._apexcharts) {
      chartSelector._apexcharts.destroy();
    }
    
    const chart = new ApexCharts(chartSelector, options);
    chart.render();
    return chart;
  }
};

// Category Chart (Bar)
const categoryChart = () => {
  const options = {
    series: [
      {
        name: "Number of Risks",
        data: [8, 17, 10, 12, 9, 8],
      },
    ],
    chart: {
      type: "bar",
      height: 260,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#3B82F6"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Strategic", "Operational", "Compliance", "Financial", "IT", "HR"],
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
    },
  };

  const chartSelector = document.querySelector("#categoryChart");
  if (chartSelector) {
    const chart = new ApexCharts(chartSelector, options);
    chart.render();
    return chart;
  }
};

// Heatmap Chart (using custom visualization with divs since ApexCharts doesn't have native heatmap)
const heatmapChart = () => {
  const chartSelector = document.querySelector("#heatmapChart");
  if (!chartSelector) return;

  // Clear existing content
  chartSelector.innerHTML = '';

  // Heatmap data
  const heatmapData = [
    { x: 1, y: 1, value: 1, label: 'Low' },
    { x: 2, y: 1, value: 2, label: 'Low-Med' },
    { x: 3, y: 1, value: 4, label: 'Medium' },
    { x: 4, y: 1, value: 2, label: 'Med-High' },
    { x: 5, y: 1, value: 1, label: 'High' },
    { x: 1, y: 2, value: 1, label: 'Low' },
    { x: 2, y: 2, value: 3, label: 'Low-Med' },
    { x: 3, y: 2, value: 5, label: 'Medium' },
    { x: 4, y: 2, value: 4, label: 'Med-High' },
    { x: 5, y: 2, value: 1, label: 'High' },
    { x: 1, y: 3, value: 2, label: 'Low' },
    { x: 2, y: 3, value: 4, label: 'Low-Med' },
    { x: 3, y: 3, value: 7, label: 'Medium' },
    { x: 4, y: 3, value: 3, label: 'Med-High' },
    { x: 5, y: 3, value: 1, label: 'High' },
  ];

  const impactLabels = ['Low', 'Low-Med', 'Medium'];
  const likelihoodLabels = ['Low', 'Low-Med', 'Medium', 'Med-High', 'High'];

  // Create heatmap grid
  const container = document.createElement('div');
  container.className = 'flex flex-col gap-2';
  
  // Y-axis labels
  const gridContainer = document.createElement('div');
  gridContainer.className = 'grid grid-cols-6 gap-2';
  
  // Empty top-left cell
  const emptyCell = document.createElement('div');
  gridContainer.appendChild(emptyCell);

  // X-axis labels (Likelihood)
  likelihoodLabels.forEach(label => {
    const labelCell = document.createElement('div');
    labelCell.className = 'text-center text-xs font-medium text-gray-600 dark:text-gray-400 py-2';
    labelCell.textContent = label;
    gridContainer.appendChild(labelCell);
  });

  // Y-axis labels and data cells
  impactLabels.forEach((impactLabel, yIndex) => {
    // Y-axis label
    const yLabel = document.createElement('div');
    yLabel.className = 'text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center justify-center';
    yLabel.textContent = impactLabel;
    gridContainer.appendChild(yLabel);

    // Data cells for this row
    likelihoodLabels.forEach((_, xIndex) => {
      const dataPoint = heatmapData.find(d => d.x === xIndex + 1 && d.y === yIndex + 1);
      const cell = document.createElement('div');
      cell.className = 'rounded-lg flex items-center justify-center text-sm font-semibold min-h-[60px]';
      
      if (dataPoint) {
        const value = dataPoint.value;
        if (value <= 2) {
          cell.className += ' bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-400';
        } else if (value <= 5) {
          cell.className += ' bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400';
        } else {
          cell.className += ' bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400';
        }
        cell.textContent = value;
      } else {
        cell.className += ' bg-gray-50 dark:bg-gray-800';
      }
      
      gridContainer.appendChild(cell);
    });
  });

  container.appendChild(gridContainer);
  
  // Add axis labels
  const xAxisLabel = document.createElement('div');
  xAxisLabel.className = 'text-center text-sm font-medium text-gray-600 dark:text-gray-400 mt-2';
  xAxisLabel.textContent = 'Likelihood';
  container.appendChild(xAxisLabel);

  const yAxisLabel = document.createElement('div');
  yAxisLabel.className = 'text-sm font-medium text-gray-600 dark:text-gray-400 mb-2';
  yAxisLabel.textContent = 'Impact';
  container.insertBefore(yAxisLabel, gridContainer);

  chartSelector.appendChild(container);
};

// Trend Chart (Line)
const trendChart = () => {
  const options = {
    series: [
      {
        name: "Average Risk Score",
        data: [5.8, 6.2, 6.0, 6.4],
      },
    ],
    chart: {
      type: "line",
      height: 260,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#3B82F6"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      min: 4,
      max: 8,
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
    },
  };

  const chartSelector = document.querySelector("#trendChart");
  if (chartSelector) {
    const chart = new ApexCharts(chartSelector, options);
    chart.render();
    return chart;
  }
};

const initRiskDashboardCharts = () => {
  riskLevelChart();
  categoryChart();
  heatmapChart();
  trendChart();
};

export default initRiskDashboardCharts;

