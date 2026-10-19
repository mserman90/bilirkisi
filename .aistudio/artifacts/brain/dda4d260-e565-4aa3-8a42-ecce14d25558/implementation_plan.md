# Bilirkişi Rapor Yazma Otomasyonu & Çalışma Alanı

Ziraat mühendisleri, gıda mühendisleri ve veteriner hekimler için tasarlanmış; resmî bilirkişilik standartlarına, 6754 sayılı Bilirkişilik Kanunu ve 6100 sayılı HMK hükümlerine tam uyumlu, öğretici rehberlik ve yapay zekâ destekli 7 adımlı rapor hazırlama çalışma alanı.

## User Review & Critical Decisions

> [!IMPORTANT]
> Kullanıcı ile yapılan netleştirme aşamasında teyit edilen kararlar ve mimari tercihler:

- **Confirmed Decision 1 (Yapay Zekâ Rolü)**: Yapay zekâ asistanı, raporda her adım için bağlama uygun teknik taslak metinler üretecek (`/api/draft`) ve yazılmış metinleri teknik tutarlılık, çelişki ve mevzuat açısından denetleyerek somut düzeltme önerileri (`/api/evaluate`) sunacak.
- **Confirmed Decision 2 (Dışa Aktarma Formatı)**: Hazırlanan raporlar tek tıkla düzenlenebilir resmî antetli Microsoft Word uyumlu (.doc/.docx) belge formatında indirilebilecek ve doğrudan tarayıcıdan UYAP/mahkeme standartlarında yazdırılabilir/PDF çıktısı alınabilecek.
- **Confirmed Decision 3 (Uzmanlık ve Kütüphane Kapsamı)**: Ziraat (kamulaştırma, ürün/zirai hasar, rekolte kaybı), Gıda (hijyen denetimi, bozulma/taklit-tağşiş, raf ömrü uyuşmazlığı) ve Hayvancılık (bulaşıcı hastalık/telef, damızlık vasıf tespiti, sürü değerlemesi) alanlarının tümü hazır mevzuat maddeleri, kontrol listeleri ve şablonlarla sunulacak.

---

## 1. Overview & Core Concept

- **What It Does**: Bilirkişilik görevi tevdi edilen ziraat, gıda ve veterinerlik uzmanlarının dosya bilgilerinden başlayarak keşif tutanağı, teknik tespitler, bilimsel gelir/hasar hesapları, mevzuat dayanağı ve nihai sonuç-kanaat bölümüne kadar eksiksiz ve hukuken geçerli raporlar hazırlamasını sağlar.
- **Target Audience / Persona**: Adli ve idari mahkemelerde görev alan ziraat mühendisleri, gıda mühendisleri, zooteknistler ve veteriner hekimler; özellikle ilk kez rapor hazırlayacak veya standart bir kurumsal şablon arayan uzmanlar.
- **Key Value**: Mahkemelerin bilirkişi raporlarında aradığı "açıklık, gerekçelendirme, bilimsel hesap ve mevzuat bağı" şartlarını öğretici kontrol listeleri ve AI desteğiyle güvenceye alır; rapor yazma süresini saatlerden dakikalara indirir.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Giriş ve Uzman Profili**: Bilirkişi sicil numarası, bağlı olunan Bölge Bilirkişilik Kurulu, mahkeme unvanı ve uzmanlık alanı ile çalışma alanına erişim.
2. **Rapor Deposu & Genel Bakış**: Devam eden taslaklar, incelemedeki dosyalar, tamamlanan ve arşivlenen raporlar. Alan ve duruma göre hızlı arama/filtreleme.
3. **7 Adımlı Akıllı Sihirbaz**:
   - `Adım 1: Görev ve Dava Bilgileri` (Mahkeme adı, dosya/esas no, uyuşmazlık konusu, taraflar, bilirkişi kurulu).
   - `Adım 2: İnceleme ve Keşif` (Keşif tutanağı tarihi, mahallin adresi/parseli, hazır bulunan taraflar, tespit edilen fiziki durum).
   - `Adım 3: Tespitler ve Bulgular` (Toprak/bitki yapısı, ürün kayıp oranı, gıda muayene bulguları, hayvan sağlık durumu).
   - `Adım 4: Teknik ve Bilimsel Değerlendirme` (Net gelir yöntemi, rekolte kaybı tablosu, hijyen standartları analizi, nedensellik bağı).
   - `Adım 5: Mevzuat ve Hukuki Dayanak` (6100 s. HMK md. 266-287, 6754 s. Bilirkişilik K., 5403 s. Toprak Koruma K., 5996 s. Veteriner & Gıda K., 2942 s. Kamulaştırma K.).
   - `Adım 6: Sonuç ve Kanaat` (Mahkemenin sorularına sarih ve gerekçeli cevap, kesin kanaat bildirimi).
   - `Adım 7: Ekler ve İmzalar` (Keşif fotoğrafları, laboratuvar sonuçları, tapu/kroki belgeleri yükleme, resmî imza bloğu).
4. **Öğretici Rehberlik Paneli**: Her adımda sağ tarafta beliren "Neden bu bölüm?", "Yargıtay ve Bilirkişilik Kurulu ilkeleri", "Sık yapılan hatalar", "Örnek mahkeme cümleleri" ve interaktif kontrol listesi.
5. **Yapay Zekâ Asistanı**: "Bu Bölüm İçin Taslak Yaz" butonu ile teknik dil üreten ve "Teknik ve Hukuki Denetim Yap" butonu ile eksik kalan noktaları listeleyen AI mekanizması.
6. **Mevzuat & Şablon Kütüphanesi**: Alan bazında filtrelenebilen kanun maddeleri, standart rapor iskeletleri, teknik formüller ve terimler sözlüğü.
7. **Dışa Aktarma**: Resmî antetli Microsoft Word (.docx formatında açılabilen temiz XML/HTML şablonu) ve doğrudan tarayıcı baskısına hazır mahkeme formatlı çıktı.

### Visual Identity & Theme
- **Aesthetic Direction**: Resmî, saygın, güven veren ve kâğıt dokusunu hissettiren çalışma tezgâhı (devlet dairesi ciddiyeti + modern öğretici araç).
- **Color Palette (60-30-10)**:
  - *Dominant Canvas (60%)*: Doğal kâğıt tonu `#FBF9F4` ve temiz çalışma yüzeyi `#FFFFFF`.
  - *Structural Surfaces (30%)*: Orman yeşili `#0F3D2E` (üst navigasyon ve marka kimliği), yumuşak zemin `#F1ECE1`, ince kenarlık `#E4DCCB`.
  - *Accent Budget (10%)*: Resmî kanun kenar notu ve uyarı rengi olan amber `#B45309`; uzmanlık alan rozetleri (Ziraat: `#15803D`, Gıda: `#B45309`, Hayvancılık: `#0E7490`).
- **Typography & Hierarchy**:
  - *Başlıklar*: `Fraunces` / serif yüksek kontrastlı evrak karakteri (H1: 32px, H2: 24px, H3: 18px).
  - *Gövde Metni*: `Public Sans` 15px / 1.7 satır yüksekliği (uzun hukuki metinlerin rahat okunması).
  - *Tablo, Sayı ve Kodlar*: `IBM Plex Mono` / tabular rakamlar (dosya numaraları, metrekare, kg/dekar verim ve maliyet hesapları).
- **Design Constitution Uyumu**:
  - Statik hap/pill kirliliği yok; üst barda tek satırlık temiz marka, 3-bölge kuralı.
  - Sahte telemetri, gereksiz animasyon veya yanıp sönen noktalar yasak.
  - Form ve veri odaklı, yüksek bilgi yoğunluklu ve erişilebilir arayüz.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: AI Model ve Entegrasyon Stratejisi
- **Chosen Approach**: Server-side Express API (`/api/draft` ve `/api/evaluate`) üzerinden modern `@google/genai` SDK ve `gemini-3.8-flash` modeli.
- **Why**: Hızlı yanıt süresi, mükemmel Türkçe hukuki/teknik terminoloji üretimi, güvenli API anahtarı saklama (`process.env.GEMINI_API_KEY`).
- **Alternatives Considered**: İstemci tarafında doğrudan AI çağrısı (güvenlik ve API anahtarı kuralları gereği yasaklandı).

### Decision 2: Veri Saklama ve Durum Yönetimi
- **Chosen Approach**: LocalStorage tabanlı güvenilir yerel durum deposu + hazır zengin şablonlar ile anında çalışan, sayfa yenilendiğinde kaybolmayan rapor yönetimi.
- **Why**: Kullanıcının internet kesintisinde bile yazdığı hiçbir paragrafın kaybolmaması, anlık otomatik kaydetme (auto-save) imkânı.

### Decision 3: Word ve Yazdırılabilir Çıktı Standardı
- **Chosen Approach**: Mahkeme standartlarında biçimlendirilmiş, kenar boşlukları ve antetli başlığı olan zengin HTML-to-Word (.doc/.docx MIME type) dışa aktarımı + CSS print-media uyumlu resmî çıktı.
- **Why**: Bilirkişiler hazırladıkları raporu UYAP'a yüklemeden önce genellikle Microsoft Word'de açıp e-imza veya ıslak imza atmaktadırlar.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            VITE REACT FRONTEND                              │
│                                                                             │
│  ┌───────────────┐  ┌────────────────────────────────────────────────────┐  │
│  │ Top Navigation│  │ AppShell (Wordmark, Nav Links, Uzman Profil Modalı)│  │
│  └───────┬───────┘  └─────────────────────────┬──────────────────────────┘  │
│          │                                    │                             │
│          ├───────────────────┬────────────────┴──────────────────┐          │
│          ▼                   ▼                                   ▼          │
│  ┌───────────────┐   ┌───────────────────────────┐   ┌───────────────────┐  │
│  │ Rapor Deposu  │   │     Rapor Sihirbazı       │   │Mevzuat Kütüphanesi│  │
│  │ (Filtre, CRUD,│   │ ┌───────────────────────┐ │   │(Kanunlar, Şablon, │  │
│  │ Arşiv, Durum) │   │ │ 7 Adımlı İlerleme Bar │ │   │ Terimler Sözlüğü) │  │
│  └───────────────┘   │ └───────────┬───────────┘ │   └───────────────────┘  │
│                      │ ┌───────────┴───────────┐ │                          │
│                      │ │  Aktif Bölüm Editörü  │ │                          │
│                      │ │  (Girdi + Auto-Save)  │ │                          │
│                      │ └───────────┬───────────┘ │                          │
│                      │ ┌───────────┴───────────┐ │                          │
│                      │ │ Öğretici Rehber Paneli│ │                          │
│                      │ │ & Kontrol Listesi     │ │                          │
│                      │ └───────────────────────┘ │                          │
│                      └─────────────┬─────────────┘                          │
│                                    │                                        │
│          ┌─────────────────────────┴─────────────────────────────┐          │
│          ▼                                                       ▼          │
│  ┌───────────────────────────────┐               ┌───────────────────────┐  │
│  │ Dışa Aktarma Motoru           │               │ Ek Dosya Yöneticisi   │  │
│  │ (Word .docx + Resmî Yazdır)   │               │ (Fotoğraf, Tutanak)   │  │
│  └───────────────────────────────┘               └───────────────────────┘  │
└────────────────────────────────────┬────────────────────────────────────────┘
                                     │
                                     │ HTTP POST (/api/draft, /api/evaluate)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     SERVER-SIDE API (Express / Vite Middleware)             │
│                                                                             │
│   ┌───────────────────────────────┐     ┌───────────────────────────────┐   │
│   │ /api/draft (Bölüm Taslağı)    │     │ /api/evaluate (Mevzuat Kontrol│   │
│   └──────────────┬────────────────┘     └──────────────┬────────────────┘   │
│                  │                                     │                    │
│                  └──────────────────┬──────────────────┘                    │
│                                     ▼                                       │
│                       GoogleGenAI (gemini-3.8-flash)                        │
│                       User-Agent: 'aistudio-build'                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Entities

```typescript
export type ExpertField = 'ziraat' | 'gida' | 'hayvancilik';
export type ReportStatus = 'taslak' | 'inceleniyor' | 'tamamlandi' | 'arsivlendi';

export interface ReportAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'analysis';
  size: string;
  uploadDate: string;
  description: string;
  previewUrl?: string;
}

export interface ReportStepData {
  step1_courtInfo: {
    courtName: string;
    fileNumber: string;
    caseType: string;
    plaintiff: string;
    defendant: string;
    subject: string;
    panelMembers: string;
  };
  step2_inspection: {
    inspectionDate: string;
    location: string;
    parcelInfo: string;
    attendees: string;
    observations: string;
  };
  step3_findings: {
    technicalFindings: string;
    damagePercentage?: string;
    yieldData?: string;
    sampleAnalysis?: string;
    rawNotes: string;
  };
  step4_evaluation: {
    scientificMethod: string;
    calculationTable: string;
    causalityAnalysis: string;
    technicalConclusion: string;
  };
  step5_legislation: {
    applicableLaws: string[];
    legalArticles: string;
    precedentNotes: string;
  };
  step6_conclusion: {
    finalOpinion: string;
    answersToCourt: string;
    expertStatement: string;
  };
  step7_signatures: {
    reportDate: string;
    expertName: string;
    expertTitle: string;
    expertRegistrationNo: string;
  };
}

export interface ExpertReport {
  id: string;
  title: string;
  field: ExpertField;
  status: ReportStatus;
  updatedAt: string;
  createdAt: string;
  steps: ReportStepData;
  checklistProgress: Record<string, boolean>;
  attachments: ReportAttachment[];
}
```

### Interactive Components & Verification Plan
1. **Rapor Sihirbazı**: Adım geçişleri, verilerin anlık kaydedilmesi, geri alma ve tamamlama doğrulaması.
2. **AI Bölüm Taslak Üretimi**: Dava ve keşif verilerini derleyip `gemini-3.8-flash` ile hukuki bilirkişi dilinde taslak metin üretme ve editöre tek tıkla aktarma.
3. **AI Mevzuat ve Teknik Denetim**: Girilen metindeki belirsizlikleri, HMK md. 279 gereği "hukuki nitelendirme yapmama" ilkesine uygunluğu kontrol etme.
4. **Mevzuat Kütüphanesi**: Kanun maddelerini arama, tek tıkla rapora dayanak olarak kopyalama.
5. **Ek Belge Yöneticisi**: Dosya ekleme, fotoğraf yükleme ve liste yönetimi.
6. **Word / Yazdır Dışa Aktarma**: Resmî antetli, tablosu ve imza bloğu olan kusursuz belge oluşturma.
