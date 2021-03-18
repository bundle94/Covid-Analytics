var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var XLSX = require('xlsx');
const mongoose = require('mongoose');
const fs = require('fs');

const covidDataModel = require('./models/covidData_model');

var indexRouter = require('./routes/index');
var covidRouter = require('./routes/covid');

const mongoUrl = 'mongodb+srv://somto:wemacovidassesment@cluster0.9ofri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected with " + mongoUrl))
    .catch(err => console.log(err));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/downloads', express.static(path.join(__dirname, './controllers/files')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', indexRouter);
app.use('/api', covidRouter);

// app.get('/covidData', async function (req, res) {
//   let data = await covidDataModel.aggregate()
//     .match({
//       total_cases: { $gt: 1 }
//     })
//     .group({
//       "_id": "$continent",
//         "count": { "$sum": 1 }
//     })
//   // ([
//     // {$limit:1000},
//   //   {
//   //     '$match': {
//   //       total_cases: { $gte: new Date('2020-02') }
//   //     }
//   //   },
//   //   {
//   //     '$group': {
//   //       "_id": "$continent",
//   //       "count": { "$sum": 1 }
//   //     }
//   //   }
//   // ]);

//   res.send(data);
// });

// app.get('/covidDataV2', async function (req, res) {
//   let data = await covidDataModel.findOne({date: /^2020-02-25/})
//   // console.log(data)
//   res.send(data);
// });

// app.get('/createCovid', async function (req, res) {
//   let data = {
//     iso_code: "type: String,"
//   }
  
//   let uss = new covidDataModel(data);
//   let usss = await uss.save();
//   res.send("ok");
// });

// app.get('/createJSONFile', async function (req, res) {
//   var header = [];
//   var toJson = [];
//   var roa;
//   let dt = XLSX.readFile("./CovidDataX.xlsx")

//   const first_worksheet = dt.Sheets[dt.SheetNames[0]];
//   const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1, raw: false });
//   header = data[0];

//   for (let i = 1; i < data.length; i++) {
//     const element = data[i];
//     let dataToSend = {};

//     for (let z = 0; z < element.length; z++) {
//       const ele = element[z];
//       if (z == 3) {
//         dataToSend[header[z]] = ele == undefined ? "" : new Date(ele);
//       } else {
//         dataToSend[header[z]] = ele == undefined ? "" : ele;
//       }
      
//     }

//     toJson.push(dataToSend)
//   }
//   var dictstring = JSON.stringify(toJson);
//   fs.writeFile("covidData3.json", dictstring, (err) => {
//     console.log(err)
//   });
//   res.send("done");
// });


module.exports = app;
