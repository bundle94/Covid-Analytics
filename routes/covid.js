var express = require('express');
var router = express.Router();

const covidData_controller = require("../controllers/covidData_controller");
const covidReports_controller = require("../controllers/covidReports_controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/getContinentsTotalCases', covidData_controller.getContinentsTotalCases);
router.put('/getContinentsNewCases', covidData_controller.getContinentsNewCases);
router.put('/getTotalDeathsByAgeContinent', covidData_controller.getTotalDeathsByAgeContinent);
router.put('/getTotalDeathsPerMonthByContinent', covidData_controller.getTotalDeathsPerMonthByContinent);
router.put('/getTotalDeathsPerMonthByCountry', covidData_controller.getTotalDeathsPerMonthByCountry);

router.put('/getCovidReports', covidReports_controller.getCovidReports);
router.put('/collateReports', covidReports_controller.collateReports);

module.exports = router;
