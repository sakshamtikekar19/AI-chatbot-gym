import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { name, phone } = await req.json();

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: "Name and phone are required" }), {
        status: 400,
      });
    }

    const lead = { 
      name, 
      phone, 
      timestamp: new Date().toISOString() 
    };

    // Define path to leads.json in the project root
    const filePath = path.join(process.cwd(), "leads.json");

    // Read existing leads or create empty array
    let leads = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      leads = JSON.parse(fileData);
    }

    // Add new lead
    leads.push(lead);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

    console.log("New Lead Saved to leads.json:", lead);

    return new Response(JSON.stringify({ success: true, message: "Lead saved successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return new Response(JSON.stringify({ error: "Failed to capture lead" }), {
      status: 500,
    });
  }
}
