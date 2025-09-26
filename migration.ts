import { MongoClient } from 'mongodb';
import { initialTeamMembers, initialBlogPosts, initialServicePricingData, initialProjects, initialServices, initialTestimonials } from './data/siteData.ts';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}
const client = new MongoClient(uri);

async function migrate() {
  try {
    await client.connect();
    const db = client.db();

    console.log('Migrating team members...');
    await db.collection('team').deleteMany({});
    await db.collection('team').insertMany(initialTeamMembers.map(({ icon, ...rest }) => rest) as any);

    console.log('Migrating blog posts...');
    await db.collection('blog').deleteMany({});
    await db.collection('blog').insertMany(initialBlogPosts as any);

    console.log('Migrating pricing data...');
    await db.collection('pricing').deleteMany({});
    await db.collection('pricing').insertMany(initialServicePricingData as any);

    console.log('Migrating projects...');
    await db.collection('projects').deleteMany({});
    await db.collection('projects').insertMany(initialProjects as any);

    console.log('Migrating services...');
    await db.collection('services').deleteMany({});
    await db.collection('services').insertMany(initialServices.map(({ icon, ...rest }) => rest) as any);

    console.log('Migrating testimonials...');
    await db.collection('testimonials').deleteMany({});
    await db.collection('testimonials').insertMany(initialTestimonials as any);

    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Error during data migration:', error);
  } finally {
    await client.close();
  }
}

migrate();