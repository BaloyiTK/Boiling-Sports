import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Heart, Menu, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Trash2, X } from "lucide-react";
import { products, categories } from "./data/products";

const slides = [
  { eyebrow: "THE ART OF EVERYDAY CARE", title: "Care for your", accent: "everyday.", copy: "Thoughtful essentials, uncomplicated routines. Discover a considered approach to everyday skin.", action: "Explore the collection", category: "All products", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1500&auto=format&fit=crop&q=90", alt: "Skincare bottles arranged in soft natural light" },
  { eyebrow: "A MORE CONSIDERED ROUTINE", title: "Make space for", accent: "your skin.", copy: "The everyday essentials: a gentle cleanse, considered care and daily protection.", action: "Find your essentials", category: "Face care", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1500&auto=format&fit=crop&q=90", alt: "A considered skincare ritual" },
  { eyebrow: "LESS NOISE. MORE CARE.", title: "The beauty of", accent: "everyday care.", copy: "Simple rituals and thoughtful essentials for the skin you live in.", action: "Shop the edit", category: "Serums", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1500&auto=format&fit=crop&q=90", alt: "A calm facial skincare treatment" }
];
const formatPrice = value => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(value);

export default function App() {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState("All products");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(350);
  const [showFilters, setShowFilters] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem("jade-skincare-cart") || "[]").filter(x => products.some(p => p.id === x.id) && Number.isInteger(x.qty) && x.qty > 0).map(x => ({ ...products.find(p => p.id === x.id), qty: Math.min(x.qty, 99) })); } catch { return []; } });
  const [saved, setSaved] = useState(() => { try { return JSON.parse(localStorage.getItem("jade-skincare-saved") || "[]").filter(id => products.some(p => p.id === id)); } catch { return []; } });
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [paused, setPaused] = useState(false);

  useEffect(() => { try { localStorage.setItem("jade-skincare-cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem("jade-skincare-saved", JSON.stringify(saved)); } catch {} }, [saved]);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setSlide(n => (n + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);
  useEffect(() => {
    if (!cartOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = e => { if (e.key === "Escape") setCartOpen(false); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", close); };
  }, [cartOpen]);

  const filtered = useMemo(() => {
    const list = products.filter(p => (category === "All products" || (category === "Face care" ? p.category !== "Sunscreen" : p.category === category)) && p.price <= maxPrice && (!saleOnly || p.oldPrice) && (!query || [p.name, p.category, p.description].join(" ").toLowerCase().includes(query.toLowerCase())));
    if (sort === "price-low") list.sort((a,b) => a.price-b.price);
    if (sort === "price-high") list.sort((a,b) => b.price-a.price);
    if (sort === "rating") list.sort((a,b) => b.rating-a.rating);
    return list;
  }, [category, query, sort, maxPrice, saleOnly]);
  const itemCount = cart.reduce((n, p) => n + p.qty, 0);
  const subtotal = cart.reduce((n, p) => n + p.price * p.qty, 0);
  const flash = message => { setNotice(message); window.clearTimeout(flash.timer); flash.timer = window.setTimeout(() => setNotice(""), 2600); };
  const addToBag = product => { setCart(items => items.some(p => p.id === product.id) ? items.map(p => p.id === product.id ? { ...p, qty: Math.min(p.qty + 1, 99) } : p) : [...items, { ...product, qty: 1 }]); flash("Added to your bag"); };
  const updateQty = (id, delta) => setCart(items => items.map(p => p.id === id ? { ...p, qty: p.qty + delta } : p).filter(p => p.qty > 0));
  const resetFilters = () => { setCategory("All products"); setQuery(""); setMaxPrice(350); setSaleOnly(false); setSort("featured"); };

  return <div className="jade-site">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="announcement">A little care goes a long way <span>✳</span> Complimentary delivery on orders over R650</div>
    <header className="site-header">
      <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenu(v => !v)}>{mobileMenu ? <X/> : <Menu/>}</button>
      <a href="#top" className="wordmark" aria-label="Jade Skincare home">jade<span>.</span></a>
      <nav className={mobileMenu ? "main-nav nav-open" : "main-nav"}>
        <a href="#shop" onClick={() => setMobileMenu(false)}>Shop all</a>
        <a href="#shop" onClick={() => { setCategory("Serums"); setMobileMenu(false); }}>Serums</a>
        <a href="#shop" onClick={() => { setCategory("Sunscreen"); setMobileMenu(false); }}>Sun care</a>
        <a href="#story" onClick={() => setMobileMenu(false)}>Our approach</a>
      </nav>
      <div className="header-actions">
        <label className="search-field"><Search size={17}/><input aria-label="Search products" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)}/></label>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${itemCount} items`}><ShoppingBag size={19}/><span>Bag</span><b>{itemCount}</b></button>
      </div>
    </header>

    <main id="main">
      <section className="hero" id="top" aria-label="Featured collection">
        <div className="hero-copy">
          <p className="kicker">{slides[slide].eyebrow}</p>
          <h1>{slides[slide].title}<br/><em>{slides[slide].accent}</em></h1>
          <p className="hero-description">{slides[slide].copy}</p>
          <a className="dark-link" href="#shop" onClick={() => setCategory(slides[slide].category)}>{slides[slide].action}<ArrowUpRight size={16}/></a>
          <div className="hero-controls"><div className="hero-dots">{slides.map((s,i) => <button key={s.eyebrow} onClick={() => setSlide(i)} aria-label={`Show slide ${i+1}`} aria-pressed={slide === i} className={slide === i ? "active" : ""}/>)}</div><span>0{slide+1} <i>/</i> 0{slides.length}</span></div>
        </div>
        <div className="hero-visual" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
          <img key={slide} src={slides[slide].image} alt={slides[slide].alt} fetchPriority={slide === 0 ? "high" : "auto"}/>
          <div className="hero-image-caption"><span>THE JADE EDIT</span><strong>A quieter kind of skincare.</strong></div>
          <div className="hero-arrows"><button aria-label="Previous slide" onClick={() => setSlide(i => (i + slides.length - 1) % slides.length)}><ChevronLeft size={18}/></button><button aria-label="Next slide" onClick={() => setSlide(i => (i + 1) % slides.length)}><ChevronRight size={18}/></button></div>
        </div>
      </section>

      <section className="brand-notes" aria-label="Our values"><span>Thoughtful formulations</span><i>✳</i><span>Everyday rituals</span><i>✳</i><span>Made for your routine</span></section>

      <section className="shop-section" id="shop">
        <div className="section-heading"><div><p className="kicker">THE JADE COLLECTION</p><h2>The everyday <em>edit.</em></h2><p className="section-intro">A thoughtful collection for your daily routine.</p></div><span className="product-count">{filtered.length} products</span></div>
        <div className="category-tabs" aria-label="Product categories">{categories.map(c => <button key={c} className={category === c ? "selected" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <div className="shop-toolbar"><button onClick={() => setShowFilters(v => !v)} aria-expanded={showFilters}><SlidersHorizontal size={15}/> Filter</button><label>Sort <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div>
        {showFilters && <div className="filter-panel"><label>Maximum price <strong>{formatPrice(maxPrice)}</strong><input type="range" min="100" max="350" step="10" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}/></label><label className="sale-filter"><input type="checkbox" checked={saleOnly} onChange={e => setSaleOnly(e.target.checked)}/> Sale items only</label><button onClick={resetFilters}>Clear filters</button></div>}
        {query && <p className="search-summary">Showing results for “{query}” <button onClick={() => setQuery("")}>Clear</button></p>}
        {filtered.length ? <div className="product-grid">{filtered.map((p,i) => <article className="product-card" key={p.id}>
          <div className="product-image-wrap"><img src={p.image} alt={p.name} loading={i > 3 ? "lazy" : "eager"} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x750/f0eee7/687568?text=Jade+Skincare"; }}/>{p.badge && <span className="product-badge">{p.badge}</span>}<button className={saved.includes(p.id) ? "save-product is-saved" : "save-product"} onClick={() => setSaved(a => a.includes(p.id) ? a.filter(id => id !== p.id) : [...a,p.id])} aria-label={saved.includes(p.id) ? "Remove from saved items" : "Save product"}><Heart size={17} fill={saved.includes(p.id) ? "currentColor" : "none"}/></button><button className="quick-add" onClick={() => addToBag(p)}><Plus size={15}/> Add to bag</button></div>
          <div className="product-info"><p className="product-category">{p.category}</p><h3>{p.name}</h3><p className="product-description">{p.description}</p><div className="product-bottom"><strong>{formatPrice(p.price)}</strong><button onClick={() => addToBag(p)} aria-label={`Add ${p.name} to bag`}><Plus size={17}/></button></div></div>
        </article>)}</div> : <div className="empty-results"><h3>Nothing in this edit.</h3><p>Try another search or clear your filters.</p><button onClick={resetFilters}>View all products</button></div>}
      </section>

      <section className="story-section" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1300&auto=format&fit=crop&q=85" alt="A quiet moment in a skincare routine" loading="lazy"/></div><div className="story-copy"><p className="kicker">OUR POINT OF VIEW</p><h2>A thoughtful<br/>way to <em>care.</em></h2><p>We believe good skincare should feel considered, never complicated. Start with the essentials, understand what works for your routine, and make a little room for care each day.</p><a href="#shop">Meet your new essentials <ArrowUpRight size={16}/></a></div></section>

      <section className="newsletter"><div><p className="kicker">STAY IN THE KNOW</p><h2>Notes on<br/><em>everyday care.</em></h2><p>New arrivals, thoughtful skincare notes and a little inspiration.</p></div><form onSubmit={e => { e.preventDefault(); flash("Newsletter signup is a preview and is not connected yet."); e.currentTarget.reset(); }}><input type="email" required placeholder="Your email address" aria-label="Your email address"/><button type="submit">Sign me up <ArrowUpRight size={16}/></button></form></section>
    </main>

    <footer className="site-footer"><a href="#top" className="wordmark">jade<span>.</span></a><p>Thoughtful skincare for your everyday.</p><nav><a href="#shop">Shop</a><a href="#story">Our approach</a></nav><small>© 2026 Jade Skincare. All rights reserved.</small></footer>

    {notice && <div className="toast" role="status" aria-live="polite"><Check size={16}/>{notice}</div>}
    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Your shopping bag" onClick={e => e.stopPropagation()}>
      <div className="drawer-heading"><div><p className="kicker">YOUR JADE EDIT</p><h2>Your bag <span>({itemCount})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X/></button></div>
      {cart.length ? <><div className="delivery-note">{subtotal >= 650 ? "You’ve unlocked complimentary delivery." : `You’re ${formatPrice(650-subtotal)} away from complimentary delivery.`}<div><span style={{width:Math.min(100,subtotal/650*100)+"%"}}/></div></div><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div><small>{item.category}</small><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQty(item.id,-1)}><Minus size={13}/></button><span>{item.qty}</span><button aria-label="Increase quantity" onClick={() => updateQty(item.id,1)}><Plus size={13}/></button></div></div><button className="remove-item" aria-label="Remove item" onClick={() => setCart(items => items.filter(p => p.id !== item.id))}><Trash2 size={16}/></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><button onClick={() => flash("Checkout is a preview. No payment has been taken.")}>Continue to checkout <ArrowRight size={17}/></button><button className="continue-shopping" onClick={() => setCartOpen(false)}>Continue shopping</button></div></> : <div className="empty-bag"><ShoppingBag size={30}/><h3>Nothing in your bag. Yet.</h3><p>Find a few everyday favourites to make your own.</p><button onClick={() => setCartOpen(false)}>Explore the collection</button></div>}
    </aside></div>}
  </div>;
}
