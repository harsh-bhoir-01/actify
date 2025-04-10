import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { setGlobalFilter } from "../utils/userSlice";
import { Funnel } from "lucide-react"; // Importing sorting icons
import * as XLSX from "xlsx"; // Importing SheetJS for Excel export

const Table = React.memo(() => {
  const dispatch = useDispatch();
  const { users, globalFilter } = useSelector((state) => state.user);

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "name", // Accessor for 'name'
        header: "Name", // Column Header
        enableSorting: true, // Enable sorting
      },
      {
        accessorKey: "age", // Accessor for 'age'
        header: "Age", // Column Header
        enableSorting: true, // Enable sorting
      },
      {
        accessorKey: "contactNumber", // Accessor for 'contactNumber'
        header: "Contact Number", // Column Header
        enableSorting: true, // Enable sorting
      },
      {
        accessorKey: "gmail", // Accessor for 'gmail'
        header: "Gmail", // Column Header
        enableSorting: true, // Enable sorting
      },
      {
        accessorKey: "place", // Accessor for 'place'
        header: "Place", // Column Header
        enableSorting: true, // Enable sorting
      },
      {
        accessorKey: "designation", // Accessor for 'designation'
        header: "Designation", // Column Header
        enableSorting: true, // Enable sorting
      },
    ],
    []
  );

  // Apply global filtering
  const filteredData = React.useMemo(() => {
    if (!globalFilter) return users;
    return users.filter((user) =>
      user.name.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }, [globalFilter, users]);

  // Table setup using TanStack Table
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Export functionality
  const handleExport = () => {
    // Convert filtered data to a worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    // Export to Excel
    XLSX.writeFile(wb, "users_data.xlsx");
  };

  return (
    <div className="font-serif px-5 pb-5 ">
      {/* Global Filter */}
      <div className=" flex flex-wrap justify-between space-x-6 my-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => dispatch(setGlobalFilter(e.target.value))}
          placeholder="Search by name"
          className=" placeholder:pl-3  placeholder:text-xs border rounded-md"
        />

        {/* Export Button */}
        <button
          onClick={handleExport}
          className=" p-2 text-xs bg-green-500 text-white rounded cursor-pointer"
        >
          Export to Excel
        </button>
      </div>
      {/* Table */}
      <div
        className=" 
       text-[10px]  md:text-xs  xl:text-sm flex flex-wrap justify-center   "
      >
        <table className=" table-auto w-full ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-2 md:py-4 text-left border-b border-t bg-gray-300/30 cursor-pointer "
                    onClick={header.column.getToggleSortingHandler()} // Toggle sorting when clicked
                  >
                    {header.column.columnDef.header}{" "}
                    {header.column.getCanSort() ? (
                      <Funnel className="inline text-gray-500 size-3" />
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className=" py-3 text-left border-t">
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className=" flex justify-center space-x-2 ">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className=" bg-gray-200/45 rounded text-sm px-2 cursor-pointer "
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className=" bg-gray-200/45 rounded text-sm px-2 cursor-pointer"
        >
          {"Previous"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-gray-200/45 rounded text-sm px-2 cursor-pointer"
        >
          {"Next"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="bg-gray-200/45 text-sm rounded px-2 cursor-pointer"
        >
          {">>"}
        </button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
});

export default Table;
