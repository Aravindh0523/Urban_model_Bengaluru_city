# INTRODUCTION:
          
The project shows the evolution of Bengaluru's urban areas over time. The approach involves the use of Google Earth Engine and includes image acquisition, classification and visualization.

# Study Area:
![CHEESE!](https://github.com/Revmi28/testing/assets/106192874/fea5472c-de53-4415-84f2-833af1069f0b)

# METHODOLOGY:

 Step 1:
      Load Optical image: Using an imported shape file of Bengaluru city, insert the optical image collection and filter by area.
      Landsat 5, Landsat 7, and Landsat 8 datasets were used to examine the study area's land use and land cover classification. Three decades were observed for LULC in the study period, which runs from 1990 to 
      2024: 1990, 1995, 2000, 2005, 2010, 2015, 2020, and 2024. The Tier-1, Level-2 Landsat 5 dataset was used between 1990 and 2000; the Tier-1, Level-2 Landsat 7 dataset was used between 2000 and 2010; and the 
      Tier-1, Level-2 Landsat 8 dataset was used between 2015 and 2024. After adding the imagery and applying a filter to the desired area and time frame, create a composite.

 Step 2:
      create a function to take clouds out of the Landsat data: All that has to be done is mask away the information regarding cloud cover that is already contained in the Landsat data.

 Step 3:
      Create a test and training dataset, combine land cover classes, and define the bands and training points.
      Collect training data for Land cover classes: We make use of land cover classes in this example:
       1. Waterbody
       2. Vegetation
       3. Builtup
       4. Barrenland

 Step 4:     
     Split samples for training and testing: The samples (collected training data) are now being divided at random so that some can be set aside for evaluating the correctness of the model. 20% is used for 
     testing and about 80% is for training. Run the RF Classification. 
     Here, land use is predicted using the Random Forest with 50 trees and 5 randomly selected predictors per split. The training data (80% of the data) is  used for prediction.

 Step 5:
      We examine a confusion matrix in order to assess the effectiveness of our training. This matrix aids in determining whether the classifier is operating as intended and whether the training set of data is 
      appropriate for instructing the classifier. From this matrix, we compute metrics such as training overall accuracy and kappa statistics to determine the accuracy of our model. Finally, we conducted a 
      thorough analysis of the fluctuations in the area occupied by each class throughout the three decades.

 step 6:
      We computed and then visualized a variety of spectral indices to visualize the expansion of urban areas. NDVI and NDBI  indices, which allow us to highlight particular elements like vegetation, water 
      bodies,and urban infrastructure,  combinations of several bands using Landsat data from 1990 to 2024.
      


      
     
     
