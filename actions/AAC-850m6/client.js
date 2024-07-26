function(properties, context) {
  // Update here if Bubble changes class names and targeting
  const textClasses = "bubble-element Text";
  const groupItemClass = "group-item";

  // Find the correct repeating group
  let repeatingGroup = document.getElementById(properties.repeating_group_id);
  let columnNames = properties.column_names;

  console.log("Repeating group to extract into CSV: " + repeatingGroup);

  // Get text elements from repeating group in the repeatingGroup but this gets ALL text as a single array
  let allTextHTMLCollection = repeatingGroup.getElementsByClassName(textClasses);
  let allTextElements = Array.from(allTextHTMLCollection); // cast to an array

  // Extract data from HTML and Bubble elements
  const extractedData = [];
  allTextElements.map((x) => extractedData.push(x.innerText.replace(/(\r\n|\n|\r)/gm, "").trim()));

  // Calculate the number of columns dynamically from the first row
  const firstRow = repeatingGroup.getElementsByClassName(groupItemClass)[0];
  const colNums = firstRow ? firstRow.getElementsByClassName(textClasses).length : 0;

  console.log("rows", repeatingGroup.getElementsByClassName(groupItemClass).length);
  console.log("columns", colNums);

  console.log("extractedData", extractedData);

  // Create the CSV directly
  let csv = extractedData.reduce((csvString, value, index) => {
    // Add a comma before each value except the first one in a row
    if (index % colNums !== 0) {
      csvString += ',';
    }

    // Add the value to the CSV string
    csvString += '"' + value + '"';

    // Add a newline after every colNums values
    if ((index + 1) % colNums === 0) {
      csvString += '\n';
    }

    return csvString;
  }, '');

  // Now, 'csv' contains the CSV string
  csv = columnNames + '\n' + csv.trim(); // Trim to remove any trailing newlines
  console.log("csv", csv);

  // Create a Blob with the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  // Open a new window with the Blob URL, triggering the download
  window.open(URL.createObjectURL(blob), '_blank');
}
