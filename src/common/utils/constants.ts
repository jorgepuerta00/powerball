require('dotenv').config();
export const URL: string = process.env.URL || 'https://data.ny.gov/resource/d6yy-54nr.json';
export const DATE_FORMAT: string = process.env.DATE_FORMAT || 'yyyy-MM-dd';
export const DATE_FORMAT_UTC_TIME: string = process.env.DATE_FORMAT_UTC_TIME || "yyyy-MM-dd'T'HH:mm:ss.SSS";