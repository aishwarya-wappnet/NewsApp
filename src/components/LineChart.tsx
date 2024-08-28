import { RefObject } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  Chart,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the components you want to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => `Value: ${tooltipItem.raw}`,
      },
    },
  },
};

interface LineChartProps {
  chartRef: RefObject<Chart<"line">>;
  chartData: ChartData<"line">;
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  chartRef,
  chartData,
  title,
}) => {
  return (
    <div className="bg-white w-[100%] rounded-sm border border-primary">
      <div className="bg-primary p-2 rounded-t-sm  text-white">{title}</div>
      <div className="p-3">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
