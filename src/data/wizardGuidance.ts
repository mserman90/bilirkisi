import { WizardGuidance } from '../types';

export const WIZARD_GUIDANCE: Record<number, WizardGuidance> = {
  1: {
    stepNumber: 1,
    title: 'Görev ve Dava Bilgileri',
    subtitle: 'Mahkeme künyesi, taraflar, dosya no ve uyuşmazlığın teknik özeti',
    whyThisStep: 'Bilirkişi raporunun hangi mahkemeye, hangi tensip veya ara kararına istinaden hazırlandığını belirler. HMK uyarınca yetki sınırlarınızı çizen en temel bölümdür.',
    principles: [
      'Mahkeme adı, esas numarası ve tarafların ad/unvanları dava dosyasındaki tensip tutanağı ile birebir aynı olmalıdır.',
      'Uyuşmazlık konusu, mahkemenin bilirkişiye tevdi ettiği görev sınırları dışına taşmayacak şekilde teknik bir özet olarak ifade edilmelidir.',
      'Varsa heyetteki diğer bilirkişilerin uzmanlık alanları (örn: Harita Kadastro Mühendisi, Mülk Bilirkişisi) belirtilmelidir.',
    ],
    commonMistakes: [
      'Dava türünü ve tarafları eksik veya hatalı yazmak.',
      'Mahkemenin sormadığı hukuki yorumları uyuşmazlık konusuna dahil etmek.',
      'Dosyaya sonradan eklenen ve bilirkişiye tebliğ edilmeyen iddiaları raporda esas almak.',
    ],
    samplePhrases: [
      'Sayın Mahkemenizin yukarıda esas numarası yazılı dava dosyasında ... tarihli celsede verilen ara karar uyarınca;',
      'Dava konusu uyuşmazlık; ... ili ... ilçesi sınırlarında kain taşınmazda meydana geldiği iddia olunan tarımsal hasarın ve meydana gelen verim kaybı bedelinin fen ve ziraat kuralları çerçevesinde saptanması talebine ilişkindir.',
      'Heyetimizce dava dosyası, taraf beyanları ve ekli deliller incelenerek işbu müşterek teknik rapor tanzim edilmiştir.',
    ],
    checklist: [
      { id: 'c1_1', stepNumber: 1, label: 'Mahkeme adı ve dosya esas numarası doğrulandı mı?', isCrucial: true, explanation: 'Dosya no uyuşmazlığı durumunda rapor mahkemece iade edilir.' },
      { id: 'c1_2', stepNumber: 1, label: 'Davacı ve davalı tam unvanları kontrol edildi mi?', isCrucial: true, explanation: 'Taraf sıfatlarının doğru yazılması zorunludur.' },
      { id: 'c1_3', stepNumber: 1, label: 'Mahkemenin bilirkişiden istediği soru/görev maddeleri sıralandı mı?', isCrucial: true, explanation: 'Tensip zaptındaki her soru raporda açıkça cevaplanacaktır.' },
      { id: 'c1_4', stepNumber: 1, label: 'Varsa heyet üyeleri ve uzmanlık dalları eklendi mi?', isCrucial: false, explanation: 'Heyet halinde görev yapılıyorsa imza blokları uyumlu olmalıdır.' },
    ],
  },
  2: {
    stepNumber: 2,
    title: 'İnceleme ve Keşif Bilgileri',
    subtitle: 'Keşif tarihi, mahallin adresi/parseli, hazır bulunanlar ve yapılan gözlemler',
    whyThisStep: 'Bilirkişilik Kanunu md. 11/2 uyarınca bilirkişi incelemeyi bizzat kendisi yürütmekle yükümlüdür. Mahallinde keşif yapıldığının ispatı bu bölümle kayda geçer.',
    principles: [
      'Keşif günü ve saati, keşfe iştirak eden mahkeme heyeti, zabıt katibi, taraf ve vekilleri eksiksiz yazılmalıdır.',
      'Keşif mahallinin tapu kaydı veya işletme tescil belgesi (İl/İlçe Tarım Bakanlığı ÇKS veya İşletme No) net belirtilmelidir.',
      'Keşif sırasındaki hava ve çevre koşulları, arazinin veya tesisin topoğrafik durumu objektif olarak kaydedilmelidir.',
    ],
    commonMistakes: [
      'Keşfe taraf vekillerinin katılıp katılmadığını belirtmemek (savunma hakkı itirazlarına yol açar).',
      'Taşınmazın ada/parsel bilgisini keşif tutanağıyla çelişkili yazmak.',
      'Mevsim ve fenolojik durum ile uyuşmayan soyut arazi tasvirleri yapmak.',
    ],
    samplePhrases: [
      'Sayın Mahkemeniz naip hâkimi/mahkeme heyeti huzurunda ... tarihinde saat ... sularında dava konusu taşınmaz mahallinde icra edilen keşfe iştirak edilmiş;',
      'Keşif esnasında davacı vekili Av. ... ve davalı asil ... hazır bulunmuş, mahallin sınırları bilirkişi marifetiyle yerinde tetkik edilmiştir.',
      'Yapılan yerinde incelemede; taşınmazın güney cepheli, %2-3 meyilli, killi-tınlı toprak yapısına haiz ve halihazırda ... ürününün ekili olduğu tespit edilmiştir.',
    ],
    checklist: [
      { id: 'c2_1', stepNumber: 2, label: 'Keşif tarihi ve saati mahkeme tutanağı ile eşleşiyor mu?', isCrucial: true, explanation: 'Keşif tutanağı adli delil niteliğindedir.' },
      { id: 'c2_2', stepNumber: 2, label: 'Keşifte hazır bulunanlar ve taraf vekilleri tek tek yazıldı mı?', isCrucial: true, explanation: 'Yoklukta yapılan işlemler için itiraz riskini önler.' },
      { id: 'c2_3', stepNumber: 2, label: 'Parsel/işletme koordinat veya adres bilgisi kaydedildi mi?', isCrucial: true, explanation: 'Doğru taşınmazın incelendiği kesinleşmelidir.' },
      { id: 'c2_4', stepNumber: 2, label: 'Keşif sırasındaki hava/fiziki koşullar not edildi mi?', isCrucial: false, explanation: 'Görüş açısı veya yağış durumu fen tespitini etkiler.' },
    ],
  },
  3: {
    stepNumber: 3,
    title: 'Tespitler ve Bulgular',
    subtitle: 'Maddi bulgular, hasar oranı, numune alma ve teknik ölçümler',
    whyThisStep: 'Raporun temel taşıdır. Bilimsel değerlendirmeye zemin teşkil edecek maddi vakıalar, fotoğraflar ve laboratuvar sonuçları bu aşamada tereddüte yer bırakmayacak biçimde ortaya konur.',
    principles: [
      'Tespitler sübjektif kanaat değil, somut ölçüm ve gözleme dayanmalıdır (Örn: "Bitkilerin tepe sürgünlerinde yanıklık, yapraklarda %40 kloroz").',
      'Varsa alınan toprak, bitki veya gıda numunelerinin parti numaraları, analiz yöntemleri ve tutanakları kaydedilmelidir.',
      'Zararın ve hasarın etkilediği alan metrekare ve yüzde olarak açıkça saptanmalıdır.',
    ],
    commonMistakes: [
      'Afaki hasar oranları yazmak (Örn: "Bir miktar zarar görülmüştür" gibi muğlak cümleler).',
      'Fotoğraf veya laboratuvar verisi göstermeden doğrudan sonuç yazmak.',
      'Çevre emsal parsellerle mukayese yapmamak.',
    ],
    samplePhrases: [
      'Dava konusu parselin 12.500 m²lik ekili alanında yapılan zikzak örnekleme ve 10 farklı noktada icra edilen fen tetkikinde;',
      'Bitkilerin vejetatif aksamında meydana gelen kloroz ve nekrotik lekeler sayılmış, ortalama rekolte kaybının %38 mertebesinde gerçekleştiği saptanmıştır.',
      'Toplu tüketim mahallinde alınan numunenin akredite laboratuvarda yapılan analizinde Türk Gıda Kodeksi E. coli sınırının aşıldığı tespit edilmiştir.',
    ],
    checklist: [
      { id: 'c3_1', stepNumber: 3, label: 'Ölçüm yapılan alan (m²/dekar) ve hasar yüzdesi rakamsal yazıldı mı?', isCrucial: true, explanation: 'Mahkeme hesaplamayı bu rakam üzerinden denetler.' },
      { id: 'c3_2', stepNumber: 3, label: 'Numune veya fotoğraf numaraları tespitlerle eşleştirildi mi?', isCrucial: true, explanation: 'Eklerdeki fotoğraflarla metin bağı kurulmalıdır.' },
      { id: 'c3_3', stepNumber: 3, label: 'Kullanılan ölçüm ve inceleme metodu (örnekleme şekli) belirtildi mi?', isCrucial: false, explanation: 'Bilimsel geçerlilik için örnekleme yöntemi şarttır.' },
      { id: 'c3_4', stepNumber: 3, label: 'Emsal/komşu parsel veya sağlam parti karşılaştırması yapıldı mı?', isCrucial: false, explanation: 'Bölgesel doğal faktörleri ayırt etmek için kıymetlidir.' },
    ],
  },
  4: {
    stepNumber: 4,
    title: 'Teknik ve Bilimsel Değerlendirme',
    subtitle: 'Hesap cetveli, net gelir yöntemi, rekolte kaybı ve nedensellik bağı',
    whyThisStep: 'Yargıtay denetiminin en sık yapıldığı bölümdür. Maddi tespitlerin matematiksel ve bilimsel bir hesap formülüne dönüştürüldüğü, neden-sonuç (illiyet) bağının kurulduğu yerdir.',
    principles: [
      'Zirai gelir hesaplarında İl Tarım ve Orman Müdürlüğü resmi dekar maliyet ve verim cetvelleri esas alınmalıdır.',
      'Kamulaştırma veya hasar hesaplarında münavebe ürünleri yöre teamülüne uygun olmalıdır (Örn: Buğday - Ayçiçeği - Mısır).',
      'Nedensellik bağı teknik olarak açıklanmalıdır: İddia olunan olay ile meydana gelen zarar arasındaki fiziksel bağlantı ispat edilmelidir.',
    ],
    commonMistakes: [
      'Resmi kurum verisi yerine piyasa spekülatif fiyatlarını kullanmak.',
      'Sulu arazi ile kuru arazi kapitalizasyon oranlarını (%4 ile %6) karıştırmak.',
      'Hukuki illiyet yerine sübjektif kanaat yazmak.',
    ],
    samplePhrases: [
      'Yargıtay 5. ve 8. Hukuk Dairelerinin istikrar kazanmış içtihatları gereğince taşınmazın net geliri aşağıdaki formül uyarınca hesaplanmıştır: Net Gelir = Brüt Gelir - Üretim Masrafları;',
      'İl Tarım ve Orman Müdürlüğü ... yılı resmi verilerine göre dekar başına verim 420 kg, ürün kg satış fiyatı ... TL, üretim masrafı ise ... TL olarak alınmıştır.',
      'Yapılan teknik inceleme sonucunda; taşınmazdaki verim düşüklüğü ile davalı şirketin iletim hattı hafriyatı arasında doğrudan illiyet bağı bulunduğu saptanmıştır.',
    ],
    checklist: [
      { id: 'c4_1', stepNumber: 4, label: 'Hesaplamada kullanılan resmi kurum (İl Tarım/TÜİK) verisi belirtildi mi?', isCrucial: true, explanation: 'Resmi veri kullanılmayan hesaplar Yargıtayca bozulur.' },
      { id: 'c4_2', stepNumber: 4, label: 'Dekar başı gelir, masraf ve net zarar açık matematiksel tablo halinde mi?', isCrucial: true, explanation: 'Hakimin ve tarafların kalemi kalemine denetleyebilmesi gerekir.' },
      { id: 'c4_3', stepNumber: 4, label: 'Hasar/olay ile meydana gelen netice arasında teknik illiyet kuruldu mu?', isCrucial: true, explanation: 'Zararın nedeni teknik olarak ispatlanmalıdır.' },
      { id: 'c4_4', stepNumber: 4, label: 'Varsa uygulanan kapitalizasyon faizi veya amortisman gerekçelendirildi mi?', isCrucial: false, explanation: 'Sulu/kuru arazi ayrımı kapitalizasyon faizini belirler.' },
    ],
  },
  5: {
    stepNumber: 5,
    title: 'Mevzuat ve Hukuki Dayanak',
    subtitle: 'İlgili kanun maddeleri, teknik yönetmelikler ve bilimsel standartlar',
    whyThisStep: 'Raporun hukuki meşruiyet zeminidir. Bilirkişinin hangi teknik yetki ve mevzuat kriterine dayanarak değerlendirme yaptığını mahkemeye gösterir.',
    principles: [
      'HMK md. 266-287 ve Bilirkişilik Kanunu 6754 ilkeleri hatırlatılmalıdır.',
      'Ziraat davalarında 5403 s. Toprak Koruma K. ve 2942 s. Kamulaştırma K. md. 11 zikredilmelidir.',
      'Gıda davalarında 5996 sayılı Kanun ve ilgili Türk Gıda Kodeksi Tebliği numarası yazılmalıdır.',
    ],
    commonMistakes: [
      'Mevzuat maddesini yanlış yorumlayıp hüküm kurmaya kalkışmak.',
      'Güncelliğini yitirmiş mülga tüzük veya kanun maddelerine atıf yapmak.',
      'Sadece kanun numarası yazıp hangi fıkrasının uygulandığını gerekçelendirmemek.',
    ],
    samplePhrases: [
      'İşbu raporun tanziminde 6100 sayılı Hukuk Muhakemeleri Kanunu\'nun 279. maddesi, 6754 sayılı Bilirkişilik Kanunu hükümleri ile;',
      '5403 sayılı Toprak Koruma ve Arazi Kullanımı Kanunu\'nun 3. ve 8. maddelerinde düzenlenen arazi vasıf ve sınıfları;',
      '2942 sayılı Kamulaştırma Kanunu\'nun 11/1-f maddesinde öngörülen net gelir metodolojisi ve Yargıtay yerleşik içtihatları esas alınmıştır.',
    ],
    checklist: [
      { id: 'c5_1', stepNumber: 5, label: 'HMK md. 279 gereğince hukuki nitelendirme yasağına riayet edildi mi?', isCrucial: true, explanation: 'Hakim yetkisine tecavüz raporu hükümsüz kılabilir.' },
      { id: 'c5_2', stepNumber: 5, label: 'Uyuşmazlık konusuna özel kanun ve yönetmelik maddeleri sıralandı mı?', isCrucial: true, explanation: 'Teknik değerlendirmenin yasal dayanağıdır.' },
      { id: 'c5_3', stepNumber: 5, label: 'Varsa ilgili Yargıtay ilamı veya teknik tebliğ numarası eklendi mi?', isCrucial: false, explanation: 'Raporun ikna kabiliyetini artırır.' },
    ],
  },
  6: {
    stepNumber: 6,
    title: 'Sonuç ve Kanaat',
    subtitle: 'Mahkemenin sorularına net, sarih ve gerekçeli nihai teknik cevaplar',
    whyThisStep: 'Hakimin hüküm fıkrasını oluştururken ilk okuyacağı özet bölümdür. Mahkemenin görevlendirme tensibindeki sorularına madde madde, rakamsal ve tereddütsüz yanıt verilmelidir.',
    principles: [
      'Mahkemenin tüm soruları eksiksiz ve açık bir dille yanıtlanmalıdır.',
      '"Takdir Sayın Mahkemenize ait olmak üzere" ibaresiyle sonuçlandırılmalıdır.',
      'Raporun diğer bölümlerindeki rakamlar ile sonuç bölümündeki nihai tutarlar kuruşu kuruşuna örtüşmelidir.',
    ],
    commonMistakes: [
      '"Haklı olan davacıya tazminat ödenmelidir" gibi hüküm fıkrası yazmak (Kesinlikle Yasaktır).',
      'Metin içindeki hesaplama ile sonuçtaki toplam tutarın farklı olması.',
      'Mahkemenin bir sorusunu cevapsız bırakıp ek rapor talebine sebep olmak.',
    ],
    samplePhrases: [
      'Dava dosyası, mahallinde icra edilen keşif, fen tespitleri ve resmi maliyet cetvelleri birlikte tetkik edildiğinde;',
      '1) Dava konusu ... ili ... parselde ekili ürünün maruz kaldığı zarar oranının %... mertebesinde olduğu,',
      '2) Net gelir kaybı yöntemine göre hesaplanan toplam maddi zarar bedelinin ... TL olduğu,',
      'Kanaatine varılmış olup, işbu teknik bilirkişi raporu Sayın Mahkemenizin yüksek takdirlerine saygıyla arz olunur.',
    ],
    checklist: [
      { id: 'c6_1', stepNumber: 6, label: 'Tensip zaptındaki her bir soru madde madde cevaplandı mı?', isCrucial: true, explanation: 'Eksik soru bırakılması ek rapora neden olur.' },
      { id: 'c6_2', stepNumber: 6, label: 'Nihai rakamlar (hasar bedeli, m² veya oran) net olarak yazıldı mı?', isCrucial: true, explanation: 'Tereddütlü ve muğlak rakamlardan kaçınılmalıdır.' },
      { id: 'c6_3', stepNumber: 6, label: '"Takdir Sayın Mahkemenize ait olmak üzere" ifadesi eklendi mi?', isCrucial: true, explanation: 'Resmi ve usuli saygı sınırını korur.' },
      { id: 'c6_4', stepNumber: 6, label: 'Hakim yerine geçerek hukuki hüküm kurma cümlesi içermediği doğrulandı mı?', isCrucial: true, explanation: 'Bilirkişilik Kanunu md. 3 ve HMK 279 güvencesidir.' },
    ],
  },
  7: {
    stepNumber: 7,
    title: 'Ekler ve İmzalar',
    subtitle: 'Keşif fotoğrafları, belgeler, imza bloğu ve teslim kontrolü',
    whyThisStep: 'Raporun adli geçerliliğini sağlayan ıslak/elektronik imza bloğu ve raporda atıfta bulunulan tüm delil belgelerinin fihristidir.',
    principles: [
      'Rapor tarihi güncel keşif ve teslim tarihine uygun olmalıdır.',
      'Bilirkişi unvanı, TMMOB Oda sicil no, Adalet Bakanlığı Bilirkişi Sicil No eksiksiz yazılmalıdır.',
      'Ekler numaralandırılarak fihrist halinde listelenmelidir (Ek-1, Ek-2 vb.).',
    ],
    commonMistakes: [
      'Bilirkişi sicil numarasını unutmak.',
      'Metin içinde bahsi geçen fotoğraf veya krokiyi eklere koymamak.',
      'Heyet raporunda diğer bilirkişilerin imza bloklarını açmamak.',
    ],
    samplePhrases: [
      'İşbu bilirkişi raporu 7 (yedi) ana bölümden ve ekli 4 adet delil belgesinden ibaret olup, tarafsızlık andımıza sadık kalınarak ... tarihinde Sayın Mahkemenize sunulmuştur.',
      'EK-1: Keşif Mahallinde Çekilen Renkli Fotoğraf Albümü (12 Adet)',
      'EK-2: İl Tarım ve Orman Müdürlüğü Resmi Üretim Maliyet Cetveli',
    ],
    checklist: [
      { id: 'c7_1', stepNumber: 7, label: 'Rapor tarihi kontrol edildi mi?', isCrucial: true, explanation: 'Mahkemenin verdiği süre sınırına uygunluk aranır.' },
      { id: 'c7_2', stepNumber: 7, label: 'Bilirkişi adı, unvanı ve sicil no doğru yazıldı mı?', isCrucial: true, explanation: 'Sicilsiz bilirkişi raporu kabul edilemez.' },
      { id: 'c7_3', stepNumber: 7, label: 'Rapora iliştirilen fotoğraflar ve ek belgeler numaralandırıldı mı?', isCrucial: true, explanation: 'Dosya düzeni ve Yargıtay incelemesi için elzemdir.' },
    ],
  },
};
