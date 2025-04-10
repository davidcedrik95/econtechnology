import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { PDFDocument, rgb } from 'pdf-lib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  secure: false,
  auth: {
    user: process.env.ELASTIC_EMAIL_FROM,
    pass: process.env.ELASTIC_EMAIL_API_KEY
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.post('/api/send-config', async (req, res) => {
  try {
    const formData = req.body;

    if (!formData.name || !formData.email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const pdfBuffer = await generatePdf(formData);

    const mailOptions = {
      from: `Solardach Konfigurator <${process.env.ELASTIC_EMAIL_FROM}>`,
      to: [formData.email, 'moukam2@gmail.com'],
      subject: `Ihre Solardach Konfiguration - ${formData.name}`,
      html: generateEmailContent(formData),
      attachments: [{
        filename: `Solardach_Konfiguration_${formData.name.replace(/\s+/g, '_')}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    res.status(200).json({ success: true, message: 'Email mit PDF erfolgreich versendet' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Versenden', error: error.message });
  }
});

async function generatePdf(formData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size in points
  
  // Add title
  page.drawText('Solardach Konfiguration', {
    x: 50,
    y: 800,
    size: 24,
    color: rgb(0.1, 0.5, 0.8)
  });

  // Add form data
  const fields = [
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `Telefon: ${formData.phone}`,
    `Adresse: ${formData.address}`,
    `PLZ/Ort: ${formData.postalCode} ${formData.city}`,
    `Gebäudetyp: ${formData.buildingType}`,
    `Dachform: ${formData.roofShape}`,
    `Dachfläche: ${formData.roofArea} m²`,
    `Haushaltsgröße: ${formData.householdSize}`,
    `Stromverbrauch: ${formData.currentConsumption || 'N/A'} kWh`
  ];

  fields.forEach((field, index) => {
    page.drawText(field, {
      x: 50,
      y: 750 - (index * 25),
      size: 12
    });
  });

  // Add footer
  page.drawText(`Erstellt am ${new Date().toLocaleDateString('de-DE')}`, {
    x: 50,
    y: 50,
    size: 10
  });

  return await pdfDoc.save();
}

function generateEmailContent(formData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1A82C1;">Ihre Solardach-Konfiguration</h2>
      <p>Sehr geehrte/r ${formData.name},</p>
      <p>anbei finden Sie Ihre Solardach-Konfiguration als PDF-Datei.</p>
      <p>Für Rückfragen stehen wir Ihnen gerne zur Verfügung.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 0.9em; color: #777;">
        Mit freundlichen Grüßen<br>
        Ihr Solardach-Team
      </p>
    </div>
  `;
}

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});