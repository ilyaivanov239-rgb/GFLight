// components/projects.ts
import type { Lang } from './i18n';

// Хелпер: /projects/<slug>/1.jpg ... /N.jpg
const seq = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/projects/${slug}/${i + 1}.jpg`);

export type Project = {
  slug: string;                 // используется в URL
  cover: string;                // обложка (hero)
  images: string[];             // галерея
  title: Record<Lang, string>;  // заголовок
  blurb: Record<Lang, string>;  // короткое описание (карточка)
  desc?: Record<Lang, string>;  // развёрнутое описание (опционально)
};

// Порядок в массиве == порядок показа на главной
export const PROJECTS: Project[] = [
  {
    slug: 'restaurant',
    cover: '/projects/restaurant/cover.jpg',
    images: seq('restaurant', 8), // есть 1..8.jpg
    title: {
    ru: 'Проект освещения ресторана',
    en: 'Restaurant lighting project',
    pt: 'Projeto de iluminação do restaurante',
  },
  blurb: {
    ru: 'Атмосферная подсветка залов, акценты на текстурах и высокий визуальный комфорт.',
    en: 'Atmospheric lighting with texture accents and high visual comfort.',
    pt: 'Iluminação atmosférica com acentos nas texturas e alto conforto visual.',
  },
  // <<< ВАЖНО: длинные тексты — ТОЛЬКО в бектиках >>>
  desc: {
    ru: [
      'Освещение в этом ресторане — это не просто свет, а часть истории. Мы создавали его с мыслью о том, чтобы каждый гость чувствовал себя особенным, а пространство — роскошным, но уютным.',
      '',
      'Главная цель была в том, чтобы сделать так, чтобы всё выглядело дорого и элегантно. Для этого мы использовали закарнизную подсветку, которая подчеркивает лепной декор и показывает всю величественность потолков.',
      '',
      'Хрустальные люстры дают мягкий, тёплый свет, создавая интимную, чувственную атмосферу. Но ключевой элемент — акцентное освещение с фреймингом. Оно словно прожекторы на сцене, выделяет каждый стол, превращая посуду, серебро и цветы в настоящие арт-объекты.',
      '',
      'Такой свет не слепит, он делает фотографии «инстаграмными», а еду — невероятно аппетитной. Гости чувствуют себя комфортно, а архитектура зала смотрится выразительно, но не теряет своей изысканности.',
    ].join('\n'),
    en: [
  'Lighting in this restaurant is not just light — it is part of the story. We designed it so that every guest feels special, and the space feels luxurious yet cosy.',
  'The main goal was to make everything look refined and expensive. To achieve this we used concealed cove lighting that highlights the plaster mouldings and reveals the full grandeur of the ceilings.',
  'Crystal chandeliers provide a soft, warm glow, creating an intimate, sensual ambience. But the key element is the accent framing light: like stage spotlights, it singles out each table and turns the tableware, silver and flowers into true art objects.',
  '',
  'This light does not dazzle; it makes photos Instagram-worthy and the food irresistibly appetising. Guests feel comfortable, and the hall’s architecture looks expressive without losing its sophistication.',
].join('\n'),

pt: [
  'A iluminação deste restaurante não é apenas luz — é parte da história. Concebemo-la para que cada cliente se sinta especial e o espaço pareça luxuoso e, ao mesmo tempo, acolhedor.',
  'O objetivo principal foi que tudo tivesse um aspeto elegante e de alto nível. Para isso utilizámos iluminação embutida/indireta (luz de sancas) que realça os estuques e revela toda a imponência dos tetos.',
  'Os lustres de cristal dão uma luz suave e quente, criando um ambiente íntimo e envolvente. Mas o elemento-chave é a iluminação de acento com framing: como refletores de palco, destaca cada mesa e transforma a loiça, a prata e as flores em verdadeiros objetos de arte.',
  '',
  'Esta luz não encandeia; torna as fotos dignas de Instagram e a comida irresistivelmente apetitosa. Os convidados sentem-se confortáveis e a arquitetura da sala fica expressiva sem perder a sua sofisticação.',
].join('\n'),

 }},
  {
    slug: 'cosmonautics',
    cover: '/projects/cosmonautics/cover.jpg',
    images: seq('cosmonautics', 7),
    title: { ru: 'Музей космонавтики', en: 'Museum of Cosmonautics', pt: 'Museu da Cosmonáutica' },
    blurb: {
      ru: 'Экспозиции высотой до 15 м, узкая оптика 6° — эффект «лунного света» и читаемые тени.',
      en: 'Up to 15 m exhibits, 6° optics — a “moonlight” effect with readable contrast.',
      pt: 'Exposições até 15 m, óptica de 6° — efeito “luz da lua” com contraste legível.',
    },
    desc: {
  ru: [
    'Чтобы выделить каждый экспонат и придать всей экспозиции "космический" вид, мы использовали узконаправленные прожекторы, размещённые на большой высоте — от 12 до 15 метров. Холодный свет с цветовой температурой 4000K позволил создать глубокие, отчётливые тени, напоминающие солнечный свет в открытом космосе.',
    '',
    'Спутники, подвешенные на разной высоте, должны были одинаково хорошо смотреться со всех четырёх уровней пандуса: с пола, с 4, 7 и 11 метров. Чтобы решить эту задачу, мы использовали множество точек подсветки с разных уровней, а пересекающиеся лучи позволяли выделить каждый объект, не слепя посетителей. Точная оптика и адресное диммирование позволили создать единый световой облик, несмотря на масштабную высоту и сложность экспозиции.',
    '',
    'В результате, благодаря смешению естественного и искусственного освещения, каждый экспонат был подсвечен отдельно, но при этом гармонично вписался в общую композицию. Это позволило создать запоминающийся и живой образ, который подчёркивает значимость и технологичность целой эпохи.',
  ].join('\n'),
  en: [
  'To highlight each exhibit and give the entire display a “cosmic” look, we used narrow-beam spotlights installed high above—12 to 15 meters. The cool 4000K light created deep, crisp shadows reminiscent of sunlight in open space.',
  '',
  'Satellites suspended at different heights had to read equally well from all four ramp levels: from the floor and from 4, 7 and 11 meters. To achieve this we used many lighting points from different levels; crossing beams picked out each object without dazzling visitors. Precise optics and addressable dimming produced a unified lighting identity despite the great height and complexity of the display.',
  '',
  'As a result, by mixing natural and artificial light, every exhibit was lit individually yet blended harmoniously into the overall composition. This created a memorable, vivid image that underscores the significance and technological character of an entire era.',
].join('\n'),

pt: [
  'Para destacar cada peça e dar à exposição um aspeto “cósmico”, utilizámos projetores de feixe estreito instalados a grande altura — entre 12 e 15 metros. A luz fria de 4000 K criou sombras profundas e nítidas, semelhantes à luz solar no espaço aberto.',
  '',
  'Os satélites suspensos a diferentes alturas tinham de ser percecionados igualmente bem a partir dos quatro níveis da rampa: do piso e dos 4, 7 e 11 metros. Para isso, utilizámos muitos pontos de luz em diferentes níveis; os feixes cruzados destacavam cada objeto sem ofuscar os visitantes. Ótica precisa e dimerização endereçável permitiram criar uma linguagem luminosa unificada, apesar da grande altura e da complexidade da exposição.',
  '',
  'Como resultado, graças à mistura de luz natural e artificial, cada peça foi iluminada individualmente, mas integrou-se de forma harmoniosa na composição geral. Isto criou uma imagem marcante e viva que sublinha a importância e o caráter tecnológico de toda uma época.',
].join('\n'),

}},
  {
  slug: 'onepoint',
  cover: '/projects/onepoint/cover.jpg',
  images: [
    '/projects/onepoint/1.jpg',
    '/projects/onepoint/2.jpg',
    '/projects/onepoint/3.jpg',
    '/projects/onepoint/4.jpg',
    '/projects/onepoint/5.jpg',
    '/projects/onepoint/6.jpg',
    '/projects/onepoint/7.jpg',
    '/projects/onepoint/8.jpg',
    '/projects/onepoint/9.jpg',
    // добавь остальные, если есть
  ],
  title: {
    ru: 'Бьюти-коворкинг',
    en: 'Beauty Coworking',
    pt: 'Coworking de Beleza',
  },
  // краткий анонс можно оставить пустым, мы его на карточке больше не показываем
  blurb: {
    ru: '',
    en: '',
    pt: '',
  },
  // длинное описание (то, что показываем вверху модалки) — по желанию
  desc: {
  ru: `При проектировании освещения для бьюти-коворкинга основной задачей было создание идеальных условий для работы мастеров. Главным требованием стала высокая степень цветопередачи (CRI не ниже 95), чтобы при окрашивании волос, макияже или маникюре цвета выглядели максимально естественно, как при дневном свете.

Мы подобрали светильники, которые не только обеспечивают достаточную освещённость для точной работы, но и имеют комфортные углы засветки, исключающие блики. Для этого в прожекторах мы использовали хоникомбы, которые создают визуальный комфорт. Подвесные светильники с матовым стеклом дают мягкий, рассеянный свет, который заполняет пространство, делая его более уютным. Для каждой рабочей зоны — будь то парикмахерское кресло, стол для маникюра или зона визажиста — свет был настроен с учётом специфики, обеспечивая оптимальное освещение поверхностей, полок и шкафов.

В итоге, каждый элемент освещения гармонично дополняет друг друга, создавая не просто функциональное, но и эстетически привлекательное пространство, где каждый чувствует себя комфортно.`,
  en: `When designing the lighting for a beauty co-working space, the main task was to create perfect conditions for the professionals. The key requirement was a high colour rendering index (CRI of at least 95) so that hair colouring, make-up and manicure tones look as natural as they do in daylight.

We selected luminaires that not only provide sufficient illuminance for precise work, but also have comfortable cut-off angles to eliminate glare. For the spotlights we used honeycombs to increase visual comfort. Pendant fixtures with matte glass deliver soft, diffused light that fills the space and makes it feel more welcoming. For every work area—whether a hairdresser’s chair, a manicure desk or a make-up station—the lighting was tuned to its specifics, ensuring optimal illumination of surfaces, shelves and cabinets.

As a result, every lighting element complements the others, creating not just a functional but also an aesthetically pleasing environment where everyone feels comfortable.`,
 pt: `Ao projetar a iluminação para um espaço de co-working de beleza, a principal tarefa foi criar condições ideais para os profissionais. O requisito principal foi um elevado índice de reprodução de cor (CRI de pelo menos 95), para que as cores em coloração de cabelo, maquilhagem ou manicure pareçam o mais naturais possível, como à luz do dia.

Selecionámos luminárias que não só garantem iluminância suficiente para um trabalho preciso, como também apresentam ângulos de cut-off confortáveis, eliminando o encandeamento. Nos projetores utilizámos honeycombs (colmeias) para aumentar o conforto visual. As luminárias suspensas com vidro mate fornecem uma luz suave e difusa que preenche o espaço, tornando-o mais acolhedor. Para cada zona de trabalho — seja a cadeira de cabeleireiro, a mesa de manicure ou a área de maquilhagem — a luz foi ajustada às suas especificidades, assegurando iluminação ideal de superfícies, prateleiras e armários.

Como resultado, cada elemento de iluminação complementa os demais, criando não apenas um espaço funcional, mas também esteticamente agradável, onde todos se sentem confortáveis.`,

},

},
  {
    slug: 'globalone',
    cover: '/projects/globalone/cover.jpg',
    images: seq('globalone', 8),
    title: { ru: 'Офис GlobalOne', en: 'GlobalOne Office', pt: 'Escritório GlobalOne' },
    blurb: {
      ru: 'Функциональная офисная световая среда: равномерность, акценты и комфорт UGR.',
      en: 'Functional office lighting: uniformity, accents and comfortable UGR.',
      pt: 'Iluminação funcional: uniformidade, acentos e conforto UGR.',
    },
    desc: {
  ru: `При создании освещения для этого офиса мы ставили задачу не только обеспечить функциональность, но и создать уникальную атмосферу, подчёркивающую его статус. Светодинамическая инсталляция Philips над столом руководителя сразу приковывает взгляд, создавая "вау-эффект" и становясь центром всего пространства.

Для максимального визуального комфорта были выбраны светильники с оптикой Dark-Light. Несмотря на высокую освещённость, они кажутся выключенными, что полностью устраняет слепящий эффект и позволяет создать идеальную рабочую среду. Чтобы сохранить единый дизайн, мы использовали светильники одной формы и размера, но с разной оптикой: овальной — для длинных коридоров, Wallwasher — для подсветки картин, и Spot/Narrowspot — для расстановки акцентов.

В итоге, нам удалось гармонично сочетать эстетику и функциональность, создав профессиональную, но при этом комфортную и запоминающуюся атмосферу, которая полностью соответствует уровню компании.`,
  en: `When designing the lighting for this office, our goal was not only to ensure functionality but also to create a unique atmosphere that underlines its status. The Philips dynamic-lighting installation above the executive desk immediately catches the eye, creating a “wow” effect and becoming the focal point of the whole space.

For maximum visual comfort we selected luminaires with Dark-Light optics. Despite the high illuminance, they appear almost switched off, which completely eliminates glare and provides an ideal working environment. To preserve a unified design, we used fixtures of the same shape and size but with different optics: oval for long corridors, wallwasher for illuminating artworks, and spot/narrow spot to place accents.

As a result, we managed to harmoniously combine aesthetics and functionality, creating a professional yet comfortable and memorable atmosphere that fully matches the company’s level.`,

  pt: `Ao conceber a iluminação deste escritório, o objetivo foi não só garantir a funcionalidade, mas também criar uma atmosfera única que realçasse o seu estatuto. A instalação de luz dinâmica da Philips sobre a secretária do diretor atrai imediatamente o olhar, gera um “efeito wow” e torna-se o ponto focal de todo o espaço.

Para máximo conforto visual, optámos por luminárias com ótica Dark-Light. Apesar da elevada iluminância, parecem quase desligadas, o que elimina totalmente o encandeamento e proporciona um ambiente de trabalho ideal. Para manter um design unificado, utilizámos luminárias da mesma forma e dimensão, mas com óticas diferentes: oval para corredores compridos, wallwasher para iluminar quadros e spot/narrow spot para criar acentos.

Como resultado, conseguimos combinar harmoniosamente estética e funcionalidade, criando uma atmosfera profissional, confortável e memorável que corresponde plenamente ao nível da empresa.`,

},
  },
  {
    slug: 'hotel',
    cover: '/projects/hotel/cover.jpg',
    images: seq('hotel', 12),
    title: { ru: 'Отель с комплексом СПА', en: 'Hotel', pt: 'Hotel' },
    blurb: {
      ru: 'Интимная световая атмосфера для лобби и номеров — баланс теплоты и читаемости.',
      en: 'Warm, intimate lighting for lobby and rooms with clear visual hierarchy.',
      pt: 'Ambiente acolhedor no lobby e nos quartos com hierarquia visual clara.',
    },
    desc: {
  ru: `Для освещения сложного архитектурного пространства с прилегающим парком использовались различные оптические решения: акцентные прожекторы, овалорисующие светильники и воллвошеры. Это позволило подчеркнуть архитектурные элементы и отделку фасада, обеспечив равномерное освещение без пересветов.

Светильники с разной цветовой температурой разбавили монотонность фасада, а направление света было продумано так, чтобы минимизировать его попадание в окна, делая пребывание внутри комфортным.

Цветодинамическая подсветка деревьев и водоема создала в парке загадочную атмосферу.

В результате, благодаря сочетанию различных приемов, каждый элемент — от фасада до ландшафта — был гармонично подсвечен, что создало запоминающийся и живой образ всего архитектурного ансамбля.`,
  en: '',
  pt: '',
},
  },
  {
    slug: 'yachtclub',
    cover: '/projects/yachtclub/cover.jpg',
    images: seq('yachtclub', 12),
    title: { ru: 'Яхт-клуб', en: 'Yacht Club', pt: 'Clube de Iates' },
    blurb: {
      ru: 'Архитектурная подсветка с акцентами на фактуры и береговую линию.',
      en: 'Architectural lighting with material accents and shoreline highlights.',
      pt: 'Iluminação arquitetônica com acentos de materiais e destaque do litoral.',
    },
    desc: {
  ru: `Мы стремились подчеркнуть уникальность сложных изогнутых фасадов здания яхт-клуба, его динамичные линии и плавные переходы. Для этого были использованы светильники, которые мягко очерчивают контуры, создавая ощущение легкости и гармонии. Для подсветки цоколя здания мы применили RGBW-прожекторы, что позволило добавить динамики и гибко управлять цветовыми сценариями. Особое внимание было уделено акцентированию мачт-флюгеров, которые стали центральным элементом композиции, привлекая взгляд и создавая образ, напоминающий парусник.

Синяя подсветка понтонов и моста в вечернее время придаёт пространству таинственную глубину и визуально расширяет водную гладь, создавая ощущение безмятежности и роскоши. Этот приём помог нам связать архитектуру здания с прилегающей водной территорией.

На прилегающей территории мы использовали светильники малой высоты, чтобы создать уютное освещение прогулочных зон, а акцентная подсветка деревьев и кустарников подчеркнула красоту ландшафтного дизайна. В результате, благодаря продуманному световому дизайну, мы объединили все элементы в единый, гармоничный и выразительный образ.`,
  en: '',
  pt: '',
},
  },
  {
    slug: 'apartment',
    cover: '/projects/apartment/cover.jpg',
    images: seq('apartment', 7),
    title: { ru: 'Частные апартаменты', en: 'Apartment', pt: 'Apartamento' },
    blurb: {
      ru: 'Интерьерное освещение: сценарии, акценты, отсутствие бликов и слепящего света.',
      en: 'Residential lighting: scenes, accents and glare-free comfort.',
      pt: 'Iluminação residencial: cenas, acentos e conforto sem ofuscamento.',
    },
    desc: {
  ru: `Этот интерьер сочетает в себе теплоту и современный минимализм, где каждая деталь продумана для создания комфортного и функционального пространства.

Особая роль в проекте отведена световому дизайну, который подчеркивает каждую зону. Центральным акцентом в обеденной зоне стали массивные черные подвесные светильники Flos Skygarden, которые создают визуальный якорь и наполняют пространство мягким, рассеянным светом. Многоуровневое освещение дополняется точечными светильниками, скрытой подсветкой и бра в зоне для чтения, что позволяет легко менять атмосферу.

Гармоничное сочетание натурального дерева, бетона и кирпичной кладки делает интерьер уникальным. Эти фактуры по-настоящему раскрываются благодаря грамотному освещению, которое выделяет их текстуру и глубину, создавая ощущение тепла и уюта.`,
  en: '',
  pt: '',
},
  },
  {
    slug: 'quick-sketches',
    cover: '/projects/quick-sketches/cover.jpg',
    images: seq('quick-sketches', 8),
    title: { ru: 'Пилотная визуализация', en: 'Pilot visualization', pt: 'Esboços rápidos' },
    blurb: {
      ru: 'Серия быстрых концептов и мокапов — показываем идею до финального проекта.',
      en: 'A series of quick concepts and mockups — conveying the idea before final design.',
      pt: 'Série de conceitos rápidos e mockups — ideia antes do projeto final.',
    },
    desc: {
  ru: `Иногда, прежде чем начинать полноценное проектирование, важно убедиться, что видение проекта совпадает. Мы предлагаем уникальную услугу, которая позволяет визуально оценить возможную фасадную подсветку на основе уже существующих рендеров от архитектора.

Это помогает клиентам увидеть, как преобразится их дом в вечернее время, еще до начала детальной проработки. Используя эти рендеры, мы представляем наше видение освещения, показывая, как мы можем подчеркнуть архитектурные линии и формы, выделить текстуру фасада и создать особую атмосферу. Такой подход позволяет на раннем этапе согласовать концепцию и убедиться, что результат будет соответствовать ожиданиям.`,
  en: '',
  pt: '',
},
  },
];

export const findProject = (slug: string) => PROJECTS.find(p => p.slug === slug);
