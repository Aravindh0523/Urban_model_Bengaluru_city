// Load your Land Use and Land Cover (LULC) images.
var lulc_1990 = ee.Image('users/revanthkrv2000/LULC_1991');
var lulc_1995 = ee.Image('users/revanthkrv2000/LULC_1995');
var lulc_2000 = ee.Image('users/revanthkrv2000/LULC_2000');
var lulc_2005 = ee.Image('users/revanthkrv2000/LULC_2005');
var lulc_2010 = ee.Image('users/revanthkrv2000/LULC_2010');
var lulc_2015 = ee.Image('users/revanthkrv2000/LULC_2015');
var lulc_2020 = ee.Image('users/revanthkrv2000/LULC_2020');
var lulc_2024 = ee.Image('users/revanthkrv2000/LULC_2024');

// Define visualization parameters for the LULC maps.
var visParams = {
    min: 0,
    max: 3,
    palette: ['blue', 'red', 'green', 'yellow']
  };
  
  // Create a dictionary of LULC images.
  
  var images = {
  'LULC 1990': lulc_1990.visualize(visParams),
  'LULC 1995': lulc_1995.visualize(visParams),
  'LULC 2000': lulc_2000.visualize(visParams),
  'LULC 2005': lulc_2005.visualize(visParams),
  'LULC 2010': lulc_2010.visualize(visParams),
  'LULC 2015': lulc_2015.visualize(visParams),
  'LULC 2020': lulc_2020.visualize(visParams),
  'LULC 2024': lulc_2024.visualize(visParams),
};
  
  /*
   * Set up the maps and control widgets
   */
  
  // Create the left map, and have it display the first LULC map.
  var leftMap = ui.Map();
  leftMap.setControlVisibility(false);
  var leftSelector = addLayerSelector(leftMap, 'LULC Map 1', 'top-left');
  
  // Create the right map, and have it display the second LULC map.
  var rightMap = ui.Map();
  rightMap.setControlVisibility(false);
  var rightSelector = addLayerSelector(rightMap, 'LULC Map 2', 'top-right');
  
  // Adds a layer selection widget to the given map, to allow users to change
  // which image is displayed in the associated map.
  function addLayerSelector(mapToChange, defaultValue, position) {
    var label = ui.Label('Choose an image to visualize');
  
    // This function changes the given map to show the selected image.
    function updateMap(selection) {
      var selectedImage = images[selection];
      mapToChange.layers().set(0, ui.Map.Layer(selectedImage));
    }
  
    // Configure a selection dropdown to allow the user to choose between images,
    // and set the map to update when a user makes a selection.
    var select = ui.Select({items: Object.keys(images), onChange: updateMap});
    select.setValue(defaultValue, true);
  
    var controlPanel =
        ui.Panel({widgets: [label, select], style: {position: position}});
  
    mapToChange.add(controlPanel);
  }
  
  // Center the map on a specific location.
  var center = [77.5946, 12.9716]; // for bengaluru 
  leftMap.setCenter(center[0], center[1], 10);
  rightMap.setCenter(center[0], center[1], 10);
  /*
   * Tie everything together
   */
  
  // Create a SplitPanel to hold the adjacent, linked maps.
  var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  
  // Set the SplitPanel as the only thing in the UI root.
  ui.root.widgets().reset([splitPanel]);
  
  // Link the maps so that they move together.
  var linker = ui.Map.Linker([leftMap, rightMap]);
