interface ColumnSelectionProps {
    columns: string[]
    onColumnSelect: (column: string) => void
  }
  
  export default function ColumnSelection({ columns, onColumnSelect }: ColumnSelectionProps) {
    return (
      <div className="space-y-2">
        <label htmlFor="column-select" className="block text-sm font-medium text-gray-700">
          Select the column you want to update
        </label>
        <select
          id="column-select"
          className="mt-1 block w-full pl-4 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          onChange={(e) => onColumnSelect(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select a column to update</option>
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  