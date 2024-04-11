//NDBI - Normalized Difference Builtup Index




// 1. Import the Landsat images


// 2. Get the least cloudy image 
////2020
var image2020 = l8.filterBounds(roi)
            .filterDate('2020-01-01','2020-12-31')
            .filterMetadata('CLOUD_COVER','less_than',1)
            .median()
            .clip(roi);

////2024
var image2024 = l9.filterBounds(roi)
            .filterDate('2024-01-01','2024-10-04')
            .filterMetadata('CLOUD_COVER','less_than',1)
            .median()
            .clip(roi);
            
////2010
var image2010 = l7.filterBounds(roi)
            .filterDate('2010-01-01','2010-12-31')
            .filterMetadata('CLOUD_COVER','less_than',1)
            .median()
            .clip(roi);


////2000
var image2000 = l7.filterBounds(roi)
            .filterDate('2000-01-01','2000-12-31')
            .filterMetadata('CLOUD_COVER','less_than',1)
            .median()
            .clip(roi);       
            
////1991
var image1991 = l5.filterBounds(roi)
            .filterDate('1991-01-01','1991-12-31')
            .filterMetadata('CLOUD_COVER','less_than',1)
            .median()
            .clip(roi);                               

// 3. Compute the Normalized Difference Built-up Index (NDBI).

////2020
var b6 = image2020.select('B6');
var b5 = image2020.select('B5');
var b4=  image2020.select('B4');
var ndbi2020 = b6.subtract(b5).divide(b6.add(b5)).rename('NDBI');
var ndvi2020 = b5.subtract(b4).divide(b5.add(b4)).rename('NDVI');

////2024
var b6 = image2024.select('B6');
var b5 = image2024.select('B5');
var ndbi2024 = b6.subtract(b5).divide(b6.add(b5)).rename('NDBI');
var ndvi2024= b5.subtract(b4).divide(b5.add(b4)).rename('NDVI');


////2010
var b5 = image2010.select('B5');
var b4 = image2010.select('B4');
var b3= image2010.select('B3');
var ndbi2010 = b5.subtract(b4).divide(b5.add(b4)).rename('NDBI');
var ndvi2010=b4.subtract(b3).divide(b4.add(b3)).rename('NDVI');

////2000
var b5 = image2000.select('B5');
var b4 = image2000.select('B4');
var b3= image2000.select('B3');
var ndbi2000 = b5.subtract(b4).divide(b5.add(b4)).rename('NDBI');
var ndvi2000=b4.subtract(b3).divide(b4.add(b3)).rename('NDVI');

////1991
var b5 = image1991.select('B5');
var b4 = image1991.select('B4');
var b3 =  image1991.select('B3');
var ndbi1991 = b5.subtract(b4).divide(b5.add(b4)).rename('NDBI');
var ndvi1991=b4.subtract(b3).divide(b4.add(b3)).rename('NDVI');


// 4. Display the result.

////2020
Map.centerObject(image2020, 9)
var ndbiParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B4', 'B3', 'B2'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndbi2020, ndbiParams, 'NDBI image 2020');
Map.addLayer(image2020, visPaaramsTrue, 'Landsat 8 image',false);

var ndviParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B4', 'B3', 'B2'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndvi2020, ndviParams, 'NDVI image 2020');
Map.addLayer(image2020, visPaaramsTrue, 'Landsat 8 image',false);

////2024
Map.centerObject(image2024, 9)
var ndbiParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B4', 'B3', 'B2'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndbi2024, ndbiParams, 'NDBI image 2024');
Map.addLayer(image2024, visPaaramsTrue, 'Landsat 9 image',false);

Map.centerObject(image2024, 9)
var ndviParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B4', 'B3', 'B2'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndvi2024, ndviParams, 'NDVI image 2024');
Map.addLayer(image2024, visPaaramsTrue, 'Landsat 9 image',false);

////2010
Map.centerObject(image2010, 9)
var ndbiParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B3', 'B2', 'B1'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndbi2010, ndbiParams, 'NDBI image 2010');
Map.addLayer(image2010, visPaaramsTrue, 'Landsat 7 image',false);

Map.centerObject(image2010, 9)
var ndviParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B3', 'B2', 'B1'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndvi2010, ndviParams, 'NDVI image 2010');
Map.addLayer(image2010, visPaaramsTrue, 'Landsat 7 image',false);

////2000
Map.centerObject(image2000, 9)
var ndbiParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B3', 'B2', 'B1'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndbi2000, ndbiParams, 'NDBI image 2000');
Map.addLayer(image2000, visPaaramsTrue, 'Landsat 7 image',false);


Map.centerObject(image2000, 9)
var ndviParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B3', 'B2', 'B1'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndvi2000, ndviParams, 'NDVI image 2000');
Map.addLayer(image2000, visPaaramsTrue, 'Landsat 7 image',false);

////1991
Map.centerObject(image1991, 9)
var ndbiParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B3', 'B2', 'B1'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndbi1991, ndbiParams, 'NDBI image 1991');
Map.addLayer(image1991, visPaaramsTrue, 'Landsat 5 image',false);


Map.centerObject(image1991, 9)
var ndviParams = {min: -1, max: +1, palette:['red','yellow','green']};
var visPaaramsTrue = {bands: ['B3', 'B2', 'B1'], min: 0, max:3000, gamma: 1.4};
Map.addLayer(ndvi1991, ndviParams, 'NDVI image 1991');
Map.addLayer(image1991, visPaaramsTrue, 'Landsat 5 image',false);

// 5. Export to Drive
////2020
Export.image.toDrive({
  image: ndbi2020,
  description: 'NDBIimage2020',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});


////2024
Export.image.toDrive({
  image: ndbi2024,
  description: 'NDBIimage2024',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});


Export.image.toDrive({
  image: ndvi2024,
  description: 'NDVIimage2024',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});
////2010
Export.image.toDrive({
  image: ndbi2010,
  description: 'NDBIimage2010',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});


Export.image.toDrive({
  image: ndvi2010,
  description: 'NDVIimage2010',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});

//2000
Export.image.toDrive({
  image: ndbi2000,
  description: 'NDBIimage2000',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});


Export.image.toDrive({
  image: ndvi2000,
  description: 'NDVIimage2000',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});

//1991
Export.image.toDrive({
  image: ndbi1991,
  description: 'NDBIimage1991',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});



Export.image.toDrive({
  image: ndvi1991,
  description: 'NDVIimage1991',
  scale: 30,
  region: roi,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});


////////SAVE NDVI
//2024


//2010



2000


1991





// Create expansion image
var urbanExpansion = builtCol.select('built').min().set(dict);
Map.addLayer(urbanExpansion, {}, 'Urban_expansion');

// Create legend for expansion year
var legend = ui.Panel([ui.Label('Urban expansion')], ui.Panel.Layout.flow('vertical'), { position: 'bottom-left' });
yearList.map(function(year, index){
  legend.add(ui.Panel([
    ui.Label('', { width: '20px', height: '20px', backgroundColor: dict.built_class_palette[index], border: '0.5px solid black' }),
    ui.Label(year)
  ], ui.Panel.Layout.flow('horizontal')));
});
Map.add(legend);

// Create table to show the urban area change
var areaChart = ui.Chart.image.series(builtCol.select('area'), roi, ee.Reducer.sum(), 30, 'year')
  .setChartType('AreaChart')
  .setOptions({
    title: 'Urban area (Ha)',
    hAxis: { title: 'Year' },
    vAxis: { title: 'Area (Ha)' }
  });
print(areaChart);