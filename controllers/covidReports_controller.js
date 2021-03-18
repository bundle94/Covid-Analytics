const covidData_model = require("../models/covidData_model");
const co = require('co');
const fs = require('fs');
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Covid Data");
const zlib = require("zlib");

const covidReports_controllers = {

  getCovidReports: async (req, res) => {
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);
    let country = req.body.country
    let continent = req.body.continent
    let draw = parseInt(req.body.draw);
    let start = req.body.start;
    let length = req.body.length;
    let search = req.body.search;
    
    const query = [
      { date : { $gte: start_date, $lte: end_date} }
    ]

    if (country.length > 0) 
      query.push({ location: { $eq: country } });

    if (continent.length > 0)
      query.push({ continent: { $eq: continent } });

    if (search.length > 0)
      query.push({ $text: { $search: search}  });
  
    let recordsTotal = await covidData_model.countDocuments();
    let recordsFiltered = await covidData_model.aggregate()
      .match({
        $and: query
      })
      .count("count");

    let data = await covidData_model.aggregate()
      .match({
        $and: query
      })
      .skip(start)
      .limit(length);

    let dataToReturn = {
      draw,
      recordsTotal,
      data,
      recordsFiltered: recordsFiltered.length > 0 ? recordsFiltered[0].count : 0
    }

    res.send(dataToReturn);
  },

  collateReports: async (req, res) => {
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);
    let country = req.body.country;
    let continent = req.body.continent;
    let search = req.body.search;

    let columnNames = [
      "iso_code",
      "continent",
      "location",
      "date",
      "total_cases",
      "new_cases",
      "new_cases_smoothed",
      "total_deaths",
      "new_deaths",
      "new_deaths_smoothed",
      "total_cases_per_million",
      "new_cases_per_million",
      "new_cases_smoothed_per_million",
      "total_deaths_per_million",
      "new_deaths_per_million",
      "new_deaths_smoothed_per_million",
      "reproduction_rate",
      "icu_patients",
      "icu_patients_per_million",
      "hosp_patients",
      "hosp_patients_per_million",
      "weekly_icu_admissions",
      "weekly_icu_admissions_per_million",
      "weekly_hosp_admissions",
      "weekly_hosp_admissions_per_million",
      "new_tests",
      "total_tests",
      "total_tests_per_thousand",
      "new_tests_per_thousand",
      "new_tests_smoothed",
      "new_tests_smoothed_per_thousand",
      "positive_rate",
      "tests_per_case",
      "tests_units",
      "total_vaccinations",
      "people_vaccinated",
      "people_fully_vaccinated",
      "new_vaccinations",
      "new_vaccinations_smoothed",
      "total_vaccinations_per_hundred",
      "people_vaccinated_per_hundred",
      "people_fully_vaccinated_per_hundred",
      "new_vaccinations_smoothed_per_million",
      "stringency_index",
      "population",
      "population_density",
      "median_age",
      "aged_65_older",
      "aged_70_older",
      "gdp_per_capita",
      "extreme_poverty",
      "cardiovasc_death_rate",
      "diabetes_prevalence",
      "female_smokers",
      "male_smokers",
      "handwashing_facilities",
      "hospital_beds_per_thousand",
      "life_expectancy",
      "human_development_index"
    ]

    const query = [
      { date : { $gte: start_date, $lte: end_date} }
    ]

    if (country.length > 0) 
      query.push({ location: { $eq: country } });

    if (continent.length > 0)
      query.push({ continent: { $eq: continent } });

    if (search.length > 0)
      query.push({ $text: { $search: search}  });

    let fileTimeStamp = new Date().getTime();

    let headingColumnIndex = 1;
    columnNames.forEach(heading => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    // await co(function*() {
    //   const cursor = covidData_model.aggregate()
    //     .match({ $and: query })
    //     .cursor()
    //     .exec();

    //   let rowIndex = 2
    //   for (let doc = yield cursor.next(); doc != null; doc = yield cursor.next()){
    //     let columnIndex = 1;
    //     columnNames.forEach(heading => {
    //       let value = !doc[heading] ? '' : typeof doc[heading] != "string" ? 
    //         doc[heading].toString() : doc[heading];

    //       ws.cell(rowIndex, columnIndex++).string(value);
    //     });
    //     rowIndex++;
    //   }
      //wb.write(__dirname + `/files/covidData${fileTimeStamp}.xlsx`);

    // });
      
    res.send(`covidData${fileTimeStamp}.xlsx`)
  }
}

module.exports = covidReports_controllers;
