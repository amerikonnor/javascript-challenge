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

//function to put things into filters, takes in what column needs filtered, and the field for that filter
function addFilter(what,field){

    //we only want to add it if the field contains a value
    if (field.property('value') != ''){

        //make sure the value isn't already in there, and then push if we should
        var push = true;
        filters.forEach(([filterwhat,field]) =>{
            if (filterwhat == what){
                push = false;
            };
        });
        if (push){
            filters.push([what, field]);
        };
    }
};


//variables for the form, each field, and the button
var Form = d3.select('form')

var dateField = d3.select('#datetime');
var cityField = d3.select('#city');
var stateField = d3.select('#state');
var countryField = d3.select('#country');
var shapeField = d3.select('#shape');


var Button = d3.select('button');


//filter function

function UFOfilter(){
    if (filters.length == 0){
        createTable(tableData);
    }
    else{
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
};


//don't do anything if they just hit enter in a field. might change this later
Form.on('submit',function(){
    d3.event.preventDefault();
});

//for every field that changes, we make sure that it will get filtered if the field isn't empty

dateField.on('change',function(){
    console.log(filters);
    d3.event.preventDefault();
    addFilter('datetime',dateField);
    
});

cityField.on('change',function(){
    console.log(filters);
    d3.event.preventDefault();
    addFilter('city',cityField)
});

stateField.on('change',function(){
    console.log(filters);
    d3.event.preventDefault();
    addFilter('state',stateField)
});

countryField.on('change',function(){
    console.log(filters);
    d3.event.preventDefault();
    addFilter('country',countryField)
});

shapeField.on('change',function(){
    console.log(filters);
    d3.event.preventDefault();
    addFilter('shape',shapeField)
});


//when the button is clicked, filters the data
Button.on('click',function(){
    d3.event.preventDefault();
    UFOfilter();
});

//trying something else
var list = d3.selectAll('li');
console.log(list);









