import QRCode from 'qrcode';
import QR from '../models/QRModel.js';

export const generateQR = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid data. Expected an object with key-value pairs.' });
    }

    // Convert data object to JSON string for QR code
    const jsonString = JSON.stringify(data);

    // Generate QR code as base64 data URL
    const qrCodeDataURL = await QRCode.toDataURL(jsonString, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      width: 300,
    });

    // Store in database
    const qrRecord = new QR({
      data: new Map(Object.entries(data)),
      qrCode: qrCodeDataURL,
    });

    await qrRecord.save();

    res.status(201).json({
      success: true,
      qrCode: qrCodeDataURL,
      dataId: qrRecord._id.toString(),
      data: Object.fromEntries(qrRecord.data),
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code', message: error.message });
  }
};

export const getQRById = async (req, res) => {
  try {
    const { id } = req.params;

    const qrRecord = await QR.findById(id);

    if (!qrRecord) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    res.json({
      success: true,
      data: Object.fromEntries(qrRecord.data),
      qrCode: qrRecord.qrCode,
      createdAt: qrRecord.createdAt,
    });
  } catch (error) {
    console.error('Error fetching QR code:', error);
    res.status(500).json({ error: 'Failed to fetch QR code', message: error.message });
  }
};

export const validateScannedData = async (req, res) => {
  try {
    const { scannedData } = req.body;

    if (!scannedData || typeof scannedData !== 'string') {
      return res.status(400).json({ valid: false, error: 'Invalid scanned data' });
    }

    // Try to parse the JSON string
    let parsedData;
    try {
      parsedData = JSON.parse(scannedData);
    } catch (parseError) {
      return res.json({ valid: false, error: 'Invalid JSON format' });
    }

    // Validate that it's an object
    if (typeof parsedData !== 'object' || Array.isArray(parsedData)) {
      return res.json({ valid: false, error: 'Data must be an object' });
    }

    res.json({
      valid: true,
      data: parsedData,
    });
  } catch (error) {
    console.error('Error validating scanned data:', error);
    res.status(500).json({ valid: false, error: 'Failed to validate data', message: error.message });
  }
};
