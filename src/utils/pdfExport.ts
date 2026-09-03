import html2pdf from 'html2pdf.js';
import { PrebuiltDocument } from '../types';

/**
 * Helper to convert Markdown basic formatting to clean HTML for PDF rendering
 */
export function markdownToHtml(md: string): string {
  let html = md
    // Escape HTML special characters
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    
    // Headers
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 14pt; color: #0f172a; margin-top: 16px; margin-bottom: 8px; font-weight: 700; border-right: 4px solid #0284c7; padding-right: 8px;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 16pt; color: #0369a1; margin-top: 22px; margin-bottom: 10px; font-weight: 800; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 6px;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 20pt; color: #0c4a6e; margin-top: 12px; margin-bottom: 14px; font-weight: 900; text-align: center; border-bottom: 2px solid #0284c7; padding-bottom: 10px;">$1</h1>')
    
    // Bold and Italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #0f172a; font-weight: 700;">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    
    // Task lists / Checkboxes
    .replace(/^- \[ \] (.*$)/gim, '<div style="display: flex; align-items: flex-start; margin: 6px 0; gap: 8px;"><span style="display: inline-block; width: 14px; height: 14px; border: 1.5px solid #64748b; border-radius: 3px; margin-top: 3px; flex-shrink: 0; background: #fff;"></span><span>$1</span></div>')
    .replace(/^- \[x\] (.*$)/gim, '<div style="display: flex; align-items: flex-start; margin: 6px 0; gap: 8px;"><span style="display: inline-block; width: 14px; height: 14px; border: 1.5px solid #0284c7; border-radius: 3px; margin-top: 3px; flex-shrink: 0; background: #e0f2fe; text-align: center; font-size: 10px; line-height: 12px; color: #0369a1;">✔</span><span>$1</span></div>')
    
    // Bullet lists
    .replace(/^\- (.*$)/gim, '<li style="margin-bottom: 4px; line-height: 1.6;">$1</li>')
    .replace(/^\* (.*$)/gim, '<li style="margin-bottom: 4px; line-height: 1.6;">$1</li>')
    
    // Blockquotes / Warnings
    .replace(/^> (.*$)/gim, '<div style="background: #f0fdf4; border-right: 4px solid #16a34a; padding: 10px 14px; margin: 12px 0; border-radius: 6px; color: #166534; font-size: 10pt; line-height: 1.5;">$1</div>')
    
    // Horizontal rules
    .replace(/^---$/gim, '<hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 18px 0;" />')
    
    // Inline code
    .replace(/`([^`]+)`/gim, '<code style="background: #f1f5f9; color: #0369a1; padding: 2px 5px; border-radius: 4px; font-family: monospace; font-size: 9.5pt; direction: ltr; display: inline-block;">$1</code>');

  // Handle tables
  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = '';
  const newLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHtml = '<table style="width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 9.5pt; text-align: right;">';
      }
      
      const cells = line.slice(1, -1).split('|').map(c => c.trim());
      
      // Check if this is separator line like |---|---|
      if (cells.every(c => /^:?-+:?$/.test(c))) {
        continue;
      }

      const isHeader = !tableHtml.includes('<tbody>');
      if (isHeader && !tableHtml.includes('<thead>')) {
        tableHtml += '<thead style="background: #e2e8f0; color: #0f172a; font-weight: 700;"><tr>';
        cells.forEach(cell => {
          tableHtml += `<th style="border: 1px solid #cbd5e1; padding: 8px 10px; text-align: right;">${cell}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';
      } else {
        tableHtml += '<tr style="border-bottom: 1px solid #e2e8f0;">';
        cells.forEach(cell => {
          tableHtml += `<td style="border: 1px solid #e2e8f0; padding: 7px 10px; background: #fff;">${cell}</td>`;
        });
        tableHtml += '</tr>';
      }
    } else {
      if (inTable) {
        inTable = false;
        tableHtml += '</tbody></table>';
        newLines.push(tableHtml);
      }
      newLines.push(lines[i]);
    }
  }

  if (inTable) {
    tableHtml += '</tbody></table>';
    newLines.push(tableHtml);
  }

  return newLines.join('\n');
}

/**
 * Generate full printable / downloadable PDF HTML wrapper
 */
export function buildDocumentPdfHtml(doc: PrebuiltDocument): string {
  const contentHtml = markdownToHtml(doc.markdownContent);

  return `
    <div style="font-family: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif; direction: rtl; color: #1e293b; background: #ffffff; padding: 24px 28px; line-height: 1.6; font-size: 10.5pt; max-width: 800px; margin: 0 auto;">
      
      <!-- Official Header -->
      <div style="border-bottom: 2.5px solid #0284c7; padding-bottom: 14px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
        <div style="text-align: right;">
          <div style="font-size: 9pt; font-weight: 700; color: #0369a1; letter-spacing: 0.5px;">المملكة العربية السعودية • قطاع الخطوط الحديدية فائقة السرعة</div>
          <div style="font-size: 13pt; font-weight: 900; color: #0f172a; margin-top: 2px;">الإدارة العامة لهندسة الاتصالات والإشارات (HSR Telecom & Signalling)</div>
          <div style="font-size: 8.5pt; color: #64748b; margin-top: 1px; direction: ltr; text-align: right; font-family: monospace;">High-Speed Rail Technical Training & Certification Program</div>
        </div>
        <div style="border: 1.5px solid #0284c7; border-radius: 8px; padding: 6px 12px; background: #f0f9ff; text-align: center;">
          <span style="font-size: 10pt; font-weight: 800; color: #0369a1; display: block;">ERTMS / ETCS L2</span>
          <span style="font-size: 8pt; color: #0284c7; font-weight: 600;">CENELEC SIL-4</span>
        </div>
      </div>

      <!-- Metadata Card -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 22px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 9pt;">
        <div><strong style="color: #475569;">التصنيف:</strong> <span style="color: #0284c7; font-weight: 600;">${doc.category}</span></div>
        <div><strong style="color: #475569;">المستوى المستهدف:</strong> <span style="color: #0f172a;">${doc.targetAudience}</span></div>
        <div><strong style="color: #475569;">التقدير الزمني:</strong> <span style="color: #0f172a;">${doc.pagesEstimate}</span></div>
        <div><strong style="color: #475569;">كود الملف:</strong> <span style="font-family: monospace; color: #0f172a;" dir="ltr">${doc.id.toUpperCase()}</span></div>
      </div>

      <!-- Main Body -->
      <div class="pdf-content" style="text-align: justify;">
        ${contentHtml}
      </div>

      <!-- Official Signatures & Verification -->
      <div style="margin-top: 36px; padding-top: 16px; border-top: 1.5px solid #cbd5e1; page-break-inside: avoid;">
        <div style="font-size: 10pt; font-weight: 800; color: #0f172a; margin-bottom: 12px; text-align: center;">
          خانة اعتماد ومطابقة التدريب الميداني (Field Sign-off & Verification)
        </div>
        <div style="display: flex; justify-content: space-between; text-align: center; font-size: 9pt;">
          <div style="width: 30%; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 10px;">
            <div style="font-weight: 700; color: #334155;">المهندس المتدرب</div>
            <div style="height: 35px;"></div>
            <div style="border-top: 1px solid #94a3b8; padding-top: 4px; color: #64748b; font-size: 8pt;">التوقيع والتاريخ</div>
          </div>
          <div style="width: 30%; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 10px;">
            <div style="font-weight: 700; color: #334155;">كبير مهندسي الإشارات (المشرف)</div>
            <div style="height: 35px;"></div>
            <div style="border-top: 1px solid #94a3b8; padding-top: 4px; color: #64748b; font-size: 8pt;">التوقيع والاعتماد</div>
          </div>
          <div style="width: 30%; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 10px;">
            <div style="font-weight: 700; color: #334155;">ختم إدارة الإشارات والاتصالات</div>
            <div style="height: 35px;"></div>
            <div style="border-top: 1px solid #94a3b8; padding-top: 4px; color: #64748b; font-size: 8pt;">الختم الرسمي</div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div style="margin-top: 24px; padding-top: 10px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; font-size: 8pt; color: #94a3b8;">
        <span>منصة تدريب مهندسي الاتصالات والإشارات - خطوط السرعة الفائقة 300+ كم/س</span>
        <span>وثيقة معتمدة ومطابقة لـ EN 50126 / EN 50128 / EN 50129</span>
      </div>

    </div>
  `;
}

/**
 * Open high-resolution printable PDF window for instant print / Save as PDF
 */
export function printDocumentAsPdf(doc: PrebuiltDocument): void {
  const htmlContent = buildDocumentPdfHtml(doc);
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('يرجى السماح بالنوافذ المنبثقة (Pop-ups) لفتح نافذة تصدير الـ PDF');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>${doc.titleAr} - PDF</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 15mm 12mm 15mm 12mm;
          }
          body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #000;
            font-family: 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @media print {
            body {
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
          .toolbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #0f172a;
            color: #fff;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 9999;
          }
          .toolbar button {
            background: #0284c7;
            color: #fff;
            border: none;
            padding: 8px 18px;
            font-weight: bold;
            font-size: 14px;
            border-radius: 6px;
            cursor: pointer;
            font-family: inherit;
          }
          .toolbar button:hover {
            background: #0369a1;
          }
          .page-content {
            margin-top: 60px;
          }
        </style>
      </head>
      <body>
        <div class="toolbar no-print">
          <div>
            <strong>${doc.titleAr}</strong>
            <span style="font-size: 12px; color: #94a3b8; margin-right: 12px;">اختر "Save as PDF" أو "حفظ بتنسيق PDF" في خيارات الطابعة</span>
          </div>
          <button onclick="window.print()">🖨️ حفظ وطباعة PDF الآن</button>
        </div>
        <div class="page-content">
          ${htmlContent}
        </div>
        <script>
          // Automatically prompt print dialog after fonts settle
          setTimeout(() => {
            window.print();
          }, 700);
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
}

/**
 * Direct file download as .pdf using html2pdf
 */
export async function downloadDocumentAsPdfFile(doc: PrebuiltDocument): Promise<void> {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-99999px';
  container.style.left = '-99999px';
  container.style.width = '794px'; // Standard A4 width in px at 96dpi
  container.innerHTML = buildDocumentPdfHtml(doc);
  document.body.appendChild(container);

  const cleanFileName = (doc.fileName || `${doc.titleEn}`).replace(/\.md$/i, '') + '.pdf';

  const opt = {
    margin: [10, 10, 10, 10] as [number, number, number, number],
    filename: cleanFileName,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      logging: false,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' as const 
    }
  };

  try {
    await html2pdf().set(opt).from(container).save();
  } catch (error) {
    console.error('Direct PDF download error, falling back to print-to-PDF window:', error);
    printDocumentAsPdf(doc);
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Generate and download or print the complete 8-document training handbook as one massive PDF
 */
export function printAllDocumentsAsSinglePdf(docs: PrebuiltDocument[]): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('يرجى السماح بالنوافذ المنبثقة (Pop-ups) لفتح نافذة تصدير الـ PDF');
    return;
  }

  const combinedDocsHtml = docs.map((doc, idx) => `
    <div style="${idx > 0 ? 'page-break-before: always;' : ''} padding-top: 10px;">
      <div style="background: #0f172a; color: #fff; padding: 8px 14px; border-radius: 6px; font-weight: bold; font-size: 11pt; margin-bottom: 12px; display: flex; justify-content: space-between;">
        <span>الملحق التدريبي رقم (${idx + 1}): ${doc.category}</span>
        <span style="font-family: monospace; font-size: 9pt;">DOC ID: ${doc.id.toUpperCase()}</span>
      </div>
      ${buildDocumentPdfHtml(doc)}
    </div>
  `).join('\n\n');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>الحقيبة التدريبية الكاملة - مهندسي الاتصالات والإشارات فائقة السرعة (PDF)</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 14mm 12mm 14mm 12mm;
          }
          body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #000;
            font-family: 'IBM Plex Sans Arabic', sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @media print {
            .no-print {
              display: none !important;
            }
          }
          .toolbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #0284c7;
            color: #fff;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 9999;
          }
          .toolbar button {
            background: #0f172a;
            color: #fff;
            border: none;
            padding: 9px 20px;
            font-weight: bold;
            font-size: 14px;
            border-radius: 8px;
            cursor: pointer;
            font-family: inherit;
          }
          .cover-page {
            height: 95vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 4px double #0369a1;
            padding: 40px;
            box-sizing: border-box;
            page-break-after: always;
            text-align: center;
            background: #f8fafc;
          }
        </style>
      </head>
      <body>
        <div class="toolbar no-print">
          <div>
            <strong style="font-size: 16px;">الحقيبة التدريبية الكاملة (8 ملفات هندسية موحدة)</strong>
            <span style="font-size: 13px; margin-right: 14px; opacity: 0.9;">للحفظ كملف واحد: اختر في الطابعة Destination -> Save as PDF</span>
          </div>
          <button onclick="window.print()">📥 حفظ الحقيبة كاملة بتنسيق PDF</button>
        </div>

        <div style="margin-top: 60px;">
          <!-- Cover Page -->
          <div class="cover-page">
            <div>
              <div style="font-size: 14pt; font-weight: 800; color: #0369a1;">المملكة العربية السعودية</div>
              <div style="font-size: 11pt; color: #475569; margin-top: 4px;">قطاع السكك الحديدية فائقة السرعة • الإدارة الهندسية للإشارات والاتصالات</div>
            </div>

            <div style="margin: 40px 0;">
              <div style="font-size: 26pt; font-weight: 900; color: #0f172a; line-height: 1.3;">
                الحقيبة التدريبية الميدانية الشاملة<br/>
                لمهندسي الاتصالات والإشارات
              </div>
              <div style="font-size: 14pt; color: #0284c7; font-weight: 700; margin-top: 14px; direction: ltr; font-family: monospace;">
                High-Speed Rail Telecom & Signalling Engineering Complete Handbook
              </div>
              <div style="margin-top: 24px; display: inline-block; background: #e0f2fe; color: #0369a1; padding: 8px 24px; border-radius: 9999px; font-weight: 800; font-size: 12pt; border: 1.5px solid #0284c7;">
                ERTMS / ETCS Level 2 • GSM-R • Digital Axle Counters • CBI SIL 4
              </div>
            </div>

            <div style="border-top: 2px solid #cbd5e1; padding-top: 20px; font-size: 10pt; color: #334155; text-align: right; max-width: 600px; margin: 0 auto; width: 100%;">
              <div style="margin-bottom: 6px;"><strong>المحتوى:</strong> المنهج الأكاديمي، 3 أدلة هندسية، كراس المهام الحقلية، سيناريوهات الأعطال، كود السلامة 25kV، ونموذج التقييم الأكاديمي.</div>
              <div style="margin-bottom: 6px;"><strong>المعايير المعتمدة:</strong> CENELEC EN 50126 (RAMS), EN 50128, EN 50129, UIC EIRENE.</div>
              <div><strong>تاريخ الإصدار:</strong> ${new Date().toLocaleDateString('ar-SA')}</div>
            </div>
          </div>

          <!-- All Documents -->
          ${combinedDocsHtml}
        </div>

        <script>
          setTimeout(() => {
            window.print();
          }, 800);
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
}

/**
 * Print custom markdown (e.g. from AI generator) as formatted PDF
 */
export function printCustomMarkdownAsPdf(title: string, markdown: string, subtitle?: string): void {
  const contentHtml = markdownToHtml(markdown);
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('يرجى السماح بالنوافذ المنبثقة (Pop-ups) لفتح نافذة تصدير الـ PDF');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>${title} - PDF</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 15mm 12mm 15mm 12mm;
          }
          body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #000;
            font-family: 'IBM Plex Sans Arabic', sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @media print {
            .no-print {
              display: none !important;
            }
          }
          .toolbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #0f172a;
            color: #fff;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 9999;
          }
          .toolbar button {
            background: #0284c7;
            color: #fff;
            border: none;
            padding: 8px 18px;
            font-weight: bold;
            font-size: 14px;
            border-radius: 6px;
            cursor: pointer;
            font-family: inherit;
          }
          .page-content {
            margin-top: 60px;
            padding: 24px 28px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
        </style>
      </head>
      <body>
        <div class="toolbar no-print">
          <div>
            <strong>${title}</strong>
            <span style="font-size: 12px; color: #94a3b8; margin-right: 12px;">اختر "Save as PDF" أو "حفظ بتنسيق PDF"</span>
          </div>
          <button onclick="window.print()">🖨️ حفظ وطباعة PDF الآن</button>
        </div>

        <div class="page-content">
          <div style="border-bottom: 2.5px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
            <div style="font-size: 9pt; font-weight: 700; color: #0369a1;">المملكة العربية السعودية • هندسة الاتصالات والإشارات بالسكك الحديدية</div>
            <h1 style="font-size: 18pt; font-weight: 900; color: #0f172a; margin: 4px 0;">${title}</h1>
            ${subtitle ? `<div style="font-size: 10pt; color: #64748b;">${subtitle}</div>` : ''}
          </div>

          <div style="line-height: 1.6; font-size: 10.5pt; color: #1e293b;">
            ${contentHtml}
          </div>

          <div style="margin-top: 40px; padding-top: 14px; border-top: 1.5px solid #cbd5e1; display: flex; justify-content: space-between; font-size: 8.5pt; color: #64748b;">
            <span>صادر عن منصة تدريب هندسة الإشارات والاتصالات للقطارات فائقة السرعة</span>
            <span>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')}</span>
          </div>
        </div>

        <script>
          setTimeout(() => {
            window.print();
          }, 700);
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
}

/**
 * Direct file download as .pdf for custom markdown
 */
export async function downloadCustomMarkdownAsPdfFile(title: string, markdown: string, subtitle?: string): Promise<void> {
  const contentHtml = markdownToHtml(markdown);
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-99999px';
  container.style.left = '-99999px';
  container.style.width = '794px';
  container.innerHTML = `
    <div style="font-family: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif; direction: rtl; color: #1e293b; background: #ffffff; padding: 24px 28px; line-height: 1.6; font-size: 10.5pt; max-width: 800px; margin: 0 auto;">
      <div style="border-bottom: 2.5px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
        <div style="font-size: 9pt; font-weight: 700; color: #0369a1;">المملكة العربية السعودية • هندسة الاتصالات والإشارات بالسكك الحديدية</div>
        <h1 style="font-size: 18pt; font-weight: 900; color: #0f172a; margin: 4px 0;">${title}</h1>
        ${subtitle ? `<div style="font-size: 10pt; color: #64748b;">${subtitle}</div>` : ''}
      </div>
      <div style="line-height: 1.6; font-size: 10.5pt; color: #1e293b;">
        ${contentHtml}
      </div>
      <div style="margin-top: 40px; padding-top: 14px; border-top: 1.5px solid #cbd5e1; display: flex; justify-content: space-between; font-size: 8.5pt; color: #64748b;">
        <span>صادر عن منصة تدريب هندسة الإشارات والاتصالات للقطارات فائقة السرعة</span>
        <span>تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SA')}</span>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const cleanFileName = `HSR_${title.replace(/[\s/\\:]+/g, '_')}.pdf`;
  const opt = {
    margin: [10, 10, 10, 10] as [number, number, number, number],
    filename: cleanFileName,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
  };

  try {
    await html2pdf().set(opt).from(container).save();
  } catch (err) {
    console.error('Error downloading custom PDF, using print window fallback:', err);
    printCustomMarkdownAsPdf(title, markdown, subtitle);
  } finally {
    document.body.removeChild(container);
  }
}
