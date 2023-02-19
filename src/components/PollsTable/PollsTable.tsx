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

  const hideQuestionColumn = () => {
    if (gridRef?.current?.columnApi) {
      gridRef.current.columnApi.setColumnVisible("question", true);
      gridRef?.current.api.sizeColumnsToFit();

      if (window.innerWidth < 786) {
        gridRef.current.columnApi.setColumnVisible("question", false);
        gridRef?.current.api.sizeColumnsToFit();
      }
    }
  };

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

  //mounted
  useEffect(() => {
    hideQuestionColumn();
    window.addEventListener("resize", hideQuestionColumn);
  }, []);

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
    gridRef?.current.columnApi.applyColumnState({
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

  /*
  const onBtFirst = useCallback(() => {
    gridRef.current.api.paginationGoToFirstPage();
  }, []);

  const onBtLast = useCallback(() => {
    gridRef.current.api.paginationGoToLastPage();
  }, []);

  const onBtNext = useCallback(() => {
    gridRef.current.api.paginationGoToNextPage();
  }, []);

  const onBtPrevious = useCallback(() => {
    gridRef.current.api.paginationGoToPreviousPage();
  }, []);

  const onBtPageFive = useCallback(() => {
    // we say page 4, as the first page is zero
    gridRef.current.api.paginationGoToPage(4);
  }, []);

  const onBtPageFifty = useCallback(() => {
    // we say page 49, as the first page is zero
    gridRef.current.api.paginationGoToPage(49);
  }, []);
  */
  return (
    <div className="container flex h-full w-full flex-col">
      {/*
      <div className="example-header">
        <div>
          <button onClick={onBtFirst}>To First</button>
          <button onClick={onBtLast} id="btLast">
            To Last
          </button>
          <button onClick={onBtPrevious}>To Previous</button>
          <button onClick={onBtNext}>To Next</button>
          <button onClick={onBtPageFive}>To Page 5</button>
          <button onClick={onBtPageFifty}>To Page 50</button>
        </div>
        <div style={{ marginTop: "6px" }}>
          <span className="label">Last Page Found:</span>
          <span className="value" id="lbLastPageFound">
            -
          </span>
          <span className="label">Page Size:</span>
          <span className="value" id="lbPageSize">
            -
          </span>
          <span className="label">Total Pages:</span>
          <span className="value" id="lbTotalPages">
            -
          </span>
          <span className="label">Current Page:</span>
          <span className="value" id="lbCurrentPage">
            -
          </span>
        </div>
      </div>
      */}
      <div className="h-full max-h-[800px] min-h-[300px] w-full">
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
            paginationAutoPageSize={true}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
};
