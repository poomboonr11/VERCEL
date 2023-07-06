import '../../styles/globals.css';
import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [2, 15, 30, 60, 40, 60, 70, 0, 90,100];
const labels = [4.00,8.00,12.00,16.00,20.00,23.00];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function LineChart() {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "LoadCharge",
          data: scores,
          tension: 0.3,
          borderColor: "black",
          pointRadius: 6,
          pointBackgroundColor: "purple",
          backgroundColor: "rgba(128, 0, 100, 0.3)",
        }
      ],
      labels,
    };
  }, []);

  return <Line data={data} options={options} />;
}