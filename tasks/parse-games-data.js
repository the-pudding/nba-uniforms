import fs from 'fs';
import path from 'path';
import { csvParse } from 'd3-dsv'; // Correctly import csvParse from d3-dsv

const CWD = process.cwd();

const csvFilePath = path.join(CWD, 'src/data/nba2324/output.csv');
const jsonFilePath = path.join(CWD, 'src/data/all-games.json');

// Function to load CSV and save as JSON
async function convertCsvToJson() {
  try {
    // Read the CSV file using fs
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    
    // Parse the CSV content to JSON
    const data = csvParse(csvContent); // Use csvParse instead of parse
    
    // Write the data to a JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log('CSV file successfully converted to JSON and saved.');
  } catch (error) {
    console.error('Error reading the CSV file:', error);
  }
}

// Run the conversion
convertCsvToJson();
