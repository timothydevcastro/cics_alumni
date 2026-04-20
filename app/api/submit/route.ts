import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const scriptUrl = process.env.APPS_SCRIPT_URL;
    if (!scriptUrl) {
      console.warn("APPS_SCRIPT_URL not configured. Form submission simulated.");
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ success: true, simulated: true });
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Apps Script Error Response:", errorText);
      throw new Error(`Google Apps Script responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
