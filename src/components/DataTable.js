import React, { useRef, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { dataToCsv } from '../utils/csvUtils';


const DataTable = ({ columns, data, loading }) => {
  const [pagination] = useState({ pageIndex: 0, pageSize: 10});
  // const [recordCount, setRecordCount] = useState(10);
  const tableRef = useRef();


  // const handlePageSizeChange = (event) => {
  //   const pageSize = parseInt(event.target.value, 10);
  //   setPagination((prevPagination) => ({
  //     ...prevPagination,
  //     pageSize: pageSize,
  //   }));
  //   setRecordCount(pageSize);
  //   tableRef.current?.setPageIndex(0);
  // }

  const tableInstance = useTable({
    columns,
    data,
  }, 
  useSortBy, 
  usePagination,
  (instance) => {
    tableRef.current = instance;
  }
);

// useEffect(() => {
//   if(tableInstance && pagination){
//     tableInstance.setOptions({
//       ...tableInstance.options,
//        pagination: {
//         ...tableInstance.options.pagination,
//         ...pagination,
//        },
//     });
//   }
// }, [pagination, tableInstance]);



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = tableInstance;

  const currentPageIndex = pageIndex;

  const exportCSV = () => {
    if(!data || !data.length){
      alert("No data available to export");
      return;
    }

    const csvData = dataToCsv(page, columns);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


 
  return (
    <>
      <table {...getTableProps()} key={`table-${pagination.pageSize}`}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted? (column.isSortedDesc? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
          
                  })}
                </tr>
              );
            })}
          </tbody>
      </table>

      

      {/* Pagination */}
      <div className='pagination-controls'>
        {/* <select value={recordCount} onChange={handlePageSizeChange}>
          {[10, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select> */}

        <button onClick={() => previousPage()} disabled={!canPreviousPage} className='pagination-button'>
          Previous Page
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage} className='pagination-button'>
          Next Page
        </button>
        <span>
          Page{' '}
          <strong>
            {currentPageIndex + 1} of {Math.ceil(data.length / pagination.pageSize)}
          </strong>{' '}
        </span>

        <button onClick={exportCSV} disabled={loading}>Download CSV</button>

        
      </div>

      
    </>
  );
};

export default DataTable;
