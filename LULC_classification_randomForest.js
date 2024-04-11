//var Ben_city : Table users/revanthkrv2000/Bengaluru_city';   
var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2');
var image = l8.filterBounds(Ben_city)
            .filterDate('2015-01-01','2015-12-30')
            .filterMetadata('CLOUD_COVER','less_than',1)
            .median()
            .clip(Ben_city)
print(image)
Map.addLayer(Ben_city)
Map.centerObject(Ben_city,10)
Map.addLayer(image)

// merge
var samples = water.merge(Vegetation).merge(Buildup).merge(Barrenland)

// band
var bands = ['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7']

// Training Datasets
var training = image.select(bands).sampleRegions({
  collection:samples ,
  properties:['Class'] ,
  scale:30 })
  
print(training)

//roughly 80% data for training and 20% for testing

var trainData = training.randomColumn()

var trainset = trainData.filter(ee.Filter.lessThan('random',0.8))
var testSet = trainData.filter(ee.Filter.greaterThanOrEquals('random',0.8))


// classifiaction model

var classifier = ee.Classifier.smileRandomForest(50,5).train(
  {features: trainset, 
  classProperty:'Class', 
  inputProperties: bands})

// classified image

var classified = image.select(bands).classify(classifier)

// Display the result

Map.addLayer(classified , {min:0 , max:3 , palette:['blue','green','red','yellow']})

// Accuracy: Kappa, producers, consumers and overall accuracy

//var confusion_matrix = ee.ConfusionMatrix(testSet.classify(classifier).errorMatrix(actual, predicted, order))

var confusionMatrix = classifier.confusionMatrix();
print('Confusion matrix: ', confusionMatrix);
print('Training Overall Accuracy: ', confusionMatrix.accuracy());
var kappa = confusionMatrix.kappa();
print('Training Kappa', kappa);
 
var validation = testSet.classify(classifier);
var testAccuracy = validation.errorMatrix('Class', 'classification');
print('Validation Error Matrix RF: ', testAccuracy);
print('Validation Overall Accuracy RF: ', testAccuracy.accuracy());
var kappa1 = testAccuracy.kappa();
print('Validation Kappa', kappa1);

//Set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
 
//Create legend title
var legendTitle = ui.Label({
  value: 'Classification Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 
//Add the title to the panel
legend.add(legendTitle);
 
//Create and style 1 row of the legend.
var makeRow = function(color, name) {
 
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
 
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
 
//Identify palette with the legend colors
var palette =['0b4a8b', '18620f', 'd63000', 'EFE028'];
// , '3B953B','89CD89', 'EFE028', '0b4a8b'];
 
//Identify names within the legend
var names = ['water', 'Vegetation','Buildup','Barrenland'];
 
//Add color and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  

// //Add legend to map
Map.add(legend);



//Create palette for the final land cover map classifications
var urbanPalette = 
'<RasterSymbolizer>' +
' <ColorMap  type="intervals">' +
    '<ColorMapEntry color="#0b4a8b" quantity="0" label="water"/>' +
    '<ColorMapEntry color="#18620f" quantity="1" label="Vegetation"/>' +
    '<ColorMapEntry color="#d63000" quantity="2" label="Buildup"/>' +
    '<ColorMapEntry color="#EFE028" quantity="3" label="Barrenland"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';



//Add final map to the display
Map.addLayer(classified.sldStyle(urbanPalette), {}, "Land Classification");

Export.image.toDrive({
  image: classified.sldStyle(urbanPalette),
  description: 'imageToCOGeoTifffinal_1',
  region: Ben_city,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});


// area calculation

print(classified)
var areaImage = ee.Image.pixelArea().divide(1e6)
 var areaImage1 = ee.Image.pixelArea().addBands(classified).divide(1e6)
var areas = areaImage1.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: Ben_city.geometry(),
    scale: 30,
    maxPixels: 1e10
    }); 
 
print(areas)

  
var clsImg = ee.Image(areaImage).addBands(classified)
print(clsImg)
var area_chart = ui.Chart.image.byClass({
  image: clsImg,
  classBand: 'classification',
  region:Ben_city,
  reducer: ee.Reducer.sum(),
  scale: 30,
  classLabels: ee.List(['water','Vegetation','Buildup','Barrenland']),
  xLabels: ee.List(['water','Vegetation','Buildup','Barrenland'])
})
print(area_chart)
