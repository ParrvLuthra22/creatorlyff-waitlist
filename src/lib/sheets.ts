import { google } from 'googleapis';

export async function appendToWaitlist(data: {
  name: string; email: string; role: string;
  brandName?: string;
  linkedin?: string; collabFrequency?: number; platformNeed?: number;
}) {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.warn("Google Sheets credentials missing. Simulating success.");
    return { position: Math.floor(Math.random() * 1000) + 100 };
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          data.name, data.email, data.role, data.linkedin || "N/A", data.collabFrequency || "N/A", data.platformNeed || "N/A", data.brandName || "N/A"
        ]],
      },
    });

    const updatedRange = result.data.updates?.updatedRange || '';
    const match = updatedRange.match(/(\d+):/);
    const position = match ? parseInt(match[1]) - 1 : 0; // subtract header row
    return { position: position > 0 ? position : 1 };
  } catch (err) {
    console.error("Sheets API error:", err);
    throw new Error("Failed to save to database");
  }
}
