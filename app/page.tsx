"use client";

import { useMemo, useState } from "react";

type Item = { name: string; description: string; price?: string; mark?: string };

const menu: Record<string, Item[]> = {
  "Hambúrgueres": [
    { name: "Ragnar", price: "11,50 €", description: "Pão de hambúrguer, hambúrguer de vitela, ovo, queijo, fiambre, bacon, salada, molhos e batata palha. Com bebida e batata." },
    { name: "Björn", price: "12,50 €", description: "Pão de hambúrguer, bife de vitela, ovo, queijo, bacon, fiambre, salada e batata palha. Com bebida e batata." },
    { name: "Big Alverca", price: "16,50 €", description: "Pão de hambúrguer, 2 hambúrgueres de vitela, bife de bifana, bife de frango, salsicha, ovo, queijo, fiambre, bacon, salada, milho, molhos e batata palha." },
    { name: "Thor", price: "22,00 €", description: "3 hambúrgueres de vitela, bife de vitela, 2 salsichas, 2 ovos, bife de frango, bife de bifana, queijo, bacon, milho, cebola, fiambre, salada, molhos especiais e batata palha. Com bebida e batata." },
    { name: "Floki", price: "14,50 €", description: "Pão de hambúrguer, 2 hambúrgueres de vitela, ovo, bife de vitela, queijo, fiambre, ananás, molhos e batata palha. Com bebida e batata." },
    { name: "Lagertha", price: "13,50 €", description: "Pão de hambúrguer, hambúrguer de vitela, bife de bifana, salsicha, ovo, queijo, fiambre, bacon, salada, milho, molhos e batata palha." },
    { name: "Vikings Supremo", price: "13,50 €", description: "Pão, três hambúrgueres de vitela, queijo, bacon, ovo, alface, milho, tomate, fiambre, cebola, molhos e batata palha." },
    { name: "Odin", price: "13,50 €", description: "Pão de hambúrguer, hambúrguer de picanha, ovo, bacon, queijo, fiambre, molho e batata palha. Com bebida." },
    { name: "Simples", price: "6,00 €", description: "Hambúrguer simples. Com bebida." },
    { name: "Duplo", price: "9,00 €", description: "Hambúrguer duplo. Com bebida." },
    { name: "Triplo", price: "12,00 €", description: "Hambúrguer triplo. Com bebida e batata." },
    { name: "Kids", price: "7,00 €", description: "Menu infantil com hambúrguer, batata e Sumol." },
    { name: "X Salada", price: "9,00 €", description: "Pão, hambúrguer, queijo, salada, molhos e batata palha. Com bebida." },
    { name: "X Burger", price: "8,50 €", description: "Pão, hambúrguer, fiambre, queijo, picles e molhos. Com bebida." },
  ],
  "Cachorros": [
    { name: "Simples", price: "5,50 €", description: "Pão, salsicha, batata palha e molhos." },
    { name: "Especial", price: "8,50 €", description: "Pão, salsicha, fiambre, queijo, bacon, batata palha e molhos. Com bebida." },
    { name: "Pitbull", price: "10,00 €", description: "Pão, salsicha, milho, fiambre, queijo cheddar, bacon, batata palha, alface, tomate e molhos. Com bebida." },
  ],
  "Bifanas": [
    { name: "Simples", price: "5,50 €", description: "2 bifes de bifana no pão. Com bebida." },
    { name: "Especial", price: "8,50 €", description: "2 bifes de bifana no pão, fiambre, queijo e bacon. Com bebida." },
    { name: "Super", price: "10,00 €", description: "Bifana Super. Com bebida e batata." },
  ],
  "Porções & batatas": [
    { name: "Simples", price: "3,50 €", description: "Porção de batata frita." },
    { name: "Bacon + Cheddar", price: "7,50 €", description: "Batata com bacon e queijo cheddar. Porção para duas pessoas." },
    { name: "Suprema", price: "10,00 €", description: "Batata, bacon, frango e queijo cheddar. Porção para três pessoas. Com bebida." },
  ],
  "Kebabs": [
    { name: "Kebab misto", price: "13,50 €", description: "Kebab, bife de frango, bife de bifana, ovo, bacon, salada, molho da casa e batata palha. Com bebida." },
  ],
  "Pratos & extras": [
    { name: "Banquete dos Deuses", price: "13,00 €", description: "Bife de vitela, bife de frango ou bife de porco, arroz, salada, batata frita, ovo, queijo, fiambre e bacon. Com bebida." },
    { name: "Entremeada", price: "5,50 €", description: "Entremeada no pão. Com bebida." },
    { name: "Prego", price: "6,00 €", description: "Prego no pão. Com bebida." },
  ],
  "Vinhos": [
    { name: "Vinho branco — copo", price: "1,00 €", description: "Vinho branco servido a copo." },
    { name: "Vinho tinto — copo", price: "1,00 €", description: "Vinho tinto servido a copo." },
  ],
  "Refrigerantes & águas": [
    { name: "Coca-Cola", price: "1,90 €", description: "Refrigerante." },
    { name: "Fanta", price: "1,90 €", description: "Refrigerante." },
    { name: "Guaraná Antarctica", price: "1,90 €", description: "Refrigerante." },
    { name: "Sprite", price: "1,90 €", description: "Refrigerante." },
    { name: "Fuze Tea Pêssego", price: "1,90 €", description: "Chá gelado de pêssego em lata." },
    { name: "Lipton Ice Tea Limão", price: "1,90 €", description: "Chá gelado de limão em lata." },
    { name: "Lipton Ice Tea Pêssego", price: "1,90 €", description: "Chá gelado de pêssego em lata." },
    { name: "Lipton Ice Tea Laranja & Manga", price: "1,90 €", description: "Chá gelado de laranja e manga em lata." },
    { name: "Água Castelo", price: "1,90 €", description: "Água com gás." },
    { name: "Sumol Laranja", price: "1,90 €", description: "Refrigerante de laranja em lata." },
    { name: "Sumol Ananás", price: "1,90 €", description: "Refrigerante de ananás em lata." },
    { name: "7UP", price: "1,90 €", description: "Refrigerante." },
    { name: "Red Bull", price: "3,00 €", description: "Bebida energética." },
    { name: "Água 500 ml", price: "1,00 €", description: "Água mineral, garrafa de 500 ml." },
    { name: "Água 1,5 L", price: "2,00 €", description: "Água mineral, garrafa de 1,5 L." },
    { name: "Água das Pedras", price: "1,90 €", description: "Água com gás." },
    { name: "Água Tónica Schweppes", price: "1,90 €", description: "Água tónica Schweppes em lata." },
  ],
  "Cervejas & sidra": [
    { name: "Imperial Sagres", price: "1,30 €", description: "Cerveja Sagres servida em copo plástico Sagres." },
    { name: "Imperial Sagres média", price: "1,60 €", description: "Cerveja Sagres servida em copo plástico Sagres médio." },
    { name: "Imperial Sagres grande", price: "3,50 €", description: "Cerveja Sagres servida em copo plástico Sagres grande." },
    { name: "Sagres mini", price: "1,50 €", description: "25 cl (250 ml), garrafa de vidro não retornável (perdida)." },
    { name: "Sagres média", price: "2,00 €", description: "33 cl (330 ml), garrafa de vidro." },
    { name: "Super Bock mini", price: "1,50 €", description: "Cerveja Super Bock mini em garrafa de vidro." },
    { name: "Super Bock média", price: "2,00 €", description: "Cerveja Super Bock média em garrafa de vidro." },
    { name: "Heineken", price: "2,00 €", description: "Cerveja Heineken." },
    { name: "Corona", price: "2,30 €", description: "Cerveja Corona em garrafa de vidro." },
    { name: "Somersby Maçã mini", price: "2,00 €", description: "Sidra Somersby Maçã mini em garrafa de vidro." },
    { name: "Somersby Maçã média", price: "3,00 €", description: "Sidra Somersby Maçã média em garrafa de vidro." },
  ],
  "Whisky & licores": [
    { name: "Red Label", price: "Dose 4,00 € · Shot 2,00 €", description: "Whisky Johnnie Walker Red Label." },
    { name: "Grant’s", price: "Dose 4,00 € · Shot 2,00 €", description: "Whisky Grant’s." },
    { name: "Beirão", price: "Dose 3,50 € · Shot 1,80 €", description: "Licor Beirão." },
  ],
  "Café": [
    { name: "Café", price: "1,00 €", description: "Café expresso." },
  ],
};

const categoryImage: Record<string, string> = {
  "Hambúrgueres": "/menus/hamburgueres.jpeg",
  "Cachorros": "/menus/cachorros-bifanas.jpeg",
  "Bifanas": "/menus/cachorros-bifanas.jpeg",
  "Porções & batatas": "/menus/batatas-lanches-kebab.jpeg",
  "Kebabs": "/menus/batatas-lanches-kebab.jpeg",
  "Pratos & extras": "/menus/pratos.jpeg",
};

const beverageArt = {
  can: { image: "/beverages/can.png", position: "center", size: "contain" },
  glassBottle: { image: "/beverages/glass-bottle.png", position: "center", size: "contain" },
  water500: { image: "/beverages/black/water-500ml.png", position: "center", size: "contain" },
  water1500: { image: "/beverages/black/water-1-5l.png", position: "center", size: "contain" },
  wine: { image: "/beverages/black/wine-glass.png", position: "center", size: "contain" },
  whisky: { image: "/beverages/whisky-glass.png", position: "center", size: "contain" },
  coffee: { image: "/beverages/black/coffee.png", position: "center", size: "contain" },
};

const productArt: Record<string, Record<string, { image: string; position: string; size?: string }>> = {
  "Hambúrgueres": {
    "Ragnar": { image: "/products/hamburguer-ragnar-limpo.png", position: "center", size: "cover" },
    "Björn": { image: "/products/hamburguer-bjorn-limpo.png", position: "center", size: "cover" },
    "Big Alverca": { image: "/products/hamburguer-big-alverca-limpo.png", position: "center", size: "cover" },
    "Thor": { image: "/products/hamburguer-thor-limpo.png", position: "center", size: "cover" },
    "Floki": { image: "/products/hamburguer-floki-limpo.png", position: "center", size: "cover" },
    "Lagertha": { image: "/products/hamburguer-lagertha-limpo.png", position: "center", size: "cover" },
    "Vikings Supremo": { image: "/products/vikings-supremo.jpg", position: "center", size: "cover" },
    "Odin": { image: "/products/hamburguer-odin-limpo.png", position: "center", size: "cover" },
    "Simples": { image: "/products/hamburguer-simples-limpo.png", position: "center", size: "cover" },
    "Duplo": { image: "/products/hamburguer-duplo-limpo.png", position: "center", size: "cover" },
    "Triplo": { image: "/products/hamburguer-triplo-limpo.png", position: "center", size: "cover" },
    "Kids": { image: "/products/hamburguer-kids-limpo.png", position: "center", size: "cover" },
    "X Salada": { image: "/products/hamburguer-x-salada-limpo.png", position: "center", size: "cover" },
    "X Burger": { image: "/products/hamburguer-x-burger-limpo.png", position: "center", size: "cover" },
  },
  "Cachorros": {
    "Simples": { image: "/products/cachorro-simples-limpo.png", position: "center", size: "cover" },
    "Especial": { image: "/products/cachorro-especial-limpo.png", position: "center", size: "cover" },
    "Pitbull": { image: "/products/cachorro-pitbull-limpo.png", position: "center", size: "cover" },
  },
  "Bifanas": {
    "Simples": { image: "/products/bifana-simples-limpa.png", position: "center", size: "cover" },
    "Especial": { image: "/products/bifana-especial-limpa.png", position: "center", size: "cover" },
    "Super": { image: "/products/bifana-super-limpa.png", position: "center", size: "cover" },
  },
  "Porções & batatas": {
    "Simples": { image: "/products/batata-simples-restaurada.png", position: "center", size: "cover" },
    "Bacon + Cheddar": { image: "/products/bacon-cheddar-restaurada.png", position: "center", size: "cover" },
    "Suprema": { image: "/products/batata-suprema-restaurada.png", position: "center", size: "cover" },
  },
  "Kebabs": {
    "Kebab misto": { image: "/products/kebab-misto.jpg", position: "center", size: "cover" },
  },
  "Pratos & extras": {
    "Banquete dos Deuses": { image: "/products/banquete-dos-deuses-limpo.png", position: "center", size: "cover" },
    "Entremeada": { image: "/products/entremeada-limpa.png", position: "center", size: "cover" },
    "Prego": { image: "/products/prego-limpo.png", position: "center", size: "cover" },
  },
  "Vinhos": {
    "Vinho branco — copo": beverageArt.wine,
    "Vinho tinto — copo": beverageArt.wine,
  },
  "Refrigerantes & águas": {
    "Coca-Cola": { image: "/beverages/black/coca-cola.png", position: "center", size: "contain" },
    "Fanta": { image: "/beverages/black/fanta-laranja.png", position: "center", size: "contain" },
    "Guaraná Antarctica": { image: "/beverages/black/guarana.png", position: "center", size: "contain" },
    "Sprite": { image: "/beverages/black/sprite.png", position: "center", size: "contain" },
    "Fuze Tea Pêssego": { image: "/beverages/black/fuze-tea-pessego.png", position: "center", size: "contain" },
    "Lipton Ice Tea Limão": { image: "/beverages/black/lipton-limao.png", position: "center", size: "contain" },
    "Lipton Ice Tea Pêssego": { image: "/beverages/black/lipton-pessego.png", position: "center", size: "contain" },
    "Lipton Ice Tea Laranja & Manga": { image: "/beverages/black/lipton-laranja-manga.png", position: "center", size: "contain" },
    "Água Castelo": { image: "/beverages/black/agua-castello.png", position: "center", size: "contain" },
    "Sumol Laranja": { image: "/beverages/black/sumol-laranja.png", position: "center", size: "contain" },
    "Sumol Ananás": { image: "/beverages/black/sumol-ananas.png", position: "center", size: "contain" },
    "7UP": { image: "/beverages/black/7up.png", position: "center", size: "contain" },
    "Red Bull": { image: "/beverages/black/red-bull.png", position: "center", size: "contain" },
    "Água 500 ml": beverageArt.water500,
    "Água 1,5 L": beverageArt.water1500,
    "Água das Pedras": { image: "/beverages/black/agua-pedras.png", position: "center", size: "contain" },
    "Água Tónica Schweppes": { image: "/beverages/black/schweppes.png", position: "center", size: "contain" },
  },
  "Cervejas & sidra": {
    ...Object.fromEntries(["Imperial Sagres", "Imperial Sagres média", "Imperial Sagres grande"].map((name) => [name, { image: "/beverages/black/imperial-sagres-disposable-plastic-cup.png", position: "center", size: "cover" }])),
    "Sagres mini": { image: "/beverages/black/sagres-mini-25cl-glass.png", position: "center", size: "contain" },
    "Sagres média": { image: "/beverages/black/sagres-glass.png", position: "center", size: "contain" },
    "Super Bock mini": { image: "/beverages/black/super-bock-mini-glass.png", position: "center", size: "contain" },
    "Super Bock média": { image: "/beverages/black/super-bock-media-glass.png", position: "center", size: "contain" },
    "Heineken": { image: "/beverages/black/heineken.png", position: "center", size: "contain" },
    "Corona": { image: "/beverages/black/corona-glass.png", position: "center", size: "contain" },
    "Somersby Maçã mini": { image: "/beverages/black/somersby.png", position: "center", size: "contain" },
    "Somersby Maçã média": { image: "/beverages/black/somersby.png", position: "center", size: "contain" },
  },
  "Whisky & licores": {
    "Red Label": { image: "/beverages/black/red-label.png", position: "center", size: "contain" },
    "Grant’s": { image: "/beverages/black/grants.png", position: "center", size: "contain" },
    "Beirão": { image: "/beverages/black/beirao.png", position: "center", size: "contain" },
  },
  "Café": { "Café": beverageArt.coffee },
};

const categoryIconPaths: Record<string, string[]> = {
  "Hambúrgueres": ["M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6l8-3Z", "M9 9h6", "M12 7v8"],
  Cachorros: ["m5 19 14-14", "m15 5 4 4", "m5 15 4 4", "M14 4l2-2 2 2-1 3"],
  Bifanas: ["m6 20 7-7", "M11 4c4-2 8 0 9 3l-7 7-4-4 2-6Z", "M5 17l2 2", "M4 21l3-3"],
  "Porções & batatas": ["M4 9l3 3 5-7 5 7 3-3-2 11H6L4 9Z", "M7 16h10", "M9 12h6"],
  Kebabs: ["M12 3v18", "m9 6 3-3 3 3-3 3-3-3Z", "M8 13h8", "M9 18h6", "m10 21 2-2 2 2"],
  "Pratos & extras": ["M5 15V9a7 7 0 0 1 14 0v6", "M4 15h16", "M7 15v4", "M17 15v4", "M7 19h10", "M9 8V5l3-2 3 2v3"],
  Vinhos: ["M7 3h10l-1 7a4 4 0 0 1-8 0L7 3Z", "M12 14v7", "M9 21h6", "M8 8h8"],
  "Refrigerantes & águas": ["M10 3h4", "M11 3v4l-4 7a5 5 0 0 0 10 0l-4-7V3", "M8 15h8", "m10 12 1-1", "m14 13 1-1"],
  "Cervejas & sidra": ["M5 7h11v13H5V7Z", "M16 10h2a3 3 0 0 1 0 6h-2", "M6 7c0-3 3-4 5-2 2-2 5 0 5 2", "M8 11v6", "M12 11v6"],
  "Whisky & licores": ["M4 6c5 0 9 2 13 6", "M17 12c2 1 3 3 2 5-2 3-7 3-10 1-3-2-4-7-5-12Z", "M6 8l4 10", "M17 12l3-2"],
  Café: ["M5 10h14l-2 9H7l-2-9Z", "M7 10c0-4 10-4 10 0", "M9 6V3", "m12 6 1-3", "m15 7 2-3", "M4 21h16"],
};

function CategoryIcon({ category }: { category: string }) {
  return <svg className="category-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {(categoryIconPaths[category] ?? categoryIconPaths["Pratos & extras"]).map((path) => <path d={path} key={path}/>) }
  </svg>;
}

export default function Home() {
  const categories = Object.keys(menu);
  const [active, setActive] = useState(categories[0]);
  const [query, setQuery] = useState("");
  const items = useMemo(() => menu[active].filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [active, query]);

  return (
    <main>
      <header className="hero">
        <div className="ember ember-one" /><div className="ember ember-two" />
        <nav><span className="brand-mark">RM</span><a href="#menu">VER EMENTA ↓</a></nav>
        <div className="hero-copy">
          <p className="eyebrow">SABORES DIGNOS DE VALHALLA</p>
          <h1>ROULOTE<br/><span>DO MARCELO</span></h1>
          <p className="lead">Fome de guerreiro? Escolha o seu favorito e faça o pedido.</p>
          <a className="primary" href="#menu">Explorar ementa <b>→</b></a>
        </div>
        <div className="shield" aria-hidden="true"><span>ᛟ</span><b>FOGO<br/>E SABOR</b></div>
      </header>

      <section className="menu-section" id="menu">
        <div className="section-title"><p>O BANQUETE</p><h2>Escolha sua batalha</h2><span>Ementa reconstruída a partir das artes originais do Roulote do Marcelo.</span></div>
        <label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar na ementa" aria-label="Buscar na ementa"/></label>
        <div className="category-tabs" role="tablist">
          {categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => { setActive(category); setQuery(""); }}><CategoryIcon category={category}/><span>{category}</span></button>)}
        </div>
        <div className="category-head"><div><p>CATEGORIA</p><h3>{active}</h3></div><span>{items.length} {items.length === 1 ? "item" : "itens"}</span></div>
        {categoryImage[active] && <figure className="original-menu"><img src={categoryImage[active]} alt={`Arte original da categoria ${active}`}/><figcaption>Arte original · toque nas categorias para consultar os produtos</figcaption></figure>}
        <div className="cards">
          {items.map((item, index) => {
            const art = productArt[active]?.[item.name];
            return <article className="card" key={item.name}>
            <div className={`food-art art-${index % 4} ${art ? "real-food" : ""}`} style={art ? { backgroundImage: `url(${art.image})`, backgroundPosition: art.position, backgroundSize: art.size ?? "250%", backgroundRepeat: "no-repeat" } : undefined}>{!art && <><CategoryIcon category={active}/><i>Imagem a confirmar</i></>}</div>
            <div className="card-body"><div className="card-top"><h4>{item.name}</h4><strong>{item.price ?? "Preço a confirmar"}</strong></div><p>{item.description}</p>{item.mark && <small>⚠ {item.mark}</small>}</div>
          </article>})}
          {items.length === 0 && <p className="empty">Nenhum item encontrado nesta categoria.</p>}
        </div>
      </section>


      <section className="qr-section"><div className="qr-copy"><p>APONTE A CÂMERA</p><h2>Ementa sempre à mão</h2><span>Leia o QR Code para abrir a ementa online em qualquer telemóvel.</span></div><div className="qr-card"><img src="/qrcode.png" alt="QR Code para abrir a ementa digital"/><small>EMENTA ONLINE</small></div></section>
      <footer>
        <span className="brand-mark">RM</span>
        <div className="footer-copy"><p>Roulote do Marcelo · Ementa digital</p><small>Sabores dignos de Valhalla</small></div>
        <div className="developer-contact">
          <span>Desenvolvedor: <strong>Wendel Silva</strong></span>
          <a className="developer-whatsapp" href="https://wa.me/5521991902018" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="mailto:djwendelrj@gmail.com">djwendelrj@gmail.com</a>
        </div>
      </footer>
    </main>
  );
}
