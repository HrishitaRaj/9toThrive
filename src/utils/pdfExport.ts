import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportAnalyticsToPDF(
  placementByBranch: any[],
  topRecruiters: any[],
  salaryTrends: any[]
): void {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('Placement Analytics Report', 14, 20);
  
  // Timestamp
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
  
  // Placement by Branch
  doc.setFontSize(14);
  doc.text('Placement by Branch', 14, 40);
  
  autoTable(doc, {
    startY: 45,
    head: [['Branch', 'Placed Students', 'Total Students', 'Placement %']],
    body: placementByBranch.map(item => [
      item.branch,
      item.placed,
      item.total,
      `${((item.placed / item.total) * 100).toFixed(2)}%`
    ]),
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
  });
  
  // Top Recruiters
  const finalY1 = (doc as any).lastAutoTable.finalY || 45;
  doc.setFontSize(14);
  doc.text('Top Recruiters', 14, finalY1 + 15);
  
  autoTable(doc, {
    startY: finalY1 + 20,
    head: [['Company', 'Total Offers']],
    body: topRecruiters.map(item => [item.company, item.offers]),
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
  });
  
  // Salary Trends
  const finalY2 = (doc as any).lastAutoTable.finalY || finalY1 + 20;
  doc.setFontSize(14);
  doc.text('Salary Trends', 14, finalY2 + 15);
  
  autoTable(doc, {
    startY: finalY2 + 20,
    head: [['Month', 'Average Salary (LPA)']],
    body: salaryTrends.map(item => [item.month, item.avgSalary]),
    theme: 'grid',
    headStyles: { fillColor: [255, 87, 34] },
  });
  
  // Save
  const timestamp = new Date().toISOString().split('T')[0];
  doc.save(`analytics_report_${timestamp}.pdf`);
}
