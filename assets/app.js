/* assets/app.js — Heyoola Kiosk logic (vanilla JS) */

(function(){
  const BRAND = { name:"هیولا", tagline:"ساندویچ سرد", accent:"#6b8afd", primary:"#0ee3a8", glow:"#a78bfa", logo:"img/logo-sullivan.webp" };
  const DISCOUNT = { percent:0.10, startHour:18, endHour:20 };
  const ORDER_START = 500;
  const CHEESE_PRICE = 15000;

  const MENU = [
    // Specials
    { id:"shaun-lamb", name:"بره ناقلا", emoji:"🐑", img:"img/shaun-lamb-fillet.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:250000},{id:"250",label:"۲۵۰ گرم",price:350000},{id:"350",label:"۳۵۰ گرم",price:450000}],
      extra:{step:50, unitPrice:30000}, customizable:true, isSpecial: true,
      theme: {
        className: 'theme-naghola',
        soundId: 'naghola-sound',
        entrySoundId: 'naghola-welcome-sound',
        charImage: 'https://hayola.hornspeed.com/img/naghola.webp',
        entryEffect: 'golden-shower',
        bgGradient: 'radial-gradient(ellipse at 50% 0%, #2c3e50 0%, #0b1020 80%)',
        primaryTheme: '#FFD700',
        accentTheme: '#FFFFFF',
        glowTheme: '#FFD700'
      }
    },
    { id:"hulk-dry", name:"هالک", emoji:"💪", img:"img/hulk-dry-sausage-600.webp",
      sizes:[{id:"600",label:"۶۰۰ گرم",price:500000}],
      extra:{step:0, unitPrice:0}, customizable:false, isSpecial: true,
      theme: {
        className: 'theme-hulk',
        soundId: 'hulk-sound',
        entrySoundId: 'hulk-smash-sound',
        entryEffect: 'hulk-smash',
        bgGradient: 'radial-gradient(circle at 50% 100%, rgba(80, 200, 120, 0.4) 0%, transparent 60%), #1a1a1a',
        primaryTheme: '#50C878',
        accentTheme: '#2E8B57',
        glowTheme: '#50C878',
        charImage: 'img/hulk.webp'
      }
    },
    { id:"sullivan-mix", name:"سالیوان", emoji:"👹", img:"img/sully-mix-pepperoni.webp",
      sizes:[{id:"250",label:"۲۵۰ گرم",price:300000},{id:"350",label:"۳۵۰ گرم",price:400000}],
      extra:{step:50, unitPrice:25000}, customizable:true, isSpecial: true
    },
    // Regular Menu
    { id:"bigfoot-beef", name:"بیگ فوت", emoji:"🦶", img:"img/bigfoot-beef90.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:180000},{id:"250",label:"۲۵۰ گرم",price:270000},{id:"350",label:"۳۵۰ گرم",price:330000}],
      extra:{step:50, unitPrice:20000}, customizable:true
    },
    { id:"ginger-chicken", name:"جینجر", emoji:"🐔", img:"img/ginger-chicken-ham.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:160000},{id:"250",label:"۲۵۰ گرم",price:250000},{id:"350",label:"۳۵۰ گرم",price:310000}],
      extra:{step:50, unitPrice:20000}, customizable:true
    },
    { id:"mario-mushroom", name:"ماریو", emoji:"🍄", img:"img/mario-chicken-mushroom.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:170000},{id:"250",label:"۲۵۰ گرم",price:260000},{id:"350",label:"۳۵۰ گرم",price:320000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-mario',
        soundId: 'mario-sound',
        entrySoundId: 'mario-jump-sound',
        entryEffect: 'mario-bg',
        bgGradient: 'radial-gradient(circle at 90% 10%, #FBD00040, transparent 50%), radial-gradient(circle at 10% 90%, #E5252150, transparent 50%), #00539C',
        primaryTheme: '#FBD000',
        accentTheme: '#E52521',
        glowTheme: '#FBD000',
        charImage: 'img/mario.webp'
      }
    },
    { id:"dragon-pepperoni", name:"دراگون", emoji:"🐉", img:"img/dragon-pepperoni.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:175000},{id:"250",label:"۲۵۰ گرم",price:265000},{id:"350",label:"۳۵۰ گرم",price:325000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-dragon',
        entryEffect: 'fire',
        soundId: 'dragon-sound',
        bgGradient: 'radial-gradient(circle at 80% 90%, #D6282899, transparent 70%), radial-gradient(circle at 20% 20%, #F77F0088, transparent 50%), #050101',
        primaryTheme: '#FCBF49',
        accentTheme: '#F77F00',
        glowTheme: '#D62828',
        charImage: 'img/dragon.webp'
      }
    },
    { id:"oscar-mortadella", name:"اسکار", emoji:"🏆", img:"img/oscar-mortadella60.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:150000},{id:"250",label:"۲۵۰ گرم",price:240000},{id:"350",label:"۳۵۰ گرم",price:300000}],
      extra:{step:50, unitPrice:20000}, customizable:true
    },
    { id:"panda-zhigo", name:"پاندا کونگ فو کار", emoji:"🐼", img:"img/panda-zhigu-beef90.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:180000},{id:"250",label:"۲۵۰ گرم",price:270000},{id:"350",label:"۳۵۰ گرم",price:330000}],
      extra:{step:50, unitPrice:20000}, customizable:true
    },
    { id:"angry-birds-mix", name:"انگری بردز", emoji:"🐦", img:"img/angrybirds-mix.webp",
      sizes:[{id:"300",label:"۳۰۰ گرم",price:320000},{id:"400",label:"۴۰۰ گرم",price:420000}],
      extra:{step:50, unitPrice:20000}, customizable:true
    },
    { id:"patmat-mix", name:"پت و مت", emoji:"🧑‍🤝‍🧑", img:"img/patmat-chicken-beef90.webp",
      sizes:[{id:"250",label:"۲۵۰ گرم",price:280000},{id:"350",label:"۳۵۰ گرم",price:380000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-pat-mat',
        soundId: 'pat-mat-sound',
        entrySoundId: 'pat-mat-sound',
        charImage: 'https://hayola.hornspeed.com/img/pat-mat.webp',
        entryEffect: 'pat-mat-workshop',
        bgGradient: 'radial-gradient(circle at 10% 20%, rgba(239, 68, 68, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 90%, rgba(251, 191, 36, 0.2) 0%, transparent 50%), #3B82F6',
        primaryTheme: '#EF4444', // Red
        accentTheme: '#FBBF24', // Yellow
        glowTheme: '#3B82F6'      // Blue
      }
    },
    { id:"tweety-smoked", name:"تویی تی", emoji:"🐤", img:"img/tweety-smoked-chicken.webp",
      sizes:[{id:"250",label:"۲۵۰ گرم",price:260000},{id:"350",label:"۳۵۰ گرم",price:340000}],
      extra:{step:50, unitPrice:20000}, customizable:true,
      theme: {
        className: 'theme-tweety',
        soundId: 'tweety-sound',
        entrySoundId: 'tweety-welcome-sound',
        charImage: 'http://hayola.hornspeed.com/img/tweety.webp',
        entryEffect: 'feather-shower',
        bgGradient: 'linear-gradient(to bottom, #87CEEB 0%, #f0f8ff 100%)',
        primaryTheme: '#FFD700',
        accentTheme: '#FFFFFF',
        glowTheme: '#FFD700'
      }
    },
    { id:"olivieh", name:"سالاد الویه", emoji:"🥗", img:"img/olivieh-sandwich.webp",
      sizes:[{id:"150",label:"۱۵۰ گرم",price:100000},{id:"250",label:"۲۵۰ گرم",price:140000}],
      extra:{step:50, unitPrice:0}, customizable:false
    },
  ];

  const DRINKS = [
    { id:"water", name:"آب کوچک", price:15000, img:"img/drink-water-small.webp" },
    { id:"doogh", name:"دوغ تک نفره", price:20000, img:"img/drink-doogh-single.webp" },
    { id:"lemonade", name:"لیموناد شیشه", price:30000, img:"img/drink-lemonade-bottle.webp" },
    { id:"malt", name:"ماالشعیر", price:30000, img:"img/drink-malt-can.webp" },
    { id:"soda-pet", name:"نوشابه پت", price:25000, img:"img/drink-soda-pet.webp" },
    { id:"soda-family", name:"نوشابه خانواده", price:55000, img:"img/drink-soda-family-1_5L.webp" },
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

  let shootingStarInterval = null;
  function launchShootingStar() {
    const themeBgEffects = el("#theme-bg-effects");
    if (!themeBgEffects) return;

    const star = document.createElement('div');
    star.className = 'shooting-star';

    const startX = Math.random() * 100;
    const startY = Math.random() * 60;
    const length = 100 + Math.random() * 150;
    const angle = -15 + Math.random() * -45;

    star.style.top = startY + 'vh';
    star.style.left = startX + 'vw';
    star.style.width = length + 'px';
    star.style.transform = `translateX(0) rotate(${angle}deg)`;

    themeBgEffects.appendChild(star);

    setTimeout(() => {
      star.style.opacity = '1';
      star.style.transform = `translateX(30vw) rotate(${angle}deg)`;
    }, 100);

    setTimeout(() => {
      star.remove();
    }, 2000);
  }

  function manageShootingStars() {
    if (shootingStarInterval) clearTimeout(shootingStarInterval);

    const nextLaunch = () => {
      launchShootingStar();
      const delay = 3000 + Math.random() * 7000;
      shootingStarInterval = setTimeout(nextLaunch, delay);
    };
    shootingStarInterval = setTimeout(nextLaunch, 1000); // First one fires quickly
  }

  let featherInterval = null;
  function createFeather() {
    const themeFgEffects = el("#theme-fg-effects");
    if (!themeFgEffects) return;

    const feather = document.createElement('div');
    feather.className = 'feather-particle';

    const startX = Math.random() * 100;
    const duration = 4 + Math.random() * 4;
    const delay = Math.random() * 5;

    feather.style.left = startX + 'vw';
    feather.style.animationDuration = duration + 's';
    feather.style.animationDelay = delay + 's';

    themeFgEffects.appendChild(feather);

    setTimeout(() => {
      feather.remove();
    }, (duration + delay) * 1000);
  }

  function manageFeathers() {
    if (featherInterval) clearInterval(featherInterval);
    featherInterval = setInterval(createFeather, 800);
  }

  // State
  const state = {
    step:0,
    isHappy:false, countdown:"", nextCountdown:"",
    selectedId: MENU[0].id,
    sizeId: MENU[0].sizes[0].id,
    freeLevels: Object.fromEntries(FREE.map(f=>[f.id,1])),
    sauceLevels: Object.fromEntries(SAUCES.map(s=>[s.id,1])),
    extraGrams: 0,
    cheeseSlices: 0,
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

  const defaultTheme = {
    bgGradient: 'radial-gradient(1200px 700px at 80% -10%, #0b3b2c 0%, transparent 60%), radial-gradient(1000px 600px at -10% 0%, #0b2355 0%, transparent 60%), linear-gradient(180deg, #0b1020, #0b1324)',
    primaryTheme: '#0ee3a8',
    accentTheme: '#6b8afd',
    glowTheme: '#a78bfa',
  };

  function stopAllThemeSounds() {
    const themeSoundIds = [
      'naghola-sound', 'naghola-welcome-sound',
      'hulk-sound', 'hulk-smash-sound',
      'mario-sound', 'mario-jump-sound',
      'dragon-sound',
      'tweety-sound', 'tweety-welcome-sound',
      'pat-mat-sound',
      'special-sound'
    ];
    themeSoundIds.forEach(id => {
      const audio = el('#' + id);
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

  function applyTheme(item) {
    stopAllThemeSounds(); // Stop all sounds before applying a new theme

    const body = document.body;
    body.classList.add('theme-transition');

    if (shootingStarInterval) clearTimeout(shootingStarInterval);
    els('.shooting-star').forEach(s => s.remove());
    if (featherInterval) clearInterval(featherInterval);
    els('.feather-particle').forEach(f => f.remove());

    setTimeout(() => {
      const theme = item && item.theme ? item.theme : defaultTheme;
      const themeCharImage = el("#theme-char-image");
      const themeBgEffects = el("#theme-bg-effects");
      const themeFgEffects = el("#theme-fg-effects");

      // Cleanup previous theme classes
      const themeClasses = (body.className.match(/theme-\S+/g) || []);
      themeClasses.forEach(cls => {
        if(cls !== 'theme-transition') body.classList.remove(cls)
      });

      // Apply new theme class if it exists
      if (theme.className) {
        body.classList.add(theme.className);
      }

      body.style.setProperty('--bg-theme', theme.bgGradient);
      body.style.setProperty('--primary-theme', theme.primaryTheme);
      body.style.setProperty('--accent-theme', theme.accentTheme);
      body.style.setProperty('--glow-theme', theme.glowTheme);

      // Handle character image
      let charHtml = '';
      if (theme.charImage) {
        charHtml = `<img src="${theme.charImage}" alt="">`;
      }
      themeCharImage.innerHTML = charHtml;

      // Handle background and foreground effects
      let bgHtml = '';
      let fgHtml = '';

      if (theme.className === 'theme-naghola') {
        fgHtml += '<div class="spotlight"></div>';
        bgHtml += '<div class="moon"></div>';
        bgHtml += '<div class="ground-hill back"></div><div class="ground-hill"></div>';
        bgHtml += '<div class="fence"></div>';
        // Generate starry night background (twinkling stars only)
        for (let i = 0; i < 100; i++) {
          const size = 1 + Math.random() * 2;
          const top = Math.random() * 60;
          const left = Math.random() * 100;
          const duration = 1 + Math.random() * 3;
          const delay = Math.random() * 5;
          const color = Math.random() > 0.3 ? 'white' : '#FFD700';
          bgHtml += `<div class="star" style="width: ${size}px; height: ${size}px; top: ${top}%; left: ${left}%; background: ${color}; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
        // Start the shooting star controller
        manageShootingStars();
      }
      if (theme.entryEffect === 'fire') {
        bgHtml += `<div class="dragon-fire"></div>`;
        for (let i = 0; i < 3; i++) { bgHtml += `<div class="dragon-breath-effect" style="animation-delay: ${i * 1.5}s"></div>`; }
        for (let i = 0; i < 20; i++) {
          const duration = 5 + Math.random() * 8;
          const delay = Math.random() * 10;
          const left = Math.random() * 100;
          bgHtml += `<div class="ember" style="left: ${left}vw; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
      }
      if (theme.entryEffect === 'mario-bg' || theme.className === 'theme-tweety') {
        // Re-use mario clouds for tweety, with styles in CSS to differentiate
        bgHtml += `
          <div class="mario-cloud" style="top: 10%; animation-duration: 45s;"></div>
          <div class="mario-cloud" style="top: 25%; left: 20vw; animation-duration: 30s; animation-delay: -5s; transform: scale(0.8);"></div>
          <div class="mario-cloud" style="top: 5%; left: 70vw; animation-duration: 40s; animation-delay: -2s; transform: scale(1.2);"></div>
        `;
        if (theme.entryEffect === 'mario-bg') {
          bgHtml += '<div class="mario-pipe"></div>';
        }
      }
      if (theme.entryEffect === 'hulk-smash') {
        bgHtml += '<div class="crack-overlay"></div>';
        const originX = 80; const originY = 60;
        for (let i = 0; i < 80; i++) {
          const duration = 8 + Math.random() * 4;
          const delay = Math.random() * 0.5;
          const angle = Math.random() * 2 * Math.PI;
          const distance = 50 + Math.random() * 50;
          const destX = distance * Math.cos(angle);
          const destY = distance * Math.sin(angle);
          const rotation = Math.random() * 360;
          const transformVar = `translate(${destX}vw, ${destY}vh) rotate(${rotation}deg)`;
          const startTop = originY + (Math.random() - 0.5) * 10;
          const startLeft = originX + (Math.random() - 0.5) * 10;
          const isPersistent = Math.random() < 0.15;
          const animationName = isPersistent ? 'gamma-persist' : 'gamma-burst';
          bgHtml += `<div class="gamma-particle" style="top: ${startTop}vh; left: ${startLeft}vw; --transform-to: ${transformVar}; animation-name: ${animationName}; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
      }
      if (theme.entryEffect === 'pat-mat-workshop') {
        // --- Foreground effects ---
        // 1. The wall, constructed from multiple planks for the explosion effect
        let wallHtml = '<div class="pat-mat-wall-container">';
        for (let i = 0; i < 30; i++) { // Create 30 planks
          wallHtml += `<div class="wall-plank" style="--i: ${i};"></div>`;
        }
        wallHtml += '</div>';
        fgHtml += wallHtml;

        // 2. The dynamic elements, now in the foreground for visibility
        fgHtml += '<div class="blinking-light"></div>';
        fgHtml += '<div class="fluttering-blueprint" style="top: 10%; left: 5%; transform: rotate(-15deg);"></div>';
        fgHtml += '<div class="fluttering-blueprint" style="top: 50%; left: 85%; transform: rotate(20deg); animation-delay: -2s;"></div>';

        // --- Background effects ---
        // The blueprint grid remains in the background
        bgHtml += '<div class="blueprint-grid"></div>';
      }
       if (theme.entryEffect === 'golden-shower') {
        for (let i = 0; i < 50; i++) {
          const duration = 2 + Math.random() * 3;
          const delay = Math.random() * 2;
          const left = Math.random() * 100;
          bgHtml += `<div class="golden-particle" style="left: ${left}vw; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
        }
      }
      themeBgEffects.innerHTML = bgHtml;
      themeFgEffects.innerHTML = fgHtml;

      // Set visibility and trigger entry animations
      if (theme.charImage) {
        themeCharImage.classList.add('visible');
        play(theme.entrySoundId);

        const img = el('img', themeCharImage);
        if (theme.className === 'theme-mario') {
          themeCharImage.classList.add('mario-entry');
          img && img.addEventListener('animationend', () => themeCharImage.classList.remove('mario-entry'), { once: true });
        }
        if (theme.entryEffect === 'hulk-smash') {
          const appRoot = el('.app-root');
          appRoot.classList.add('screen-shaking');
          themeCharImage.classList.add('hulk-entry');
          img && img.addEventListener('animationend', () => themeCharImage.classList.remove('hulk-entry'), { once: true });
          appRoot.addEventListener('animationend', () => appRoot.classList.remove('screen-shaking'), { once: true });
        }
        if (theme.className === 'theme-naghola') {
          themeCharImage.classList.add('naghola-entry');
          img && img.addEventListener('animationend', () => {
            themeCharImage.classList.remove('naghola-entry');
            const spotlight = el('.spotlight', themeFgEffects);
            if (spotlight) {
              const rect = img.getBoundingClientRect();
              const x = rect.left + rect.width / 2;
              const y = rect.bottom - rect.height * 0.1; // Position under the feet
              spotlight.style.left = x + 'px';
              spotlight.style.top = y + 'px';
              spotlight.style.opacity = '1';
            }
          }, { once: true });
        }
        if (theme.className === 'theme-tweety') {
          manageFeathers();
          themeCharImage.classList.add('tweety-entry');
          img && img.addEventListener('animationend', () => {
            themeCharImage.classList.remove('tweety-entry');
            themeCharImage.classList.add('tweety-swinging');
          }, { once: true });
        }
        if (theme.className === 'theme-pat-mat') {
          themeCharImage.classList.add('pat-mat-entry');
          img && img.addEventListener('animationend', () => {
            themeCharImage.classList.remove('pat-mat-entry');
            themeCharImage.classList.add('pat-mat-idle');
          }, { once: true });
        }
      } else {
        themeCharImage.classList.remove('visible');
      }

      body.classList.remove('theme-transition');
    }, 300);
  }

  function resetCustomizations(){
    state.extraGrams = 0;
    state.cheeseSlices = 0;
    state.freeLevels = Object.fromEntries(FREE.map(f=>[f.id,1]));
    state.sauceLevels = Object.fromEntries(SAUCES.map(s=>[s.id,1]));
  }


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
    updateTimer();
  }
  setInterval(updateHappy, 1000);
  updateHappy();

  // Price calc
  function prices(){
    const it = selectedItem(), sz = selectedSize();
    const base = sz.price;
    const extraSteps = it.extra.unitPrice>0 ? Math.floor(state.extraGrams / it.extra.step) : 0;
    const extraPrice = extraSteps * it.extra.unitPrice;
    const cheesePrice = (state.cheeseSlices || 0) * CHEESE_PRICE;
    const drinksPrice = Object.entries(state.drinks).reduce((s,[id,q])=>{
      const d = DRINKS.find(x=>x.id===id); return s + (d? d.price*q : 0);
    }, 0);
    const subtotal = base + extraPrice + cheesePrice + drinksPrice;
    const total = state.isHappy ? Math.round(subtotal * (1 - DISCOUNT.percent)) : subtotal;
    const cartTotal = state.cart.reduce((s,i)=>s+(i.total||0),0);
    return { base, extraSteps, extraPrice, cheesePrice, drinksPrice, subtotal, total, cartTotal };
  }

  function renderExtraViz(it) {
    if (!it || !it.extra || it.extra.unitPrice <= 0) return '';
    const count = Math.floor(state.extraGrams / it.extra.step);
    // Use divs to force new lines
    return `
      <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
        ${[...Array(count)].map((_, i) =>
          `<div style="width: ${20 * (i+1)}%; height: 8px; background: #E97451; border-radius: 4px;"></div>`
        ).join('')}
      </div>
    `;
  }

  function generateSandwichSVG(item) {
    const colors = {
      bread: '#C68642', meat: '#E0B0B0', pickle: '#556B2F',
      potato: '#F0E68C', greens: '#4F7942', tomato: '#FF6347',
      mayo: '#FFFFF0', ketchup: '#BF1D1D', mustard: '#FFDB58', special: '#FF8C69',
      olivieh: '#F5F5DC'
    };
    let layers = [];
    let y = 10;

    const addLayer = (color, height, options = {}) => {
      const { isWavy = false, isBumpy = false, rx = 8, ry = 8 } = options;
      if(height <= 0) return;
      if (isBumpy) {
        layers.push(`<path d="M10,${y} C20,${y-5},40,${y-5},50,${y} S70,${y+5},90,${y} V${y+height} C80,${y+height+5},60,${y+height+5},50,${y+height} S30,${y+height-5},10,${y+height} Z" fill="${color}" />`);
      } else if (isWavy) {
        layers.push(`<path d="M 10 ${y+height/2} C 30 ${y}, 70 ${y+height}, 90 ${y+height/2}" stroke="${color}" fill="none" stroke-width="${height}" stroke-linecap="round" />`);
      } else {
        layers.push(`<rect x="10" y="${y}" width="80" height="${height}" fill="${color}" rx="${rx}" ry="${ry}" />`);
      }
      y += height + 2;
    };

    // Special case for Olivieh
    if (item.id === 'olivieh') {
      addLayer(colors.bread, 20, {rx: 10, ry: 10});
      addLayer(colors.olivieh, 35, {isBumpy: true});
      addLayer(colors.bread, 20, {rx: 10, ry: 10});
      return `<svg viewBox="0 0 100 ${y + 5}" width="100%" height="150">${layers.join('')}</svg>`;
    }

    // Default sandwich rendering
    addLayer(colors.bread, 20, {rx: 10, ry: 10});

    if (item.sauceLevels.special > 0) addLayer(colors.special, item.sauceLevels.special * 1.5, {isWavy: true});
    if (item.freeLevels.greens > 0) addLayer(colors.greens, item.freeLevels.greens * 2, {isWavy: true});
    if (item.freeLevels.pickle > 0) addLayer(colors.pickle, item.freeLevels.pickle * 2);
    addLayer(colors.meat, 15 + (item.extraGrams / 15), {ry: 3});
    if (item.freeLevels.tomato > 0) addLayer(colors.tomato, item.freeLevels.tomato * 3);
    if (item.freeLevels.potato > 0) addLayer(colors.potato, item.freeLevels.potato * 1.5);

    if (item.sauceLevels.ketchup > 0) addLayer(colors.ketchup, item.sauceLevels.ketchup * 1.5, {isWavy: true});
    if (item.sauceLevels.mayo > 0) addLayer(colors.mayo, item.sauceLevels.mayo * 1.5, {isWavy: true});
    if (item.sauceLevels.mustard > 0) addLayer(colors.mustard, item.sauceLevels.mustard * 1.5, {isWavy: true});

    addLayer(colors.bread, 20, {rx: 10, ry: 10});

    return `<svg viewBox="0 0 100 ${y + 5}" width="100%" height="150">${layers.join('')}</svg>`;
  }

  function snapshotCurrent(){
    const {base, extraPrice, drinksPrice, subtotal, total} = prices();
    return {
      id: Date.now()+Math.random(),
      name: selectedItem().name,
      sizeLabel: selectedSize().label,
      basePrice: base,
      extraGrams: state.extraGrams,
      extraPrice,
      cheeseSlices: state.cheeseSlices,
      drinks: {...state.drinks},
      drinksPrice,
      freeLevels:{...state.freeLevels},
      sauceLevels:{...state.sauceLevels},
      total
    };
  }

  // Renderers
  const app = el("#app");
  app.innerHTML = [
    `<div id="header" class="no-print">
      <div class="sully-header">
        <img src="img/sp-sali.webp" alt="Happy Hour">
        <div class="timer-box"></div>
      </div>
     </div>`,
    '<div class="progress no-print"><div id="pbar" class="bar" style="width:0%"></div></div>',
    '<div id="content"></div>',
    '<div class="bottom no-print"><div id="bottom" class="inner"></div></div>',
    '<div id="modals"></div>'
  ].join("");

  function updateTimer() {
    const timerBox = el(".timer-box");
    const sullyHeader = el(".sully-header");
    if (!timerBox || !sullyHeader) return;

    timerBox.innerHTML = state.isHappy
      ? `<div class="line1">ساعت طلایی!</div><div class="timer">${state.countdown}</div><div class="line1">تا پایان تخفیف</div>`
      : `<div class="line1">شروع ساعت طلایی</div><div class="timer">${state.nextCountdown}</div><div class="line1">مانده تا تخفیف</div>`;

    if (state.isHappy) {
      sullyHeader.classList.add('sully-glowing');
    } else {
      sullyHeader.classList.remove('sully-glowing');
    }
  }

  function renderHeader() {
    // This function is now only for things that change on step, like the progress bar.
    const p = el("#pbar");
    if (p) {
      p.style.width = ( (state.step+1) / 6 ) * 100 + "%";
    }
  }

  function renderBottom(){
    const b = el("#bottom");
    const { total, cartTotal } = prices();
    const drinksPrice = Object.entries(state.drinks).reduce((s,[id,q])=>{ const d = DRINKS.find(x=>x.id===id); return s + (d? d.price*q : 0); }, 0);
    const orderTotal = cartTotal + total + drinksPrice;
    const nextDisabled = (state.step===0 && !state.selectedId) || (state.step===1 && !state.sizeId);
    b.innerHTML = `
      <button class="btn" ${state.step===0?'disabled':''} id="prevBtn">قبلی</button>
      <button class="btn" id="cartBtn">سبد (${state.cart.length})</button>
      <div class="total-badge">${state.isHappy?'<span class="muted">جمع سفارش (با تخفیف):</span>':'جمع سفارش:'} <b>${fmt(orderTotal)}</b></div>
      <button class="btn ${state.step>=5?'secondary':'primary'}" id="nextBtn" ${nextDisabled?'disabled':''}>${state.step>=5?'پایان':'بعدی'}</button>
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
      const TOP = MENU.filter(m => m.isSpecial).map(m => m.id);
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> انتخاب سرآشپز هیولا</h2>
          <div class="quick-grid">
            ${TOP.map(id=>{
              const t = MENU.find(m=>m.id===id);
              return `<div class="quick-card" data-id="${t.id}">
                <img src="${t.img||''}" alt=""/>
                <div>
                  <div class="quick-title">${t.emoji || ''} ${t.name}</div>
                  <div class="quick-sub">
                    ${state.isHappy
                      ? `<span><del>${fmt(t.sizes[0].price)}</del> ${fmt(t.sizes[0].price * (1-DISCOUNT.percent))}</span>`
                      : `<span>از ${fmt(t.sizes[0].price)}</span>`
                    }
                  </div>
                </div>
                ${state.isHappy ? '<div class="happy-badge">۱۰٪ تخفیف</div>' : ''}
              </div>`;
            }).join("")}
          </div>
          <div class="divider"></div>
          <div class="menu-grid">
            ${MENU.map(m=>`
              <div class="menu-card ${state.selectedId===m.id?'active':''} ${state.isHappy ? 'happy-hour-active' : ''}" data-id="${m.id}">
                <img src="${m.img||''}" alt=""/>
                <div>
                  <div class="menu-title">${m.emoji || ''} ${m.name}</div>
                  <div class="menu-sub">
                    ${state.isHappy
                      ? `<span><del>${fmt(m.sizes[0].price)}</del> ${fmt(m.sizes[0].price * (1-DISCOUNT.percent))}</span>`
                      : `<span>از ${fmt(m.sizes[0].price)}</span>`
                    }
                  </div>
                </div>
                ${state.isHappy ? '<div class="happy-badge">۱۰٪</div>' : ''}
              </div>
            `).join("")}
          </div>
        </section>
      `;
      els(".quick-card", c).forEach(card=>card.addEventListener("click", e=>{
        state.selectedId = card.getAttribute("data-id");
        state.sizeId = selectedItem().sizes[0].id;
        resetCustomizations();
        const item = selectedItem();
        applyTheme(item);
        play('special-sound'); // Always play special sound for quick-cards
        render();
      }));
      els(".menu-card", c).forEach(card=>card.addEventListener("click", e=>{
        state.selectedId = card.getAttribute("data-id");
        const item = selectedItem();
        applyTheme(item);
        play(item.theme?.soundId || "ding"); // Play theme sound or default for regular menu
        render();
      }));
    }

    if(state.step===1){
      // Step 2: size
      const isPatMat = selectedItem().theme?.className === 'theme-pat-mat';
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ${isPatMat ? '۲) انتخاب مقیاس پروژه' : '۲) انتخاب سایز / وزن'}</h2>
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
      const isPatMat = selectedItem().theme?.className === 'theme-pat-mat';
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ${isPatMat ? '۳) مرحله آزمون و خطا' : '۳) مخلفات رایگان'}</h2>
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
      const isPatMat = selectedItem().theme?.className === 'theme-pat-mat';
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ${isPatMat ? '۴) عملیات رنگ‌آمیزی' : '۴) سس‌ها'}</h2>
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
      const isPatMat = selectedItem().theme?.className === 'theme-pat-mat';
      const drinksPrice = Object.entries(state.drinks).reduce((s,[id,q])=>{ const d = DRINKS.find(x=>x.id===id); return s + (d? d.price*q : 0); }, 0);
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ${isPatMat ? '۵) تهیه قطعات یدکی' : '۵) افزودنی‌های پولی و نوشیدنی'}</h2>
          <div class="grid" style="display:grid;gap:12px;grid-template-columns:${(it.customizable && it.extra.unitPrice>0)?'repeat(2,minmax(0,1fr))':'repeat(1,minmax(0,1fr))'}">
            ${(it.customizable && it.extra.unitPrice>0)?`
            <div class="slider-wrap">
              <div style="font-weight:700;margin-bottom:6px">کالباس اضافه</div>
              <input type="range" min="0" max="200" step="${it.extra.step}" value="${state.extraGrams}" id="extraRange"/>
              <div class="range-meta"><span>افزایش: ${state.extraGrams} گرم</span><span>+${fmt((Math.floor(state.extraGrams/it.extra.step))*it.extra.unitPrice)}</span></div>
              <div id="extraViz" class="extra-viz" style="margin-top:8px; height: 10px;">
                ${renderExtraViz(it)}
              </div>
            </div>`:''}
            <div>
              <div style="font-weight:700;margin-bottom:6px">افزودنی‌های پولی</div>
              <div class="drinks">
                <div class="drink">
                  <div style="display:flex;align-items:center;gap:10px">
                    <img src="img/addon-gouda-slice.webp" alt="پنیر گودا"/>
                    <div>
                      <div class="name">پنیر گودا ورقه‌ای</div>
                      <div style="font-size:12px;color:#cbd5e1">${fmt(CHEESE_PRICE)} / ورق</div>
                    </div>
                  </div>
                  <div class="qty">
                    <button data-cheese="-1">−</button>
                    <div class="n">${state.cheeseSlices||0}</div>
                    <button data-cheese="1">+</button>
                  </div>
                </div>
                <div class="divider" style="margin: 12px 0;"></div>
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
        const viz = el("#extraViz");
        if(viz) viz.innerHTML = renderExtraViz(selectedItem());
      });
      els("button[data-cheese]", c).forEach(b=>b.addEventListener("click", ()=>{
        const d=Number(b.getAttribute("data-cheese"));
        state.cheeseSlices = Math.max(0, (state.cheeseSlices||0) + d);
        play("ding"); render();
      }));
      els("button[data-drink]", c).forEach(b=>b.addEventListener("click", ()=>{
        const id=b.getAttribute("data-drink"); const d=Number(b.getAttribute("data-d"));
        const q=Math.max(0,(state.drinks[id]||0)+d);
        state.drinks = { ...state.drinks, [id]: q };
        play("ding"); render();
      }));
    }

    if(state.step===5){
      // Step 6: review & add/checkout
      const isPatMat = selectedItem().theme?.className === 'theme-pat-mat';
      const drinksPrice = Object.entries(state.drinks).reduce((s,[id,q])=>{ const d = DRINKS.find(x=>x.id===id); return s + (d? d.price*q : 0); }, 0);
      const orderTotal = cartTotal + total + drinksPrice;
      c.innerHTML = `
        <section class="section">
          <h2><span class="dot"></span> ${isPatMat ? '۶) کنترل نهایی و تحویل' : '۶) مرور و ثبت'}</h2>
          <div class="preview-wrap" style="overflow-x: auto; display: flex; gap: 10px; padding-bottom: 10px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 10px; background: rgba(0,0,0,.2); margin-bottom: 14px;">
            ${[...state.cart, snapshotCurrent()].map(item => `
              <div class="preview-item" style="flex: 0 0 120px; text-align: center;">
                <div class="preview" style="height: 120px; background: rgba(255,255,255,.05); border-radius: 8px; padding: 5px;">
                  ${generateSandwichSVG(item)}
                </div>
                <div style="font-size: 12px; font-weight: 700; margin-top: 8px; background: rgba(0,0,0,0.4); border-radius: 6px; padding: 2px 6px; color: white;">${item.name}</div>
              </div>
            `).join('')}
          </div>
          <div class="review-grid" style="display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))">
            <div class="order-summary" style="display:flex; flex-direction:column; gap:8px;">
              ${[...state.cart, snapshotCurrent()].map(item => {
                const customizations = [];
                if (item.freeLevels) { Object.entries(item.freeLevels).forEach(([id, level]) => { if (level !== 1) { const freebie = FREE.find(f => f.id === id); const levelInfo = LEVELS.find(l => l.id === level); if (freebie && levelInfo) customizations.push(`${freebie.label}: ${levelInfo.label}`); } }); }
                if (item.sauceLevels) { Object.entries(item.sauceLevels).forEach(([id, level]) => { if (level !== 1) { const sauce = SAUCES.find(s => s.id === id); const levelInfo = LEVELS.find(l => l.id === level); if (sauce && levelInfo) customizations.push(`${sauce.label}: ${levelInfo.label}`); } }); }
                if (item.extraGrams > 0) { customizations.push(`کالباس اضافه: ${item.extraGrams} گرم`); }
                if (item.cheeseSlices > 0) { customizations.push(`پنیر اضافه: ${item.cheeseSlices} ورق`); }

                return `
                  <div class="summary-item" style="border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 8px;">
                    <div style="font-weight: 800; font-size: 18px;">${item.name} <span style="font-size: 14px; color: var(--muted);">(${item.sizeLabel})</span></div>
                    ${customizations.length ? `<div style="font-size: 12px; color: var(--accent); padding-top: 4px;">${customizations.join(' • ')}</div>` : ''}
                  </div>
                `;
              }).join('')}
              <div class="divider"></div>
              <div style="display:flex;justify-content:space-between; font-size: 18px; font-weight: 900;"><div>جمع کل</div><div>${fmt(orderTotal)}</div></div>
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
        state.step = 0;
        resetCustomizations();
        // also reset sandwich choice to default for the new item
        state.selectedId = MENU[0].id;
        state.sizeId = MENU[0].sizes[0].id;
        state.drinks = Object.fromEntries(DRINKS.map(d=>[d.id,0])); // Reset drinks for next item
        play("ding");
        render();
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
        // Auto-print for the user
        setTimeout(() => {
          const printBtn = el("#printBtn");
          if (printBtn) printBtn.click();
        }, 100); // 100ms delay to ensure modal is in DOM
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
    const sandwichesTotal = state.checkoutItems.reduce((s,i)=>s+(i.total||0),0);
    const drinksTotal = Object.entries(state.drinks).reduce((s,[id,q])=>{ const d = DRINKS.find(x=>x.id===id); return s + (d? d.price*q : 0); }, 0);
    const total = sandwichesTotal + drinksTotal;
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
          if (it.freeLevels) { Object.entries(it.freeLevels).forEach(([id, level]) => { if (level !== 1) { const freebie = FREE.find(f => f.id === id); const levelInfo = LEVELS.find(l => l.id === level); if (freebie && levelInfo) customizations.push(`${freebie.label}: ${levelInfo.label}`); } }); }
          if (it.sauceLevels) { Object.entries(it.sauceLevels).forEach(([id, level]) => { if (level !== 1) { const sauce = SAUCES.find(s => s.id === id); const levelInfo = LEVELS.find(l => l.id === level); if (sauce && levelInfo) customizations.push(`${sauce.label}: ${levelInfo.label}`); } }); }
          if (it.extraGrams > 0) { customizations.push(`کالباس اضافه: ${it.extraGrams} گرم`); }
          if (it.cheeseSlices > 0) { customizations.push(`پنیر اضافه: ${it.cheeseSlices} ورق`); }
          if (customizations.length) { detailsHtml = `<div style="font-size:10px; text-align:right; padding-right:10px;">${customizations.join(' • ')}</div>`; }

          const drinksHtml = Object.entries(it.drinks || {}).filter(([,q])=>q>0).map(([id,q])=>{
            const d = DRINKS.find(x=>x.id===id);
            return `${d.name} ×${q}`;
          }).join(', ');
          if (drinksHtml) {
            detailsHtml += `<div style="font-size:10px; text-align:right; padding-right:10px; color: var(--accent);">${drinksHtml}</div>`;
          }

          return `<div><b>${idx+1}. ${it.name} – ${it.sizeLabel}</b></div>${detailsHtml}`;
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
      // Reset for next order
      state.submitted = false;
      state.checkoutItems = [];
      state.cart = [];
      state.drinks = Object.fromEntries(DRINKS.map(d=>[d.id,0]));
      resetCustomizations();
      state.selectedId = MENU[0].id;
      state.sizeId = MENU[0].sizes[0].id;
      state.step = 0;
      render();
      m.innerHTML = "";
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
