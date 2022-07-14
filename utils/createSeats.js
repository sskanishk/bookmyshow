import { getAlphaValue } from "./util.js";

const createSeats = ({ rows, startColumn, endColumn, seatClassName, cost }) => {
  // debugger
  let i = startColumn === 'A' ? 'A' : String.fromCharCode(startColumn?.charCodeAt(0) + 1)
  let j = 1
  console.log(String.fromCharCode(startColumn?.charCodeAt(0) + 1))
  let section = []
  while(i <= endColumn) {
    if(j <= rows) {
      section.push(i + j + ":" + cost)
      j++
    }else{
      i = String.fromCharCode(i?.charCodeAt(0) + 1)
      j = 1
      console.log(i, endColumn, j)
    }
  }
  return {
    seats: section,
    endColumn: endColumn,
    rows: parseInt(rows),
    seatClassName: seatClassName,
    cost: cost,
    startColumn: startColumn
  }
}


const createSeatsOld = ({ rows, startColumn, endColumn, seatClassName, cost }) => {
  // let i = 0
  let j = startColumn
  let k = "A"
  const section = []
  while (j <= parseInt(rows)) {
    if (k > endColumn) {
      k = "A"
      j++
    }
    if (j < parseInt(rows) + 1) {
      section.push(j + k)
      k = String.fromCharCode(k.charCodeAt(0) + 1)
    }
  }
  return {
    seats: section,
    columnsCount: getAlphaValue(endColumn),
    rows: parseInt(rows),
    seatClassName: seatClassName,
    cost: cost,
  }
}

export default createSeats