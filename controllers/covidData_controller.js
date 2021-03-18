const covidData_model = require("../models/covidData_model");

const covidData_controllers = {
  getContinentsTotalCases: async (req, res) => {
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);

    let data = await covidData_model.aggregate()
      .match({
        total_cases: { $gt: 0 },
        date: { $gte: start_date, $lte: end_date }
      })
      .group({
        "_id": "$continent",
        "count": { "$sum": "$total_cases" }
      });

    res.send(data);
  },
  
  getContinentsNewCases: async (req, res) => {
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);

    let data = await covidData_model.aggregate()
      .match({
        new_cases: { $gt: 0 },
        date: { $gte: start_date, $lte: end_date }
      })
      .group({
        "_id": "$continent",
        "count": { "$sum": "$new_cases" }
      });

    res.send(data);
  },
  
  getTotalDeathsByAgeContinent: async (req, res) => {
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);

    let data = await covidData_model.aggregate()
      .match({
        total_deaths: { $gt: 0 },
        date: { $gte: start_date, $lte: end_date }
      })
      .group({
        "_id": "$continent",
        "continent": {"$first":"$continent"},
        "count": { "$sum": "$total_cases" }
      });

    res.send(data);
  },
  
  getTotalDeathsPerMonthByContinent: async (req, res) => {
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);
    let continent = req.body.continent;
    let total_var = req.body.total_var;
    let searchVar = "$" + total_var;

    let data = await covidData_model.aggregate()
      .project({
        continent: 1,
        date: 1,
        month: { $month: '$date' },
        year: { $year: '$date' },
        [total_var]: 1
      })
      .match({
        $and: [
          { date : { $gte: start_date, $lte: end_date } },
          { continent: { $eq: continent } },
          { [total_var]: { $gt: 0 } }
        ]
      })
      .group({
        "_id": "$month",
        "count": { "$sum": searchVar },
        "continent": { $first: "$continent" }
      });

    res.send(data);
  },

  getTotalDeathsPerMonthByCountry: async (req, res) => {
    let start_date = new Date(req.body.start_date);
    let end_date = new Date(req.body.end_date);
    let country = req.body.country;
    let total_var = req.body.total_var;
    let searchVar = "$" + total_var;
    
    let data = await covidData_model.aggregate()
      .project({
        location: 1,
        date: 1,
        month: { $month: '$date' },
        year: { $year: '$date' },
        [total_var]: 1
      })
      .match({
        $and: [
          { date : { $gte: start_date, $lte: end_date } },
          { location: { $eq: country } },
          { [total_var]: { $gt: 0 } }
        ]
      })
      .group({
        "_id": "$month",
        "count": { "$sum": searchVar },
        "country": { $first: "$location" }
      });

    res.send(data);
  },

}

module.exports = covidData_controllers;
