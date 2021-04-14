import React from "react";
import ReactDOM from "react-dom";

import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
// components

export default function CardPageVisits() {
 
  const data = [
    { firstname: "jill", lastname: "smith", age: 22 },
    { firstname: "david", lastname: "warner", age: 23 },
    { firstname: "nick", lastname: "james", age: 26 }
];

const camelCase = (str) =>  {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
};

const filterColumns = (data) => {
    // Get column names
    const columns = Object.keys(data[0]);

    // Remove by key (firstname)
    const filterColsByKey = columns.filter(c => c !== 'firstname');

    // OR use the below line instead of the above if you want to filter by index
    // columns.shift()

    return filterColsByKey // OR return columns
};

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="App">
            <ExcelFile filename="test">
                <ExcelSheet data={data} name="Test">
                    {
                        filterColumns(data).map((col)=> {
                            return <ExcelColumn label={camelCase(col)} value={col}/>
                        })
                    }
                </ExcelSheet>
            </ExcelFile>
            <table id="table-to-xls">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => {
                    return (
                        <tr>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.age}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

        </div>
      </div>
    </>
  );
}
const rootElement = document.getElementById("root");
