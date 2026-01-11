import ApexCharts from "apexcharts";

// ===== chartTwo - Portfolio Health Donut Chart
const chart02 = () => {
  const chartTwoOptions = {
    series: [73, 13, 14], // Healthy, At Risk, Critical
    colors: ["#10B981", "#F59E0B", "#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 330,
      toolbar: {
        show: false,
      },
    },
    labels: ["Healthy", "At Risk", "Critical"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Outfit",
      fontSize: "14px",
      fontWeight: 500,
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: false,
            },
            total: {
              show: false,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartTwo");

  if (chartSelector.length) {
    const chartFour = new ApexCharts(
      document.querySelector("#chartTwo"),
      chartTwoOptions,
    );
    chartFour.render();
  }
};

export default chart02;
