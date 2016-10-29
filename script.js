// converts wff api xml results to json
$(document).ready(function() {
  var parser;
  var xmlDoc;
  var $xhr = $.get('http://api.wefeelfine.org:8080/ShowFeelings?display=xml&returnfields=feeling,sentence&limit=50');
//gets results and parses them to XML DOM document
  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
        alert('uncool');
        return;
    }
    else{
      // console.log(data);
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data,"text/xml");
      // console.log(xmlDoc);
    }
//hopefully converts XML DOM doc to JSON
  // Changes XML to JSON
  function xmlToJson(xml) {
  // console.log(xml);
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
  };
    // var jsonText = JSON.stringify(xmlToJson(xmlDoc));
    // console.log(xmlToJson(xmlDoc));
    var result = xmlToJson(xmlDoc);
    console.log(result.feelings);
  });
})
