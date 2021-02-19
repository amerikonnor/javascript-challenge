// from data.js
var tableData = data;

// YOUR CODE HERE












//the table creation!
var table = d3.select('tbody');

tableData.forEach(sighting => {
    var row = table.append('tr');
    Object.entries(sighting).forEach(([key,value]) => {
        var cell = row.append('td');
        cell.text(value);
    });
});