import React from "react";

interface SelectProps {
  label: string;
  options: Record<string, string>;
  value: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-gray-200 bg-white py-2.5 pl-4 pr-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M9.293%2012.95l.707.707L15.657%208l-1.414-1.414L10%2010.828%205.757%206.586%204.343%208z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1em_1em] bg-[right_0.5rem_center] bg-no-repeat"
      >
        {Object.entries(options).map(([key, val]) => (
          <option key={key} value={key} className="text-gray-700">
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
