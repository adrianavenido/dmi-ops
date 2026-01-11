import ApexCharts from "apexcharts";

// ===== chartThree - Operational Trends Line Chart
const chart03 = () => {
  const chartThreeOptions = {
    series: [
      {
        name: "SLA",
        data: [88, 89, 85, 90],
      },
      {
        name: "Adherence",
        data: [93, 94, 91, 95],
      },
    ],
    colors: ["#3B82F6", "#9333EA"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3],
      dashArray: [0, 5],
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontFamily: "Outfit",
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: "#6B7280",
      },
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: function (val) {
          return val + "%";
        },
        style: {
          colors: "#6B7280",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const chartSelector = document.querySelectorAll("#chartThree");

  if (chartSelector.length) {
    const chartThree = new ApexCharts(
      document.querySelector("#chartThree"),
      chartThreeOptions,
    );
    chartThree.render();
  }
};

export default chart03;
