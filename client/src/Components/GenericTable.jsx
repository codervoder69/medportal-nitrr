import React from "react";

const GenericTable = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-100">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-blue-50">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-4 py-2 text-sm text-gray-700">
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
          {
            !data.length && <tr className="hover:bg-blue-50">
              <td className="px-4 py-2 text-sm text-gray-700">No data found</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
