import { Table } from 'antd';
import React from 'react'
// import { Excel } from "antd-table-saveas-excel";
// import { useMemo } from 'react';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data = [], columns = [] } = props
  // const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  // const newColumnExport = useMemo(() => {
  //   const arr = columns?.filter((col) => col.dataIndex !== 'action')
  //   return arr
  // }, [columns])

 
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  // const handleDeleteAll = () => {
  //   handleDelteMany(rowSelectedKeys)
  // }
//   const exportExcel = () => {
//     const excel = new Excel();
//     excel
//       .addSheet("test")
//       .addColumns(newColumnExport)
//       .addDataSource(dataSource, {
//         str2Percent: true
//       })
//       .saveAs("Excel.xlsx");
//   };
  
  return (
    // <>
      
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    // </>
  )
}

export default TableComponent