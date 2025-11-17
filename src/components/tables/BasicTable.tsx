

// import { DeleteButton, EditButton, ViewButton } from "../../icons";
import { EyeDropperIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PencilIcon } from "@/icons";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface BasicTableOneProps<T> {
  columns: Column<T>[];
  data: T[];
  enableActions?: boolean;
  actions?: ("view" | "edit" | "delete")[];
  onActionClick?: (actionType: string, rowData: any) => void;
}
export default function BasicTableOne<T>({
  columns,
  data,
  enableActions = false,
  actions = [],
  onActionClick,
}: BasicTableOneProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
     <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">

        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-5 py-3 font-medium text-black-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {col.header}
                </TableCell>
              ))}
              {enableActions && (
                <TableCell className="px-5 py-3 font-medium text-black-500 text-start text-theme-xs dark:text-gray-400">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                  >
                    {col.render
                      ? col.render(row[col.accessor] , row)
                      : row[col.accessor] === null ||
                        row[col.accessor] === undefined ||
                        row[col.accessor] === ""
                      ? "--"
                      : String(row[col.accessor])}
                  </TableCell>
                ))}
                <TableCell className="px-4 py-3 text-white text-start text-theme-sm">
                  {enableActions && (
                    <td>
                      <div className="flex gap-2">
                        {actions.includes("view") && (
                          <EyeIcon
                            className="w-4 h-4 text-yellow-400"
                            onClick={() => onActionClick?.("view", row)}
                          />
                        )}
                        {actions.includes("edit") && (
                          <PencilSquareIcon
                            className="w-4 h-4 text-green-500"
                            onClick={() => onActionClick?.("edit", row)}
                          />
                        )}
                        {actions.includes("delete") && (
                          <TrashIcon
                            className="w-4 h-4 text-red-400"
                            onClick={() => onActionClick?.("delete", row)}
                          />
                        )}
                      </div>
                    </td>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
