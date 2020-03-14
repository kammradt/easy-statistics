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

function _getFrequencyDistributionForDiscreteNumbers(listOfNumbers) {
  let frequency_report = {}
  listOfNumbers.forEach(n => {
    !frequency_report[n] ?
        frequency_report[n] = {absolute_frequency: 1} :
        frequency_report[n].absolute_frequency += 1
  })
  Object.keys(frequency_report).forEach(n => [
    frequency_report[n].relative_frequency = _percentOfTotal(frequency_report[n].absolute_frequency, listOfNumbers.length)
  ])
  return frequency_report
}

function _getFrequencyReportTemplate(numberOfClasses, firstClassValue, classLength) {
  let frequency_report = {}
  for (let i = 0; i < numberOfClasses; i++) {
    let previous = _rounded(firstClassValue + ((i) * classLength))
    let current = _rounded(firstClassValue + ((i + 1) * classLength))
    frequency_report[`${previous} : ${current}`] = {
      min: previous,
      max: current,
      numbers: []
    }
  }
  return frequency_report;
}

function addNumberToRange(n, frequency_report) {
  n = _rounded(n)
  Object.keys(frequency_report).forEach(key => {
    let option = frequency_report[key]
    if (n >= option.min && n < option.max)
      option.numbers.push(n)
  })
}

function _addPercentOfEachFrequency(frequency_report, listOfNumbers) {
  Object.keys(frequency_report).forEach(key => {
    delete frequency_report[key].min
    delete frequency_report[key].max
    frequency_report[key].absolute_frequency = frequency_report[key].numbers.length
    frequency_report[key].relative_frequency = _percentOfTotal(frequency_report[key].absolute_frequency, listOfNumbers.length)
  })
}

function _getFrequencyDistributionForContinuousNumbers(listOfNumbers) {
  const numberOfClasses = Math.round(_getNumberOfClasses(listOfNumbers))
  const classLength = getRange(listOfNumbers) / (numberOfClasses - 1);
  const firstClassValue = min(listOfNumbers) - (classLength / 2)

  let frequency_report = _getFrequencyReportTemplate(numberOfClasses, firstClassValue, classLength);
  listOfNumbers.forEach(number => addNumberToRange(number, frequency_report))
  _addPercentOfEachFrequency(frequency_report, listOfNumbers);

  return frequency_report
}

function _getNumberOfClasses(listOfNumbers) {
  const cbrt = Math.cbrt(listOfNumbers.length)
  const constantTimesStdev = 3.49 * (getStandardDeviation(listOfNumbers))
  return 1 + (getRange(listOfNumbers) * cbrt) / constantTimesStdev;
}

function getFrequencyDistribution(listOfNumbers, useContinuousInterval) {
  if (useContinuousInterval) {
    return _getFrequencyDistributionForContinuousNumbers(listOfNumbers)
  } else {
    return _getFrequencyDistributionForDiscreteNumbers(listOfNumbers);
  }
}

function _percentOfTotal(value, total) {
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