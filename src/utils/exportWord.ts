import { ExpertReport } from '../types';

export function exportReportToWord(report: ExpertReport): void {
  const steps = report.steps;
  const courtInfo = steps.step1_courtInfo;
  const inspection = steps.step2_inspection;
  const findings = steps.step3_findings;
  const evalData = steps.step4_evaluation;
  const legislation = steps.step5_legislation;
  const conclusion = steps.step6_conclusion;
  const sig = steps.step7_signatures;

  const getDamageLabel = () => {
    if (report.field === 'gida') return 'Saptanan Ayıp / Uygunsuzluk Derecesi';
    if (report.field === 'hayvancilik') return 'Saptanan Telef ve Değer Kaybı Oranı';
    return 'Saptanan Zarar / Hasar Oranı';
  };

  const getYieldLabel = () => {
    if (report.field === 'gida') return 'Parti Büyüklüğü ve Etkilenen Tüketici Sayısı';
    if (report.field === 'hayvancilik') return 'Sürü Büyüklüğü ve Verim / Hayvan Kaybı';
    return 'Rekolte ve Verim Verileri';
  };

  const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${report.title}</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000;
      margin: 2.5cm;
    }
    .header-center {
      text-align: center;
      font-weight: bold;
      margin-bottom: 24pt;
    }
    .case-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18pt;
    }
    .case-table td {
      padding: 4pt 6pt;
      vertical-align: top;
      font-size: 11pt;
    }
    .case-table td.label {
      width: 25%;
      font-weight: bold;
    }
    h2 {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1pt solid #000;
      padding-bottom: 3pt;
      margin-top: 18pt;
      margin-bottom: 8pt;
    }
    p {
      text-indent: 1.25cm;
      text-align: justify;
      margin-bottom: 8pt;
    }
    .calc-box {
      font-family: 'Courier New', monospace;
      font-size: 10pt;
      background-color: #f7f7f7;
      border: 1pt solid #ddd;
      padding: 10pt;
      margin: 10pt 0;
      white-space: pre-wrap;
    }
    .signature-block {
      margin-top: 36pt;
      float: right;
      text-align: center;
      width: 280pt;
    }
    .signature-block p {
      text-indent: 0;
      margin: 2pt 0;
    }
  </style>
</head>
<body>
  <div class="header-center">
    T.C.<br>
    ${courtInfo.courtName || '... MAHKEMESİ BAŞKANLIĞINA / HÂKİMLİĞİNE'}<br>
    BİLİRKİŞİ RAPORU
  </div>

  <table class="case-table">
    <tr>
      <td class="label">ESAS NO</td>
      <td>: ${courtInfo.fileNumber || '-'}</td>
    </tr>
    <tr>
      <td class="label">DAVA TÜRÜ</td>
      <td>: ${courtInfo.caseType || '-'}</td>
    </tr>
    <tr>
      <td class="label">DAVACI</td>
      <td>: ${courtInfo.plaintiff || '-'}</td>
    </tr>
    <tr>
      <td class="label">DAVALI</td>
      <td>: ${courtInfo.defendant || '-'}</td>
    </tr>
    <tr>
      <td class="label">UYUŞMAZLIK KONUSU</td>
      <td>: ${courtInfo.subject || '-'}</td>
    </tr>
    <tr>
      <td class="label">BİLİRKİŞİ HEYETİ</td>
      <td>: ${courtInfo.panelMembers || '-'}</td>
    </tr>
    <tr>
      <td class="label">RAPOR TARİHİ</td>
      <td>: ${sig.reportDate || new Date().toLocaleDateString('tr-TR')}</td>
    </tr>
  </table>

  <h2>1. GÖREV VE DAVA BİLGİLERİ</h2>
  <p>${courtInfo.subject || 'Sayın Mahkemeniz tensip kararı uyarınca dosya teknik bilirkişi heyetimize tevdi edilmiştir.'}</p>

  <h2>2. İNCELEME VE KEŞİF BİLGİLERİ</h2>
  <p><strong>Keşif Tarihi ve Saati:</strong> ${inspection.inspectionDate || '-'}</p>
  <p><strong>Mahal ve Parsel Bilgisi:</strong> ${inspection.location || '-'} (${inspection.parcelInfo || '-'})</p>
  <p><strong>Keşfe İştirak Edenler:</strong> ${inspection.attendees || '-'}</p>
  <p><strong>Yapılan Gözlem ve Fiziki Durum:</strong> ${inspection.observations || '-'}</p>

  <h2>3. TESPİTLER VE BULGULAR</h2>
  <p>${findings.technicalFindings || 'Mahallinde icra edilen fen tespitleri yapılmıştır.'}</p>
  ${findings.damagePercentage ? `<p><strong>${getDamageLabel()}:</strong> ${findings.damagePercentage}</p>` : ''}
  ${findings.yieldData ? `<p><strong>${getYieldLabel()}:</strong> ${findings.yieldData}</p>` : ''}
  ${findings.sampleAnalysis ? `<p><strong>Analiz ve Muayene Tutanakları:</strong> ${findings.sampleAnalysis}</p>` : ''}

  <h2>4. TEKNİK VE BİLİMSEL DEĞERLENDİRME</h2>
  <p><strong>Uygulanan Bilimsel Metot:</strong> ${evalData.scientificMethod || 'Net Gelir Yöntemi ve Resmi Maliyet Cetveli Analizi'}</p>
  ${evalData.calculationTable ? `<div class="calc-box">${evalData.calculationTable}</div>` : ''}
  <p><strong>Teknik Nedensellik (İlliyet) Bağı:</strong> ${evalData.causalityAnalysis || '-'}</p>
  <p><strong>Teknik Değerlendirme Özeti:</strong> ${evalData.technicalConclusion || '-'}</p>

  <h2>5. MEVZUAT VE HUKUKİ DAYANAK</h2>
  <p>İşbu raporun tanziminde 6100 sayılı Hukuk Muhakemeleri Kanunu'nun 266-287. maddeleri (özellikle HMK md. 279/1 hukuki nitelendirme yasağı) ve 6754 sayılı Bilirkişilik Kanunu hükümleri esas alınmıştır.</p>
  ${legislation.applicableLaws?.length ? `<p><strong>Dayanılan Özel Mevzuat Hükümleri:</strong> ${legislation.applicableLaws.join('; ')}</p>` : ''}
  ${legislation.legalArticles ? `<p>${legislation.legalArticles}</p>` : ''}
  ${legislation.precedentNotes ? `<p><strong>Yargıtay İçtihatları ve Emsal Kararlar:</strong> ${legislation.precedentNotes}</p>` : ''}

  <h2>6. SONUÇ VE KANAAT</h2>
  <p>${conclusion.finalOpinion || 'Teknik ve bilimsel veriler çerçevesinde neticeye varılmıştır.'}</p>
  ${conclusion.answersToCourt ? `<p><strong>Mahkemenin Sorularına Cevaplar:</strong><br>${conclusion.answersToCourt.replace(/\n/g, '<br>')}</p>` : ''}
  <p><em>${conclusion.expertStatement || 'Takdir Sayın Mahkemenize ait olmak üzere saygıyla arz olunur.'}</em></p>

  <div class="signature-block">
    <p><strong>BİLİRKİŞİ</strong></p>
    <p>${sig.expertName || 'Uzman Bilirkişi'}</p>
    <p>${sig.expertTitle || '-'}</p>
    <p>${sig.expertRegistrationNo || '-'}</p>
    <p>${sig.chamberMembership || ''}</p>
    <br><br>
    <p>(İmza / E-İmza)</p>
  </div>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeTitle = (report.title || 'bilirkisi_raporu')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_');
  a.download = `${safeTitle}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
