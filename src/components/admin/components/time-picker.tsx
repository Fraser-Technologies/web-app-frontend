import Cookies from "js-cookie";
import * as React from "react";

interface TimePickerProps {
  onTimeChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { onTimeChange } = props;

  const [time, setTime] = React.useState(Cookies.get("time") || "");

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleSendTime = () => {
    onTimeChange(time);
  };

  React.useEffect(() => {
    Cookies.set("time", time, { expires: 1 });
  }, [time]);

  return (
    <div className="mt-4 flex rounded-md ">
      <div className="w-full bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
        Time
      </div>
      <input
        className="w-full bg-[#EFF3EF] px-4"
        type="time"
        value={time}
        onChange={handleTimeChange}
        onBlur={handleSendTime}
      />
    </div>
  );
};

export default TimePicker;
