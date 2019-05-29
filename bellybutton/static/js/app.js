function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample 
  const url = `metadata/${sample}`; //get the url for the API
  d3.json(url).then((sample) => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");
      // Clear existed data
      sample_metadata.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(sample).forEach(([key, value]) => {
        row = sample_metadata.append("p");
        row.text(`${key} : ${value}`);
      });
      // Pull out wfreq for gauge chart
      gaugeGraph(sample.WFREQ)
      console.log(sample.WFREQ)
    });

    
}
// Build the chart 
function buildCharts(sample) {

  // Use d3.json to fetch the sample data for the plots
  const url = `samples/${sample}`;
  d3.json(url).then((data) => {
    // Build dynamic bubble plot data
    var x_value = data.otu_ids; //x-axis
    var y_value = data.sample_values; //y-axis
    var marker_color = data.otu_ids; // Marker color
    var marker_size = data.sample_values; // Marker size
    var text_value = data.otu_labels; // Text Value
    // Define the Bubble Plot
    var trace1 = {
      x: x_value,
      y: y_value,
      text: text_value,
      mode: 'markers',
      marker: {
        color: marker_color,
        size: marker_size,
        colorscale: "Picnic", 
      } 
    };
    // Define the variable for building the plot
    var bubblePlotData = [trace1];

    var layout = {
      xaxis: { title: "OTU ID"},
      title: "OTU Volume and Spread",
      // Add my name at the top right of the bubble plot.. 
      annotations: [{
        text:'Hunter Cash',
        x: 1,
        y: 1,
        yref: 'paper',
        xref: 'paper',
        showarrow: false,
        font: {color:'red', size: 16}
      }],
    };
    // Show the graph on the ID of bubble in the html
    Plotly.newPlot('bubble', bubblePlotData, layout);
   
    // Build a Pie Chart
    // Slice the Data for top 10
    d3.json(url).then((data) => {  
      var pieValue = data.sample_values.slice(0,10);
      var pieLabels = data.otu_ids.slice(0,10);
      var pieHover = data.otu_labels.slice(0,10);
      var pieData = [{
        values: pieValue,
        labels: pieLabels,
        hovertext: pieHover,
        type: 'pie',
      }];
      var pieLayout= {
        title: "Top Ten OTU",
      };
    // Show the graph on the ID of pie in the html
    Plotly.newPlot('pie', pieData, pieLayout);
    });
  });   
}

// function to create the dropdown menu for the names
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function to create the new chart on change
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log("MOAR SCIENCE")
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


// https://en.wikipedia.org/wiki/Operational_taxonomic_unit
// I have no idea what this sciency stuff is, i'm just running stats.. 