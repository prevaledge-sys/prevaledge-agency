
const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event, context) {
  const documentsPath = path.join(process.cwd(), 'documents.json');

  const readDocuments = async () => {
    try {
      const data = await fs.readFile(documentsPath, 'utf8');
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData) || typeof parsedData !== 'object' || parsedData === null) {
        return { contactSubmissions: parsedData };
      }
      return parsedData;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return { contactSubmissions: [] };
      }
      throw error;
    }
  };

  if (event.httpMethod === 'GET') {
    try {
      const documents = await readDocuments();
      return {
        statusCode: 200,
        body: JSON.stringify(documents.contactSubmissions || []),
      };
    } catch (error) {
      console.error('Error reading documents.json:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error reading submissions.' }),
      };
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, organization, email, contactNumber, message } = body;

    if (!name || !organization || !email || !contactNumber || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'All fields are required.' }),
      };
    }

    const newSubmission = {
      id: Date.now(),
      submittedAt: new Date(),
      ...body
    };

    const documents = await readDocuments();
    if (!documents.contactSubmissions) {
      documents.contactSubmissions = [];
    }
    documents.contactSubmissions = [newSubmission, ...documents.contactSubmissions];

    await fs.writeFile(documentsPath, JSON.stringify(documents, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission successful!' }),
    };
  } catch (error) {
    console.error('Error processing submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing submission.' }),
    };
  }
};
