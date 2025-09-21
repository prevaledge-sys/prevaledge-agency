const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // You can change this port if needed

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const { name, organization, email, contactNumber, message } = req.body;

  // Basic validation
  if (!name || !organization || !email || !contactNumber || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // In a real application, you would save this to a database,
  // send an email, or integrate with a CRM.
  console.log('New Contact Form Submission:', req.body);

  res.status(200).json({ message: 'Submission successful!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
