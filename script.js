// converts wff api xml results to json
var result;
$(document).ready(function() {
  var resultObj;
  var parser;
  var xmlDoc;
  // var url = 'https://g-wefeelfine.herokuapp.com/ShowFeelings?display=xml&returnfields=feeling&feeling=sad&city=seattle&state=washington&limit=100'
  var url = 'https://g-wefeelfine.herokuapp.com/ShowFeelings?display=xml&returnfields=feeling&city=seattle&state=washington&limit=1500';
  var $xhr = $.get(url);
//gets results and parses them to XML DOM document
  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
        alert('uncool');
        return;
    }
    else{
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data,"text/xml");
    }
  // Changes XML to JSON
  function xmlToJson(xml) {
	// Create the return object
   var obj = {};
	  if (xml.nodeType == 1) { // element
		    // do attributes
		  if (xml.attributes.length > 0) {
		      obj["attributes"] = {};
			    for (var j = 0; j < xml.attributes.length; j++) {
				    var attribute = xml.attributes.item(j);
				    obj["attributes"][attribute.nodeName] = attribute.nodeValue;
			       }
		    }
	    } else if (xml.nodeType == 3) { // text
		    obj = xml.nodeValue;
	     }
	// do children
	 if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			}
      else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			   }
		  }
	  }
	return obj;
  }
    result = xmlToJson(xmlDoc);
    function emotionOccurance(result) {
      var feelingArr = [];
      var feelingCount = {};
      var highestFeels = {};
      //returns feelings as an array
      for (i = 0; i < result.feelings.feeling.length; i++) {
        var trueFeeling = result.feelings.feeling[i].attributes;
        if(trueFeeling !== undefined) {
          feelingArr[feelingArr.length] = trueFeeling.feeling;
        }
      }
      //returns object with key being a feeling and value being # of occurances 
      for(i = 0; i < feelingArr.length; i++) {
        var feel = feelingArr[i];
        var num = 1;
        for (x = 0; x < feelingArr.length; x++) {
          if(feel === feelingArr[x]) {
            feelingCount[feel] = num;
            num++;
            feelingArr.splice(x, 1);
          }
        }
      }
      console.log(feelingCount);
      for(i = 0; i < 5; i++) {
        var highest;
        //if value is higher than value before, highest is equal to it
        for(x = 0; x < feelingCount.length; x++) {
          console.log(feelingCount);
        }
        //return highest as obj inside obj named 1st place
        //remove highest obj from feeling count
        //repeat until 5 highest
      }
      // highestFeels.push(highest);
    }
  // }
  emotionOccurance(result);
})
})
