var messageDisplay = document.querySelector("#message");

var myArray = ["Bermuda","Ukraine","Belize","Monaco","Djibouti","Italy","Switzerland","Guinea","Greece","US Virgin Islands","The Former Yugoslav Republic of Macedonia","Bouvet Island","Senegal","Tajikistan","South Africa","Gabon","Malaysia","Australia","Aruba","Saint Kitts and Nevis","Hungary","Mauritania","French Polynesia","Gambia","Netherlands","Liberia","Spain","New Caledonia","Ghana","Brunei Darussalam","Swaziland","Glorioso Island","Curacao","Saint Eustatius","Somalia","Andorra","British Virgin Islands","Guyana","Estonia","Armenia","Finland","Saba","Dominica","Sweden","Slovenia","Turks and Caicos Islands","Argentina","Dominican Republic","French Guiana","Jamaica","Cyprus","Kuwait","American Samoa","Zimbabwe","Wake Island","Cocos Islands","Comoros","Croatia","Chad","Yemen","Botswana","Mali","Bosnia and Herzegovina","Jordan","Iraq","Sudan","Cuba","Central African Republic","Heard Island and McDonald Islands","Nicaragua","Suriname","Belgium","Niger","United Kingdom","Guatemala","Midway Islands","Montenegro","Montserrat","Cook Islands","Russian Federation","Samoa","Cape Verde","Malta","South Sudan","Poland","Tonga","Guam","Trinidad and Tobago","Romania","Réunion","Tunisia","Saint Martin","Kazakhstan","Fiji","Saint Lucia","Nepal","Luxembourg","Baker Island","Ethiopia","Colombia","Paraguay","Azerbaijan","Saint Helena","Zambia","Gibraltar","Namibia","Sri Lanka","Angola","Slovakia","Portugal","Togo","Saint Barthelemy","Falkland Islands","Papua New Guinea","Grenada","United Arab Emirates","Thailand","India","Cambodia","Jan Mayen","Panama","Timor-Leste","Tanzania","Bhutan","San Marino","Lebanon","Kyrgyzstan","Algeria","Rwanda","China","Malawi","Palestinian Territory","Cameroon","Iran","Belarus","Morocco","North Korea","Turkmenistan","Ireland","Benin","Georgia","Bangladesh","Norfolk Island","Burundi","Japan","Uruguay","Niue","Tuvalu","Puerto Rico","Faroe Islands","Eritrea","Congo DRC","Solomon Islands","Qatar","Canada","Lithuania","Johnston Atoll","Nigeria","Cayman Islands","Greenland","Haiti","Bonaire","Pakistan","Christmas Island","Tokelau","Honduras","France","Nauru","Singapore","Chile","Marshall Islands","Maldives","Brazil","Indonesia","Howland Island","Guernsey","El Salvador","Mauritius","South Korea","Afghanistan","Ecuador","Kiribati","Oman","Equatorial Guinea","Sierra Leone","Bahamas","Moldova","Latvia","Sao Tome and Principe","Vanuatu","Mayotte","Palau","Isle of Man","Antigua and Barbuda","Lesotho","Norway","Myanmar","Laos","Serbia","Venezuela","South Georgia","Peru","Liechtenstein","Mozambique","Czech Republic","Bahrain","Kenya","Germany","Anguilla","Philippines","Denmark","Svalbard","Jarvis Island","Burkina Faso","Jersey","Pitcairn","Uganda","Costa Rica","Sint Maarten","New Zealand","Guinea-Bissau","Saint Pierre and Miquelon","Micronesia","Seychelles","Iceland","Juan De Nova Island","Vatican City","Mexico","British Indian Ocean Territory","Syria","Bulgaria","Uzbekistan","Mongolia","Martinique","Antarctica","Côte d'Ivoire","Egypt","Vietnam","Bolivia","Albania","Guadeloupe","Wallis and Futuna","United States","Madagascar","Saudi Arabia","Barbados","Austria","Northern Mariana Islands","Libya","Turkey","Saint Vincent and the Grenadines","Israel","Congo","French Southern Territories"
]; 



init();

function init(){
  createButtons();
  createMap();
}


//create buttons
function createButtons(){
  //create array of four countires
var answersArray = [];
for(var i = 0; i < 4; i++){
  var randomItem = myArray[Math.floor(Math.random()*myArray.length)];  
  answersArray.push(randomItem);
}


//select a country from the list
 chosenItem = answersArray[Math.floor(Math.random()*4)]

  for(var i = 0; i < 4; i++){
	   var button = document.createElement("button");
	   button.id = "quiz-ans-" + i;
	    button.classList.add("quiz-ans-btn");
	   var txt = document.createTextNode(answersArray[i]);
	    button.appendChild(txt);
	    document.querySelector("#quiz-options").appendChild(button);	    
   }
}
 //createButtons();

 //Handle button clicks
var oneElement = document.querySelector("#quiz-ans-0");
var twoElement = document.querySelector("#quiz-ans-1");
var threeElement = document.querySelector("#quiz-ans-2");
var fourElement = document.querySelector("#quiz-ans-3");

oneElement.addEventListener("click", checkAnswer, false);
twoElement.addEventListener("click", checkAnswer, false);
threeElement.addEventListener("click", checkAnswer, false);
fourElement.addEventListener("click", checkAnswer, false);

function checkAnswer(event) {
    var clickedItem = event.target.innerHTML;
    if (clickedItem === chosenItem){
       event.target.classList.add("correct");
       messageDisplay.textContent = "Correct!";
       var button = document.createElement("button");
       button.id="reset";
       button.textContent = "Play Again?";
       document.querySelector("#stripe").appendChild(button);

       //handle reset button
        function reload(){
          location.reload()
          };
        var resetButton = document.querySelector("#reset");
        resetButton.addEventListener("click", reload, false);

       //alert("Correct!!")
    } else {
       event.target.classList.add("incorrect");
       messageDisplay.textContent = "Wrong! Try Again"
       //alert("Wrong!!!")
    }
}




function createMap(){
  //create Map
  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/tasks/support/Query",
    "esri/tasks/QueryTask",
    "esri/Graphic",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleFillSymbol",
    "dojo/domReady!"
  ], 
      function(Map, SceneView, Query, QueryTask, Graphic, Polygon, SimpleFillSymbol) {
    
  var countrySelected = "Country = "  + "'"+ chosenItem +"'";
    //var definition = ["Country = 'Australia'"];
  //console.log(countrySelected); 

  //
      
  var map = new Map({
      basemap: "satellite",
     });

  var view = new SceneView({
      container: "viewDiv",
      map: map,
      });

  var query = new Query();
    query.where = countrySelected
    query.outFields = ["*"];
    query.returnGeometry = true;
 
  var queryTask = new QueryTask({
       url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries/FeatureServer/0"
    });
    
 // Execute the query
    queryTask.execute(query)
      .then(function(result){
        result.features.forEach(function(item){
           var g = new Graphic({
             geometry: item.geometry,
             attributes: item.attributes,
             symbol: {
               type: "simple-fill",
               color: [255, 170, 0, 0.69],
              outline: {  // autocasts as new SimpleLineSymbol()
                          color: [255, 255, 255, 0.5],
                          width: 2
                        }
             },
            /* popupTemplate: {
               title: "{TRL_NAME}",
               content: "{*}"
             } */
           });
          
           view.graphics.add(g);
        });

        // Zoom to the data returned
        view.goTo({
          target: view.graphics
        });

       })
    
      .otherwise(function(e){
        console.log(e);
      });

  
})

}

//createMap();





//https://developers.arcgis.com/labs/javascript/query-a-feature-layer/