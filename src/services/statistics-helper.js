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

function getCoefficientOfVariation(statisticReport) {
  return _rounded((statisticReport.standard_deviation / statisticReport.mean) * 100)
}

function getFrequencyDistribution(listOfNumbers) {
  let frequency_report = {}

  function setAbsoluteFrequency(number) {
    !frequency_report[number] ?
        frequency_report[number] = {absolute_frequency: 1} :
        frequency_report[number].absolute_frequency += 1
  }

  function setRelativeFrequency(number) {
    frequency_report[number].relative_frequency = percentOfTotal(frequency_report[number].absolute_frequency, listOfNumbers.length)
  }

  listOfNumbers.forEach(setAbsoluteFrequency)
  Object.keys(frequency_report).forEach(setRelativeFrequency)

  return frequency_report
}

function percentOfTotal(value, total) {
  return _rounded((value / total) * 100)
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
  getFrequencyDistribution,
  getCoefficientOfVariation
}