/* globals Chart:false, feather:false */

(function () {
  'use strict'

  $(document).ready(function() {
    setCountries();

    $('.datepicker').datepicker();
    $('#filterContinents').on('click', filterContinents);
    $('#filterNewContinents').on('click', filterNewContinents);
    $('#filterDeathByYearContinents').on('click', filterDeathsByMonthYearPerContinent);
    $('#filterDeathByYearCountrys').on('click', filterDeathsByMonthYearPerCountry);

    filterContinents();
    filterNewContinents();
    filterDeathsByMonthYearPerContinent();
    filterDeathsByMonthYearPerCountry();
  })

  function setCountries() {
    countries.sort((a, b) => compare(a, b, 'name'));

    let mockup = ``;
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];

      mockup += `<option ${i == 0 ? 'selected' : ''} value='${country.name}'>${country.name}</option>`;
    }

    $("#deathCountry").append(mockup).select2();
  }
  
  async function filterContinents() {
    let data = {
      start_date: $('#startDate').val() == "" ? new Date('2019-01-01') : $('#startDate').val(),
      end_date: $('#endDate').val() == "" ? new Date() : $('#endDate').val(),
    }

    ajaxAsync('api/getContinentsTotalCases', data, "PUT", processContinentsResult);
  }

  async function filterNewContinents() {
    let data = {
      start_date: $('#newCasesStartDate').val() == "" ? new Date('2019-01-01') : $('#newCasesStartDate').val(),
      end_date: $('#newCasesEndDate').val() == "" ? new Date() : $('#newCasesEndDate').val(),
    }

    ajaxAsync('api/getContinentsNewCases', data, "PUT", processNewCasesContinentsResult);
  }
  
  async function filterDeathsByMonthYearPerContinent() {
    let data = {
      start_date: $('#ageDeathByContinentStart').val() == "" ? new Date('2019-01-01') : $('#ageDeathByContinentStart').val(),
      end_date: $('#ageDeathByContinentEnd').val() == "" ? new Date() : $('#ageDeathByContinentEnd').val(),
      continent: $('#deathContinent').val(),
      total_var: $("#ContinentTypeVar").val()
    }

    ajaxAsync('api/getTotalDeathsPerMonthByContinent', data, "PUT", processTotalDeathsPerMonthByContinent);
  }
  
  async function filterDeathsByMonthYearPerCountry() {
    let data = {
      start_date: $('#ageDeathByCountryStart').val() == "" ? new Date('2019-01-01') : $('#ageDeathByContinentStart').val(),
      end_date: $('#ageDeathByCountryEnd').val() == "" ? new Date() : $('#ageDeathByContinentEnd').val(),
      country: $('#deathCountry').val(),
      total_var: $("#CountryTypeVar").val()
    }

    ajaxAsync('api/getTotalDeathsPerMonthByCountry', data, "PUT", processTotalDeathsPerMonthByCountry);
  }
  
  function processContinentsResult(dataFromDb) {
    let dataForMapChart = mapContinentsData(dataFromDb);

    Highcharts.mapChart('continentTotalCases', {
      chart: {
          map: 'custom/world-continents'
      },
      title: {
        text: ''
      },
      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
  
      colorAxis: {
          min: 0
      },
  
      series: [{
          data: dataForMapChart,
          states: {
              hover: {
                  color: '#BADA55'
              }
          },
          dataLabels: {
              enabled: true,
              format: '{point.name}: {point.value}'
          }
      }]
    })
  }
  
  function processNewCasesContinentsResult(dataFromDb) {
    let dataForMapChart = mapContinentsData(dataFromDb);

    Highcharts.mapChart('continentNewCases', {
      chart: {
          map: 'custom/world-continents'
      },
      title: {
        text: ''
      },
      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
  
      colorAxis: {
          min: 0
      },
  
      series: [{
          data: dataForMapChart,
          states: {
              hover: {
                  color: '#BADA55'
              }
          },
          dataLabels: {
              enabled: true,
              format: '{point.name}: {point.value}'
          }
      }]
    })
  }

  function processTotalDeathsPerMonthByContinent(dataFromDb) {

    let data = [];
    let text = $("#ContinentTypeVar").val().replace("_", " ")
      .split(" ").map(ele => ele[0].toUpperCase() + ele.substring(1)).join(" ");

    $("#continentHeader").text(`(${text}) by Year and Month per Continent`);

    dataFromDb.map(ele => {
      let dt = {
        name: monthNames[ele._id - 1],
        y: ele.count,
        _id: ele._id,
        drilldown: ele.continent
      }

      data.push(dt);
    });

    data.sort((a, b) => compare(a, b, '_id'));

    // Create the chart
    Highcharts.chart('continentDeathByYear', {
      chart: {
          type: 'column'
      },
      title: {
        text: 'Graph for ' + $('#deathContinent').val()
      },
      accessibility: {
          announceNewData: {
              enabled: true
          }
      },
      xAxis: {
          type: 'category'
      },
      yAxis: {
          title: {
              text: 'Total'
          }

      },
      legend: {
          enabled: false
      },
      plotOptions: {
          series: {
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
                  format: '{point.y}'
              }
          }
      },

      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
      },

      series: [
        {
          name: "Months",
          colorByPoint: true,
          data
        }
      ]
    });
  }

  function processTotalDeathsPerMonthByCountry(dataFromDb) {

    let data = [];
    let text = $("#CountryTypeVar").val().replace("_", " ")
      .split(" ").map(ele => ele[0].toUpperCase() + ele.substring(1)).join(" ");
      
    $("#countryHeader").text(`(${text}) by Year and Month per Country`);

    dataFromDb.map(ele => {
      let dt = {
        name: monthNames[ele._id - 1],
        y: ele.count,
        _id: ele._id,
        drilldown: ele.continent
      }

      data.push(dt);
    });

    data.sort((a, b) => compare(a, b, '_id'));
    console.log(data)

    // Create the chart
    Highcharts.chart('CountryDeathByYear', {
      chart: {
          type: 'column'
      },
      title: {
        text: 'Graph for ' + $('#deathCountry').val()
      },
      accessibility: {
          announceNewData: {
              enabled: true
          }
      },
      xAxis: {
          type: 'category'
      },
      yAxis: {
          title: {
              text: 'Total'
          }

      },
      legend: {
          enabled: false
      },
      plotOptions: {
          series: {
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
                  format: '{point.y}'
              }
          }
      },

      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
      },

      series: [
        {
          name: "Months",
          colorByPoint: true,
          data
        }
      ]
    });
  }

  function mapContinentsData(dataFromDb) {
    let dataForMapChart = [];
    let dt;

    dataFromDb.map(data => {
      switch (data._id) {
        case "Africa":
          dt = ['af', data.count]
          dataForMapChart.push(dt);
          break;
        case "Europe":
          dt = ['eu', data.count]
          dataForMapChart.push(dt);
          break;
        case "North America":
          dt = ['na', data.count]
          dataForMapChart.push(dt);
          break;
        case "Oceania":
          dt = ['oc', data.count]
          dataForMapChart.push(dt);
          break;
        case "South America":
          dt = ['sa', data.count]
          dataForMapChart.push(dt);
          break;
        case "Asia":
          dt = ['as', data.count]
          dataForMapChart.push(dt);
          break;
        case "":
          dt = ['an', data.count]
          dataForMapChart.push(dt);
          break;
      
        default:
          break;
      }
    });

    return dataForMapChart;
  }

  function ajaxAsync(actionUrl, Data = {}, type = "", callback = function () { }, callbackparams = {}) {
    $.ajax({
      url: clientBaseUrl + actionUrl,
      contentType: 'application/json; charset=UTF-8',
      type: type,
      crossDomain: true,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      data: JSON.stringify(Data),
      beforeSend: function () {
      },
      success: function (data) {
          callback(data, callbackparams);
      },
      error: function (data, status, errorMsg) {
          
      }
    });
  }

  function compare(a, b, valToCheckAgainst) {
    // Use toUpperCase() to ignore character casing
    const specimenA = typeof a[valToCheckAgainst] === 'string' ? 
      a[valToCheckAgainst].toUpperCase() : a[valToCheckAgainst];

    const specimenB = typeof b[valToCheckAgainst] === 'string' ? 
      b[valToCheckAgainst].toUpperCase() : b[valToCheckAgainst];
  
    let comparison = 0;
    if (specimenA > specimenB) {
      comparison = 1;
    } else if (specimenA < specimenB) {
      comparison = -1;
    }
    return comparison;
  }
  
})()
