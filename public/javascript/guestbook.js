$(document).ready(function() {
  $.getJSON("/data/data.json", function(result) {
    console.log(typeof result);

    let data = result;
    console.log(typeof result);

    console.log(data.length);
    let table = `<table align="center" class="pure-table pure-table-horizontal" >
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Country</th>
            <th>Message</th>
            <th>Date</th>
        </tr>
    </thead><tbody>`;

    for (let i = 0; i < data.length; i++) {
      table +=
        "<tr><td style='font-weight: bold;'>" +
        data[i].id +
        "</td><td>" +
        data[i].username +
        "</td><td>" +
        data[i].country +
        "</td><td>" +
        data[i].message +
        "</td><td>" +
        data[i].date +
        "</td></tr>";
    }

    table += "</tbody></table>";
    console.log(table);

    $("#tableresult").html(table);
  });
});


// Luodaan kolmas reitti, joka palauttaa selaimeen JSONdata.json tiedoston sisällön
app.get('/data', function (req, res) {
  var data = require(__dirname + '/data/data.json');
  res.json(data);
});

// luodaan reitti, joka parsii .json tiedoston sisällön taulukkomuotoon ja palauttaa sen eslaimeen

app.get('/details', function (req, res) {
  var data = require(__dirname + '/data/data.json');

  // Parse the results into a variabke
  var results = '<table border="1"> ';

  for (var i = 0; i < data.length; i++) {
      results +=
          '<tr>' +
          '<td>' + data[i].Name + '</td>' +
          '<td>' + data[i].Email + '</td>' +
          '<td>' + data[i].Date + '</td>' +
          '<td>' + data[i].Company + '</td>' +
          '</tr>';
  }

  res.send(results);
});

