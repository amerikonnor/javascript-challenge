// from data.js
var tableData = data;

// YOUR CODE HERE
//the table creation!
//making a function so that when we filter we can call it again
function createTable(data){
    // find the table body
    var table = d3.select('tbody');

    // clear any contents that might be in the table 
    d3.selectAll('tbody>tr').remove();

    // looping through the data and adding it to the table
    data.forEach(sighting => {
        var row = table.append('tr');
        Object.entries(sighting).forEach(([key,value]) => {
            var cell = row.append('td');
            cell.text(value);
        });
    });
};

createTable(tableData);

//filter function

//date filter stuff
function UFOfilter(onWhat,value){
    var newData = [];
    tableData.forEach(sighting => {
        if(sighting[onWhat] == value){
            newData.push(sighting);
        }
    });
    createTable(newData);
};

var dateForm = d3.select('#dateform')
var dateField = d3.select('#datetime');
var dateButton = d3.select('.button1');

dateForm.on('submit',function(){
    d3.event.preventDefault();
    UFOfilter('datetime', dateField.property('value'));
});

dateButton.on('click',function(){
    d3.event.preventDefault();
    UFOfilter('datetime', dateField.property('value'));
});











