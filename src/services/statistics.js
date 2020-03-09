import {getMean, getMedian, getMode, getRange, getStandartDeviation, getVariance,} from "./statistics-helper";
import {sort} from "mathjs";

function generateReport(listOfNumbers) {
  return {
    mean: getMean(listOfNumbers),
    median: getMedian(listOfNumbers),
    mode: getMode(listOfNumbers),
    range: getRange(listOfNumbers),
    standart_deviation: getStandartDeviation(listOfNumbers),
    variance: getVariance(listOfNumbers)
  }
}

function filter(listOfNumbers) {
  let removeSpaces = t => t.trim() !== '' && t.trim() !== ' ';
  let toNumber = n => +n;
  let isNumeric = n => !Number.isNaN(n);

  return listOfNumbers.length !== 0 ?
      listOfNumbers
          .split(",")
          .filter(removeSpaces)
          .map(toNumber)
          .filter(isNumeric)
      : []
}

function order(listofNumbers) {
  return sort(listofNumbers)
}

export {
  generateReport,
  filter,
  order
}