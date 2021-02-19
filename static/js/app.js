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

//on page load this loads the unfiltered table
createTable(tableData);


//FILTER WORK

//find the form
var Form = d3.select('form')

//find the filter button
var FilterButton = d3.select('#filter-btn');

//find the reset button
var ResetButton = d3.select('#reset-btn');

// each input field
var dateField = d3.select('#datetime');
var cityField = d3.select('#city');
var stateField = d3.select('#state');
var countryField = d3.select('#country');
var shapeField = d3.select('#shape');

// everything i need for the filter
var fields = [['datetime',dateField], ['city', cityField], ['state',stateField], ['country',countryField], ['shape',shapeField]];

//filter function

function UFOfilter(){

    //array to hold final filtered data
    var filteredData = [];

    //array that holds the data after each filtering step
    var trackingData = tableData;

    //setting a boolean that will change to true if the user entered anything
    thereWasInput = false;
    //loop through each field
    fields.forEach(thing =>{
        

        //pull out the column, field name and input value
        var what = thing[0];
        var field = thing[1];
        var value = field.property('value');

        // check if the user typed anything, and then filter for the value if they did
        if (value !== ''){
        //reset the filtered data to empty each time
            filteredData = [];
            thereWasInput = true;
            trackingData.forEach(sighting =>{
                if(sighting[what] == value){
                    filteredData.push(sighting);
                };
            });
            trackingData = filteredData;
        };
        //save the filtered data for the next time through the loop
        
    });

    //if the user tried to filter, shows the filtered data
    if (thereWasInput){
        createTable(filteredData);
    }
    //in case they click the filter button without typing anything, prints the unfiltered data
    else {
        createTable(tableData);
    }
};

//if they somehow get this event
Form.on('submit',function(){
    d3.event.preventDefault();
    UFOfilter();
});

// they change a single value, this will filter immediately.
// currently commented out because this gets busy if they want multiple filters
// d3.selectAll('input').on('change',function(){
//     d3.event.preventDefault();
//     UFOfilter();
// });

//when the button is clicked, filters the data
FilterButton.on('click',function(){
    d3.event.preventDefault();
    UFOfilter();
});

//reset button resets the form and filters on the empty form!
ResetButton.on('click',function(){
    console.log('reset');
    this.form.reset();
    UFOfilter();
});












