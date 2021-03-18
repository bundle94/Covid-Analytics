/* globals Chart:false, feather:false */

(function () {
  'use strict'
  var covidTable = "";

  $(document).ready(function() {
    setCountries();
    $('.datepicker').datepicker();
    loadCovidData();
    $("#filter").on("click", () => covidTable.draw());

    $("#reportModal").on('shown.bs.modal', function () {
      let data = {
        "start_date": $("#startDate").val() == "" ? new Date('2019/01/01') : $("#startDate").val(),
        "end_date": $("#endDate").val() == "" ? new Date() : $("#endDate").val(),
        "country": $("#countries").val(),
        "continent": $("#continents").val(),
        "search": $("#reportsDTB_filter input").val()
      }

      ajaxAsync('api/collateReports', data, "PUT", data => {
        $("#loading").addClass("d-none");
        $("#loaded").removeClass("d-none");
        $("#downloadLink").attr("href", clientBaseUrl + `downloads/${data}`);
      });
    });

    $("#reportModal").on('hide.bs.modal', function () {
      $("#loading").removeClass("d-none");
      $("#loaded").addClass("d-none");
      $("#downloadLink").attr("href", '');
    });
    // $('#reportsDTB').dataTable({
    //   scrollX: true
    // });

  });

  function setCountries() {
    countries.sort((a, b) => compare(a, b, 'name'));

    let mockup = ``;
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];

      mockup += `<option value='${country.name}'>${country.name}</option>`;
    }

    $("#countries").append(mockup).select2();
  }

  function loadCovidData() {
    covidTable = $("#reportsDTB").DataTable({
      "lengthMenu": [[10, 25, 50, 100, 200, 300, 400, 500 - 1], [10, 25, 50, 100, 200, 300, 400, 500, "All"]],
      serverSide: true,
      "processing": true,
      ajax: {
          url: clientBaseUrl + 'api/getCovidReports',
          type: 'PUT',
          "contentType": 'application/json; charset=utf-8',
          data: function (D) {
              let dataToSend = {
                  "draw": D.draw,
                  "start": D.start,
                  "length": D.length,
                  "search": D.search.value,
                  "start_date": $("#startDate").val() == "" ? new Date('2019/01/01') : $("#startDate").val(),
                  "end_date": $("#endDate").val() == "" ? new Date() : $("#endDate").val(),
                  "continent": $("#continents").val(),
                  "country": $("#countries").val(),
              };
              return JSON.stringify(dataToSend);
          },
          error: function (E) {
              
          }

      },
      "drawCallback": function (settings) {
          // initialUT++;
          // if (!$("#tboverlay").hasClass('hide')) {
          //     toggleSpinner();
          // }
      },
      "columns": [
          { "data": "continent" },
          { "data": "location" },
          { 
            "render": function (data, type, row) {
              return moment(row.date).format('MMMM Do YYYY, h:mm:ss a');
            } 
          },
          { "data": "total_cases" },
          { "data": "new_cases" },
          { "data": "total_deaths" },
          { "data": "new_deaths" },
          { "data": "new_cases_per_million" },
          { "data": "total_cases_per_million" },
          { "data": "new_deaths_per_million" },
          { "data": "total_deaths_per_million" }
      ],
      lengthChange: true,
      dom: 'Blfrtip',
      buttons: ['excel', 'pdf', 'pageLength'],
      "scrollX": true,
      "ordering": false
    });
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
