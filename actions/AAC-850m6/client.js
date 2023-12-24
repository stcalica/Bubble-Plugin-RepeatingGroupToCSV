function(properties, context) {
   
  //update here if bubble changes class names and targeting   
  const textClasses = "bubble-element Text";
  const groupItemClass = "group-item";
    
    
  // Find the correct repeating group
  let repeatingGroup = document.getElementById(properties.repeating_group_id);

  console.log("Repeating group to extract into CSV: " + repeatingGroup);

  // Get text elements from repeating group in the repeatingGroup but this gets ALL text as a single array
  let allTextHTMLCollection = repeatingGroup.getElementsByClassName(textClasses);
  let allTextElements = Array.from(allTextHTMLCollection); //cast to an array 
  
    
    
  //extract data from HTML and Bubble elements 
  const extractedData = [];
  allTextElements.map((x, index) => extractedData.push(x.innerText.replace(/(\r\n|\n|\r)/gm,"").trim()));
    
    
  //ugly assumption that repeating groups are same in EVERY row and will hold the number of columns so we grab it from the first repeating group, yuck! 
  const rowNums = repeatingGroup.getElementsByClassName(groupItemClass).length;
  const colNums = repeatingGroup.getElementsByClassName(groupItemClass)[0].getElementsByClassName(textClasses).length; 

  console.log("rows", repeatingGroup.getElementsByClassName(groupItemClass).length);
  console.log("columns", colNums);

    
  console.log("extractedData", extractedData);

  // Create the CSV directly
  let csv = extractedData.map(x => '"' + x + '"').reduce((csvString, value, index) => {
    // Add a comma after each value (except the first one)
    console.log('csvString:', csvString);
    console.log('value:', value);

    if (index > 0) {
      csvString += ',';
    }

    // Add the value to the CSV string
    csvString += value;

    // Add a newline after every colNums values
    if ((index + 1) % colNums === 0 && index + 1 < extractedData.length) {
      csvString += '"\n';
    }

    return csvString;
  }, '');

  // Now, 'csv' contains the CSV string
  console.log("csv", csv);
    
  // Create a Blob with the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
  // Open a new window with the Blob URL, triggering the download
  window.open(URL.createObjectURL(blob), '_blank');

    
}
