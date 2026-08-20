"use client";

import { useMemo, useState } from "react";

type Item = { name: string; description: string; price?: string; mark?: string };

const menu: Record<string, Item[]> = {
  "Hambúrgueres": [
    { name: "Ragnar", description: "Ingredientes a confirmar com o cardápio original.", mark: "Revisar composição e preço" },
    { name: "Björn", description: "Ingredientes a confirmar com o cardápio original.", mark: "Revisar composição e preço" },
    { name: "Thor", description: "Ingredientes a confirmar com o cardápio original.", mark: "Revisar composição e preço" },
    { name: "Lagertha", description: "Ingredientes a confirmar com o cardápio original.", mark: "Revisar composição e preço" },
  ],
  "Cachorros": [
    { name: "Cachorro", description: "Receita e acompanhamentos a confirmar.", mark: "Revisar conteúdo das fotos" },
    { name: "Cachorro especial", description: "Receita e acompanhamentos a confirmar.", mark: "Revisar conteúdo das fotos" },
  ],
  "Bifanas": [
    { name: "Bifana", description: "Preparação, ingredientes e preço a confirmar.", mark: "Revisar conteúdo das fotos" },
  ],
  "Porções & batatas": [
    { name: "Porção de batatas", description: "Tamanho e preço a confirmar.", mark: "Revisar conteúdo das fotos" },
    { name: "Batata especial", description: "Molhos e complementos a confirmar.", mark: "Revisar conteúdo das fotos" },
  ],
  "Kebabs": [
    { name: "Kebab", description: "Proteína, salada e molhos a confirmar.", mark: "Revisar conteúdo das fotos" },
    { name: "Kebab no prato", description: "Acompanhamentos e preço a confirmar.", mark: "Revisar conteúdo das fotos" },
  ],
  "Pratos & extras": [
    { name: "Prato do guerreiro", description: "Composição a confirmar com o proprietário.", mark: "Nome provisório — revisar" },
    { name: "Extras", description: "Opções e valores a confirmar.", mark: "Revisar conteúdo das fotos" },
  ],
};

const icon: Record<string, string> = {
  "Hambúrgueres": "ᚱ", Cachorros: "ᚲ", Bifanas: "ᛒ", "Porções & batatas": "ᛃ", Kebabs: "ᚴ", "Pratos & extras": "ᛟ",
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
        <div className="section-title"><p>O BANQUETE</p><h2>Escolha sua batalha</h2><span>Produtos em revisão aparecem sinalizados — nenhum texto ilegível foi inventado.</span></div>
        <label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar no cardápio" aria-label="Buscar no cardápio"/></label>
        <div className="category-tabs" role="tablist">
          {categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => { setActive(category); setQuery(""); }}><b>{icon[category]}</b><span>{category}</span></button>)}
        </div>
        <div className="category-head"><div><p>CATEGORIA</p><h3>{active}</h3></div><span>{items.length} {items.length === 1 ? "item" : "itens"}</span></div>
        <div className="cards">
          {items.map((item, index) => <article className="card" key={item.name}>
            <div className={`food-art art-${index % 4}`}><span>{icon[active]}</span><i>Em breve: foto original</i></div>
            <div className="card-body"><div className="card-top"><h4>{item.name}</h4><strong>{item.price ?? "Preço a confirmar"}</strong></div><p>{item.description}</p>{item.mark && <small>⚠ {item.mark}</small>}</div>
          </article>)}
          {items.length === 0 && <p className="empty">Nenhum item encontrado nesta categoria.</p>}
        </div>
      </section>

      <section className="order-panel"><span>ᛟ</span><div><p>PRONTO PARA O BANQUETE?</p><h2>Faça seu pedido</h2><small>O número abaixo é um placeholder configurável.</small></div><a href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`} target="_blank" rel="noreferrer">Pedir pelo WhatsApp <b>↗</b></a></section>

      <section className="qr-section"><div className="qr-copy"><p>APONTE A CÂMERA</p><h2>Cardápio sempre à mão</h2><span>Este QR Code usa uma URL de demonstração. Troque a variável de destino quando o site tiver o endereço final.</span></div><div className="qr-card"><img src="/qrcode.png" alt="QR Code para abrir o cardápio digital"/><small>DEMO LOCAL</small></div></section>
      <footer><span className="brand-mark">RM</span><p>Roulote do Marcelo · Cardápio digital</p><small>Primeira versão para revisão</small></footer>
      <a className="floating-whatsapp" href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`} target="_blank" rel="noreferrer" aria-label="Pedir pelo WhatsApp">☏</a>
    </main>
  );
}
