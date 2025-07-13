import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateTraineeReport = (trainees, graduates) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('ICECD Trainee Progress Report', 14, 22);
  
  // Add current date
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Use autoTable as a separate function
  autoTable(doc, {
    startY: 40,
    head: [['Name', 'Sector', 'Progress', 'Mentor']],
    body: trainees.map(trainee => [
      trainee.name,
      trainee.tags.join(', '),
      `${trainee.courseProgress}/5`,
      graduates.find(g => g.id === trainee.assignedMentorId)?.name || 'Not Assigned'
    ]),
    theme: 'striped',
    headStyles: { fillColor: [30, 76, 120] }
  });
  
  // Add summary stats
  const completedTrainings = trainees.reduce((sum, trainee) => sum + trainee.courseProgress, 0);
  const totalPossibleTrainings = trainees.length * 5;
  const completionRate = Math.round((completedTrainings / totalPossibleTrainings) * 100);
  
  const yPos = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(14);
  doc.text('Summary Statistics', 14, yPos);
  doc.setFontSize(11);
  doc.text(`Total Trainees: ${trainees.length}`, 14, yPos + 10);
  doc.text(`Total Graduates: ${graduates.length}`, 14, yPos + 20);
  doc.text(`Overall Completion Rate: ${completionRate}%`, 14, yPos + 30);
  
  // Add ICECD footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('ICECD - International Centre for Entrepreneurship and Career Development', 14, 280);
  
  return doc;
};

export const generateGraduateReport = (graduates) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('ICECD Graduate Success Report', 14, 22);
  
  // Add current date
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Use autoTable as a separate function
  autoTable(doc, {
    startY: 40,
    head: [['Name', 'Business', 'Sector', 'Success Status', 'Jobs Created']],
    body: graduates.map(graduate => [
      graduate.name,
      graduate.business || 'Not Specified',
      graduate.tags.filter(t => t !== 'Success').join(', '),
      graduate.tags.includes('Success') ? 'Certified' : graduate.followUpStatus,
      graduate.metrics?.jobsCreated || 0
    ]),
    theme: 'striped',
    headStyles: { fillColor: [30, 76, 120] }
  });
  
  // Add success story highlights
  const successStories = graduates.filter(g => g.tags.includes('Success'));
  
  if (successStories.length > 0) {
    const yPos = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.text('Success Story Highlights', 14, yPos);
    
    let currentY = yPos + 10;
    successStories.slice(0, 3).forEach((graduate, index) => {
      doc.setFontSize(12);
      doc.setTextColor(30, 76, 120);
      doc.text(`${graduate.name} - ${graduate.business || 'Entrepreneur'}`, 14, currentY);
      doc.setTextColor(0);
      doc.setFontSize(10);
      
      // Wrap text for story
      const textLines = doc.splitTextToSize(graduate.successStory || 'No story provided', 180);
      doc.text(textLines, 14, currentY + 6);
      
      currentY += 6 + (textLines.length * 5) + 10;
    });
  }
  
  // Add ICECD footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('ICECD - International Centre for Entrepreneurship and Career Development', 14, 280);
  
  return doc;
};