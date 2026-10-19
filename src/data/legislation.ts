import { LegislationItem } from '../types';

export const LEGISLATION_DATABASE: LegislationItem[] = [
  {
    id: 'hmk-6100',
    title: 'Hukuk Muhakemeleri Kanunu (HMK) - Bilirkişilik Hükümleri',
    lawNumber: '6100',
    category: 'genel',
    summary: 'Bilirkişinin atanması, inceleme yetkileri, tarafsızlık andı, raporun hazırlanması ve hukuki nitelendirme yasağını düzenleyen ana usul kanunudur.',
    keyArticles: [
      {
        articleNo: '266',
        heading: 'Bilirkişiye başvurulmasını gerektiren hâller',
        text: 'Mahkeme, çözümü hukuk dışında, özel veya teknik bilgiyi gerektiren hâllerde, taraflardan birinin talebi üzerine yahut kendiliğinden, bilirkişinin oy ve görüşünün alınmasına karar verir. Genel bilgi veya tecrübeyle ya da hâkimlik mesleğinin gerektirdiği hukukî bilgiyle çözümlenmesi mümkün olan konularda bilirkişiye başvurulamaz.',
      },
      {
        articleNo: '279/1',
        heading: 'Bilirkişi raporu ve hukuki nitelendirme yasağı',
        text: 'Bilirkişi, raporunda ve sözlü açıklamaları sırasında hukukî nitelendirme ve değerlendirmelerde bulunamaz. Yalnızca mahkemece sorulan teknik, bilimsel ve mesleki konulara açık ve net cevaplar verir.',
      },
      {
        articleNo: '281',
        heading: 'Bilirkişi raporuna itiraz',
        text: 'Taraflar, bilirkişi raporunun kendilerine tebliği tarihinden itibaren iki hafta içinde, raporda eksik veya belirsiz olan hususların bilirkişiye tamamlattırılmasını veya bilirkişiden ek rapor alınmasını yahut yeni bir bilirkişi incelemesi yaptırılmasını mahkemeden talep edebilirler.',
      },
    ],
    citationNote: 'HMK md. 279/1 amir hükmü gereğince raporda hâkimin yerine geçerek haklı/haksız veya tazminat yükümlülüğü gibi hukuki değerlendirmeler kesinlikle yapılmamalıdır.',
  },
  {
    id: 'bilirkisilik-6754',
    title: 'Bilirkişilik Kanunu ve Etik İlkeleri',
    lawNumber: '6754',
    category: 'genel',
    summary: 'Bilirkişilik görevinin yürütülmesinde uyulması zorunlu dürüstlük, tarafsızlık, bizzat inceleme yapma ve sır saklama yükümlülüklerini kapsar.',
    keyArticles: [
      {
        articleNo: '3',
        heading: 'Temel ilkeler',
        text: 'Bilirkişi, görevini dürüstlük, tarafsızlık ve bağımsızlık ilkeleri çerçevesinde yerine getirir. Bilirkişi, raporunda çözümü uzmanlığı gerektirmeyen konularda ve özellikle hukuki konularda görüş bildiremez.',
      },
      {
        articleNo: '11',
        heading: 'Bilirkişinin görev ve yetkileri',
        text: 'Bilirkişi, görevlendirildiği konuda kendisinden istenen hususlar hakkında inceleme yapar ve gerekçeli raporunu belirlenen sürede mahkemeye sunar.',
      },
    ],
    citationNote: 'Görev kapsamı dışına çıkılmamalı ve mahkemenin bilirkişi görevlendirme tensip zaptındaki sorular sırasıyla yanıtlanmalıdır.',
  },
  {
    id: 'toprak-koruma-5403',
    title: 'Toprak Koruma ve Arazi Kullanımı Kanunu',
    lawNumber: '5403',
    category: 'ziraat',
    summary: 'Tarımsal arazilerin sınıflandırılması (mutlak tarım, özel ürün arazisi, dikili ve marjinal tarım arazisi), asgari tarımsal arazi büyüklükleri ve amaç dışı arazi kullanımı incelemelerinde temel kanundur.',
    keyArticles: [
      {
        articleNo: '3',
        heading: 'Tanımlar ve Arazi Sınıfları',
        text: 'Mutlak tarım arazisi, özel ürün arazisi, dikili tarım arazisi, örtü altı tarım arazisi ve marjinal tarım arazisi tanımları teknik bilirkişi raporlarında harita ve toprak tahlil verilerine göre açıkça belirtilmelidir.',
      },
      {
        articleNo: '8',
        heading: 'Tarımsal arazilerin bölünemezliği',
        text: 'Asgari tarımsal arazi büyüklükleri belirlenmiş olup, tarımsal araziler bu büyüklüklerin altında ifraz edilemez, hisselendirilemez.',
      },
    ],
    citationNote: 'Taşınmazın zemin yapısı ve tarımsal vasfı 5403 sayılı Kanun tanımları ile tam örtüşecek şekilde sınıflandırılmalıdır.',
  },
  {
    id: 'kamulastirma-2942',
    title: 'Kamulaştırma Kanunu - Tarım Arazilerinde Değer Tespiti',
    lawNumber: '2942',
    category: 'ziraat',
    summary: 'Zirai arazilerde kamulaştırma bedelinin tespiti, ürün münavebe planı, dekar başına ortalama masraf ve net gelir metodunun uygulanması usullerini içerir.',
    keyArticles: [
      {
        articleNo: '11/1-f',
        heading: 'Arazi Değerlemesinde Net Gelir Esası',
        text: 'Arazilerde, kamulaştırma günündeki mevki ve şartlarına göre olduğu gibi kullanılması halinde getireceği net gelir üzerinden değer tespiti yapılır. Net gelir hesaplanırken İl/İlçe Tarım ve Orman Müdürlüğü resmi cari verileri esas alınır.',
      },
      {
        articleNo: '11/son',
        heading: 'Objektif Değer Artırıcı Unsurlar',
        text: 'Taşınmazın yerleşim yerine yakınlığı, ulaşım imkanları, sulama durumu ve lojistik kolaylıklar gerekçelendirilerek azami makul oranda objektif değer artışı uygulanabilir.',
      },
    ],
    citationNote: 'Yargıtay 5. Hukuk Dairesi yerleşik içtihatlarına göre münavebeye alınan ürünlerin ekim nöbeti yöre teamüllerine uygun olmalı ve kapitalizasyon faizi sulu/kuru duruma göre %4-%6 arasında seçilmelidir.',
  },
  {
    id: 'gida-ve-yem-5996',
    title: 'Veteriner Hizmetleri, Bitki Sağlığı, Gıda ve Yem Kanunu',
    lawNumber: '5996',
    category: 'gida',
    summary: 'Gıda ve yem güvenilirliği, gıda ile temas eden madde ve malzemeler, taklit ve tağşiş fiilleri ile resmi kontrol prosedürlerini düzenler.',
    keyArticles: [
      {
        articleNo: '21',
        heading: 'Gıda ve yemin güvenilirliği şartları',
        text: 'Güvenilir olmayan gıda ve yem piyasaya arz edilemez. Gıdanın insan sağlığına zararlı olup olmadığı veya tüketime uygunluğu analiz raporları ve sıcaklık zinciri kayıtları ile tespit edilir.',
      },
      {
        articleNo: '24',
        heading: 'Tüketici hakları ve yanıltıcı beyan yasağı',
        text: 'Gıdanın etiketlenmesi, sunumu ve tanıtımı tüketiciyi yanıltıcı olamaz. Taklit ve tağşiş yapılmış ürünlerin tespitinde Türk Gıda Kodeksi parametreleri bağlayıcıdır.',
      },
    ],
    citationNote: 'Gıda zehirlenmesi veya tağşiş davalarında numune alma tutanağının usulüne uygunluğu ve akredite laboratuvar analiz sonuçları mutlaka değerlendirilmelidir.',
  },
  {
    id: 'turk-gida-kodeksi',
    title: 'Türk Gıda Kodeksi Yönetmeliği ve Mikrobiyolojik Kriterler',
    lawNumber: 'TGK-2011',
    category: 'gida',
    summary: 'Gıdaların asgari hijyen şartları, katkı maddeleri, bulaşan limitleri ve mikrobiyolojik kabul edilebilirlik sınırlarını gösterir.',
    keyArticles: [
      {
        articleNo: '6',
        heading: 'Mikrobiyolojik Güvenlik Kriterleri',
        text: 'Salmonella, Listeria monocytogenes ve E. coli limitleri gibi patojen mikroorganizmaların yasal sınırları gıda güvenilirliği tespitinde esastır.',
      },
      {
        articleNo: '9',
        heading: 'Bulaşanlar ve Pestisit Kalıntı Limitleri',
        text: 'Maksimum Kalıntı Limiti (MRL) üzerinde pestisit veya kimyasal içeren ürünler imha veya iade işlemine tabi tutulur.',
      },
    ],
    citationNote: 'Analiz sonuçlarındaki sapmalar Türk Gıda Kodeksi standart değer tablosu ile kıyaslanarak sunulmalıdır.',
  },
  {
    id: 'hayvan-sagligi-5996',
    title: 'Hayvan Sağlığı, Refahı ve Değerleme Mevzuatı',
    lawNumber: '5996-H',
    category: 'hayvancilik',
    summary: 'Damızlık vasıf tespiti, bulaşıcı hayvan hastalıklarında karantina ve itlaf prosedürleri, hayvan refahı ihlalleri ve sürü değer kayıpları esasları.',
    keyArticles: [
      {
        articleNo: '4',
        heading: 'Bulaşıcı hayvan hastalıkları ile mücadele',
        text: 'İhbarı mecburi hastalıklarda resmi veteriner hekim tutanakları, karantina kararları ve itlaf tazminat cetvelleri dosya kapsamında aranır.',
      },
      {
        articleNo: '9',
        heading: 'Hayvan refahı standartları',
        text: 'Nakil, kesim ve barınma koşullarında asgari hayvan refahı kurallarına uyulmaması sonucu meydana gelen kilo/verim kayıpları teknik olarak ölçülebilir.',
      },
    ],
    citationNote: 'Büyükbaş ve küçükbaş değer tespitlerinde ırk, yaş, süt/et verimi laktasyon dönemi ve Türkiye Damızlık Yetiştiricileri Merkez Birliği resmi bültenleri referans alınmalıdır.',
  },
];

export const EXPERT_GLOSSARY = [
  { term: 'Münavebe Planı', field: 'Ziraat', def: 'Aynı toprak üzerinde farklı kültür bitkilerinin belirli bir sıra ve nöbetleşe ekilmesidir; gelir hesabında 3-4 yıllık münavebe ortalaması alınır.' },
  { term: 'Kapitalizasyon Faizi', field: 'Ziraat', def: 'Tarımsal taşınmazın net gelirinden taşınmazın çıplak arazi değerine geçişte kullanılan indirgeme oranıdır (Sulu arazide %4-5, kuru arazide %5-6).' },
  { term: 'Objektif Değer Artışı', field: 'Ziraat', def: 'Kamulaştırma Kanunu 11. maddesi uyarınca taşınmazın pazara, yerleşime yakınlığı gibi özel üstünlükleri nedeniyle net gelir değerine eklenen makul katsayıdır.' },
  { term: 'Fenolojik Aşama', field: 'Ziraat', def: 'Bitkinin mevsimsel gelişim evreleridir (çimlenme, kardeşlenme, başaklanma, çiçeklenme, hasat); hasarın zamanlaması için kritiktir.' },
  { term: 'Taklit ve Tağşiş', field: 'Gıda', def: 'Gıda maddesinin şekil ve bileşim itibarıyla aslına benzetilmesi veya içerisine mevzuata aykırı ucuz/yabancı maddeler katılarak kalitesinin düşürülmesidir.' },
  { term: 'Soğuk Zincir Kırılması', field: 'Gıda', def: 'Çabuk bozulan gıdaların üretimden tüketime kadar +4°C veya -18°C gibi belirlenen sıcaklık sınırlarının dışına çıkıp bozulmaya uğramasıdır.' },
  { term: 'Damızlık Değeri', field: 'Hayvancılık', def: 'Bir hayvanın genetik kapasitesi, soy kütüğü kayıtları, laktasyon süt verimi ve döl tutma kabiliyetiyle ölçülen üstün pazar değeridir.' },
  { term: 'Zorunlu Kesim / Telef', field: 'Hayvancılık', def: 'Kaza veya telafisi imkansız hastalık nedeniyle ekonomik değer kaybını önlemek amacıyla yapılan mecburi kesim veya ölüm olgusudur.' },
  { term: 'HMK 279/1 İlkesi', field: 'Genel', def: 'Bilirkişinin hakim gibi davranıp hukuki uyuşmazlığı karara bağlamasını yasaklayan, sadece teknik görüş bildirmesini emreden kuraldır.' },
];
