import { useEffect, useState } from "react";

const ReportData = ({ name, label, type, options, setTopic }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (name === "topic") {
      setTopic(inputValue);
    }
  }, [inputValue]);

  return (
    <div
      className={`border h-[120px] border-slate-400 p-2 rounded grid items-center gap-4`}
    >
      {label && (
        <label className="text-center w-full text-wrap" htmlFor={name}>
          {label}{" "}
        </label>
      )}
      {type === "select" ? (
        <select
          className="w-full bg-gray-100 px-1 py-4"
          name={name}
          id={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        >
          <option key={"index"} value={""}>
            Select
          </option>
          {options &&
            options.map((ele, index) => (
              <option key={index} value={ele}>
                {ele}
              </option>
            ))}
        </select>
      ) : type === "file" ? (
        <input
          className="w-full bg-gray-100 px-1 py-4"
          id={name}
          name={name}
          type={type}
          multiple
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <input
          className="w-full bg-gray-100 px-1 py-4"
          id={name}
          name={name}
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default ReportData;
