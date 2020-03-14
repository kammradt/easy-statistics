import { getMean, getMedian, getMode, getRange, getStandardDeviation, getVariance, getFrequencyDistribution, getCoefficientOfVariation } from "./statistics-helper";
import { sort } from "mathjs";

function generateReport(listOfNumbers) {
  let report = {
    mean: getMean(listOfNumbers),
    median: getMedian(listOfNumbers),
    mode: getMode(listOfNumbers),
    range: getRange(listOfNumbers),
    standard_deviation: getStandardDeviation(listOfNumbers),
    variance: getVariance(listOfNumbers)
  }
  report.coefficient_of_variation = getCoefficientOfVariation(report)
  return report
}

function getFrequencyReport(listOfNumbers) {
  return getFrequencyDistribution(listOfNumbers)
}

function filter(listOfNumbers) {
  let removeSpaces = t => t.trim() !== '' && t.trim() !== ' ';
  let toNumber = n => +n;
  let isNumeric = n => !Number.isNaN(n);

  return listOfNumbers.length !== 0
    ? listOfNumbers
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
  order,
  getFrequencyReport
}