const CsvService = require('../../services/csvService');
const ProcessingRequest = require('../../models/processingRequest');
const { v4: uuidv4 } = require('uuid');

class UploadController {
  static async uploadCsv(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const filePath = req.file.path;
      const csvData = await CsvService.validateAndParseCsv(filePath);

      const requestId = uuidv4();
      const processingRequest = new ProcessingRequest({
        requestId,
        status: 'pending',
        data: csvData,
      });

      await processingRequest.save();

      // Trigger async processing here (e.g., send to a queue or start a worker)

      res.status(200).json({ requestId, message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error uploading CSV:', error);
      res.status(500).json({ error: 'Error processing the CSV file' });
    }
  }
}

module.exports = UploadController;