import DatePicker from "react-multi-date-picker";
import moment from "moment";

import { useData } from "../contexts/DataContext";

const DateRangePicker = () => {
  const { startDate, endDate, handleEndDate, handleStartDate } = useData();

  return (
    <div
      className="flex justify-center start-date items-center border border-sm px-2"
      style={{
        borderRadius: "8px",
        border: "1px solid #C3D3E2",
        height: "40px",
      }}
    >
      {/* Start Date */}
      <DatePicker
        className="outline-none text-sm"
        value={moment(startDate).format("DD/MM/YYYY")}
        onChange={(date) => handleStartDate(date)}
        headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
        format="DD/MM/YYYY"
        editable={false}
      />
      <span> - </span>
      {/* End Date */}
      <DatePicker
        className="border-none outline-none text-sm"
        value={moment(endDate).format("DD/MM/YYYY")}
        onChange={(date) => handleEndDate(date)}
        headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
        format="DD/MM/YYYY"
        editable={false}
        minDate={moment(startDate).format("DD/MM/YYYY")}
      />
    </div>
  );
};

export default DateRangePicker;
