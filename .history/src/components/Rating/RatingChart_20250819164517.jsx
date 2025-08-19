import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const data = {
  labels: Array.from({ length: 11 }, (_, i) => i), // 0-10
  datasets: [
    {
      label: "Số lượng đánh giá",
      data: [0, 2, 5, 8, 10, 7, 4, 3, 2, 1, 0], // Dữ liệu mẫu
      fill: false,
      borderColor: "rgb(59, 130, 246)",
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Lịch sử đánh giá" },
  },
  scales: {
    x: { title: { display: true, text: "Thang điểm (0-10)" } },
    y: { title: { display: true, text: "Số lượng đánh giá" }, beginAtZero: true },
  },
};

const RatingChart = () => (
  <div className="w-full h-64">
    <Line data={data} options={options} />
  </div>
);

export default RatingChart;
