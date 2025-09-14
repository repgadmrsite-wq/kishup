/* assets/app.js — Heyoola Kiosk logic (vanilla JS) */

(function(){
  const BRAND = { name:"هیولا", tagline:"ساندویچ سرد", accent:"#6b8afd", primary:"#0ee3a8", glow:"#a78bfa", logo:"img/logo-sullivan.webp" };
  const DISCOUNT = { percent:0.15, startHour:18, endHour:20 };
  const ORDER_START = 500;

  const MENU = [
    { id:"oscar", name:"اُسکار (ویژه)", img:"img/oscar-mortadella60.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:170000},{id:"250",label:"۲۵۰ گرم",price:260000},{id:"350",label:"۳۵۰ گرم",price:320000}],
      extra:{step:50, unitPrice:50000}, customizable:true
    },
    { id:"mix-90", name:"ژامبون مخلوط ۹۰٪", img:"img/angrybirds-mix.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:120000},{id:"250",label:"۲۵۰ گرم",price:200000},{id:"350",label:"۳۵۰ گرم",price:240000}],
      extra:{step:50, unitPrice:45000}, customizable:true
    },
    { id:"pepperoni", name:"پپرونی", img:"img/dragon-pepperoni.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:140000},{id:"250",label:"۲۵۰ گرم",price:200000},{id:"350",label:"۳۵۰ گرم",price:260000}],
      extra:{step:50, unitPrice:45000}, customizable:true
    },
    { id:"olivieh", name:"سالاد الویه", img:"img/olivieh-sandwich.webp",
      sizes:[{id:"mini",label:"مینی",price:90000},{id:"single",label:"تک",price:120000}],
      extra:{step:50, unitPrice:0}, customizable:false
    },
  ];

  const DRINKS = [
    { id:"cola-pet", name:"نوشابه", price:25000, img:"img/drink-soda-pet.webp" },
    { id:"cola-family", name:"نوشابه خانواده 1.5L", price:55000, img:"img/drink-soda-family-1_5L.webp" },
    { id:"delester-can", name:"دلستر قوطی", price:30000, img:"img/drink-malt-can.webp" },
    { id:"doogh", name:"دوغ", price:20000, img:"img/drink-doogh-single.webp" },
    { id:"lemonade", name:"لیموناد", price:30000, img:"img/drink-lemonade-bottle.webp" },
    { id:"water", name:"آب معدنی", price:15000, img:"img/drink-water-small.webp" },
  ];

  const FREE = [
    { id:"pickle", label:"خیارشور" },
    { id:"potato", label:"سیب‌زمینی" },
    { id:"greens", label:"کاهو و سبزی" },
    { id:"tomato", label:"گوجه" },
  ];
  const SAUCES = [
    { id:"mayo", label:"مایونز" },
    { id:"ketchup", label:"کچاپ" },
    { id:"mustard", label:"خردل" },
    { id:"special", label:"سس ویژه" },
  ];
  const LEVELS = [
    { id:-1, label:"نریزید" }, { id:0, label:"کم" }, { id:1, label:"عادی" }, { id:2, label:"زیاد" }, { id:3, label:"خیلی زیاد" },
  ];

  const el = (sel, root=document)=> root.querySelector(sel);
  const els = (sel, root=document)=> Array.from(root.querySelectorAll(sel));
  const fmt = n => (n||0).toLocaleString("fa-IR") + " تومان";
  const vibrate = ms => { try{ navigator.vibrate && navigator.vibrate(ms||12); }catch(e){} };
  const play = id => { try{ const a = el('#'+id); if(a){ a.currentTime=0; a.play(); } }catch(e){} };

  // State
  const state = {
    step:0,
    isHappy:false, countdown:"", nextCountdown:"",
    selectedId: MENU[0].id,
    sizeId: MENU[0].sizes[0].id,
    freeLevels: Object.fromEntries(FREE.map(f=>[f.id,1])),
    sauceLevels: Object.fromEntries(SAUCES.map(s=>[s.id,1])),
    extraGrams: 0,
    drinks: Object.fromEntries(DRINKS.map(d=>[d.id,0])),
    cart: [],
    orderSeq: ORDER_START-1,
    submitted: false,
    checkoutItems: []
  };

  // Daily order reset
  function initOrderSeq(){
    try{
      const today = new Date().toISOString().slice(0,10);
      const day = localStorage.getItem('hy_day')||'';
      let seq = Number(localStorage.getItem('hy_seq')||String(ORDER_START-1))||0;
      if(day!==today){ seq = ORDER_START-1; localStorage.setItem('hy_day', today); }
      state.orderSeq = seq;
    }catch(e){}
  }
  initOrderSeq();

  function selectedItem(){ return MENU.find(m=>m.id===state.selectedId) || MENU[0]; }
  function selectedSize(){ const it = selectedItem(); return it.sizes.find(s=>s.id===state.sizeId) || it.sizes[0]; }

  // Happy hour ticker
  function updateHappy(){
    const now = new Date();
    const s = new Date(); s.setHours(DISCOUNT.startHour,0,0,0);
    const e = new Date(); e.setHours(DISCOUNT.endHour,0,0,0);
    const active = now>=s && now<e;
    state.isHappy = active;
    const toHH = (ms)=>{ const h=Math.floor(ms/3600000), m=Math.floor((ms%3600000)/60000), sec=Math.floor((ms%60000)/1000); return h>0? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`; };
    if(active){ state.countdown = toHH(e-now); state.nextCountdown=""; }
    else{
      let nx = s; if(now>=e){ nx = new Date(now); nx.setDate(now.getDate()+1); nx.setHours(DISCOUNT.startHour,0,0,0); }
      state.nextCountdown = toHH(nx-now); state.countdown="";
    }
    renderHeader();
  }
  setInterval(updateHappy, 1000); updateHappy();

  // Price calc
  function prices(){
    const it = selectedItem(), sz = selectedSize();
    const base = sz.price;
    const extraSteps = it.extra.unitPrice>0 ? Math.floor(state.extraGrams / it.extra.step) : 0;
    const extraPrice = extraSteps * it.extra.unitPrice;
    const drinksPrice = Object.entries(state.drinks).reduce((s,[id,q])=>{
      const d = DRINKS.find(x=>x.id===id); return s + (d? d.price*q : 0);
    }, 0);
    const subtotal = base + extraPrice + drinksPrice;
    const total = state.isHappy ? Math.round(subtotal * (1 - DISCOUNT.percent)) : subtotal;
    const cartTotal = state.cart.reduce((s,i)=>s+(i.total||0),0);
    return { base, extraSteps, extraPrice, drinksPrice, subtotal, total, cartTotal };
  }

  function snapshotCurrent(){
    const {base, extraPrice, drinksPrice, subtotal, total} = prices();
    return {
      id: Date.now()+Math.random(),
      name: selectedItem().name,
      sizeLabel: selectedSize().label,
      basePrice: base,
      extraGrams: state.extraGrams,
      extraPrice, drinks: {...state.drinks}, drinksPrice,
      freeLevels:{...state.freeLevels}, sauceLevels:{...state.sauceLevels},
      total
    };
  }

  // Renderers
  const app = el("#app");
  app.innerHTML = [
    '<div class="hh-wrap no-print"><div id="hh" class="hh"></div><div class="progress"><div id="pbar" class="bar" style="width:0%"></div></div></div>',
    '<div id="content"></div>',
    '<div class="bottom no-print"><div id="bottom" class="inner"></div></div>',
    '<div id="modals"></div>'
  ].join("");

  function renderHeader(){
    const hh = el("#hh");
    if (hh) {
      hh.innerHTML = state.isHappy
      ? `<div class="brand"><div class="logo"><img src="${BRAND.logo}" alt="لوگو"></div><div>هیولا</div></div><div>ساعت طلایی! ۱۵٪ تخفیف – پایان در <b class="timer">${state.countdown}</b></div>`
      : `<div class="brand"><div class="logo"><img src="${BRAND.logo}" alt="لوگو"></div><div>هیولا</div></div><div>ساعت طلایی امروز ۱۸ تا ۲۰ • شروع تا <b class="timer">${state.nextCountdown}</b></div>`;
    }
    const p = el("#pbar");
    if (p) {
      p.style.width = ( (state.step+1) / 6 ) * 100 + "%";
    }
  }

  function renderBottom(){
    const b = el("#bottom");
    const { total, cartTotal } = prices();
    const orderTotal = cartTotal + total;
    const nextDisabled = (state.step===0 && !state.selectedId) || (state.step===1 && !state.sizeId);
    b.innerHTML = `
      <button class="btn" ${state.step===0?'disabled':''} id="prevBtn">قبلی</button>
      <button class="btn" id="cartBtn">سبد (${state.cart.length})</button>
      <div class="total-badge">${state.isHappy?'<span class="muted">جمع سفارش (با تخفیف):</span>':'جمع سفارش:'} <b>${fmt(orderTotal)}</b></div>
      <button class="btn primary" id="nextBtn" ${nextDisabled?'disabled':''}>${state.step>=5?'پایان':'بعدی'}</button>
    `;
    el("#prevBtn") && el("#prevBtn").addEventListener("click", ()=>{
      let prev = state.step-1; if(state.step===4 && !selectedItem().customizable) prev=1; state.step = Math.max(0,prev); render();
    });
    el("#cartBtn").addEventListener("click", ()=> openCart());
    el("#nextBtn").addEventListener("click", ()=>{
      if(nextDisabled) return;
      let nxt = state.step+1;
      if(nxt===2 && !selectedItem().customizable) nxt = 4;
      state.step = Math.min(5, nxt);
      render();
    });
  }

  function render(){
    renderHeader();
    const c = el("#content");
    const it = selectedItem();
    const { base, extraPrice, drinksPrice, subtotal, total, cartTotal } = prices();

    if(state.step===0){
      // Step 1: pick sandwich
      const TOP = ["oscar","mix-90","pepperoni"];
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ۱) انتخاب ساندویچ</h2>
          <div class="quick-grid">
            ${TOP.map(id=>{
              const t = MENU.find(m=>m.id===id);
              return `<div class="quick-card" data-id="${t.id}">
                <img src="${t.img||''}" alt=""/>
                <div>
                  <div class="quick-title">${t.name}</div>
                  <div class="quick-sub">از ${fmt(t.sizes[0].price)} تا ${fmt(t.sizes[t.sizes.length-1].price)}</div>
                </div>
              </div>`;
            }).join("")}
          </div>
          <div class="divider"></div>
          <div class="menu-grid">
            ${MENU.map(m=>`
              <div class="menu-card ${state.selectedId===m.id?'active':''}" data-id="${m.id}">
                <img src="${m.img||''}" alt=""/>
                <div>
                  <div class="menu-title">${m.name}</div>
                  <div class="menu-sub">از ${fmt(m.sizes[0].price)} تا ${fmt(m.sizes[m.sizes.length-1].price)}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `;
      els(".quick-card", c).forEach(card=>card.addEventListener("click", e=>{
        state.selectedId = card.getAttribute("data-id");
        state.sizeId = selectedItem().sizes[0].id;
        state.extraGrams = 0;
        state.freeLevels = Object.fromEntries(FREE.map(f=>[f.id,1]));
        state.sauceLevels = Object.fromEntries(SAUCES.map(s=>[s.id,1]));
        state.drinks = Object.fromEntries(DRINKS.map(d=>[d.id,0]));
        play("ding");
        render();
      }));
      els(".menu-card", c).forEach(card=>card.addEventListener("click", e=>{
        state.selectedId = card.getAttribute("data-id");
        play("ding"); render();
      }));
    }

    if(state.step===1){
      // Step 2: size
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ۲) انتخاب سایز / وزن</h2>
          <div class="quick-grid" style="grid-template-columns:repeat(${it.sizes.length},minmax(0,1fr))">
            ${it.sizes.map(s=>`
              <button class="btn ${state.sizeId===s.id?'primary':''}" data-size="${s.id}">
                <div style="font-weight:900">${s.label}</div>
                <div style="font-size:12px;color:#cbd5e1">${fmt(s.price)}</div>
              </button>
            `).join("")}
          </div>
        </section>
      `;
      els("button[data-size]", c).forEach(b=>b.addEventListener("click", ()=>{
        state.sizeId = b.getAttribute("data-size"); play("ding"); render();
      }));
    }

    if(state.step===2 && it.customizable){
      // Step 3: free addons
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ۳) مخلفات رایگان</h2>
          <div class="level">
            ${FREE.map(f=>`
              <div>
                <div style="margin:6px 0;font-weight:700">${f.label}</div>
                <div class="row">
                  ${LEVELS.map(l=>`
                    <button class="btn" data-free="${f.id}" data-val="${l.id}" aria-pressed="${state.freeLevels[f.id]===l.id}">${l.label}</button>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `;
      els("button[data-free]", c).forEach(b=>b.addEventListener("click", ()=>{
        const id=b.getAttribute("data-free"); const v=Number(b.getAttribute("data-val"));
        state.freeLevels = { ...state.freeLevels, [id]: v };
        vibrate(12); play("ding"); render();
      }));
    }

    if((state.step===3 && it.customizable) || (state.step===2 && !it.customizable)){
      // Step 4: sauces (if customizable)
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ۴) سس‌ها</h2>
          ${it.customizable? `
          <div class="level">
            ${SAUCES.map(s=>`
              <div>
                <div style="margin:6px 0;font-weight:700">${s.label}</div>
                <div class="row">
                  ${LEVELS.map(l=>`
                    <button class="btn" data-sauce="${s.id}" data-val="${l.id}" aria-pressed="${state.sauceLevels[s.id]===l.id}">${l.label}</button>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>` : `<div class="menu-sub">این آیتم قابل شخصی‌سازی نیست.</div>`}
        </section>
      `;
      els("button[data-sauce]", c).forEach(b=>b.addEventListener("click", ()=>{
        const id=b.getAttribute("data-sauce"); const v=Number(b.getAttribute("data-val"));
        state.sauceLevels = { ...state.sauceLevels, [id]: v };
        vibrate(12); play("ding"); render();
      }));
    }

    if(state.step===4){
      // Step 5: extra & drinks
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ۵) افزودنی‌های پولی و نوشیدنی</h2>
          <div class="grid" style="display:grid;gap:12px;grid-template-columns:${(it.customizable && it.extra.unitPrice>0)?'repeat(2,minmax(0,1fr))':'repeat(1,minmax(0,1fr))'}">
            ${(it.customizable && it.extra.unitPrice>0)?`
            <div class="slider-wrap">
              <div style="font-weight:700;margin-bottom:6px">کالباس اضافه</div>
              <input type="range" min="0" max="200" step="${it.extra.step}" value="${state.extraGrams}" id="extraRange"/>
              <div class="range-meta"><span>افزایش: ${state.extraGrams} گرم</span><span>+${fmt((Math.floor(state.extraGrams/it.extra.step))*it.extra.unitPrice)}</span></div>
            </div>`:''}
            <div>
              <div style="font-weight:700;margin-bottom:6px">نوشیدنی‌ها</div>
              <div class="drinks">
                ${DRINKS.map(d=>`
                  <div class="drink">
                    <div style="display:flex;align-items:center;gap:10px">
                      <img src="${d.img||''}" alt=""/>
                      <div>
                        <div class="name">${d.name}</div>
                        <div style="font-size:12px;color:#cbd5e1">${fmt(d.price)} / عدد</div>
                      </div>
                    </div>
                    <div class="qty">
                      <button data-drink="${d.id}" data-d="-1">−</button>
                      <div class="n">${state.drinks[d.id]||0}</div>
                      <button data-drink="${d.id}" data-d="1">+</button>
                    </div>
                  </div>
                `).join("")}
              </div>
              <div style="text-align:right;margin-top:8px;font-size:13px;color:#cbd5e1">هزینه نوشیدنی‌ها: <b>${fmt(drinksPrice)}</b></div>
            </div>
          </div>
        </section>
      `;
      const extra = el("#extraRange", c);
      extra && extra.addEventListener("input", e=>{
        state.extraGrams = Number(extra.value); vibrate(10);
        renderBottom(); // update price in badge
        // do not full re-render to keep slider smooth
      });
      els("button[data-drink]", c).forEach(b=>b.addEventListener("click", ()=>{
        const id=b.getAttribute("data-drink"); const d=Number(b.getAttribute("data-d"));
        const q=Math.max(0,(state.drinks[id]||0)+d);
        state.drinks = { ...state.drinks, [id]: q };
        play("ding"); render();
      }));
    }

    if(state.step===5){
      // Step 6: review & add/checkout
      const orderTotal = cartTotal + total;
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ۶) مرور و ثبت</h2>
          <div class="preview" style="margin-bottom:10px">
            <div style="font-size:13px;color:#cbd5e1">* پیش‌نمایش مفهومی (SVG ساده)</div>
          </div>
          <div style="display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))">
            <div>
              <div style="display:flex;justify-content:space-between"><div>ساندویچ</div><div><b>${it.name}</b></div></div>
              <div style="display:flex;justify-content:space-between"><div>سایز</div><div><b>${selectedSize().label}</b></div></div>
              <div style="display:flex;justify-content:space-between"><div>هزینه نوشیدنی</div><div><b>${fmt(drinksPrice)}</b></div></div>
              ${state.isHappy? `<div style="display:flex;justify-content:space-between"><div>تخفیف ۱۵٪</div><div><b>− ${fmt(subtotal-total)}</b></div></div>` : ''}
              <div class="divider"></div>
              <div style="display:flex;justify-content:space-between"><div>مبلغ این آیتم</div><div><b>${fmt(total)}</b></div></div>
              <div style="display:flex;justify-content:space-between"><div>جمع سفارش تا این لحظه</div><div><b>${fmt(orderTotal)}</b></div></div>
            </div>
            <div class="no-print" style="display:grid;gap:8px;align-content:start">
              <button class="btn" id="addCart">افزودن به سبد و ساخت ساندویچ بعدی</button>
              <button class="btn primary" id="payPrint">پرداخت و چاپ</button>
              <div style="font-size:12px;color:#cbd5e1">برای چند سفارش: آیتم را به سبد اضافه کن؛ در پایان پرداخت و چاپ.</div>
            </div>
          </div>
        </section>
      `;
      el("#addCart").addEventListener("click", ()=>{
        state.cart.push( snapshotCurrent() );
        state.step = 0; play("ding"); render();
      });
      el("#payPrint").addEventListener("click", ()=>{
        // finalize order
        const items = [...state.cart, snapshotCurrent()];
        state.cart = []; state.checkoutItems = items;
        try{
          const today = new Date().toISOString().slice(0,10);
          const day = localStorage.getItem('hy_day')||'';
          let seq = Number(localStorage.getItem('hy_seq')||String(ORDER_START-1))||0;
          if(day!==today){ localStorage.setItem('hy_day', today); seq = ORDER_START-1; }
          seq += 1; localStorage.setItem('hy_seq', String(seq)); state.orderSeq = seq;
        }catch(e){}
        state.submitted = true;
        play("success");
        openReceipt();
      });
    }

    renderBottom();
  }

  function openCart(){
    const m = el("#modals");
    const cartTotal = state.cart.reduce((s,i)=>s+(i.total||0),0);
    m.innerHTML = `
      <div class="modal">
        <div class="card">
          <div style="font-weight:900;font-size:18px;margin-bottom:10px">سبد سفارش – ${state.cart.length} آیتم</div>
          <div style="max-height:45vh;overflow:auto">
            ${state.cart.length? state.cart.map(it=>`
              <div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px dashed rgba(255,255,255,.08)">
                <div>
                  <div style="font-weight:800">${it.name} – ${it.sizeLabel}</div>
                  <div style="font-size:12px;color:#cbd5e1">${Object.entries(it.drinks).filter(([,q])=>q>0).map(([id,q])=>{
                    const d = DRINKS.find(x=>x.id===id); return (d? d.name:id) + " ×" + q;
                  }).join("، ")||"—"}</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="font-weight:900">${fmt(it.total)}</div>
                  <button class="btn" data-remove="${it.id}">حذف</button>
                </div>
              </div>
            `).join("") : '<div class="menu-sub">سبد خالی است.</div>'}
          </div>
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between"><div class="menu-sub">جمع سبد</div><div><b>${fmt(cartTotal)}</b></div></div>
          <div style="display:flex;gap:8px;margin-top:10px">
            <button class="btn" id="closeCart">افزودن ساندویچ دیگر</button>
            <button class="btn primary" id="checkout" ${state.cart.length?'':'disabled'}>اتمام سفارش</button>
          </div>
        </div>
      </div>
    `;
    els("button[data-remove]", m).forEach(b=>b.addEventListener("click", ()=>{
      const id = Number(b.getAttribute("data-remove"));
      state.cart = state.cart.filter(x=>x.id!==id);
      openCart();
    }));
    el("#closeCart").addEventListener("click", ()=>{ m.innerHTML=""; });
    el("#checkout").addEventListener("click", ()=>{
      state.checkoutItems = [...state.cart];
      state.cart = [];
      state.submitted = true;
      openReceipt();
    });
    m.addEventListener("click", e=>{ if(e.target.classList.contains("modal")) m.innerHTML=""; }, { once:true });
  }

  function openReceipt(){
    const m = el("#modals");
    const total = state.checkoutItems.reduce((s,i)=>s+(i.total||0),0);
    const orderNo = state.orderSeq; // already updated
    m.innerHTML = `
      <div class="modal">
        <div class="card">
          <div style="text-align:center;font-weight:900;font-size:22px;color:#7ee7d2">سفارش ثبت شد</div>
          <div style="text-align:center;margin-top:4px;color:#cbd5e1">شمارهٔ سفارش: <b>${orderNo}</b></div>
          <div class="divider"></div>
          <div style="max-height:45vh;overflow:auto">
            ${state.checkoutItems.map((it,idx)=>`
              <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed rgba(255,255,255,.08)">
                <div><b>${idx+1}.</b> ${it.name} – ${it.sizeLabel}</div>
                <div><b>${fmt(it.total)}</b></div>
              </div>
            `).join("")}
            <div style="display:flex;justify-content:space-between;padding-top:8px">
              <div class="menu-sub">جمع کل</div><div><b>${fmt(total)}</b></div>
            </div>
          </div>
          <div style="display:flex;gap:8px;margin-top:10px">
            <button class="btn" id="printBtn">چاپ رسید</button>
            <button class="btn primary" id="newBtn">سفارش جدید</button>
          </div>
        </div>
      </div>
    `;
    el("#printBtn").addEventListener("click", ()=>{
      // Build a simple print receipt
      const w = window.open("", "_blank", "width=400,height=600");
      if(!w) return;
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>رسید</title><style>
        @page{ size:58mm auto; margin:0 } body{ margin:0 } .receipt{ width:58mm; padding:4mm; font:12px/1.5 monospace; }
        .center{text-align:center} .big{font-size:16px;font-weight:700} .cut{border-top:1px dashed #000;margin:8px 0}
      </style></head><body>
      <div class="receipt">
        <div class="center big">هیولا</div>
        <div class="center">شماره سفارش: ${orderNo}</div>
        <div class="cut"></div>
        ${state.checkoutItems.map((it,idx)=>{
          let detailsHtml = '';
          const customizations = [];
          if (it.freeLevels) {
            Object.entries(it.freeLevels).forEach(([id, level]) => {
              if (level !== 1) {
                const freebie = FREE.find(f => f.id === id);
                const levelInfo = LEVELS.find(l => l.id === level);
                if (freebie && levelInfo) customizations.push(`${freebie.label}: ${levelInfo.label}`);
              }
            });
          }
          if (it.sauceLevels) {
            Object.entries(it.sauceLevels).forEach(([id, level]) => {
              if (level !== 1) {
                const sauce = SAUCES.find(s => s.id === id);
                const levelInfo = LEVELS.find(l => l.id === level);
                if (sauce && levelInfo) customizations.push(`${sauce.label}: ${levelInfo.label}`);
              }
            });
          }
          if (it.extraGrams > 0) {
            customizations.push(`کالباس اضافه: ${it.extraGrams} گرم`);
          }
          if (customizations.length) {
            detailsHtml = `<div style="font-size:10px; text-align:right; padding-right:10px;">${customizations.join(' • ')}</div>`;
          }
          return `<div>${idx+1}. ${it.name} – ${it.sizeLabel}<span style="float:left">${fmt(it.total)}</span></div>${detailsHtml}`;
        }).join("")}
        <div class="cut"></div>
        <div>جمع کل <span style="float:left"><b>${fmt(total)}</b></span></div>
        <div class="cut"></div>
        <div class="center">از سفارش شما متشکریم</div>
      </div>
      <script>window.onload=()=>{window.print(); setTimeout(()=>window.close(), 400);}</script>
      </body></html>`;
      w.document.open(); w.document.write(html); w.document.close();
    });
    el("#newBtn").addEventListener("click", ()=>{
      state.submitted=false; state.checkoutItems=[]; state.step=0; render(); m.innerHTML="";
    });
  }

  // initial render
  render();

  // PWA: register SW
  if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
      navigator.serviceWorker.register('assets/sw.js', { scope:'./' }).catch(()=>{});
    });
  }

})();
