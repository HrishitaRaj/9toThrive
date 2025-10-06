import { ReactNode } from "react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-muted/30 transition-colors"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm text-mint-cream">
                  {column.render
                    ? column.render(item)
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
