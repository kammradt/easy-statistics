import {max, mean, median, min, mode, round, std, variance} from "mathjs";

function getMean(listOfNumbers) {
  return _rounded(mean(listOfNumbers))
}

function getMedian(listOfNumbers) {
  return _rounded(median(listOfNumbers))
}

function getMode(listOfNumbers) {
  return _rounded(mode(listOfNumbers))
}

function getRange(listOfNumbers) {
  return _rounded(max(listOfNumbers) - min(listOfNumbers))
}

function getStandardDeviation(listOfNumbers) {
  return _rounded(std(listOfNumbers))
}
function getVariance(listOfNumbers) {
  return _rounded(variance(listOfNumbers))
}

function _rounded(number) {
  return round(number, 2)
}

export {
  getMean,
  getMedian,
  getMode,
  getRange,
  getStandardDeviation,
  getVariance,
}