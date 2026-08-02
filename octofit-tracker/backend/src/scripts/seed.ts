import { connectDatabase } from '../config/database.ts';

await connectDatabase();
console.log('Seed script ready');
