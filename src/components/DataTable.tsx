import React from "react";
import { cn } from "../lib/cn";

export type Accessor<T> = keyof T | ((row: T) => React.ReactNode);

export type Column<T> = {
  id?: string;
  header: string;
  accessor: Accessor<T>;
  sortable?: boolean;
  width?: string;
  cell?: (value: any, row: T) => React.ReactNode;
};

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  getRowId?: (row: T, index: number) => string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  getRowId,
  emptyMessage = "No data to display.",
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<{
    id?: string;
    dir: "asc" | "desc";
  } | null>(null);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  // give each row an ID (for selection)
  const rowsWithId = React.useMemo(
    () =>
      data.map((row, i) => ({
        __id: getRowId?.(row, i) ?? String(i),
        __raw: row,
      })),
    [data, getRowId]
  );

  // sorting logic
  const sorted = React.useMemo(() => {
    if (!sort || !sort.id) return rowsWithId;
    const col = columns.find((c) => (c.id ?? c.header) === sort.id);
    if (!col) return rowsWithId;

    const getVal = (r: T) => {
      const acc = col.accessor;
      const v = typeof acc === "function" ? acc(r) : r[acc];
       return typeof v === 'string' ? (v as string).toLowerCase() : v
    };

    const arr = [...rowsWithId];
    arr.sort((a, b) => {
      const av = getVal(a.__raw) as any;
      const bv = getVal(b.__raw) as any;
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      return 0;
    });
    return arr;
  }, [rowsWithId, sort, columns]);

  // toggle select all rows
  const toggleAll = () => {
    if (selected.size === rowsWithId.length) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(rowsWithId.map((r) => r.__id));
      setSelected(all);
      onRowSelect?.(rowsWithId.map((r) => r.__raw));
    }
  };

  // toggle one row
  const toggleOne = (id: string) => {
    const draft = new Set(selected);
    if (draft.has(id)) draft.delete(id);
    else draft.add(id);
    setSelected(draft);
    const list = rowsWithId
      .filter((r) => draft.has(r.__id))
      .map((r) => r.__raw);
    onRowSelect?.(list);
  };

  // render header cells
  const headerCell = (col: Column<T>) => {
    const id = col.id ?? col.header;
    const isSorted = sort?.id === id;
    const dir = isSorted ? sort!.dir : undefined;
    const canSort = col.sortable;

    return (
      <th
        key={id}
        className={cn(
          "px-3 py-2 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200",
          canSort && "cursor-pointer select-none"
        )}
        style={{ width: col.width }}
        onClick={() => {
          if (!canSort) return;
          setSort((s) =>
            !s || s.id !== id
              ? { id, dir: "asc" }
              : { id, dir: s.dir === "asc" ? "desc" : "asc" }
          );
        }}
        aria-sort={
          isSorted ? (dir === "asc" ? "ascending" : "descending") : "none"
        }
        scope="col"
      >
        <div className="inline-flex items-center gap-1">
          <span>{col.header}</span>
          {canSort && (
            <span aria-hidden>
              {isSorted ? (dir === "asc" ? "▲" : "▼") : "↕"}
            </span>
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div
        className={cn("relative", loading && "opacity-60")}
        role="grid"
        aria-busy={loading || undefined}
      >
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead className="bg-neutral-50 dark:bg-neutral-800">
            <tr>
              {selectable && (
                <th className="px-3 py-2">
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={
                      selected.size === rowsWithId.length &&
                      rowsWithId.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map(headerCell)}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {!loading && sorted.length === 0 && (
              <tr>
                <td
                  className="px-3 py-8 text-center text-sm text-neutral-500"
                  colSpan={columns.length + (selectable ? 1 : 0)}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {sorted.map((r) => (
              <tr
                key={r.__id}
                className="hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label="Select row"
                      checked={selected.has(r.__id)}
                      onChange={() => toggleOne(r.__id)}
                    />
                  </td>
                )}
                {columns.map((col) => {
                  const id = col.id ?? col.header;
                  const val =
                    typeof col.accessor === "function"
                      ? col.accessor(r.__raw)
                      : (r.__raw as any)[col.accessor];
                  return (
                    <td
                      key={id}
                      className="px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200"
                    >
                      {col.cell ? col.cell(val, r.__raw) : (val as any)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="rounded-lg bg-white/80 p-3 shadow dark:bg-neutral-900/80 dark:text-white">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 animate-spin"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.25"
                  />
                  <path
                    d="M12 2a10 10 0 0 1 10 10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                <span>Loading…</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
