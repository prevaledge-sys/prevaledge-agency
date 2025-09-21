
let documents = [];

exports.handler = async function(event, context) {
  const path = event.path.replace('/.netlify/functions', '');
  const method = event.httpMethod;

  if (path.startsWith('/documents')) {
    if (method === 'POST') {
      const newDocument = { id: Date.now(), createdAt: new Date(), ...JSON.parse(event.body) };
      documents.push(newDocument);
      console.log('New Document Saved:', newDocument);
      return {
        statusCode: 201,
        body: JSON.stringify(newDocument),
      };
    } else if (method === 'GET') {
      const { documentType, searchTerm } = event.queryStringParameters;
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

      return {
        statusCode: 200,
        body: JSON.stringify(filteredDocuments),
      };
    } else if (method === 'DELETE') {
      const id = parseInt(path.split('/').pop());
      const initialLength = documents.length;
      documents = documents.filter(doc => doc.id !== id);
      if (documents.length < initialLength) {
        console.log(`Document with ID ${id} deleted.`);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Document deleted successfully.' }),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Document not found.' }),
        };
      }
    }
  }

  return {
    statusCode: 404,
    body: 'Not Found',
  };
};
