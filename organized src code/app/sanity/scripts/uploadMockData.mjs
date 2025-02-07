import { createClient } from '@sanity/client';
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config({ path: '/e-commerce-app-sanity-next-15/.env.local' });



// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-02',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function uploadMockData(filePath) {
  try {
    const dataPath = path.resolve(filePath);
    const mockData = JSON.parse(await fs.readFile(dataPath, 'utf-8'));

    for (const item of mockData) {
      const result = await client.create(item);
      console.log(`Document created:`, result);
    }

    console.log('All mock data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading mock data:', error);
  }
}

// Resolve the path to the mock data file
const mockDataFilePath = path.resolve(
  path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, '$1'),
  '../mock-data/mockProducts.json'
);

// Debugging the resolved path
console.log('Resolved mock data file path:', mockDataFilePath);

// Run the upload function
uploadMockData(mockDataFilePath);
