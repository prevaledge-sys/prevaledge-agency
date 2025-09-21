const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001; // You can change this port if needed

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for submissions
const submissions = [];

// File path for documents storage
const documentsFilePath = path.join(__dirname, 'documents.json');

// Load documents from file on startup
let documents = [];
try {
  const data = fs.readFileSync(documentsFilePath, 'utf8');
  documents = JSON.parse(data);
} catch (error) {
  console.error('Error loading documents file, starting with empty array:', error.message);
}

// Helper to save documents to file
const saveDocuments = () => {
  fs.writeFileSync(documentsFilePath, JSON.stringify(documents, null, 2), 'utf8');
};

app.post('/api/contact', (req, res) => {
  const { name, organization, email, contactNumber, message } = req.body;

  // Basic validation
  if (!name || !organization || !email || !contactNumber || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newSubmission = {
    id: Date.now(),
    submittedAt: new Date(),
    ...req.body
  };

  submissions.push(newSubmission);
  console.log('New Contact Form Submission:', newSubmission);

  res.status(200).json({ message: 'Submission successful!' });
});

app.get('/api/submissions', (req, res) => {
  res.status(200).json(submissions);
});

// New endpoint to delete a submission
app.delete('/api/submissions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = submissions.length;
  submissions = submissions.filter(sub => sub.id !== id);
  if (submissions.length < initialLength) {
    console.log(`Submission with ID ${id} deleted.`);
    res.status(200).json({ message: 'Submission deleted successfully.' });
  } else {
    res.status(404).json({ message: 'Submission not found.' });
  }
});

// New endpoint to save documents
app.post('/api/documents', (req, res) => {
  const newDocument = { id: Date.now(), createdAt: new Date(), ...req.body };
  documents.push(newDocument);
  saveDocuments();
  console.log('New Document Saved:', newDocument);
  res.status(201).json(newDocument);
});

// New endpoint to get documents history
app.get('/api/documents', (req, res) => {
  const { documentType, searchTerm } = req.query;
  let filteredDocuments = documents;

  if (documentType && documentType !== 'All') {
    filteredDocuments = filteredDocuments.filter(doc => doc.documentType === documentType);
  }

  if (searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    filteredDocuments = filteredDocuments.filter(doc => 
      doc.clientName.toLowerCase().includes(lowerCaseSearchTerm) ||
      doc.documentNumber.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  res.status(200).json(filteredDocuments);
});

// New endpoint to delete a document
app.delete('/api/documents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = documents.length;
  documents = documents.filter(doc => doc.id !== id);
  if (documents.length < initialLength) {
    saveDocuments();
    console.log(`Document with ID ${id} deleted.`);
    res.status(200).json({ message: 'Document deleted successfully.' });
  } else {
    res.status(404).json({ message: 'Document not found.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
