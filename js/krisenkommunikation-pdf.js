/* Krisenkommunikation — PDF-Generator (jsPDF) */
(function () {
  'use strict';

  var logoBase64 = null;

  // Preload logo as Base64
  function preloadLogo() {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      logoBase64 = canvas.toDataURL('image/png');
    };
    img.src = '/logo-web.png';
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function checked(id) {
    var el = document.getElementById(id);
    return el ? el.checked : false;
  }

  function generatePDF() {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: 'mm', format: 'a4' });
    var pw = 210;
    var ml = 15;          // margin left
    var mr = 15;          // margin right
    var cw = pw - ml - mr; // content width
    var y = 15;

    // Colors
    var navy = [15, 26, 46];
    var gold = [212, 168, 67];
    var gray = [100, 110, 130];
    var lightGray = [200, 207, 215];
    var black = [17, 24, 39];

    // ===== Header =====
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', ml, y, 18, 18);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor.apply(doc, navy);
    doc.text('Krisenkommunikation', ml + 22, y + 7);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor.apply(doc, gray);
    doc.text('Aufnahmeformular', ml + 22, y + 13);

    // Gold accent line
    doc.setDrawColor.apply(doc, gold);
    doc.setLineWidth(0.8);
    doc.line(ml, y + 20, ml + cw, y + 20);
    y += 27;

    // ===== Lfd. Nr. =====
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor.apply(doc, navy);
    doc.text('Lfd. Nr.:', ml, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor.apply(doc, black);
    doc.text(val('lfdnr'), ml + 20, y);
    y += 10;

    // Helper: draw a labeled box
    function labeledField(label, value, x, w, yPos) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor.apply(doc, gray);
      doc.text(label, x, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor.apply(doc, black);
      doc.setDrawColor.apply(doc, lightGray);
      doc.rect(x, yPos + 1, w, 7);
      doc.text(value || '', x + 2, yPos + 6);
    }

    // ===== Entgegennahme =====
    sectionTitle('Entgegennahme durch');
    y += 2;
    var colW = (cw - 12) / 4;
    labeledField('Mein Rufzeichen', val('rufzeichen'), ml, colW, y);
    labeledField('Mein QTH', val('qth'), ml + colW + 4, colW, y);
    labeledField('QRG', val('qrg'), ml + (colW + 4) * 2, colW, y);
    labeledField('Telefon', val('telefon'), ml + (colW + 4) * 3, colW, y);
    y += 16;

    // ===== Datum/Uhrzeit =====
    var halfW = (cw - 4) / 2;
    labeledField('Aufnahmedatum', val('datum'), ml, halfW, y);
    labeledField('Aufnahmeuhrzeit (MEZ)', val('uhrzeit'), ml + halfW + 4, halfW, y);
    y += 16;

    // ===== Notruf durch =====
    labeledField('Notruf durch', val('notruf-durch'), ml, cw, y);
    y += 16;

    // ===== 7 W-Fragen =====
    sectionTitle('7 W-Fragen');
    y += 2;

    var wFragen = [
      ['WER meldet?', 'w-wer'],
      ['WAS ist passiert?', 'w-was'],
      ['WANN ist es passiert?', 'w-wann'],
      ['WO ist es passiert?', 'w-wo'],
      ['WIE viele Verletzte/Betroffene?', 'w-wie'],
      ['WOMIT kann geholfen werden?', 'w-womit'],
      ['WARUM ist es passiert?', 'w-warum']
    ];

    wFragen.forEach(function (frage) {
      // Check for page break
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      var text = val(frage[1]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor.apply(doc, navy);
      doc.text(frage[0], ml, y);
      y += 3;

      // Calculate needed height for the text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor.apply(doc, black);
      var lines = doc.splitTextToSize(text || '', cw - 4);
      var boxH = Math.max(10, lines.length * 4.5 + 4);

      doc.setDrawColor.apply(doc, lightGray);
      doc.rect(ml, y, cw, boxH);
      if (lines.length > 0) {
        doc.text(lines, ml + 2, y + 4.5);
      }
      y += boxH + 4;
    });

    // ===== Weitergabe =====
    if (y > 230) {
      doc.addPage();
      y = 20;
    }
    sectionTitle('Weitergabe an');
    y += 2;

    // Table header
    doc.setFillColor(240, 243, 248);
    doc.rect(ml, y, cw, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor.apply(doc, gray);
    var cols = [ml, ml + 50, ml + 65, ml + 110];
    doc.text('Organisation', cols[0] + 2, y + 5);
    doc.text('Ja', cols[1] + 2, y + 5);
    doc.text('Wann', cols[2] + 2, y + 5);
    doc.text('Aufnehmende/r', cols[3] + 2, y + 5);
    y += 7;

    var orgs = [
      { nameId: null, name: '\u00D6RK-LZ (144)', checkId: 'wg-oerk', wannId: 'wg-oerk-wann', aufnId: 'wg-oerk-aufn' },
      { nameId: null, name: 'LAWZ (122)', checkId: 'wg-lawz', wannId: 'wg-lawz-wann', aufnId: 'wg-lawz-aufn' },
      { nameId: null, name: 'Polizei-LLZ (133)', checkId: 'wg-polizei', wannId: 'wg-polizei-wann', aufnId: 'wg-polizei-aufn' },
      { nameId: 'wg-custom1-name', name: '', checkId: 'wg-custom1', wannId: 'wg-custom1-wann', aufnId: 'wg-custom1-aufn' },
      { nameId: 'wg-custom2-name', name: '', checkId: 'wg-custom2', wannId: 'wg-custom2-wann', aufnId: 'wg-custom2-aufn' }
    ];

    orgs.forEach(function (org) {
      doc.setDrawColor.apply(doc, lightGray);
      doc.line(ml, y + 7, ml + cw, y + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor.apply(doc, black);

      var orgName = org.nameId ? val(org.nameId) : org.name;
      doc.text(orgName || '', cols[0] + 2, y + 5);

      // Checkbox
      if (checked(org.checkId)) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor.apply(doc, navy);
        doc.text('\u2713', cols[1] + 5, y + 5);
      }

      doc.setFont('helvetica', 'normal');
      doc.setTextColor.apply(doc, black);
      doc.text(val(org.wannId), cols[2] + 2, y + 5);
      doc.text(val(org.aufnId), cols[3] + 2, y + 5);
      y += 7;
    });
    y += 8;

    // ===== Erledigt =====
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    sectionTitle('Erledigt');
    y += 2;
    labeledField('Wann', val('erledigt-wann'), ml, halfW, y);
    labeledField('Durch', val('erledigt-durch'), ml + halfW + 4, halfW, y);
    y += 16;

    // ===== Footer =====
    var pageCount = doc.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor.apply(doc, lightGray);
      doc.text('BOS-ARSA \u2014 Krisenkommunikation-Aufnahmeformular', ml, 290);
      doc.text('Seite ' + i + ' / ' + pageCount, pw - mr, 290, { align: 'right' });
    }

    doc.save('Krisenkommunikation-Aufnahmeformular.pdf');

    // ---- Helper ----
    function sectionTitle(text) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor.apply(doc, navy);
      doc.text(text, ml, y);
      doc.setDrawColor.apply(doc, gold);
      doc.setLineWidth(0.5);
      y += 2;
      doc.line(ml, y, ml + cw, y);
      y += 5;
    }
  }

  function clearForm() {
    var form = document.getElementById('krisenForm');
    if (form) {
      form.reset();
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', function () {
    preloadLogo();

    var btnPdf = document.getElementById('btnGeneratePdf');
    if (btnPdf) btnPdf.addEventListener('click', generatePDF);

    var btnClear = document.getElementById('btnClearForm');
    if (btnClear) btnClear.addEventListener('click', clearForm);
  });
})();
