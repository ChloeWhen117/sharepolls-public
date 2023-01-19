// @ts-nocheck : AG Grid
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { useRouter } from "next/router";
import { type PollType } from "@/utils/common";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const PollsTable: React.FC<{
  polls: PollType[];
}> = (props) => {
  const { polls } = props;
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(polls); // Set rowData to Array of Objects, one Object per Row
  const router = useRouter();
  function calculateAge(dateString: any) {
    let result = "";
    const now = new Date();

    const age = dateString;
    const days = differenceInDays(now, age);
    if (days > 0) {
      result = `${days} days ago`;
    } else {
      const hours = differenceInHours(now, age);
      if (hours > 0) {
        result = `${hours} hours ago`;
      } else {
        const minutes = differenceInMinutes(now, age);
        if (minutes > 0) {
          result = `${minutes} minutes ago`;
        } else {
          result = `Less than a minute ago`;
        }
      }
    }
    return result;
  }

  // Each Column Definition results in one Column.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "title",
      headerName: "Poll Title",
      filter: true,
      type: ["titleColumn"],
    },
    { field: "question", filter: true, type: ["questionColumn"] },
    {
      field: "createdAt",
      headerName: "Created",
      filter: true,
      type: ["dateColumn"],
      cellRenderer: (params: any) => {
        return calculateAge(params.value);
      },
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      // make every column use 'text' filter by default
      filter: "agTextColumnFilter",
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(
    (event: any) => {
      const pollId = event.data.id;
      router.push(`/poll/${pollId}`);
    },
    [router]
  );

  // Example load data from sever
  useEffect(() => {
    setRowData(polls);
  }, [polls]);

  // define a column type (you can define as many as you like)
  const columnTypes = {
    titleColumn: {
      minWidth: 100,
      maxWidth: 160,
      filter: "agDateColumnFilter",
      suppressMenu: true,
    },
    questionColumn: {
      minWidth: 100,
      filter: "agDateColumnFilter",
      suppressMenu: true,
    },
    dateColumn: {
      minWidth: 100,
      maxWidth: 200,
      filter: "agDateColumnFilter",
      suppressMenu: true,
    },
  };
  const onGridReady = useCallback(() => {
    //@ts-ignore: gridRef
    gridRef?.current.api.sizeColumnsToFit(); // eslint-disable-line
    gridRef.current.columnApi.applyColumnState({
      state: [
        {
          colId: "createdAt",
          sort: "desc",
        },
      ],
    });
    window.onresize = () => {
      //@ts-ignore: gridRef
      gridRef?.current.api.sizeColumnsToFit();
    };
  }, []);

  return (
    <div className="container flex h-full max-h-[800px] min-h-[300px] w-full flex-col">
      <div className="ag-theme-alpine-dark h-full w-full">
        <AgGridReact
          //@ts-ignore: gridRef
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          columnTypes={columnTypes}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};
