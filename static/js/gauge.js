// Create a Function to create the gauge chart based on metadata washing frequency (wfreq)
function gaugeGraph(wfreq) {
var level = wfreq;
// Trig to calc meter point
var degrees = 9 - level,
     radius = .5;
var radians = degrees * Math.PI / 9;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
    x: [0], 
    y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'BellyButton Cleanings',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9],
  rotation: 90,
  text: ["Cleanings Per Week",
        '0-1',
        '1-2',
        '2-3',
        '3-4',
        '4-5', 
        '5-6', 
        '6-7', 
        '7-8', 
        '8-9'],
  textinfo: 'text',
  textposition:'inside',
  marker: {
      colors: [
          "white"
      ]
  },
  hoverinfo: wfreq,
  hole: .5,
  type: 'pie',
  direction: "clockwise",
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Belly Button Washing Frequency(Cleanings Per Week)',
  xaxis: {
    zeroline:false, 
    showticklabels:false,
    showgrid: false, 
    range: [-1, 1]},
  yaxis: {
    zeroline:false, 
    showticklabels:false,
    showgrid: false, range: [-1, 1]}
};


Plotly.newPlot('gauge', data, layout);

}


// function buildCharts(sample) {

//     // @TODO: Use `d3.json` to fetch the sample data for the plots
//     const url = `samples/${sample}`;
//     d3.json(url).then((data) => {
  
//       // @TODO: Build a Bubble Chart using the sample data
//       var x_value = data.otu_ids; //x-axis
//       var y_value = data.sample_values; //y-axis
//       var marker_color = data.otu_ids; // Marker color
//       var marker_size = data.sample_values; // Marker size
//       var text_value = data.otu_labels; // Text Value
  
//       var trace1 = {
//         x: x_value,
//         y: y_value,
//         text: text_value,
//         mode: 'markers',
//         marker: {
//           color: marker_color,
//           size: marker_size,
//           colorscale: "Picnic", 
//         } 
//       };
    
//       var data = [trace1];
  
//       var layout = {
//         xaxis: { title: "OTU ID"},
//         title: "OTU Volume and Spread",
//         annotations: [{
//           text:'Hunter Cash',
//           x: 1,
//           y: 1,
//           yref: 'paper',
//           xref: 'paper',
//           showarrow: false,
//           font: {color:'red', size: 16}
//         }],
//       };
  
//       Plotly.newPlot('bubble', data, layout);
     
//       // @TODO: Build a Pie Chart
//       d3.json(url).then((data) => {  
//         var p_val = data.sample_values.slice(0,10);
//         var p_lab = data.otu_ids.slice(0,10);
//         var p_hov = data.otu_labels.slice(0,10);
  
//         var data = [{
//           values: p_val,
//           labels: p_lab,
//           hovertext: p_hov,
//           type: 'pie',
//         }];
  
//         var p_layout= {
//           title: "Top Ten OTU",
//         };
  
//       Plotly.newPlot('pie', data, p_layout);
  
//       });
//     });   
//   }