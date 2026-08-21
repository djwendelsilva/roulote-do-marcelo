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
    { name: "Vinho branco — copo", price: "1,20 €", description: "Vinho branco servido a copo." },
    { name: "Vinho tinto — copo", price: "1,50 €", description: "Vinho tinto servido a copo." },
  ],
  "Refrigerantes & águas": [
    { name: "Coca-Cola", price: "1,90 €", description: "Refrigerante." },
    { name: "Fanta", price: "1,90 €", description: "Refrigerante." },
    { name: "Guaraná Antarctica", price: "1,90 €", description: "Refrigerante." },
    { name: "Sprite", price: "1,90 €", description: "Refrigerante." },
    { name: "Fuze Tea", price: "1,90 €", description: "Chá gelado." },
    { name: "Ice Tea", price: "1,90 €", description: "Chá gelado." },
    { name: "Água Castelo", price: "1,90 €", description: "Água com gás." },
    { name: "Sumol", price: "1,90 €", description: "Refrigerante." },
    { name: "7UP", price: "1,90 €", description: "Refrigerante." },
    { name: "Red Bull", price: "3,00 €", description: "Bebida energética." },
    { name: "Água 500 ml", price: "1,00 €", description: "Água mineral, garrafa de 500 ml." },
    { name: "Água 1,5 L", price: "2,00 €", description: "Água mineral, garrafa de 1,5 L." },
    { name: "Água das Pedras", price: "1,90 €", description: "Água com gás." },
    { name: "Água tónica", price: "1,90 €", description: "Água tónica." },
  ],
  "Cervejas & sidra": [
    { name: "Imperial", price: "1,30 €", description: "Cerveja à pressão." },
    { name: "Imperial média", price: "1,60 €", description: "Cerveja à pressão, tamanho médio." },
    { name: "Imperial grande", price: "3,50 €", description: "Cerveja à pressão, tamanho grande." },
    { name: "Sagres mini", price: "1,50 €", description: "Cerveja Sagres mini." },
    { name: "Sagres média", price: "2,00 €", description: "Cerveja Sagres média." },
    { name: "Super Bock mini", price: "1,50 €", description: "Cerveja Super Bock mini." },
    { name: "Super Bock média", price: "2,00 €", description: "Cerveja Super Bock média." },
    { name: "Heineken", price: "2,00 €", description: "Cerveja Heineken." },
    { name: "Corona", price: "2,30 €", description: "Cerveja Corona." },
    { name: "Somersby mini", price: "2,00 €", description: "Sidra Somersby mini." },
    { name: "Somersby média", price: "3,00 €", description: "Sidra Somersby média." },
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

const productArt: Record<string, Record<string, { image: string; position: string; size?: string }>> = {
  "Hambúrgueres": {
    "Ragnar": { image: "/products/ragnar.jpg", position: "18% center", size: "cover" },
    "Björn": { image: "/products/bjorn.jpg", position: "18% center", size: "cover" },
    "Big Alverca": { image: "/products/big-alverca.jpg", position: "18% center", size: "cover" },
    "Thor": { image: "/products/thor.png", position: "22% center", size: "cover" },
    "Floki": { image: "/products/floki.jpg", position: "22% center", size: "cover" },
    "Lagertha": { image: "/products/lagertha.png", position: "18% center", size: "cover" },
    "Vikings Supremo": { image: "/menus/hamburgueres.jpeg", position: "86% 51%", size: "260%" },
    "Odin": { image: "/products/odin.png", position: "18% center", size: "cover" },
    "Simples": { image: "/menus/batatas-lanches-kebab.jpeg", position: "52% 13%", size: "270%" },
    "Duplo": { image: "/menus/batatas-lanches-kebab.jpeg", position: "52% 44%", size: "270%" },
    "Triplo": { image: "/menus/batatas-lanches-kebab.jpeg", position: "52% 73%", size: "270%" },
    "Kids": { image: "/menus/batatas-lanches-kebab.jpeg", position: "57% 96%", size: "280%" },
    "X Salada": { image: "/menus/batatas-lanches-kebab.jpeg", position: "83% 16%", size: "270%" },
    "X Burger": { image: "/menus/batatas-lanches-kebab.jpeg", position: "84% 48%", size: "270%" },
  },
  "Cachorros": {
    "Simples": { image: "/products/cachorro-simples.jpg", position: "18% center", size: "cover" },
    "Especial": { image: "/products/cachorro-especial.jpg", position: "18% center", size: "cover" },
    "Pitbull": { image: "/products/cachorro-pitbull.jpg", position: "18% center", size: "cover" },
  },
  "Bifanas": {
    "Simples": { image: "/products/bifana-simples.jpg", position: "52% center", size: "cover" },
    "Especial": { image: "/products/bifana-especial.jpg", position: "18% center", size: "cover" },
    "Super": { image: "/products/bifana-super.jpg", position: "18% center", size: "cover" },
  },
  "Porções & batatas": {
    "Simples": { image: "/menus/batatas-lanches-kebab.jpeg", position: "22% 18%", size: "260%" },
    "Bacon + Cheddar": { image: "/menus/batatas-lanches-kebab.jpeg", position: "22% 53%", size: "260%" },
    "Suprema": { image: "/menus/batatas-lanches-kebab.jpeg", position: "22% 87%", size: "260%" },
  },
  "Kebabs": {
    "Kebab misto": { image: "/menus/batatas-lanches-kebab.jpeg", position: "84% 88%", size: "240%" },
  },
  "Pratos & extras": {
    "Banquete dos Deuses": { image: "/products/banquete-dos-deuses.jpg", position: "18% center", size: "cover" },
    "Entremeada": { image: "/menus/pratos.jpeg", position: "19% 76%", size: "230%" },
    "Prego": { image: "/menus/pratos.jpeg", position: "81% 72%", size: "230%" },
  },
};

const icon: Record<string, string> = {
  "Hambúrgueres": "ᚱ", Cachorros: "ᚲ", Bifanas: "ᛒ", "Porções & batatas": "ᛃ", Kebabs: "ᚴ", "Pratos & extras": "ᛟ",
  Vinhos: "🍷", "Refrigerantes & águas": "🥤", "Cervejas & sidra": "🍺", "Whisky & licores": "🥃", Café: "☕",
};

export default function Home() {
  const categories = Object.keys(menu);
  const [active, setActive] = useState(categories[0]);
  const [query, setQuery] = useState("");
  const items = useMemo(() => menu[active].filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [active, query]);
  const whatsappNumber = "351000000000";
  const whatsappText = encodeURIComponent("Olá! Quero fazer um pedido no Roulote do Marcelo.");

  return (
    <main>
      <header className="hero">
        <div className="ember ember-one" /><div className="ember ember-two" />
        <nav><span className="brand-mark">RM</span><a href="#menu">VER CARDÁPIO ↓</a></nav>
        <div className="hero-copy">
          <p className="eyebrow">SABORES DIGNOS DE VALHALLA</p>
          <h1>ROULOTE<br/><span>DO MARCELO</span></h1>
          <p className="lead">Fome de guerreiro? Escolha o seu favorito e faça o pedido.</p>
          <a className="primary" href="#menu">Explorar cardápio <b>→</b></a>
        </div>
        <div className="shield" aria-hidden="true"><span>ᛟ</span><b>FOGO<br/>E SABOR</b></div>
      </header>

      <section className="menu-section" id="menu">
        <div className="section-title"><p>O BANQUETE</p><h2>Escolha sua batalha</h2><span>Cardápio reconstruído a partir das artes originais do Roulote do Marcelo.</span></div>
        <label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar no cardápio" aria-label="Buscar no cardápio"/></label>
        <div className="category-tabs" role="tablist">
          {categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => { setActive(category); setQuery(""); }}><b>{icon[category]}</b><span>{category}</span></button>)}
        </div>
        <div className="category-head"><div><p>CATEGORIA</p><h3>{active}</h3></div><span>{items.length} {items.length === 1 ? "item" : "itens"}</span></div>
        {categoryImage[active] && <figure className="original-menu"><img src={categoryImage[active]} alt={`Arte original da categoria ${active}`}/><figcaption>Arte original · toque nas categorias para consultar os produtos</figcaption></figure>}
        <div className="cards">
          {items.map((item, index) => {
            const art = productArt[active]?.[item.name];
            return <article className="card" key={item.name}>
            <div className={`food-art art-${index % 4} ${art ? "real-food" : ""}`} style={art ? { backgroundImage: `url(${art.image})`, backgroundPosition: art.position, backgroundSize: art.size ?? "250%" } : undefined}>{!art && <><span>{icon[active]}</span><i>Imagem a confirmar</i></>}</div>
            <div className="card-body"><div className="card-top"><h4>{item.name}</h4><strong>{item.price ?? "Preço a confirmar"}</strong></div><p>{item.description}</p>{item.mark && <small>⚠ {item.mark}</small>}</div>
          </article>})}
          {items.length === 0 && <p className="empty">Nenhum item encontrado nesta categoria.</p>}
        </div>
      </section>

      <section className="order-panel"><span>ᛟ</span><div><p>PRONTO PARA O BANQUETE?</p><h2>Faça seu pedido</h2><small>O número abaixo é um placeholder configurável.</small></div><a href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`} target="_blank" rel="noreferrer">Pedir pelo WhatsApp <b>↗</b></a></section>

      <section className="qr-section"><div className="qr-copy"><p>APONTE A CÂMERA</p><h2>Cardápio sempre à mão</h2><span>Leia o QR Code para abrir o cardápio online em qualquer telemóvel.</span></div><div className="qr-card"><img src="/qrcode.png" alt="QR Code para abrir o cardápio digital"/><small>CARDÁPIO ONLINE</small></div></section>
      <footer><span className="brand-mark">RM</span><p>Roulote do Marcelo · Cardápio digital</p><small>Sabores dignos de Valhalla</small></footer>
      <a className="floating-whatsapp" href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`} target="_blank" rel="noreferrer" aria-label="Pedir pelo WhatsApp">☏</a>
    </main>
  );
}
