const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var covidDataSchema = new Schema({
"iso_code":{
  type: String,
},
"continent":{
  type: String,
},
"location":{
  type: String,
},
"date":{
  type: Date,
},
"total_cases":{
  type: Number,
},
"new_cases":{
  type: Number,
},
"new_cases_smoothed":{
  type: Number,
},
"total_deaths":{
  type: Number,
},
"new_deaths":{
  type: Number,
},
"new_deaths_smoothed":{
  type: Number,
},
"total_cases_per_million":{
  type: Number,
},
"new_cases_per_million":{
  type: Number,
},
"new_cases_smoothed_per_million":{
  type: Number,
},
"total_deaths_per_million":{
  type: Number,
},
"new_deaths_per_million":{
  type: Number,
},
"new_deaths_smoothed_per_million":{
  type: Number,
},
"reproduction_rate":{
  type: Number,
},
"icu_patients":{
  type: Number,
},
"icu_patients_per_million":{
  type: Number,
},
"hosp_patients":{
  type: Number,
},
"hosp_patients_per_million":{
  type: Number,
},
"weekly_icu_admissions":{
  type: Number,
},
"weekly_icu_admissions_per_million":{
  type: Number,
},
"weekly_hosp_admissions":{
  type: Number,
},
"weekly_hosp_admissions_per_million":{
  type: Number,
},
"new_tests":{
  type: Number,
},
"total_tests":{
  type: Number,
},
"total_tests_per_thousand":{
  type: Number,
},
"new_tests_per_thousand":{
  type: Number,
},
"new_tests_smoothed":{
  type: Number,
},
"new_tests_smoothed_per_thousand":{
  type: Number,
},
"positive_rate":{
  type: Number,
},
"tests_per_case":{
  type: Number,
},
"tests_units":{
  type: Number,
},
"total_vaccinations":{
  type: Number,
},
"people_vaccinated":{
  type: Number,
},
"people_fully_vaccinated":{
  type: Number,
},
"new_vaccinations":{
  type: Number,
},
"new_vaccinations_smoothed":{
  type: Number,
},
"total_vaccinations_per_hundred":{
  type: Number,
},
"people_vaccinated_per_hundred":{
  type: Number,
},
"people_fully_vaccinated_per_hundred":{
  type: Number,
},
"new_vaccinations_smoothed_per_million":{
  type: Number,
},
"stringency_index":{
  type: Number,
},
"population":{
  type: Number,
},
"population_density":{
  type: Number,
},
"median_age":{
  type: Number,
},
"aged_65_older":{
  type: Number,
},
"aged_70_older":{
  type: Number,
},
"gdp_per_capita":{
  type: Number,
},
"extreme_poverty":{
  type: Number,
},
"cardiovasc_death_rate":{
  type: Number,
},
"diabetes_prevalence":{
  type: Number,
},
"female_smokers":{
  type: Number,
},
"male_smokers":{
  type: Number,
},
"handwashing_facilities":{
  type: Number,
},
"hospital_beds_per_thousand":{
  type: Number,
},
"life_expectancy":{
  type: Number,
},
"human_development_index":{
  type: Number,
}
}, {
    collection: 'covidData',
});

covidDataSchema.index({
  continent: 'text',
  location: 'text'
})

const covidData = mongoose.model('covidData', covidDataSchema);
module.exports = covidData;
