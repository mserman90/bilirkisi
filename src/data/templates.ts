import { ExpertReport, ExpertField } from '../types';

export const SAMPLE_REPORTS: ExpertReport[] = [
  {
    id: 'rep-ziraat-01',
    title: 'Buğday Parselinde Zirai Don ve Rekolte Kaybı Tespiti',
    field: 'ziraat',
    status: 'tamamlandi',
    createdAt: '2026-10-10T09:00:00Z',
    updatedAt: '2026-10-18T14:30:00Z',
    steps: {
      step1_courtInfo: {
        courtName: 'KONYA 2. ASLİYE HUKUK MAHKEMESİ',
        fileNumber: '2025/342 Esas',
        caseType: 'Tarımsal Ürün Zararı Kaynaklı Maddi Tazminat Davası',
        plaintiff: 'Ahmet Yılmaz (Çiftçi)',
        defendant: 'Anadolu Bölge Sulama Birliği Başkanlığı',
        subject: 'Dava konusu taşınmazda sulama kanalı arızası ve geç su verilmesi nedeniyle buğday ekili alanda meydana gelen rekolte kaybı ve zarar miktarının tespiti.',
        panelMembers: 'Ziraat Yüksek Mühendisi Serdar Erman (Tek Bilirkişi)',
      },
      step2_inspection: {
        inspectionDate: '15.05.2025 Saat: 10:30',
        location: 'Konya İli, Karatay İlçesi, İsmil Mahallesi, 142 Ada 18 Parsel',
        parcelInfo: 'Yüzölçümü: 45.200 m², Vasfı: Sulu Tarla, Mülkiyeti: Davacı adına kayıtlı',
        attendees: 'Naip Hâkim, Zabıt Kâtibi, Davacı asil ve vekili Av. Mehmet Can, Davalı İdare Temsilcisi Ziraat Mühendisi',
        observations: 'Mahallinde yapılan fen incelemesinde arazinin düz, killi-tınlı bünyede ve 1. sınıf sulu tarım arazisi vasfında olduğu; taşınmazda Bezostaja-1 çeşidi ekmeklik buğday ekili olduğu, ancak sulama yetersizliği sebebiyle başak dane dolum evresinde cılızlaşma meydana geldiği gözlemlenmiştir.',
      },
      step3_findings: {
        technicalFindings: 'Parselin muhtelif 8 ayrı noktasından 1 m²lik çerçevelerle yapılan zikzak örnekleme analizinde; ortalama kardeşlenme adedinin normal seviyede olduğu, fakat dane bağlama dönemindeki su stresine bağlı olarak başaktaki dane sayısının emsal sulu parsellere nazaran %32 oranında düşük kaldığı ve bin dane ağırlığının 28 grama gerilediği saptanmıştır.',
        damagePercentage: '%32.00 Ortalama Rekolte Kaybı',
        yieldData: 'Normal Yöre Dekar Verimi: 550 kg/da | Parsel Gerçekleşen Verim: 374 kg/da | Dekar Başına Kayıp: 176 kg/da',
        sampleAnalysis: 'Konya İl Tarım ve Orman Müdürlüğü Laboratuvarı 2025/1109 sayılı Fen ve Dane Analiz Tutanak Raporu',
        rawNotes: 'Bitki kök boğazı sağlam, herhangi bir mantari veya bakteriyel yaprak lekesi hastalığına rastlanmamıştır. Verim düşüklüğü doğrudan su noksanlığı ile ilintilidir.',
      },
      step4_evaluation: {
        scientificMethod: 'Kamulaştırma Kanunu 11. maddesi ve Yargıtay 5. Hukuk Dairesi ilke kararları doğrultusunda Net Gelir Metodolojisi ve Üretim Maliyet Cetveli Esas Alınmıştır.',
        calculationTable: `1. Parsel Toplam Alanı: 45,20 Dekar
2. Dekar Başı Verim Kaybı: 176 Kg
3. Toplam Rekolte Kaybı: 45,20 da x 176 kg = 7.955,20 Kg
4. Konya Ticaret Borsası Cari Yıl Ekmeklik Buğday Ortalama Satış Fiyatı: 11,20 TL/Kg
5. Hasat ve Nakliye Tasarruf Masrafı (%10): 1,12 TL/Kg Tenkisi -> Net Birim Değer: 10,08 TL/Kg
6. Toplam Maddi Gelir Kaybı: 7.955,20 Kg x 10,08 TL = 80.188,42 TL`,
        causalityAnalysis: 'Sulama birliği ana kanal vanasındaki 18 günlük mekanik tıkanma tutanağı ile bitkinin kritik süt olum devresi birebir örtüşmekte olup, meydana gelen kayıp ile sulama hizmetinin kesintiye uğraması arasında doğrudan teknik ve fen illiyeti mevcuttur.',
        technicalConclusion: 'Parseldeki rekolte düşüklüğü tarımsal bakım noksanlığından değil, kritik fenolojik evrede yaşanan su yetersizliğinden kaynaklanmıştır.',
      },
      step5_legislation: {
        applicableLaws: [
          '6100 sayılı Hukuk Muhakemeleri Kanunu md. 266-287',
          '6754 sayılı Bilirkişilik Kanunu md. 3 ve md. 11',
          '5403 sayılı Toprak Koruma ve Arazi Kullanımı Kanunu',
          '2942 sayılı Kamulaştırma Kanunu md. 11 Net Gelir İlkesi',
        ],
        legalArticles: 'HMK md. 279/1 gereğince bilirkişi sıfatıyla yalnızca teknik zarar miktarı ve fen tespitleri bildirilmiş; kusur oranları veya hukuki sorumluluk takdiri Sayın Mahkemenin yetkisine bırakılmıştır.',
        precedentNotes: 'Yargıtay 3. Hukuk Dairesi 2021/4502 E. sayılı emsal kararında; sulama arızasından kaynaklanan zirai zararlarda hasat-nakliye masraflarının brüt gelirden düşülerek net zarar üzerinden hüküm kurulması gerektiği belirtilmiştir.',
      },
      step6_conclusion: {
        finalOpinion: `1. Dava konusu taşınmazda 2025 üretim yılı buğday ekili 45,20 dekarlık alanda ortalama %32 oranında fenolojik rekolte kaybı meydana geldiği,
2. Buğday ürünündeki net rekolte kaybının 7.955,20 Kilogram olduğu,
3. Resmi maliyet ve borsa cari fiyatları uyarınca net tarımsal gelir zararının 80.188,42 TL (Seksenbinyüzseksensekiz Türk Lirası Kırkiki Kuruş) olarak hesaplandığı,
4. Zararın oluşumunda su kesintisinin teknik açıdan doğrudan etkili olduğu mütalaa edilmiştir.`,
        answersToCourt: 'Mahkemenin 1 nolu sorusuna: Zarar miktarı 80.188,42 TL\'dir. 2 nolu sorusuna: Çiftçinin zirai kusuru saptanmamıştır.',
        expertStatement: 'İşbu teknik rapor, dosya münderecatı ve mahallindeki objektif fen tespitleri uyarınca tarafsızlık andına bağlı kalınarak tanzim edilmiş olup, takdir Sayın Mahkemenize ait olmak üzere saygıyla arz olunur.',
      },
      step7_signatures: {
        reportDate: '18.10.2025',
        expertName: 'Serdar Erman',
        expertTitle: 'Ziraat Yüksek Mühendisi - Tarla Bitkileri Uzmanı',
        expertRegistrationNo: 'Bilirkişilik Sicil No: 42-2018-0912',
        chamberMembership: 'TMMOB Ziraat Mühendisleri Odası Sicil: 18452',
      },
    },
    checklistProgress: {
      c1_1: true, c1_2: true, c1_3: true, c1_4: true,
      c2_1: true, c2_2: true, c2_3: true, c2_4: true,
      c3_1: true, c3_2: true, c3_3: true, c3_4: true,
      c4_1: true, c4_2: true, c4_3: true, c4_4: true,
      c5_1: true, c5_2: true, c5_3: true,
      c6_1: true, c6_2: true, c6_3: true, c6_4: true,
      c7_1: true, c7_2: true, c7_3: true,
    },
    attachments: [
      {
        id: 'att-1',
        name: 'Kesif_Fotograf_Albumu.pdf',
        type: 'image',
        size: '3.4 MB',
        uploadDate: '16.05.2025',
        description: 'Parselde çekilen 8 adet renkli makro başak ve genel görünüm fotoğrafları',
      },
      {
        id: 'att-2',
        name: 'Konya_Tarim_Maliyet_Cetveli.pdf',
        type: 'analysis',
        size: '1.1 MB',
        uploadDate: '17.05.2025',
        description: 'İl Tarım ve Orman Müdürlüğü 2025 yılı buğday dekar maliyet ve getiri resmi tablosu',
      },
    ],
  },
  {
    id: 'rep-gida-01',
    title: 'Toplu Tüketim Gıda Zehirlenmesi ve Hijyen Kriterleri İncelemesi',
    field: 'gida',
    status: 'inceleniyor',
    createdAt: '2026-10-12T11:00:00Z',
    updatedAt: '2026-10-17T16:45:00Z',
    steps: {
      step1_courtInfo: {
        courtName: 'ANKARA 4. TÜKETİCİ MAHKEMESİ',
        fileNumber: '2025/512 Esas',
        caseType: 'Ayıplı Hizmet ve Gıda Güvenilirliği İhlali Kaynaklı Tazminat',
        plaintiff: 'Gülşah Demir ve ark. (Davacılar)',
        defendant: 'Lezzet Catering Ltd. Şti.',
        subject: 'Düğün organizasyonunda sunulan tavuklu menü tüketimi sonrası davacıların gıda kaynaklı intoksikasyon geçirmesi nedeniyle teknik ayıp ve hijyen tespiti.',
        panelMembers: 'Gıda Mühendisi Ayşe Doğan',
      },
      step2_inspection: {
        inspectionDate: '22.06.2025 Saat: 14:00',
        location: 'Ankara İli, Çankaya İlçesi, Catering Üretim Tesisi ve Düğün Salonu Mutfağı',
        parcelInfo: 'İşletme Onay No: TR-06-K-004218',
        attendees: 'Bilirkişi Gıda Mühendisi, İlçe Tarım Gıda Kontrol Görevlileri, Davalı Şirket Mesul Müdürü',
        observations: 'Tesisin soğuk hava depolarında yapılan denetimde sıcaklık kayıt takip cihazlarının arızalı olduğu, pişirilmiş tavuk etlerinin +4°C altında muhafaza edilmek yerine oda sıcaklığında 4 saatten fazla bekletildiği tespit edilmiştir.',
      },
      step3_findings: {
        technicalFindings: 'İl Sağlık Müdürlüğü ve Gıda Kontrol Laboratuvarı tarafından alınan şahit numune analizinde; tüketilen tavuklu pilav menüsünde Clostridium perfringens ve Bacillus cereus sayısının Türk Gıda Kodeksi sınır değerlerinin (10² kob/g) çok üzerinde (3,2 x 10⁴ kob/g) olduğu raporlanmıştır.',
        damagePercentage: 'Gıda Güvenilirliği Tam İhlali (%100 Uygunsuzluk)',
        yieldData: 'İncelenen Parti: 350 Porsiyon | Zehirlenme Belirtisi Gösteren Kişi: 48 Kişi (Hastaneye sevk)',
        sampleAnalysis: 'Ankara Gıda Kontrol Laboratuvar Müdürlüğü 2025-G-4401 sayılı Muayene Raporu',
        rawNotes: 'Etiketleme ve şahit numune saklama süresi (72 saat) kuralına kısmen uyulmuş, ancak soğuk zincir kırılması vuku bulmuştur.',
      },
      step4_evaluation: {
        scientificMethod: '5996 sayılı Kanun ve Türk Gıda Kodeksi Mikrobiyolojik Kriterler Yönetmeliği Risk Değerlendirmesi',
        calculationTable: 'Patojen: Clostridium perfringens | Mevzuat Limiti: < 10² | Analiz Sonucu: 3,2 x 10⁴ (320 Kat Aşıldı)',
        causalityAnalysis: 'Hastalardan izole edilen suş ile şahit menüden izole edilen mikrobiyolojik suşun genetik ve serolojik olarak eşleşmesi, klinik tablonun doğrudan bu yemekten kaynaklandığını bilimsel olarak kanıtlamaktadır.',
        technicalConclusion: 'Ürünün güvenilir gıda vasfını yitirdiği ve tüketici sağlığını tehlikeye düşürecek patojen yükü taşıdığı belirlenmiştir.',
      },
      step5_legislation: {
        applicableLaws: [
          '5996 sayılı Veteriner Hizmetleri, Bitki Sağlığı, Gıda ve Yem Kanunu md. 21 ve 22',
          'Türk Gıda Kodeksi Mikrobiyolojik Kriterler Yönetmeliği',
          'Gıda Hijyeni Yönetmeliği (HACCP ilkeleri)',
          'HMK md. 266-287',
        ],
        legalArticles: '5996 s. Kanun md. 21/1: "Güvenilir olmayan gıda piyasaya arz edilemez."',
        precedentNotes: 'Yargıtay 13. Hukuk Dairesi kararlarında gıda zehirlenmesinde akredite laboratuvar analizinin illiyet için zorunlu olduğu vurgulanmıştır.',
      },
      step6_conclusion: {
        finalOpinion: `1. Davalı işletmece üretilip sunulan menünün Türk Gıda Kodeksi standartlarına aykırı olduğu ve patojen mikroorganizma içerdiği,
2. Meydana gelen gıda intoksikasyonu vakası ile tüketilen yemek arasında doğrudan teknik illiyet bağı bulunduğu,
Takdir Mahkemenize ait olmak üzere sunulur.`,
        answersToCourt: 'Menü standart dışıdır ve soğuk zincir ihlali tespit edilmiştir.',
        expertStatement: 'Mesleki etik ve bilimsel tarafsızlık andımıza bağlı kalınarak hazırlanmıştır.',
      },
      step7_signatures: {
        reportDate: '17.10.2025',
        expertName: 'Ayşe Doğan',
        expertTitle: 'Gıda Mühendisi - Hijyen Başdenetçisi',
        expertRegistrationNo: 'Bilirkişilik Sicil No: 06-2019-1422',
        chamberMembership: 'TMMOB Gıda Mühendisleri Odası Sicil: 9410',
      },
    },
    checklistProgress: {
      c1_1: true, c1_2: true, c1_3: true,
      c2_1: true, c2_2: true, c2_3: true,
      c3_1: true, c3_2: true,
      c4_1: true, c4_2: true, c4_3: true,
      c5_1: true, c5_2: true,
      c6_1: true, c6_2: true, c6_3: true,
      c7_1: true, c7_2: true,
    },
    attachments: [
      {
        id: 'att-gida-1',
        name: 'Laboratuvar_Analiz_Raporu.pdf',
        type: 'analysis',
        size: '1.8 MB',
        uploadDate: '24.06.2025',
        description: 'Ankara Gıda Kontrol Laboratuvarı Mikrobiyolojik Raporu',
      },
    ],
  },
  {
    id: 'rep-hayvan-01',
    title: 'Süt Sığırcılığı İşletmesinde Şap Salgını Telef ve Damızlık Değer Kaybı',
    field: 'hayvancilik',
    status: 'taslak',
    createdAt: '2026-10-15T08:30:00Z',
    updatedAt: '2026-10-18T10:15:00Z',
    steps: {
      step1_courtInfo: {
        courtName: 'İZMİR 2. ASLİYE HUKUK MAHKEMESİ',
        fileNumber: '2025/189 Esas',
        caseType: 'Hayvan Satış Sözleşmesinden Doğan Ayıplı İfa ve Tazminat',
        plaintiff: 'Bereket Hayvancılık San. Tic. Ltd. Şti.',
        defendant: 'Kemal Öztürk (Besici/Satıcı)',
        subject: 'Satışı yapılan 30 baş Holstein ırkı damızlık gebe düvede gizli ayıplı bulaşıcı hastalık (SAT-2 Şap) çıkması sonucu telef ve karantina zararı.',
        panelMembers: 'Veteriner Hekim Dr. Mustafa Kaya',
      },
      step2_inspection: {
        inspectionDate: '04.07.2025 Saat: 11:00',
        location: 'İzmir İli, Tire İlçesi, Damızlık Süt Sığırcılığı İşletmesi',
        parcelInfo: 'TÜRKVET İşletme No: TR-35-184920',
        attendees: 'Veteriner Hekim Bilirkişi, İlçe Tarım Hayvan Sağlığı Şube Şefi, Davacı Şirket Müdürü',
        observations: 'İşletme karantina padoğunda bulunan gebe düvelerde yüksek ateş, ağız ve tırnakta veziküler lezyonlar, salivasyon ve 4 başta mastitis kaynaklı meme körleşmesi gözlemlenmiştir.',
      },
      step3_findings: {
        technicalFindings: 'Satın alınan 30 baş hayvandan 3 adedinin telef olduğu, 5 adedinin mecburi kesime sevk edildiği, 4 gebe düvenin yavru attığı (abortus) resmi veteriner raporları ile sabittir.',
        damagePercentage: '3 Baş Telef, 5 Baş Zorunlu Kesim, 4 Adet Abortus Kaybı',
        yieldData: 'Ortalama Süt Verimi Kaybı: Günlük 620 Litre x 60 Gün = 37.200 Litre',
        sampleAnalysis: 'Bornova Veteriner Kontrol Enstitüsü Viroloji Teşhis Raporu No: 2025/B-912',
        rawNotes: 'Hastalığın kuluçka süresi (2-14 gün) dikkate alındığında virüsün nakil öncesinde satıcının işletmesinde bulaştığı belirlenmiştir.',
      },
      step4_evaluation: {
        scientificMethod: 'Damızlık Sığır Yetiştiricileri Merkez Birliği (TDSYMB) Damızlık Değerleme Esasları',
        calculationTable: `1. Telef Olan 3 Baş Damızlık Gebe Düve Değeri: 3 x 95.000 TL = 285.000 TL
2. Zorunlu Kesim 5 Baş Hayvan Değer Farkı: (5 x 95.000) - (5 x 42.000 Karkas) = 265.000 TL
3. Düşen 4 Adet Gebe Buzağı Kaybı: 4 x 22.000 TL = 88.000 TL
4. 60 Günlük Karantina Süt Gelir Kaybı: 37.200 Lt x 14,50 TL = 539.400 TL
Toplam Maddi Değer Kaybı: 1.177.400,00 TL`,
        causalityAnalysis: 'Hastalığın kuluçka evresi ile sevk irsaliyesi tarihleri arasındaki zamansal uyum gizli ayıbı teyit etmektedir.',
        technicalConclusion: 'Hayvanlardaki bulaşmanın teslimden önce gerçekleştiği teknik olarak sabittir.',
      },
      step5_legislation: {
        applicableLaws: [
          '5996 sayılı Kanun Hayvan Sağlığı Hükümleri',
          'Hayvan Hastalıkları ile Mücadele ve Karantina Yönetmeliği',
          '6098 sayılı Türk Borçlar Kanunu Hayvan Satışında Ayıp md. 227',
          'HMK md. 266-287',
        ],
        legalArticles: 'TBK md. 227 gereği hayvanlarda kuluçka süresinde gizlenen hastalıklar teknik bilirkişi marifetiyle saptanır.',
        precedentNotes: 'Yargıtay 19. Hukuk Dairesi ilamında teslimden itibaren 9 gün içinde çıkan kuluçkalı hastalıkların gizli ayıp sayılacağı belirtilmiştir.',
      },
      step6_conclusion: {
        finalOpinion: `1. Satışı yapılan hayvanlarda kuluçka süresi teslim öncesine dayanan bulaşıcı şap hastalığı tespit edildiği,
2. İşletmede meydana gelen doğrudan telef ve süt gelir kaybı toplamının 1.177.400,00 TL mertebesinde hesaplandığı,
Takdir Mahkemenize ait olmak üzere arz olunur.`,
        answersToCourt: 'Ayıp gizli niteliktedir ve teslimden önce bulaşmıştır.',
        expertStatement: 'Tarafsızlık andımız doğrultusunda hazırlanmıştır.',
      },
      step7_signatures: {
        reportDate: '18.10.2025',
        expertName: 'Dr. Mustafa Kaya',
        expertTitle: 'Veteriner Hekim - Hayvan Sağlığı Uzmanı',
        expertRegistrationNo: 'Bilirkişilik Sicil No: 35-2016-0491',
        chamberMembership: 'İzmir Veteriner Hekimler Odası Sicil: 1204',
      },
    },
    checklistProgress: {
      c1_1: true, c1_2: true,
      c2_1: true, c2_2: true,
      c3_1: true,
      c4_1: true,
      c5_1: true,
    },
    attachments: [],
  },
];

export function createEmptyReport(field: ExpertField, expertName: string = 'Uzman Bilirkişi'): ExpertReport {
  const now = new Date().toISOString();
  return {
    id: `rep-${Date.now()}`,
    title: field === 'ziraat'
      ? 'Yeni Tarımsal Hasar ve Değer Tespiti Raporu'
      : field === 'gida'
      ? 'Yeni Gıda Güvenilirliği ve Hijyen Raporu'
      : 'Yeni Hayvancılık ve Değerleme Raporu',
    field,
    status: 'taslak',
    createdAt: now,
    updatedAt: now,
    steps: {
      step1_courtInfo: {
        courtName: '',
        fileNumber: '',
        caseType: '',
        plaintiff: '',
        defendant: '',
        subject: '',
        panelMembers: expertName,
      },
      step2_inspection: {
        inspectionDate: '',
        location: '',
        parcelInfo: '',
        attendees: '',
        observations: '',
      },
      step3_findings: {
        technicalFindings: '',
        damagePercentage: '',
        yieldData: '',
        sampleAnalysis: '',
        rawNotes: '',
      },
      step4_evaluation: {
        scientificMethod: '',
        calculationTable: '',
        causalityAnalysis: '',
        technicalConclusion: '',
      },
      step5_legislation: {
        applicableLaws: [
          '6100 sayılı Hukuk Muhakemeleri Kanunu md. 266-287',
          '6754 sayılı Bilirkişilik Kanunu',
        ],
        legalArticles: '',
        precedentNotes: '',
      },
      step6_conclusion: {
        finalOpinion: '',
        answersToCourt: '',
        expertStatement: 'İşbu teknik bilirkişi raporu tarafsızlık andımıza bağlı kalınarak hazırlanmış olup, takdir Sayın Mahkemenize ait olmak üzere saygıyla arz olunur.',
      },
      step7_signatures: {
        reportDate: new Date().toLocaleDateString('tr-TR'),
        expertName,
        expertTitle: field === 'ziraat' ? 'Ziraat Yüksek Mühendisi' : field === 'gida' ? 'Gıda Mühendisi' : 'Veteriner Hekim',
        expertRegistrationNo: '',
        chamberMembership: '',
      },
    },
    checklistProgress: {},
    attachments: [],
  };
}
