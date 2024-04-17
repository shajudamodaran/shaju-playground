/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGrowthChartData } from "../../contexts/GrowthChartContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const GROWTH_CHART_REQUIRED_DATA = {
  height: [128, 130, 133, 136, 138, 140, 143, 146, 148, 150, 152, 155],
  headCircumference: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
  weight: [3.8, 4, 4.3, 4.6, 4.9, 5.1, 5.4, 5.7, 6, 6.2, 6.5, 6.8],
};

const GrowthChart = () => {
  const { data: contextData } = useGrowthChartData();

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Growth chart",
      },
      legend: {
        labels: {
          filter: function (item: any) {
            // Logic to remove a particular legend item goes here
            return !item.text.includes("Required");
          },
        },
      },
      tooltip: {
        filter: function (tooltipItem: any) {
          // Logic to hide a particular tooltip item goes here
          return !tooltipItem.dataset.label.includes("Required");
        },
        callbacks: {
          // Logic to customize the tooltip goes here
          label: function (context: any) {
            const requiredLabel =
              context.dataset.label === "Weight (kg)"
                ? `${GROWTH_CHART_REQUIRED_DATA.weight[context.dataIndex]}`
                : context.dataset.label === "Height (cm)"
                ? `${GROWTH_CHART_REQUIRED_DATA.height[context.dataIndex]}`
                : `${
                    GROWTH_CHART_REQUIRED_DATA.headCircumference[
                      context.dataIndex
                    ]
                  }`;

            return `${context.dataset.label}: ${context.parsed.y} / ${requiredLabel}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age in Months",
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Weight in KG",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Height and Head Circumference in CM",
        },
      },
    },
  };

  const labels = contextData.map((item) => item?.date);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Height (cm)",
        data: contextData?.map((item) => Number(item.length)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
        lineTension: 0.3,
      },
      {
        label: "Height Required (cm)",
        data: GROWTH_CHART_REQUIRED_DATA.height,
        borderColor: "#ffccd7",
        yAxisID: "y",
        borderDash: [5, 5],
        lineTension: 0.3,
      },
      {
        label: "Head Circumference (cm)",
        data: contextData?.map((item) => Number(item.headCircumference)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
        lineTension: 0.3,
      },
      {
        label: "Head Circumference Required (cm)",
        data: GROWTH_CHART_REQUIRED_DATA.headCircumference,
        borderColor: "#93d2eb",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
        borderDash: [5, 5],
        lineTension: 0.3,
      },
      {
        label: "Weight (kg)",
        data: contextData?.map((item) => Number(item.weight)),
        borderColor: "rgb(69, 192, 69)",
        backgroundColor: "rgba(69, 192, 69, 0.5)",
        yAxisID: "y1",
        lineTension: 0.3,
      },
      {
        label: "Weight Required (kg)",
        data: GROWTH_CHART_REQUIRED_DATA.weight,
        borderColor: "#8dd88d",
        backgroundColor: "#8dd88d",
        yAxisID: "y1",
        borderDash: [5, 5],
        lineTension: 0.3,
      },
    ],
    options: {
      scales: {
        yAxes: [
          {
            id: "y",
            type: "linear",
            position: "left",
            ticks: {
              suggestedMin: 0,
            },
          },
          {
            id: "y1",
            type: "linear",
            position: "right",
            ticks: {
              suggestedMin: 0,
            },
          },
        ],
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default GrowthChart;
