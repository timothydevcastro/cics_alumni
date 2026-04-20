import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const scriptUrl = process.env.APPS_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json({ error: "APPS_SCRIPT_URL not configured" }, { status: 500 });
    }

    const response = await fetch(scriptUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure each item has an 'id' property and correctly maps student ID
    const formattedData = Array.isArray(data) ? data.map((item: any) => {
      // Find the ID field regardless of case (studentId, Student ID, studentid, id)
      const studentId = item.studentId || item.studentID || item['student id'] || item['Student ID'] || item.id;
      const firstName = item.firstName || item['first name'] || item.firstname;
      const lastName = item.lastName || item['last name'] || item.lastname;

      return {
        ...item,
        id: studentId || Math.random().toString(36).substr(2, 9),
        firstName: firstName || "",
        lastName: lastName || "",
        studentId: studentId || ""
      };
    }) : [];

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error("Fetch alumni error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
