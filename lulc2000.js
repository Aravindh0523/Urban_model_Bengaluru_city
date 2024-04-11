var l7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2")

var image = l7.filterBounds(bluru)
              .filterDate('2000-05-01','2000-05-30')
              // .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',1)
              .median()
              .clip(bluru);
print(image)              
Map.addLayer(image,iv,"image_2000");

var samples = water.merge(vegetation).merge(builtup).merge(barrenland)

var bands = ['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7']

var training = image.select(bands).sampleRegions({
  collection:samples ,
  properties:['class'] ,
  scale:30 })

// print(training) 
  
var trainData = training.randomColumn()

var trainset = trainData.filter(ee.Filter.lessThan('random',0.8))
var testSet = trainData.filter(ee.Filter.greaterThanOrEquals('random',0.8))

var classifier = ee.Classifier.smileRandomForest(50,5).train(
  {features: trainset, 
  classProperty:'class', 
  inputProperties: bands})
  
var classified = image.select(bands).classify(classifier)

Map.addLayer(classified , {min:0 , max:3 , palette:['blue','red','green','yellow']},"LULC 2000")
print(classified)
var confusionMatrix = classifier.confusionMatrix();
print('Confusion matrix: ', confusionMatrix);
print('Training Overall Accuracy: ', confusionMatrix.accuracy());
var kappa = confusionMatrix.kappa();
print('Training Kappa', kappa);

var validation = testSet.classify(classifier);
var testAccuracy = validation.errorMatrix('class', 'classification');
print('Validation Error Matrix RF: ', testAccuracy);
print('Validation Overall Accuracy RF: ', testAccuracy.accuracy());
var kappa1 = testAccuracy.kappa();
print('Validation Kappa', kappa1);


var areaImage = ee.Image.pixelArea().addBands(classified).divide(1e6)
 
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: bluru.geometry(),
    scale: 30,
    maxPixels: 1e10
    }); 
 
print(areas)

Export.image.toDrive({
    image: classified,
    scale: 30,
    region: bluru,
    crs: 'EPSG:4326',
    maxPixels: 1e13,
    folder: 'LULC_landsat_bluru',
    description: 'LULC_2000',
    formatOptions: {
      cloudOptimized: true
    }
  });