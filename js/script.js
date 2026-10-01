const languageButtons = document.querySelectorAll(".lang-btn");
const translatableElements = document.querySelectorAll("[data-es]");
const backTopButton = document.querySelector(".back-top");
const revealElements = document.querySelectorAll(".reveal");
const panelButtons = document.querySelectorAll("[data-panel-target]");
const menuPanels = document.querySelectorAll("[data-panel]");
const infoModal = document.querySelector(".info-modal");
const infoTitle = document.querySelector("#info-title");
const infoDescription = document.querySelector("#info-description");
const closeInfoButtons = document.querySelectorAll("[data-close-info]");

let currentLanguage = localStorage.getItem("maitagarri-language") || "es";

const allergenLabels = {
  Gluten: { es: "Gluten", en: "Gluten", fr: "Gluten" },
  Huevo: { es: "Huevo", en: "Egg", fr: "Oeuf" },
  "Lácteos": { es: "Lácteos", en: "Dairy", fr: "Lait" },
  "Frutos secos": { es: "Frutos secos", en: "Nuts", fr: "Fruits secs" },
  Pescado: { es: "Pescado", en: "Fish", fr: "Poisson" },
  Marisco: { es: "Marisco", en: "Shellfish", fr: "Crustacés" },
  Moluscos: { es: "Moluscos", en: "Molluscs", fr: "Mollusques" },
  Sulfitos: { es: "Sulfitos", en: "Sulphites", fr: "Sulfites" },
  Mostaza: { es: "Mostaza", en: "Mustard", fr: "Moutarde" },
  Sésamo: { es: "Sésamo", en: "Sesame", fr: "Sésame" },
  Soja: { es: "Soja", en: "Soy", fr: "Soja" }
};

const dishAllergens = {
  "Chistorra de Arbizu": ["Gluten", "Sulfitos"],
  "Revuelto de bacalao": ["Huevo", "Pescado"],
  "Ensalada de queso de cabra con frutos secos": ["Lácteos", "Frutos secos"],
  "Ensalada tibia de queso de cabra y remolacha": ["Lácteos", "Frutos secos"],
  "Chuletón premium": ["Sulfitos"],
  "Lagarto ibérico": ["Sulfitos"],
  "Solomillo de vaca": ["Lácteos", "Sulfitos"],
  "Lubina al horno": ["Pescado", "Sulfitos"],
  "Sepia con panaderas": ["Moluscos"],
  "Tarta de queso": ["Gluten", "Huevo", "Lácteos"],
  "Cuajada": ["Lácteos"],
  "Cuajada de la casa": ["Lácteos"],
  "Tarta de chocolate": ["Gluten", "Huevo", "Lácteos"],
  "Torrija": ["Gluten", "Huevo", "Lácteos"],
  "Torrija caramelizada": ["Gluten", "Huevo", "Lácteos"],
  "Queso, membrillo y nuez": ["Lácteos", "Frutos secos"],
  "Flan": ["Huevo", "Lácteos"],
  "Flan de huevo": ["Huevo", "Lácteos"],
  "Goxua": ["Gluten", "Huevo", "Lácteos"],
  "Gazpacho de tomate de temporada": ["Gluten"],
  "Tiramisú": ["Gluten", "Huevo", "Lácteos"],
  "Sablé de mango y coco": ["Gluten", "Huevo", "Lácteos"],
  "Cuajada de leche de oveja": ["Lácteos", "Frutos secos"],
  "Helado": ["Lácteos"]
};

const menuDetails = {
  "Chuletón premium": {
    title: "Chuletón extra premium a la parrilla con pimiento del piquillo",
    detail: "La especialidad del menú sidrería. Pieza de 1000 gr aprox. a la parrilla, servida con pimiento del piquillo."
  },
  "Gran chuletón premium": {
    detail: "Maduración de 21 días para alcanzar su máxima ternura, servido chisporroteante en fondue de barro tradicional que potencia sus intensos matices ahumados (1000gr).",
    price: "65"
  },
  "Ensalada griega": {
    title: "Ensalada griega con tomate rosa y ribbons de pepino en ola",
    detail: "Queso feta en geometría irregular, tomate rosa, ribbons de pepino en ola y aceitunas de Kalamata, salsa de yogur y flor comestible.",
    price: "15"
  },
  "Cogollos de Tudela": {
    title: "Cogollos de Tudela a la parrilla",
    detail: "Cogollos de Tudela marcados a la parrilla con aceite ahumado, anchoas, nube de queso Idiazabal y vinagreta de tomate asado.",
    price: "16"
  },
  "Cabra en equilibrio": {
    detail: "Ensalada tibia de queso de cabra y remolacha asada, nueces caramelizadas y mermelada de tomate.",
    price: "18"
  },
  "Icónico Ibérico": {
    detail: "Plato de jamón ibérico con su pan tostado y tumaca casera (100gr).",
    price: "27"
  },
  "Chistorra de Arbizu": {
    detail: "Elaborada con métodos tradicionales navarros y una excelente calidad.",
    price: "14,8"
  },
  "Gazpacho de tomate de temporada": {
    detail: "Acompañado de jamón ibérico y picatostes, fresco y ligero, con un hilo de aceite de oliva virgen extra.",
    price: "16"
  },
  "Corazón de alcachofas": {
    detail: "Tierno corazón de alcachofas bañado en cremosa salsa blanca y coronado con crujiente jamón ibérico.",
    price: "17,5"
  },
  "Hummus casero": {
    detail: "Una crema de garbanzos sedosa y untuosa con el equilibrio perfecto de tahini, limón y ajo.",
    price: "10"
  },
  "Baba ganug": {
    title: "Baba ganug casero",
    detail: "Delicioso y cremoso dip de berenjenas asadas con un toque ahumado, tahini y yogur.",
    price: "11"
  },
  "Falafel": {
    detail: "Crujientes bolitas de falafel acompañadas de una fresca ensalada de tomate, cebolla y perejil.",
    price: "14"
  },
  "Kofta": {
    detail: "Exquisita brocheta de ternera estilo Alepo, asada con especias tradicionales y hierbas frescas.",
    price: "22"
  },
  "Shish tawuk": {
    detail: "Jugosas brochetas de pollo estilo shish tawook a la parrilla, servidas con crema de ajo y pan árabe con muhammara de nueces y pimientos asados.",
    price: "21"
  },
  "Pulpo a la parrilla": {
    detail: "Patas de pulpo a la parrilla sobre cama de patatas panadera, servido en plato de barro, aceite de oliva virgen extra en hilo y polvo de cayena.",
    price: "25,9"
  },
  "Vieiras del pacífico": {
    title: "Vieiras del pacífico a la plancha",
    detail: "Vieiras del pacífico a la plancha con aliño de aceite de oliva virgen extra, ajo y perejil, flor del delta mediterránea negra.",
    price: "22"
  },
  "Tortilla de bacalao": {
    detail: "Una tradición de la cocina de caserío vasca.",
    price: "16"
  },
  "Paella de marisco": {
    detail: "Una vibrante y aromática explosión de sabores marineros.",
    price: "21,5"
  },
  "Ajoarriero navarro": {
    detail: "Reconfortante guiso navarro de bacalao desmigado y verduras cocinado a fuego lento para lograr una textura melosa y llena de sabor.",
    price: "21,8"
  },
  "Gambones a la miel": {
    detail: "Una explosión de sabor agridulce donde la miel carameliza perfectamente la textura tierna de los gambones.",
    price: "24"
  },
  "Sepia a la plancha": {
    detail: "Delicia marina de textura firme pero tierna, dorada a alta temperatura para lograr un sabor irresistible.",
    price: "21"
  },
  "Lubina al horno": {
    detail: "Lubina al horno que se deshace en láminas al contacto con el tenedor, con fondo de patatas melosas doradas por fuera.",
    price: "21"
  },
  "Solomillo de vaca madurada": {
    title: "Solomillo de vaca madurada a la parrilla",
    detail: "Excepcionalmente tierna y con un sabor intenso, acompañado de salsa roquefort o de pimienta al gusto.",
    price: "33,9"
  },
  "Entrecot ahumado": {
    title: "Entrecot ahumado a la parrilla",
    detail: "Marcado en parrilla, jugoso y tierno con una costra exterior irresistible.",
    price: "23,5"
  },
  "Melosos de carrilleras": {
    detail: "Melosas carrilleras guisadas al vino tinto sobre una sedosa parmentier de patata, equilibrando intensidad y dulzor.",
    price: "22,5"
  },
  "Estofado de toro": {
    detail: "Manjar meloso y untuoso que se deshace en la boca, cocinado a fuego lento con salsa inconfundible de vino tinto.",
    price: "22,5"
  },
  "Lagarto ibérico": {
    detail: "Lagarto ibérico a la parrilla con su grasa fundida, coronado con chimichurri para una experiencia tierna y vibrante.",
    price: "22"
  },
  "Tarta de queso crema horneada": {
    detail: "Sedosa y cremosa tentación horneada, con un exterior tostado que esconde un corazón irresistiblemente suave.",
    price: "8"
  },
  "Cuajada de leche de oveja con nueces y miel": {
    detail: "Caricia cremosa de leche de oveja, con la dulzura dorada de la miel y el contraste crujiente de las nueces.",
    price: "7"
  },
  "Tarta de chocolate": {
    detail: "El sueño de cualquier amante del chocolate: intenso, suave y cremoso en un solo bocado.",
    price: "7"
  },
  "Tiramisú": {
    detail: "Una caricia de café y cacao coronada con una sedosa y dulce crema mascarpone.",
    price: "7"
  },
  "Sablé de mango y coco": {
    detail: "Cremosa exótica con un contraste crujiente.",
    price: "7"
  },
  "Cuajada de leche de oveja": {
    detail: "Con la dulzura de la miel y el contraste crujiente de las nueces.",
    price: "7"
  },
  "Helado": {
    detail: "Pregunta por nuestra variedad de helados.",
    price: "5"
  }
};

const dishInfo = {
  "Chistorra de Arbizu": {
    es: "Chistorra artesana de Arbizu, jugosa y especiada, servida caliente para compartir.",
    en: "Artisan chistorra from Arbizu, juicy and lightly spiced, served hot to share.",
    fr: "Chistorra artisanale d'Arbizu, juteuse et epicee, servie chaude a partager."
  },
  "Revuelto de bacalao": {
    es: "Huevos cremosos revueltos con bacalao, una combinación suave, salina y muy de sidrería.",
    en: "Creamy scrambled eggs with cod, a soft, savory cider-house classic.",
    fr: "Oeufs brouilles cremeux a la morue, doux, salin et typique de cidrerie."
  },
  "Ensalada de queso de cabra con frutos secos": {
    es: "Ensalada templada con queso de cabra, frutos secos y contraste dulce-salado.",
    en: "Warm salad with goat cheese, nuts and a sweet-salty contrast.",
    fr: "Salade tiede au fromage de chevre, fruits secs et contraste sucre-sale."
  },
  "Chuletón premium": {
    es: "Pieza noble de vaca para compartir, marcada a la brasa y servida con todo el sabor de la carne madurada.",
    en: "A noble beef cut for sharing, grilled over embers and served with the full flavor of aged meat.",
    fr: "Belle piece de boeuf a partager, grillee a la braise avec toute la saveur de la viande maturee."
  },
  "Lagarto ibérico": {
    es: "Corte jugoso del cerdo ibérico, muy sabroso por su infiltración y perfecto a la brasa.",
    en: "A juicy Iberian pork cut, rich thanks to its marbling and perfect on the grill.",
    fr: "Morceau juteux de porc iberique, savoureux grace a son persillage et parfait a la braise."
  },
  "Solomillo de vaca": {
    es: "Corte tierno y elegante de vaca, pensado para quien busca carne suave y limpia.",
    en: "A tender, elegant beef cut for those who prefer clean, delicate meat.",
    fr: "Morceau tendre et elegant de boeuf, pour une viande douce et nette."
  },
  "Lubina al horno": {
    es: "Pescado blanco horneado con punto jugoso, sabor fino y acompañamiento sencillo.",
    en: "Baked white fish with a juicy texture, delicate flavor and simple garnish.",
    fr: "Poisson blanc au four, juteux, delicat et accompagne simplement."
  },
  "Sepia con panaderas": {
    es: "Sepia tierna servida con patatas panaderas, una opción marinera cómoda para compartir.",
    en: "Tender cuttlefish served with panadera potatoes, an easy seafood dish to share.",
    fr: "Seiche tendre avec pommes boulangere, une option marine a partager."
  },
  "Tarta de queso": {
    es: "Tarta cremosa de queso, horneada para quedar suave por dentro y ligeramente tostada.",
    en: "Creamy baked cheesecake, soft inside and lightly toasted.",
    fr: "Gateau au fromage cremeux, cuit au four, tendre et legerement dore."
  },
  "Cuajada": {
    es: "Postre tradicional de leche cuajada, suave y lácteo, ideal con miel o frutos secos.",
    en: "Traditional milk curd dessert, soft and dairy-forward, ideal with honey or nuts.",
    fr: "Dessert traditionnel de lait caille, doux et lacte, ideal avec miel ou fruits secs."
  },
  "Tarta de chocolate": {
    es: "Postre intenso de chocolate, pensado para cerrar la comida con un final goloso.",
    en: "Rich chocolate dessert, made for a sweet finish to the meal.",
    fr: "Dessert intense au chocolat, pour finir le repas avec gourmandise."
  },
  "Torrija": {
    es: "Pan brioche empapado y caramelizado, tierno por dentro y dorado por fuera.",
    en: "Soaked and caramelized brioche, tender inside and golden outside.",
    fr: "Brioche imbibee et caramelisee, tendre dedans et doree dehors."
  },
  "Flan": {
    es: "Flan casero de huevo, textura suave y sabor clásico.",
    en: "Homemade egg flan with a smooth texture and classic flavor.",
    fr: "Flan maison aux oeufs, texture douce et saveur classique."
  },
  "Ensalada griega": {
    es: "Ensalada fresca de inspiración mediterránea con queso, verduras y aliño ligero.",
    en: "Fresh Mediterranean-style salad with cheese, vegetables and a light dressing.",
    fr: "Salade fraiche d'inspiration mediterraneenne avec fromage, legumes et assaisonnement leger."
  },
  "Cogollos de Tudela": {
    es: "Cogollos crujientes y frescos de Tudela, normalmente servidos con un aliño sabroso.",
    en: "Crisp, fresh Tudela lettuce hearts, usually served with a savory dressing.",
    fr: "Coeurs de laitue de Tudela, frais et croquants, avec assaisonnement savoureux."
  },
  "Cabra en equilibrio": {
    es: "Plato con queso de cabra y contrastes de textura, pensado entre lo cremoso, lo dulce y lo crujiente.",
    en: "A goat cheese dish with texture contrasts, balancing creamy, sweet and crisp notes.",
    fr: "Plat au fromage de chevre avec contrastes de texture, entre cremeux, sucre et croquant."
  },
  "Icónico Ibérico": {
    es: "Selección ibérica de sabor intenso, perfecta para abrir mesa y compartir.",
    en: "An intense Iberian selection, perfect to start the meal and share.",
    fr: "Selection iberique au gout intense, parfaite a partager en debut de repas."
  },
  "Corazón de alcachofas": {
    es: "Alcachofas tiernas con sabor vegetal y delicado, servidas en formato limpio y elegante.",
    en: "Tender artichokes with a delicate vegetable flavor, served cleanly and elegantly.",
    fr: "Artichauts tendres a la saveur vegetale delicate, servis simplement et elegamment."
  },
  "Hummus casero": {
    es: "Crema de garbanzo con tahini, aceite de oliva y especias suaves. Ideal para compartir.",
    en: "Chickpea cream with tahini, olive oil and mild spices. Ideal for sharing.",
    fr: "Creme de pois chiches au tahini, huile d'olive et epices douces. Ideal a partager."
  },
  "Baba ganug": {
    es: "Crema ahumada de berenjena asada con tahini y aceite de oliva.",
    en: "Smoky roasted eggplant cream with tahini and olive oil.",
    fr: "Creme fumee d'aubergine rotie avec tahini et huile d'olive."
  },
  "Falafel": {
    es: "Bocados crujientes de garbanzo y hierbas, con inspiración de Oriente Medio.",
    en: "Crisp chickpea and herb bites inspired by the Middle East.",
    fr: "Bouchees croustillantes de pois chiches et herbes, inspirees du Moyen-Orient."
  },
  "Kofta": {
    es: "Carne especiada de estilo oriental, jugosa y aromática.",
    en: "Eastern-style spiced meat, juicy and aromatic.",
    fr: "Viande epicee de style oriental, juteuse et aromatique."
  },
  "Shish tawuk": {
    es: "Brocheta de pollo marinado con especias suaves, yogur y toque cítrico.",
    en: "Chicken skewer marinated with mild spices, yogurt and a citrus touch.",
    fr: "Brochette de poulet marine aux epices douces, yaourt et touche citronnee."
  },
  "Pulpo a la parrilla": {
    es: "Pulpo marcado a la parrilla, con exterior dorado y textura tierna.",
    en: "Grilled octopus with a golden outside and tender texture.",
    fr: "Poulpe grille, dore a l'exterieur et tendre."
  },
  "Vieiras del pacífico": {
    es: "Vieiras suaves y delicadas, con sabor marino elegante.",
    en: "Soft, delicate scallops with an elegant seafood flavor.",
    fr: "Noix de Saint-Jacques douces et delicates, saveur marine elegante."
  },
  "Tortilla de bacalao": {
    es: "Tortilla jugosa con bacalao desmigado, muy típica de sidrería.",
    en: "Juicy omelette with shredded cod, a cider-house classic.",
    fr: "Omelette juteuse a la morue emiettee, typique de cidrerie."
  },
  "Paella de marisco": {
    es: "Arroz marinero con marisco, caldo sabroso y punto festivo.",
    en: "Seafood rice with a flavorful stock and festive character.",
    fr: "Riz marin aux fruits de mer, bouillon savoureux et esprit festif."
  },
  "Ajoarriero navarro": {
    es: "Bacalao desmigado guisado con verduras, tomate y sabor tradicional navarro.",
    en: "Shredded cod stewed with vegetables, tomato and traditional Navarrese flavor.",
    fr: "Morue emiettee mijotee avec legumes, tomate et saveur navarraise."
  },
  "Gambones a la miel": {
    es: "Gambones con toque dulce de miel y fondo sabroso, contraste potente y diferente.",
    en: "King prawns with a honey touch and savory base, a bold sweet-salty contrast.",
    fr: "Gambas royales au miel, fond savoureux et contraste sucre-sale."
  },
  "Sepia a la plancha": {
    es: "Sepia marcada a la plancha, tierna, limpia y con sabor de mar.",
    en: "Grilled cuttlefish, tender, clean and full of sea flavor.",
    fr: "Seiche a la plancha, tendre, nette et marine."
  },
  "Gran chuletón premium": {
    es: "El plato estrella de la brasa: chuletón grande para compartir, con sabor profundo, grasa noble y punto jugoso.",
    en: "The grill's star dish: a large rib steak to share, with deep flavor, noble fat and a juicy finish.",
    fr: "La star de la braise: grande cote de boeuf a partager, saveur profonde, gras noble et cuisson juteuse."
  },
  "Solomillo de vaca madurada": {
    es: "Solomillo tierno de vaca madurada, con sabor elegante y textura muy suave.",
    en: "Tender aged beef fillet with elegant flavor and a very soft texture.",
    fr: "Filet de boeuf mature tendre, saveur elegante et texture tres douce."
  },
  "Entrecot ahumado": {
    es: "Entrecot con toque ahumado, marcado a la brasa para potenciar su aroma.",
    en: "Entrecote with a smoky touch, grilled to enhance its aroma.",
    fr: "Entrecote au touche fume, grillee pour renforcer son arome."
  },
  "Melosos de carrilleras": {
    es: "Carrilleras cocinadas lentamente hasta quedar melosas, con salsa profunda.",
    en: "Beef cheeks slow-cooked until tender and silky, with a deep sauce.",
    fr: "Joues mijotees jusqu'a devenir fondantes, avec sauce profonde."
  },
  "Estofado de toro": {
    es: "Guiso de toro de cocción lenta, intenso y muy ligado a la fiesta.",
    en: "Slow-cooked bull stew, intense and closely tied to the festival.",
    fr: "Ragout de taureau mijote, intense et tres lie a la fete."
  },
  "Tarta de queso crema horneada": {
    es: "Tarta de queso cremosa y horneada, con centro suave y sabor lácteo elegante.",
    en: "Creamy baked cheesecake with a soft center and elegant dairy flavor.",
    fr: "Gateau au fromage cremeux et cuit, centre doux et saveur lactee elegante."
  },
  "Cuajada de leche de oveja con nueces y miel": {
    es: "Cuajada tradicional de leche de oveja, acompañada de nueces y miel.",
    en: "Traditional sheep milk curd served with walnuts and honey.",
    fr: "Caille traditionnelle de lait de brebis avec noix et miel."
  },
  "Torrija de pan brioche caramelizada": {
    es: "Brioche empapado, dorado y caramelizado, con textura jugosa.",
    en: "Soaked brioche, golden and caramelized, with a juicy texture.",
    fr: "Brioche imbibee, doree et caramelisee, texture moelleuse."
  },
  "Flan de huevo": {
    es: "Flan clásico de huevo con textura fina y caramelo.",
    en: "Classic egg flan with a smooth texture and caramel.",
    fr: "Flan classique aux oeufs, texture fine et caramel."
  },
  "Gazpacho de tomate de temporada": {
    es: "Gazpacho fresco de tomate con jamón ibérico y picatostes, ligero y muy apetecible en fiestas.",
    en: "Fresh tomato gazpacho with Iberian ham and croutons, light and ideal during the festival.",
    fr: "Gaspacho frais de tomate avec jambon iberique et croutons, leger et ideal pendant la fete."
  },
  "Tiramisú": {
    es: "Postre cremoso de café, cacao y mascarpone, suave y goloso.",
    en: "Creamy dessert with coffee, cocoa and mascarpone, soft and indulgent.",
    fr: "Dessert cremeux au cafe, cacao et mascarpone, doux et gourmand."
  },
  "Sablé de mango y coco": {
    es: "Postre exótico de mango y coco con contraste crujiente.",
    en: "Exotic mango and coconut dessert with a crisp contrast.",
    fr: "Dessert exotique mangue et coco avec contraste croquant."
  },
  "Cuajada de leche de oveja": {
    es: "Cuajada tradicional de leche de oveja con miel y nueces.",
    en: "Traditional sheep milk curd with honey and walnuts.",
    fr: "Caille traditionnelle de lait de brebis avec miel et noix."
  },
  "Helado": {
    es: "Helado de la casa según variedad disponible.",
    en: "House ice cream depending on available flavors.",
    fr: "Glace maison selon les parfums disponibles."
  },
};

const setLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-es]").forEach((element) => {
    const value = element.dataset[language];
    if (value) {
      element.textContent = value;
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("maitagarri-language", language);
  addInfoButtons();
};

const getDishKey = (element) => {
  if (element.dataset.infoKey) return element.dataset.infoKey;
  const textSource = element.matches("li") ? element : element.querySelector("h3");
  return textSource?.dataset.es || textSource?.textContent.trim();
};

const openInfo = (key, visibleTitle) => {
  const detail = menuDetails[key];
  const info = dishInfo[key];
  if (!info && !detail) return;

  const localizedDetail = typeof detail?.detail === "string"
    ? detail.detail
    : detail?.detail?.[currentLanguage] || detail?.detail?.es;
  infoTitle.textContent = visibleTitle || key;
  const touristText = typeof detail?.touristInfo === "string"
    ? detail.touristInfo
    : detail?.touristInfo?.[currentLanguage] || detail?.touristInfo?.es;
  infoDescription.textContent = touristText
    || (currentLanguage !== "es" ? info?.[currentLanguage] : "")
    || localizedDetail
    || info?.[currentLanguage]
    || info?.es;
  infoModal.classList.add("open");
  infoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeInfo = () => {
  infoModal.classList.remove("open");
  infoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const addInfoButtons = () => {
  document.querySelectorAll(".dish-card, .line-dish, .tile, .meat-hero, .menu-column li").forEach((element) => {
    const key = getDishKey(element);
    const allergens = dishAllergens[key];

    if (allergens && !element.querySelector(".inline-allergens")) {
      const wrapper = document.createElement("div");
      wrapper.className = "allergens inline-allergens";
      allergens.forEach((allergen) => {
        const tag = document.createElement("span");
        const label = allergenLabels[allergen];
        tag.dataset.es = label.es;
        tag.dataset.en = label.en;
        tag.dataset.fr = label.fr;
        tag.textContent = label[currentLanguage] || label.es;
        wrapper.appendChild(tag);
      });
      element.appendChild(wrapper);
    }

    if ((!dishInfo[key] && !menuDetails[key]) || element.querySelector(".info-btn")) return;

    element.dataset.infoKey = key;
    const button = document.createElement("button");
    button.className = "info-btn";
    button.type = "button";
    button.textContent = "?";
    button.setAttribute("aria-label", "Información del plato");
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const textSource = element.matches("li") ? element : element.querySelector("h3");
      const visibleTitle = textSource?.childNodes[0]?.textContent.trim() || textSource?.textContent.trim();
      openInfo(key, visibleTitle);
    });
    element.appendChild(button);
  });
};

const applyMenuDetails = () => {
  document.querySelectorAll(".line-dish, .tile, .meat-hero, .menu-column li").forEach((element) => {
    const key = getDishKey(element);
    const detail = menuDetails[key];
    const info = dishInfo[key];
    if (!detail) return;

    element.dataset.infoKey = key;

    const titleTarget = element.matches("li") ? element : element.querySelector("h3");
    if (detail.title && titleTarget) {
      titleTarget.dataset.es = detail.title;
      if (currentLanguage === "es") titleTarget.textContent = detail.title;
    }

    if (!element.matches("li") && detail.detail && !element.querySelector(".dish-detail")) {
      const text = document.createElement("p");
      text.className = "dish-detail";
      text.dataset.es = detail.detail;
      text.dataset.en = info?.en || detail.detail;
      text.dataset.fr = info?.fr || detail.detail;
      text.textContent = text.dataset[currentLanguage] || detail.detail;
      element.appendChild(text);
    }

    if (!element.matches("li") && detail.price && !element.querySelector(".dish-price")) {
      const price = document.createElement("span");
      price.className = "dish-price";
      price.textContent = `${detail.price}€`;
      element.appendChild(price);
    }
  });
};

const addWineAllergens = () => {
  document.querySelectorAll(".wine-card").forEach((card) => {
    if (card.querySelector(".allergens")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "allergens";
    const tag = document.createElement("span");
    tag.dataset.es = "Sulfitos";
    tag.dataset.en = "Sulphites";
    tag.dataset.fr = "Sulfites";
    tag.textContent = currentLanguage === "en" ? "Sulphites" : currentLanguage === "fr" ? "Sulfites" : "Sulfitos";
    wrapper.appendChild(tag);
    card.appendChild(wrapper);
  });
};

const touristInfo = {
  "Chistorra de Arbizu": "La chistorra es un embutido navarro fresco, fino y especiado. Arbizu es una localidad navarra muy reconocida por este producto tradicional.",
  "Ajoarriero navarro": "Guiso típico navarro de bacalao desmigado, verduras y tomate, cocinado lentamente hasta quedar meloso y lleno de sabor.",
  "Estofado de toro": "Carne de toro guisada a fuego lento con vino tinto hasta quedar melosa y muy tierna. Plato potente y tradicional.",
  "Lagarto ibérico": "No es lagarto animal: es un corte del cerdo ibérico, situado entre las costillas. Es jugoso, sabroso y funciona muy bien a la parrilla.",
  "Melosos de carrilleras": "Las carrilleras son piezas de la mejilla del animal. Cocinadas lentamente quedan muy tiernas, gelatinosas y suaves.",
  "Torrija": "Postre tradicional parecido a un pan dulce o brioche empapado, dorado y caramelizado. Muy jugoso por dentro.",
  "Torrija caramelizada": "Postre de pan o brioche empapado y caramelizado, crujiente por fuera y muy jugoso por dentro.",
  "Torrija de pan brioche caramelizada": "Brioche empapado y caramelizado, con exterior crujiente y corazón cremoso. Una versión elegante de la torrija tradicional.",
  "Cuajada": "Postre lácteo tradicional del norte, de textura suave, parecido a una crema cuajada de leche.",
  "Cuajada de la casa": "Postre lácteo tradicional, suave y cremoso, típico del norte. Se suele tomar solo, con miel o con frutos secos.",
  "Cuajada de leche de oveja con nueces y miel": "Postre tradicional de leche de oveja cuajada, servido con miel y nueces. Suave, lácteo y muy navarro.",
  "Queso, membrillo y nuez": "Combinación clásica de queso con membrillo, un dulce elaborado con fruta de membrillo, y nuez. Contraste salado, dulce y crujiente.",
  "Cogollos de Tudela": "Los cogollos son corazones pequeños y tiernos de lechuga. Los de Tudela son muy apreciados en Navarra.",
  "Cabra en equilibrio": "Ensalada tibia con queso de cabra, remolacha, nueces caramelizadas y mermelada de tomate. Juego de dulce, cremoso y crujiente.",
  "Icónico Ibérico": "Jamón ibérico servido con pan tostado y tumaca, una preparación de tomate aliñado sobre pan.",
  "Corazón de alcachofas": "Centro tierno de la alcachofa, servido con salsa blanca cremosa y jamón ibérico crujiente.",
  "Baba ganug": "Crema de berenjena asada típica de Oriente Medio, con tahini. Tiene un toque ahumado y textura cremosa.",
  "Falafel": "Bolitas crujientes de garbanzo y hierbas, muy populares en la cocina de Oriente Medio.",
  "Kofta": "Brocheta de carne especiada, en este caso estilo Alepo, con hierbas y especias tradicionales.",
  "Shish tawuk": "Brochetas de pollo marinado, típicas de Oriente Medio. Se sirven con crema de ajo y pan árabe con muhammara.",
  "Pulpo a la parrilla": "Pulpo marcado a la parrilla sobre patatas panadera, con aceite de oliva y un toque de cayena.",
  "Vieiras del pacífico": "Las vieiras son moluscos de carne delicada, conocidos también como scallops. Se sirven a la plancha.",
  "Sepia a la plancha": "La sepia es un molusco similar al calamar, de textura firme y sabor marino. A la plancha queda dorada y tierna.",
  "Sepia con panaderas": "Sepia servida con patatas panaderas. La sepia es un molusco parecido al calamar, firme y sabroso.",
  "Gran chuletón premium": "Chuletón grande de vaca para compartir, con maduración de 21 días. Se sirve en formato contundente, pensado para amantes de la carne.",
  "Solomillo de vaca madurada": "Corte muy tierno de vaca madurada. La maduración intensifica el sabor y mejora la textura de la carne.",
  "Entrecot ahumado": "Corte de vaca marcado a la parrilla con toque ahumado, jugoso por dentro y con costra dorada.",
  "Parmentier": "La parmentier es una crema o puré fino de patata, usada como base suave para carnes guisadas."
};

const touristInfoTranslations = {
  "Chistorra de Arbizu": {
    en: "Chistorra is a fresh, thin and lightly spiced Navarrese sausage. Arbizu is a Navarrese town well known for this traditional product.",
    fr: "La chistorra est une saucisse navarraise fraiche, fine et epicee. Arbizu est une commune navarraise reconnue pour ce produit traditionnel."
  },
  "Ajoarriero navarro": {
    en: "A typical Navarrese stew made with shredded cod, vegetables and tomato, slowly cooked until rich and tender.",
    fr: "Ragout typique navarrais de morue emiettee, legumes et tomate, mijote lentement jusqu'a obtenir une texture fondante."
  },
  "Estofado de toro": {
    en: "Bull meat stewed slowly with red wine until tender and silky. A powerful traditional dish.",
    fr: "Viande de taureau mijotee au vin rouge jusqu'a devenir fondante. Un plat traditionnel puissant."
  },
  "Lagarto ibérico": {
    en: "It is not lizard: lagarto is a cut of Iberian pork located between the ribs. It is juicy, flavorful and excellent on the grill.",
    fr: "Ce n'est pas du lezard: le lagarto est un morceau de porc iberique situe entre les cotes. Il est juteux, savoureux et parfait a la braise."
  },
  "Melosos de carrilleras": {
    en: "Carrilleras are cheek cuts. Slow cooking makes them very tender, silky and soft.",
    fr: "Les carrilleras sont des morceaux de joue. Une cuisson lente les rend tres tendres, fondantes et douces."
  },
  "Torrija": {
    en: "A traditional dessert similar to soaked sweet bread or brioche, browned and caramelized. Very juicy inside.",
    fr: "Dessert traditionnel proche d'un pain doux ou d'une brioche imbibee, doree et caramelisee. Tres moelleux a l'interieur."
  },
  "Torrija caramelizada": {
    en: "Bread or brioche soaked and caramelized, crisp outside and very juicy inside.",
    fr: "Pain ou brioche imbibee et caramelisee, croustillante a l'exterieur et tres moelleuse dedans."
  },
  "Torrija de pan brioche caramelizada": {
    en: "Caramelized soaked brioche, crisp outside with a creamy center. An elegant version of the traditional torrija.",
    fr: "Brioche imbibee et caramelisee, croustillante dehors avec un coeur cremeux. Une version elegante de la torrija traditionnelle."
  },
  "Cuajada": {
    en: "A traditional dairy dessert from northern Spain, with a soft texture similar to set milk cream.",
    fr: "Dessert laitier traditionnel du nord, a la texture douce, proche d'une creme de lait prise."
  },
  "Cuajada de la casa": {
    en: "A traditional soft and creamy dairy dessert from northern Spain. It is often served plain, with honey or nuts.",
    fr: "Dessert laitier traditionnel, doux et cremeux, typique du nord. Il se sert nature, avec miel ou fruits secs."
  },
  "Cuajada de leche de oveja con nueces y miel": {
    en: "A traditional sheep milk curd served with honey and walnuts. Soft, dairy-forward and very Navarrese.",
    fr: "Caille traditionnelle de lait de brebis servie avec miel et noix. Douce, lactee et tres navarraise."
  },
  "Queso, membrillo y nuez": {
    en: "A classic combination of cheese with quince paste, a sweet fruit preserve, and walnut. Salty, sweet and crunchy.",
    fr: "Association classique de fromage, pate de coing, une preparation sucree de fruit, et noix. Sale, sucre et croquant."
  },
  "Cogollos de Tudela": {
    en: "Cogollos are small, tender lettuce hearts. Those from Tudela are especially appreciated in Navarre.",
    fr: "Les cogollos sont de petits coeurs de laitue tendres. Ceux de Tudela sont particulierement apprecies en Navarre."
  },
  "Cabra en equilibrio": {
    en: "Warm salad with goat cheese, roasted beetroot, caramelized walnuts and tomato jam. Sweet, creamy and crunchy contrasts.",
    fr: "Salade tiede au fromage de chevre, betterave rotie, noix caramelisees et confiture de tomate. Contraste sucre, cremeux et croquant."
  },
  "Icónico Ibérico": {
    en: "Iberian ham served with toasted bread and tumaca, a seasoned tomato spread for bread.",
    fr: "Jambon iberique servi avec pain grille et tumaca, une preparation de tomate assaisonnee pour le pain."
  },
  "Corazón de alcachofas": {
    en: "Tender artichoke heart served with creamy white sauce and crisp Iberian ham.",
    fr: "Coeur tendre d'artichaut servi avec sauce blanche cremeuse et jambon iberique croustillant."
  },
  "Baba ganug": {
    en: "A Middle Eastern roasted eggplant cream with tahini. It has a smoky touch and creamy texture.",
    fr: "Creme d'aubergine rotie du Moyen-Orient avec tahini. Elle a une touche fumee et une texture cremeuse."
  },
  "Falafel": {
    en: "Crisp chickpea and herb balls, very popular in Middle Eastern cuisine.",
    fr: "Boulettes croustillantes de pois chiches et herbes, tres populaires dans la cuisine du Moyen-Orient."
  },
  "Kofta": {
    en: "A spiced meat skewer, here Aleppo-style, with traditional spices and fresh herbs.",
    fr: "Brochette de viande epicee, ici style Alep, avec epices traditionnelles et herbes fraiches."
  },
  "Shish tawuk": {
    en: "Marinated chicken skewers typical of Middle Eastern cuisine. Served with garlic cream and Arabic bread with muhammara.",
    fr: "Brochettes de poulet marinees, typiques du Moyen-Orient. Servies avec creme d'ail et pain arabe a la muhammara."
  },
  "Pulpo a la parrilla": {
    en: "Grilled octopus over panadera potatoes, with olive oil and a touch of cayenne.",
    fr: "Poulpe grille sur pommes de terre panadera, avec huile d'olive et une touche de cayenne."
  },
  "Vieiras del pacífico": {
    en: "Scallops are delicate molluscs with a soft, sweet seafood flavor. Served grilled.",
    fr: "Les noix de Saint-Jacques sont des mollusques delicats a la saveur marine douce. Servies a la plancha."
  },
  "Sepia a la plancha": {
    en: "Cuttlefish is a mollusc similar to squid, with firm texture and sea flavor. Grilled until golden and tender.",
    fr: "La seiche est un mollusque proche du calamar, a la texture ferme et au gout marin. Grillee jusqu'a etre doree et tendre."
  },
  "Sepia con panaderas": {
    en: "Cuttlefish served with panadera potatoes. Cuttlefish is a mollusc similar to squid, firm and flavorful.",
    fr: "Seiche servie avec pommes de terre panadera. La seiche est un mollusque proche du calamar, ferme et savoureux."
  },
  "Gran chuletón premium": {
    en: "A large aged beef rib steak for sharing, matured for 21 days. A generous dish for meat lovers.",
    fr: "Grande cote de boeuf maturee a partager, avec 21 jours de maturation. Un plat genereux pour amateurs de viande."
  },
  "Solomillo de vaca madurada": {
    en: "A very tender cut of aged beef. Maturation intensifies flavor and improves the meat's texture.",
    fr: "Morceau tres tendre de boeuf mature. La maturation intensifie la saveur et ameliore la texture."
  },
  "Entrecot ahumado": {
    en: "A grilled beef cut with a smoky touch, juicy inside and golden crust outside.",
    fr: "Morceau de boeuf grille avec une touche fumee, juteux dedans et dore dehors."
  },
  "Parmentier": {
    en: "Parmentier is a fine potato cream or puree, often used as a smooth base for stewed meats.",
    fr: "La parmentier est une creme ou puree fine de pomme de terre, utilisee comme base douce pour les viandes mijotees."
  }
};

Object.entries(touristInfo).forEach(([key, text]) => {
  menuDetails[key] = {
    ...(menuDetails[key] || {}),
    touristInfo: {
      es: text,
      ...(touristInfoTranslations[key] || {})
    }
  };
});

closeInfoButtons.forEach((button) => {
  button.addEventListener("click", closeInfo);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeInfo();
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const toggleBackTop = () => {
  backTopButton.classList.toggle("visible", window.scrollY > 520);
};

window.addEventListener("scroll", toggleBackTop, { passive: true });

const showPanel = (panelName, shouldScroll = true) => {
  menuPanels.forEach((panel) => {
    panel.classList.toggle("panel-hidden", panel.dataset.panel !== panelName);
    panel.classList.toggle("active-panel", panel.dataset.panel === panelName);
  });

  panelButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.panelTarget === panelName);
  });

  localStorage.setItem("maitagarri-panel", panelName);

  if (shouldScroll) {
    document.querySelector(".qr-category-nav").scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const orderCartaSections = () => {
  const worldSection = document.querySelector("#mundo");
  const meatSection = document.querySelector("#carnes");

  if (worldSection && meatSection) {
    worldSection.insertAdjacentElement("afterend", meatSection);
  }
};

const numberCartaDishes = () => {
  const sections = ["#entrantes", "#mundo", "#carnes", "#mar", "#postres"];
  let number = 21;

  sections.forEach((selector) => {
    const section = document.querySelector(selector);
    if (!section) return;

    section.querySelectorAll(".line-dish, .tile, .meat-hero").forEach((dish) => {
      const formatted = String(number).padStart(2, "0");
      dish.dataset.number = formatted;

      const fixedNumber = dish.querySelector(".carta-number");
      if (fixedNumber) fixedNumber.textContent = formatted;

      number += 1;
    });
  });
};

panelButtons.forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.panelTarget));
});

backTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

applyMenuDetails();
addWineAllergens();
addInfoButtons();
orderCartaSections();
numberCartaDishes();
setLanguage(currentLanguage);
const savedPanel = localStorage.getItem("maitagarri-panel");
const initialPanel = [...menuPanels].some((panel) => panel.dataset.panel === savedPanel) ? savedPanel : "sidreria";
showPanel(initialPanel, false);
toggleBackTop();
