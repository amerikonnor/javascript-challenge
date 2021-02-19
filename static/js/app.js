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


//FILTER WORK

// making an array to store what filters need to be applied
var filters = [];

//variables for the form, each field, and the button
var Form = d3.select('form')
var dateField = d3.select('#datetime');
var Button = d3.select('button');


//filter function

function UFOfilter(){
    filters.forEach(([what,field]) =>{
        var value = field.property('value');
        var newData = [];
        tableData.forEach(sighting => {
            if(sighting[what] == value){
                newData.push(sighting);
            };
        });
        createTable(newData);
    });
};



Form.on('submit',function(){
    d3.event.preventDefault();
});

dateField.on('change',function(){
    console.log(filters);
    d3.event.preventDefault();
    if (d3.event.target.value != ''){
        if (!('datetime' in Object.keys(filters))){
            filters.push(['datetime', dateField]);
        };
    };
});

Button.on('click',function(){
    d3.event.preventDefault();
    UFOfilter();
});











