import React from 'react'

interface SelectProps {
  label: string
  options: Record<string, string>
  value: string
  onChange: (value: string) => void
}

export default function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-gray-200 bg-white py-2.5 px-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
      >
        {Object.entries(options).map(([key, val]) => (
          <option key={key} value={key} className="text-gray-700">
            {val}
          </option>
        ))}
      </select>
    </div>
  )
}
