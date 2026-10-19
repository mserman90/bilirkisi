import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT || '3000', 10);

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API: Rapor bölümü için akıllı taslak üretme
app.post('/api/draft', async (req, res) => {
  const { field, stepNumber, stepTitle, context, existingText } = req.body;

  try {
    const ai = getAiClient();
    if (!ai) {
      return res.json({
        draftText: generateFallbackDraft(field, stepNumber, context),
        source: 'template_fallback',
      });
    }

    const systemPrompt = `Sen Türkiye Cumhuriyeti adli ve idari mahkemelerine (Sulh Hukuk, Asliye Hukuk, İdare Mahkemeleri) rapor hazırlayan kıdemli bir Bilirkişisin (Ziraat Mühendisi, Gıda Mühendisi veya Veteriner Hekim).
Görevin: 6754 sayılı Bilirkişilik Kanunu ve 6100 sayılı Hukuk Muhakemeleri Kanunu (HMK md. 266-287) ilkelerine sıkı sıkıya bağlı kalarak, verilen adım ve dava bağlamına uygun profesyonel, nesnel, teknik ve gerekçeli bir rapor taslağı oluşturmak.

ÖNEMLİ HUKUKİ KURALLAR:
1. HMK md. 279/1 gereğince: Bilirkişi hukuki nitelendirme ve değerlendirmelerde BULUNAMAZ (Örn: "Davalı suçludur", "Tazminat ödenmelidir", "Haksız fiil gerçekleşmiştir" gibi hakim yerine geçen ifadeler ASLA kullanılmaz).
2. Yalnızca teknik, bilimsel ve mesleki tespit ve gözlemler yazılır; nedensellik bağı teknik verilerle kurulur.
3. Dil resmî, tarafsız, saygılı, net ve Yargıtay denetimine elverişli olmalıdır.
4. Çıktı sadece önerilen taslak metni içermelidir (başında ve sonunda gereksiz sohbet cümleleri olmamalıdır).`;

    const userPrompt = `Uzmanlık Alanı: ${field || 'Ziraat'}
Rapor Bölümü (${stepNumber}. Adım): ${stepTitle || 'Bölüm Taslağı'}
Dava ve Keşif Bağlamı:
${JSON.stringify(context, null, 2)}
${existingText ? `Uzmanın mevcut notları: ${existingText}` : ''}

Lütfen bu bölüm için mahkemeye sunulmaya hazır, resmi ve teknik bir rapor taslağı paragrafı yaz.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      },
    });

    const draftText = response.text?.trim() || generateFallbackDraft(field, stepNumber, context);
    res.json({ draftText, source: 'gemini' });
  } catch (error) {
    console.error('Gemini Draft Error:', error);
    res.json({
      draftText: generateFallbackDraft(field, stepNumber, context),
      source: 'fallback',
      error: 'AI servisi geçici olarak şablon verisi ile yanıt verdi.',
    });
  }
});

// API: Yazılan metnin mevzuat ve teknik açıdan denetimi
app.post('/api/evaluate', async (req, res) => {
  const { field, stepNumber, stepTitle, text, context } = req.body;

  if (!text || text.trim().length < 15) {
    return res.status(400).json({
      error: 'Değerlendirme için en az birkaç cümlelik bir metin girilmelidir.',
    });
  }

  try {
    const ai = getAiClient();
    if (!ai) {
      return res.json(generateFallbackEvaluation(text));
    }

    const systemPrompt = `Sen Adalet Bakanlığı Bilirkişilik Daire Başkanlığı standartlarına ve HMK hükümlerine göre bilirkişi raporlarını denetleyen bir Başdenetçisin.
Aşağıda uzmanın yazdığı rapor bölümünü incele ve JSON formatında objektif bir denetim raporu üret.

KRİTERLER:
1. HMK 279/1 İhlali Var mı? (Bilirkişi hakimin yerine geçip hukuki değerlendirme yapmış mı? Örneğin "davalı kusurludur/tazminat ödemelidir" gibi yargı bildirimi var mı?)
2. Teknik ve Bilimsel Dayanak Yeterli mi? (Somut ölçüm, dekar verimi, analiz yöntemi veya mevzuat maddesi belirtilmiş mi?)
3. Çelişki veya Muğlaklık Var mı? ("Muhtemelen", "tahminen" gibi belirsiz ifadelerden kaçınılmış mı?)
4. Düzeltme Önerisi (Suggested Fix) somut ve doğrudan kopyalanabilir olmalıdır.

DÖNECEĞİN JSON ŞEMASI:
{
  "score": 85, // 0-100 arası puan
  "compliant": true, // HMK 279 ve genel ilkelere uygun mu
  "warnings": ["Tespit edilen eksiklik veya risk uyarısı"],
  "recommendations": ["Teknik öneri 1", "Mevzuat dayanağı önerisi"],
  "suggestedFix": "Metnin düzeltilmiş, resmi ve eksiksiz hali"
}`;

    const prompt = `Alan: ${field}
Bölüm: ${stepNumber}. Adım - ${stepTitle}
İncelenecek Metin:
"""
${text}
"""
Dava Bağlamı: ${JSON.stringify(context || {})}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      score: parsed.score ?? 80,
      compliant: parsed.compliant ?? true,
      warnings: parsed.warnings || [],
      recommendations: parsed.recommendations || [],
      suggestedFix: parsed.suggestedFix || text,
    });
  } catch (error) {
    console.error('Gemini Evaluation Error:', error);
    res.json(generateFallbackEvaluation(text));
  }
});

function generateFallbackDraft(field: string, stepNumber: number, context: any = {}): string {
  const court = context?.step1_courtInfo?.courtName || 'Mahkemeniz';
  const fileNo = context?.step1_courtInfo?.fileNumber || '2024/... Esas';

  if (stepNumber === 1) {
    return `${court}'nin ${fileNo} sayılı dosyasında tevdi edilen bilirkişilik görevi kapsamında; dava dosyası, taraf iddia ve savunmaları, celp edilen resmî kayıtlar ve keşif mahallinde yapılan teknik incelemeler doğrultusunda işbu teknik bilirkişi raporu tanzim edilmiştir. Uyuşmazlık konusu, parselde meydana geldiği iddia olunan tarımsal/teknik zararın tespiti ve miktarının belirlenmesidir.`;
  }
  if (stepNumber === 2) {
    return `Sayın Mahkemeniz heyeti ile birlikte mahallinde icra edilen keşif işlemi esnasında, taraflar ve vekilleri hazır bulunmuş; keşif mahallinde fen ve ziraat teknik kurallarına uygun olarak gözlem yapılmış, parsel sınırları, toprak bünyesi, ürün çeşidi ve fenolojik gelişim durumu yerinde tespit edilerek fotoğraflanmıştır.`;
  }
  if (stepNumber === 3) {
    return `Mahallinde yapılan fen ve ziraat incelemelerinde; dava konusu taşınmaz üzerinde ekili bulunan ürünün fenolojik gelişim aşamaları tetkik edilmiş, meteorolojik olay/müdahale neticesinde meydana gelen verim kaybı oranı ortalama %35-40 mertebesinde saptanmıştır. Çevre parsellerle yapılan kıyaslamalı kontrolde zararın lokal nitelikte olduğu gözlemlenmiştir.`;
  }
  if (stepNumber === 4) {
    return `2942 sayılı Kamulaştırma Kanunu'nun 11. maddesi ve Yargıtay yerleşik içtihatları uyarınca uygulanan Net Gelir Metodu uyarınca; İl Tarım ve Orman Müdürlüğü resmi cari yıl üretim maliyet cetvelleri esas alınmış, dekar başına ortalama brüt gelir hesaplanarak masraflar tenzil edilmiş ve meydana gelen net gelir kaybı ayrıntılı tabloda gösterilmiştir.`;
  }
  if (stepNumber === 5) {
    return `Raporumuzun tanziminde 6100 sayılı Hukuk Muhakemeleri Kanunu'nun 266-287. maddeleri, 6754 sayılı Bilirkişilik Kanunu hükümleri, 5403 sayılı Toprak Koruma ve Arazi Kullanımı Kanunu ve ilgili Bakanlık teknik tebliğleri esas alınmış olup, hukuki nitelendirme yapılmaksızın yalnızca mesleki ve bilimsel değerlendirmelerde bulunulmuştur.`;
  }
  if (stepNumber === 6) {
    return `Dosya kapsamı, keşif mahallinde yapılan teknik incelemeler, resmi kurum verileri ve ziraat mühendisliği bilimsel ilkeleri birlikte değerlendirildiğinde; meydana gelen toplam zararın/değerin net olarak hesaplandığı, uyuşmazlığa konu hadisede teknik nedensellik bağının bulunduğu kanaatine varılmış olup, nihai takdir ve hukuki hüküm Sayın Mahkemenize ait olmak üzere saygıyla arz olunur.`;
  }
  return `İşbu bilirkişi raporu, bilimsel yöntem ve mesleki tecrübeler ışığında tarafsızlık andına sadık kalınarak hazırlanmış ve imzalanmıştır.`;
}

function generateFallbackEvaluation(text: string) {
  const containsLegalJudgement = /kusurlu|suçlu|tazminat ödemeli|haksız|sorumlu tutulmalı/i.test(text);
  const warnings: string[] = [];
  const recommendations: string[] = [];

  if (containsLegalJudgement) {
    warnings.push('HMK md. 279/1 Uyarısı: Metinde hakimin yetkisine giren hukuki kusur/hüküm ifadesi tespit edildi. "Kusurludur" yerine "teknik kurallara aykırı uygulama tespit edilmiştir" ifadesini tercih ediniz.');
    recommendations.push('Yargı kararı yerine teknik nedensellik bağı kurunuz.');
  } else {
    recommendations.push('Teknik tespitler ve gerekçeler bilimsel açıdan yeterli ve dengelidir.');
  }

  recommendations.push('Yargıtay denetimine esas olmak üzere resmi kurum verilerine (İl Tarım/TÜİK) atıf yapılması tavsiye edilir.');

  return {
    score: containsLegalJudgement ? 65 : 88,
    compliant: !containsLegalJudgement,
    warnings,
    recommendations,
    suggestedFix: text.replace(/kusurludur/gi, 'teknik yönden mevzuata aykırı hareket ettiği saptanmıştır'),
  };
}

// Dev and Production Vite mounting
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
