const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType } = require('docx');
const fs = require('fs');
const path = require('path');

function createCell(text, isHeader = false) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: text,
            bold: isHeader,
            size: isHeader ? 22 : 20,
            color: isHeader ? '091A2B' : '334155',
          }),
        ],
      }),
    ],
  });
}

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          text: 'EstateFlow CRM: Step-by-Step User Journey and Operations Guide',
          heading: HeadingLevel.TITLE,
          spacing: { after: 140 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Core Mission: ',
              bold: true,
              color: '005163',
            }),
            new TextRun({
              text: '“Close more. Manage less. Your deals, perfectly organized.”',
              bold: true,
            }),
          ],
          spacing: { after: 260 },
        }),

        new Paragraph({
          text: '1. User Roles and Access Rights',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 140 },
        }),
        new Paragraph({
          text: 'EstateFlow uses Role-Based Access Control (RBAC) to ensure sales agents can work productively on their assigned clients without distraction, while sales directors maintain full visibility and catalog control across the organization.',
          spacing: { after: 180 },
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createCell('Area / Capability', true),
                createCell('Sales Director (Admin)', true),
                createCell('Sales Representative (Agent)', true),
              ],
            }),
            new TableRow({
              children: [
                createCell('Login and Account Access'),
                createCell('Full access to platform via work email and password.'),
                createCell('Full access to platform via work email and password.'),
              ],
            }),
            new TableRow({
              children: [
                createCell('Leads and Pipeline'),
                createCell('Views all leads across all agents in the company.'),
                createCell('Views and manages their own assigned customer leads.'),
              ],
            }),
            new TableRow({
              children: [
                createCell('Lead Assignment'),
                createCell('Can assign new leads or reassign deals between agents.'),
                createCell('Assigned directly by sales management.'),
              ],
            }),
            new TableRow({
              children: [
                createCell('Lead Stage Progression'),
                createCell('Can update any lead across the 7 pipeline stages.'),
                createCell('Updates stage progression for assigned buyer deals.'),
              ],
            }),
            new TableRow({
              children: [
                createCell('Property Inventory'),
                createCell('Can create developments, towers, units, and set pricing.'),
                createCell('Read-only view of projects, unit plans, and live availability.'),
              ],
            }),
            new TableRow({
              children: [
                createCell('Unit Bookings'),
                createCell('Can lock and confirm reservations for any unit.'),
                createCell('Can reserve available units and record customer token deposits.'),
              ],
            }),
            new TableRow({
              children: [
                createCell('Audit Log and Reporting'),
                createCell('Full financial totals, company closing rates, and audit logs.'),
                createCell('Personal deal records, token receipts, and sales performance.'),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: '2. Complete Step-by-Step User Journey',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 320, after: 140 },
        }),

        new Paragraph({
          text: 'Step 1: Sign In to Workspace (/login)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• How the user starts: ', bold: true }),
            new TextRun('The user visits the dedicated login page.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• What they see: ', bold: true }),
            new TextRun('A clean dual-pane screen with the EstateFlow architectural brand logo, value cards, and a Sign In / Sign Up tabbed form.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• User Action: ', bold: true }),
            new TextRun('The user enters their registered work email and password, then clicks Sign In to Workspace. New consultants click the Sign Up tab, provide their full name, email, phone number, choose their role (Sales Rep or Director), and set a password.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Outcome: ', bold: true }),
            new TextRun('Upon verification, the session is established and the user is securely redirected to the Dashboard Overview.'),
          ],
          spacing: { after: 180 },
        }),

        new Paragraph({
          text: 'Step 2: Review Daily Priorities on the Dashboard (/)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• What they see: ', bold: true }),
            new TextRun('Four clear metric cards display Total Closed Revenue, Active Inquiries, Available Inventory, and Follow-Ups Today. High-contrast dark typography on clean surfaces ensures effortless reading.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Interactive Funnel: ', bold: true }),
            new TextRun('The Sales Pipeline Breakdown displays lead counts and percentage share across all 7 deal stages. Clicking on any stage updates the live stage summary on the right.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Action Center: ', bold: true }),
            new TextRun('The Scheduled Client Follow-Ups section lists all calls, appointments, and tours scheduled for today, complete with direct links to customer files.'),
          ],
          spacing: { after: 180 },
        }),

        new Paragraph({
          text: 'Step 3: Manage Leads in the Pipeline (/leads)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Flexible Views: ', bold: true }),
            new TextRun('Users switch between the visual drag-and-drop Kanban Board and the filterable Table View.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Creating a Lead: ', bold: true }),
            new TextRun('Clicking Add Lead opens a form to enter buyer details including name, phone number, email, budget range, and preferred unit type (such as 2BHK or Villa).'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• The 7 Pipeline Stages: ', bold: true }),
            new TextRun('New -> Contacted -> Site Visit -> Interested -> Negotiation -> Booked Deal -> Lost. Agents move leads forward as qualification progresses.'),
          ],
          spacing: { after: 180 },
        }),

        new Paragraph({
          text: 'Step 4: Conduct Client Calls and Log Interaction History (/leads/[id])',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Lead Detail File: ', bold: true }),
            new TextRun('Clicking any lead opens the full customer record, showing contact channels, preferred property type, budget, and assigned consultant attribution.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Logging Notes: ', bold: true }),
            new TextRun('Agents type interaction notes after calls or site visits, set a future follow-up date, and save. Notes are preserved in an audit timeline so past conversations are never lost.'),
          ],
          spacing: { after: 180 },
        }),

        new Paragraph({
          text: 'Step 5: Browse Inventory and Check Unit Availability (/properties)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Three-Tier Organization: ', bold: true }),
            new TextRun('Projects (Developments) -> Towers (Buildings) -> Property Units.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Status Badges: ', bold: true }),
            new TextRun('Available units display a green badge with a direct Book button. Booked units display a locked status so representatives never attempt duplicate reservations.'),
          ],
          spacing: { after: 180 },
        }),

        new Paragraph({
          text: 'Step 6: Reserve a Unit with Customer Token (Booking Modal)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Reservation Flow: ', bold: true }),
            new TextRun('The agent clicks Book on an available unit, selects the qualified customer from the dropdown, inputs the token deposit amount, and adds payment notes (cheque number, wire ID, or terms).'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• System Result: ', bold: true }),
            new TextRun('The unit is immediately locked, the buyer is automatically advanced to the Booked Deal stage in the pipeline, and a permanent booking entry is generated.'),
          ],
          spacing: { after: 180 },
        }),

        new Paragraph({
          text: 'Step 7: Audit and Review Finalized Deals (/bookings)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Transaction Ledger: ', bold: true }),
            new TextRun('Displays all completed reservations with unit numbers, building names, buyer details, assigned agent, token collected, and reservation timestamps.'),
          ],
          spacing: { after: 180 },
        }),

        new Paragraph({
          text: 'Step 8: Update Profile and Secure Sign Out',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Profile Management (/profile): ', bold: true }),
            new TextRun('Users can review their closed deal statistics, update phone numbers, and change display avatars.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• Enforced Sign Out: ', bold: true }),
            new TextRun('To ensure session privacy and prevent accidental cross-account changes, in-app role hopping is disabled. Users click Sign Out from the bottom-left account menu or the top header button to clear the active session and return to the login screen for the next user.'),
          ],
          spacing: { after: 240 },
        }),

        new Paragraph({
          text: '3. Typical Sales Agent Daily Routine',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 140 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• 09:00: ', bold: true }),
            new TextRun('Log in to EstateFlow and check Follow-Ups Today on the Dashboard Overview to set priority calls.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• 10:00 to 14:00: ', bold: true }),
            new TextRun('Conduct prospect calls and project tours. Enter meeting notes directly on the lead file.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• 15:00: ', bold: true }),
            new TextRun('Move qualified prospects forward across the Kanban board stages.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• 16:30: ', bold: true }),
            new TextRun('Open Inventory, locate agreed units, and reserve them with customer token advances.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '• 17:30: ', bold: true }),
            new TextRun('Review closed deals in the Bookings Log and click Sign Out from the bottom-left menu.'),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  const targetPath = path.resolve('C:/Users/TC/.gemini/antigravity/brain/1c6d9782-5e64-4cb3-a4cf-bb7a7acc7d8b/EstateFlow_CRM_Portal_Flow_Guide.docx');
  fs.writeFileSync(targetPath, buffer);
  console.log('DOCX written to ' + targetPath);
  const workspacePath = path.resolve('EstateFlow_CRM_Portal_Flow_Guide.docx');
  fs.writeFileSync(workspacePath, buffer);
  console.log('DOCX written to ' + workspacePath);
});
