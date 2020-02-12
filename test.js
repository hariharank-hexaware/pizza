(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var responseObj = {};
	var userid,username,category,priority,service,childcategory1,childcategory2,keyword,workgroup;
	//var x = '';
    // implement resource here
    response.setStatus(200);
    response.setContentType('application/json');
	var queryParams = request.pathParams.userDescription;
	queryParams = queryParams.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g," ");
//     var token = queryParams.split(' ');
//     responseObj['token'] = token;
  var incidentDesc = GetCatalogByDescription(queryParams, res)
  if (incidentDesc) {
    return incidentDesc;
  } else {
    return {
      status: 404,
      message: "No keywords match"
    };
  }
	
	function getUnique(array) {
  var uniqueArray = [];
  for (i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}

function countDuplicates(original) {
  var uniqueItems = new Set();
  var duplicates = new Set();
  for (var value of original) {
    if (uniqueItems.has(value)) {
      duplicates.add(value);
      uniqueItems.delete(value);
    } else {
      uniqueItems.add(value);
    }
  }
  return (duplicates.size);
}
	
async function GetCatalogByDescription(desc, res) {
  console.log("catalog description");
  var catalogDetails;
  var catalogIncidentDetails;
  var description = desc.toLowerCase();
  if (description) {
    description = description.split(" ")
    console.log("description", description)
    var uniqueNames = getUnique(description);
    console.log("unique values", uniqueNames);
    var removeStopWords = RemoveStopWords(uniqueNames);
    var temp = 0;
    var strIncidentMaster = '';
    var SubStringsList = [];
    console.log("keyword length", removeStopWords.length)
    if (removeStopWords.length != 0) {
      for (var index = removeStopWords.length - 1; index >= 0; index--) {
        var subString = '';
        for (var i = temp; i <= removeStopWords.length - 1; i++) {
          subString = subString + removeStopWords[i];
          SubStringsList.push(subString);
          subString = subString + " ";
          console.log("SubStringsList", SubStringsList)
        }
        temp++;
      }
      strIncidentMaster = "SELECT Keyword,Department,Category,Priority_Name ,'' SubCategory," +
        "'INCIDENT' TicketType,Assigned_Work_Group AS WorkGroupName,'200' StatusCode,'' Error,'' Error_Msg  " + "FROM IncidentCategory where ";

      for (var compare in SubStringsList) {
        strIncidentMaster += " Keyword = " + "'" + SubStringsList[compare] + "' OR";
      }
      console.log("query1", strIncidentMaster)
      strIncidentMaster = strIncidentMaster.substring(0, strIncidentMaster.length - 3);
      catalogIncidentDetails = await querySql(res, strIncidentMaster);
      console.log("catalogIncidentDetails", catalogIncidentDetails)
      if (catalogIncidentDetails) {
        catalogIncidentDetails = catalogIncidentDetails.response
      }
      console.log("catalogIncidentDetails2", catalogIncidentDetails)
      if (catalogIncidentDetails == null) {
        catalogDetails = noKeyMatch(catalogIncidentDetails, res)
        return catalogDetails;
      } else if (catalogIncidentDetails.length > 1) {
        console.log("catalog details > 1");
        var max = 0;
        var bigg = [];
        var a = [];
        var biggest = [];
        for (var counter in catalogIncidentDetails) {
          var word_count = catalogIncidentDetails[counter].Keyword.split(" ").length
          console.log("word_count", word_count)
          if (max <= word_count) {
            max = word_count;
            bigg.push(catalogIncidentDetails[counter].Keyword);
            a.push(max);
          }
        }
        console.log("a contains", a);
        console.log("bigg", bigg)
        const indexOfMaxValue = a.indexOf(Math.max(...a));
        var maxRepeated = bigg[indexOfMaxValue]
        console.log("indexOfMaxValue", maxRepeated)
        var count = countDuplicates(a);
        console.log("duplicate count", count);
        if (count == a.length) {
          biggest.push(catalogIncidentDetails[0])
          return biggest;
        } else if (count != a.length) {
          var match = '';
          var b = [];
          for (var itrate in catalogIncidentDetails) {
            b.push(catalogIncidentDetails[itrate].Category);
          }
          console.log("catalogIncidentDetails", catalogIncidentDetails, maxRepeated);
          // var maxRepeated = b.groupBy(s => s).OrderByDescending(s => s.length).first().Key;
          for (var loop in catalogIncidentDetails) {
            if (catalogIncidentDetails[loop].Keyword == maxRepeated) {
              console.log("category match")
              match = catalogIncidentDetails[loop];
            }
          }
          biggest.push(match)
          return biggest;
        } else {
          catalogDetails = noKeyMatch(catalogIncidentDetails, res)
          return catalogDetails;
        }

      } else if (catalogIncidentDetails.length == 1) {
        console.log("single category match");
        return catalogIncidentDetails;
      } else {
        catalogDetails = noKeyMatch(catalogIncidentDetails, res)
        return catalogDetails;
      } 
    } else {
      console.log("no keyword found")
      catalogDetails = noKeyMatch(catalogIncidentDetails, res)
      return catalogDetails;
    }
  }
}
		
	
	async function noKeyMatch(catalogIncidentDetails, res) {
  console.log("no key match")
  catalogIncidentDetails = []
  strIncidentMaster = "SELECT Keyword,Department,Category,Priority_Name ,'' SubCategory," +
    "'INCIDENT' TicketType,Assigned_Work_Group AS WorkGroupName,'200' StatusCode,'' Error,'' Error_Msg  " + "FROM IncidentCategory where Keyword = 'coco'";
  catalogIncidentDetails = await querySql(res, strIncidentMaster);
  catalogIncidentDetails = catalogIncidentDetails.response
  return (catalogIncidentDetails);
}
		function RemoveStopWords(inputtext) {
  var lstInputText = inputtext
  var lstOutput = [];
  var stopwords = ["make", "working", "ourselves", "coco", "anything", "new", "woking", "able", "take", "want", "hers", "address", "between", "yourself", "but", "again", "there", "about", "once", "during", "out", "very", "having", "with", "they", "own", "an", "be", "some", "for", "do", "its", "yours", "such", "into", "of", "most", "itself", "other", "off", "is", "am", "or", "who", "as", "from", "him", "each", "the", "themselves", "until", "below", "are", "we", "these", "your", "his", "through", "don", "nor", "me", "were", "her", "more", "himself", "this", "down", "should", "our", "their", "while", "above", "both", "up", "to", "ours", "had", "she", "all", "no", "when", "at", "any", "before", "them", "same", "and", "been", "have", "in", "will", "on", "does", "yourselves", "then", "that", "because", "what", "over", "why", "so", "can", "did", "not", "now", "under", "he", "you", "herself", "has", "just", "where", "too", "only", "myself", "which", "those", "i", "after", "few", "whom", "being", "if", "theirs", "my", "against", "a", "by", "doing", "it", "how", "further", "was", "here", "than", "unable"];
  lstOutput = lstInputText.filter(val => !stopwords.includes(val));
  console.log("after removing stop words", lstOutput);
  return lstOutput;
}
		
		
//     for (var j = 0; j < token.length; j++) {
//         var mgr = new GlideRecord('u_coco_category_lookup'); // Checking in look-up table
//         mgr.addQuery('u_coco_keyword', token[j]);
//         mgr.query();
        if (mgr.next()) {
            category = mgr.u_coco_category;
            priority = mgr.u_coco_priority;
			service = mgr.u_coco_service;
			childcategory1 = mgr.u_coco_child_category1;
			childcategory2 = mgr.u_coco_childcategory2;
			workgroup = mgr.u_coco_workgroup;
			keyword = mgr.u_coco_keyword;
            break;
        }

	// get user
    var ugr = new GlideRecord('sys_user');
    ugr.addQuery('user_name', request.username);
    ugr.query(); //Execute the query with callback function

    while (ugr.next()) { //While the recordset contains records, iterate through them
        userid = ugr.sys_id;
		username = ugr.sys_created_by;
    }
	responseObj['username'] = username;
	responseObj['userid'] = userid;
    responseObj['category'] = category;
    responseObj['priority'] = priority;
	responseObj['service'] = service;
	responseObj['childcategory1'] = childcategory1;
	responseObj['childcategory2'] = childcategory2;
	responseObj['workgroup'] = workgroup;
	responseObj['keyword'] = keyword;
    responseObj['description'] = queryParams;
    response.setBody(responseObj);
})(request, response);