$(document).ready(function() {
    $('button').on('click', function(e) {
        e.preventDefault();

        // Call the validateForm() function to ensure all fields are filled
        if (!validateForm()) {
            return; // Exit the function if form validation fails
        }

        let name = document.getElementById("name").value;
        let country = document.getElementById("country").value;
        let message = document.getElementById("comment").value;

        $.post({
            async: false,
            type: "POST",
            url: "/update",
            dataType: "json",
            data: {
                "name": name,
                "country": country,
                "message": message
            }
        });


        $.getJSON("/data/data.json", function(result) {
            let data = result;
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
                    "</td>";
            }

            table += "</tbody></table>";
            console.log(table);

            let output = document.getElementById("table");

            output.innerHTML = table;


        });
    });

});

function validateForm() {
    var name = document.getElementById("name").value;
    var country = document.getElementById("country").value;
    var message = document.getElementById("comment").value;

    if (name.trim() == "" || country.trim() == "" || message.trim() == "") {
        alert("Please fill out all fields!");
        return false;
    }
    return true;
}