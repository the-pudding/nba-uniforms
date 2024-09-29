// Import required modules using ES module syntax
import { createReadStream, writeFileSync, existsSync } from 'fs';
import { extname } from 'path';
import csv from 'csv-parser';

// Function to convert CSV to JSON
function convertCsvToJson(csvFilePath) {
  const jsonFilePath = csvFilePath.replace('.csv', '.json');
  const results = [];

  // Read the CSV file and parse its contents
  createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Write the parsed data to a JSON file
      writeFileSync(jsonFilePath, JSON.stringify(results, null, 2), 'utf8');
      console.log(`JSON file created: ${jsonFilePath}`);
    });
}

// Get the CSV file path from the command line arguments
const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('Please provide the path to the CSV file as an argument.');
  process.exit(1);
}

// Check if the provided file exists and is a CSV
if (extname(csvFilePath) !== '.csv') {
  console.error('Please provide a valid CSV file.');
  process.exit(1);
}

if (!existsSync(csvFilePath)) {
  console.error('File does not exist.');
  process.exit(1);
}

// Convert CSV to JSON
convertCsvToJson(csvFilePath);
