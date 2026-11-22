const {useState,useEffect,useRef,useMemo}=React;
const html=htm.bind(React.createElement);
const LV={easy:{n:5,l:"EASY",c:"#22ff88",d:"Warm-up round"},medium:{n:10,l:"MEDIUM",c:"#38bdf8",d:"For real players"},hard:{n:15,l:"HARD",c:"#e040fb",d:"Only legends survive"}};
const DB=[
["GTA VI","Which fictional state is GTA VI set in?","Leonida","San Andreas","Liberty State","Carcer"],
["GTA VI","Which two protagonists star in GTA VI?","Lucia and Jason","Tommy and Lance","Claude and Maria","Niko and Roman"],
["GTA VI","Which classic city is the main setting of GTA VI?","Vice City","Liberty City","Los Santos","San Fierro"],
["GTA V","Which three characters can you play in GTA V?","Michael, Franklin, Trevor","Niko, Johnny, Luis","CJ, Ryder, Sweet","Tommy, Ken, Lance"],
["GTA V","What is the name of Franklin’s dog?","Chop","Rex","Max","Buddy"],
["GTA V","In which year was GTA V first released?","2013","2011","2015","2010"],
["GTA V","Who is the retired bank robber living in Los Santos?","Michael De Santa","Lester Crest","Lamar Davis","Dave Norton"],
["GTA V","What is the online mode of GTA V called?","GTA Online","Red Dead Online","Vice Online","Social Club Live"],
["GTA V","What is the rural county north of Los Santos called?","Blaine County","Vinewood Hills","Cayo Perico","Liberty County"],
["Counter-Strike 2","Which engine powers Counter-Strike 2?","Source 2","Unreal Engine 5","Unity","Frostbite"],
["Counter-Strike 2","Which is a legendary Counter-Strike map?","Dust II","Erangel","Verdansk","Bind"],
["Counter-Strike 2","Which game did Counter-Strike 2 replace?","CS:GO","Quake III","Team Fortress 2","Half-Life 3"],
["Valorant","What is the bomb called in Valorant?","The Spike","The Core","The Orb","The Relic"],
["Valorant","Which agent is the healer who can resurrect allies?","Sage","Jett","Phoenix","Brimstone"],
["Valorant","Which agent uses the Recon Bolt?","Sova","Reyna","Omen","Raze"],
["Fortnite","Which company created Fortnite?","Epic Games","Valve","EA","Mojang"],
["Fortnite","What is Fortnite’s premium currency?","V-Bucks","Robux","Gems","Coins"],
["Fortnite","How do players reach the island at match start?","Battle Bus","Helicopter","Rocket","Boat"],
["Minecraft","Who created Minecraft?","Markus “Notch” Persson","Gabe Newell","Hideo Kojima","Tim Sweeney"],
["Minecraft","Which block is needed to build a Nether portal?","Obsidian","Bedrock","Diamond","Netherrack"],
["Minecraft","Which dimension holds the Ender Dragon?","The End","The Nether","The Overworld","The Aether"],
["Call of Duty","Which Call of Duty first introduced Zombies?","World at War","Modern Warfare 2","Black Ops 4","Ghosts"],
["Call of Duty","Which Warzone map was the original?","Verdansk","Erangel","Al Mazrah","Kowloon"],
["Call of Duty","Which captain is famous for his bucket hat?","Captain Price","Soap","Ghost","Makarov"],
["PUBG","What is the classic PUBG winner message?","Winner Winner Chicken Dinner","Victory Royale","Booyah","Last One Standing"],
["PUBG","What was PUBG’s first map?","Erangel","Miramar","Sanhok","Vikendi"],
["PUBG","Who is the creator known as PlayerUnknown?","Brendan Greene","Markus Persson","Hideo Kojima","Cliff Bleszinski"],
["Red Dead Redemption 2","Who is the main playable character?","Arthur Morgan","John Marston","Dutch van der Linde","Micah Bell"],
["Red Dead Redemption 2","Who leads the Van der Linde gang?","Dutch van der Linde","Hosea Matthews","Sadie Adler","Javier Escuella"],
["Red Dead Redemption 2","What illness does Arthur Morgan suffer from?","Tuberculosis","Cholera","Smallpox","Malaria"],
["EA Sports FC","Which series did EA Sports FC replace?","FIFA","PES","Madden","NBA Live"],
["EA Sports FC","What does FUT stand for?","FIFA Ultimate Team","Football United Tour","Final Ultimate Tournament","Fantasy Union Team"],
["EA Sports FC","Which company publishes EA Sports FC?","Electronic Arts","Konami","Sega","Sony"],
["Roblox","What is Roblox’s currency?","Robux","V-Bucks","Rupees","Credits"],
["Roblox","Which language is used to script Roblox games?","Lua","Python","Java","C++"],
["Roblox","Which is a hugely popular Roblox game?","Adopt Me!","Fall Guys","Among Us","Apex Legends"],
["League of Legends","What is the main map called?","Summoner’s Rift","Howling Abyss","Erangel","Bind"],
["League of Legends","Which Netflix series is set in the League universe?","Arcane","Castlevania","Dragon’s Blood","Edgerunners"],
["League of Legends","Which epic monster grants a powerful team buff?","Baron Nashor","Roshan","Diablo","Ender Dragon"],
["God of War","Who is the protagonist of God of War?","Kratos","Atreus","Zeus","Baldur"],
["God of War","What is Kratos’ son called?","Atreus","Deimos","Loki","Tyr"],
["God of War","Which weapon did Kratos use in the Greek games?","Blades of Chaos","Leviathan Axe","Master Sword","Mjolnir"],
["Resident Evil","Which city is destroyed in Resident Evil 2 and 3?","Raccoon City","Silent Hill","Los Santos","Night City"],
["Resident Evil","Which corporation created the T-virus?","Umbrella Corporation","Shinra","Aperture Science","Abstergo"],
["Resident Evil","Who is the rookie cop in Resident Evil 2?","Leon S. Kennedy","Chris Redfield","Ethan Winters","Jill Valentine"],
["The Last of Us","Who are the two main characters?","Joel and Ellie","Nathan and Sully","Leon and Ashley","Aloy and Rost"],
["The Last of Us","Which fungus causes the outbreak?","Cordyceps","Ergot","Penicillium","Candida"],
["The Last of Us","What are the blind, clicking infected called?","Clickers","Stalkers","Howlers","Screamers"],
["Elden Ring","Which studio developed Elden Ring?","FromSoftware","Capcom","CD Projekt Red","Bethesda"],
["Elden Ring","Which author helped write the world’s lore?","George R. R. Martin","J. R. R. Tolkien","Brandon Sanderson","Stephen King"],
["Elden Ring","What is the spectral steed called?","Torrent","Epona","Roach","Agro"],
["Cyberpunk 2077","Which city is the game set in?","Night City","Neo Tokyo","Los Santos","Rapture"],
["Cyberpunk 2077","Which actor plays Johnny Silverhand?","Keanu Reeves","Tom Hardy","Idris Elba","Ryan Reynolds"],
["Cyberpunk 2077","What is the main expansion called?","Phantom Liberty","Blood and Wine","Dawnbreaker","Shattered Space"],
["Assassin’s Creed","Which order do the Assassins fight?","The Templars","The Illuminati","The Jedi","The Shadow Cult"],
["Assassin’s Creed","Which Italian assassin stars in AC II?","Ezio Auditore","Altaïr","Connor","Edward Kenway"],
["Assassin’s Creed","Which setting is Valhalla based on?","Viking-age England","Ancient Egypt","Feudal Japan","Renaissance Italy"],
["Rocket League","What is the main mode of Rocket League?","Soccer with cars","Tank battles","Drag racing","Demolition derby"],
["Rocket League","Which studio created Rocket League?","Psyonix","Criterion","Turn 10","Codemasters"],
["Rocket League","Which car is the default starter?","Octane","Batmobile","Dominus GT","Fennec"],
["Need for Speed","Which company publishes Need for Speed?","Electronic Arts","Activision","Sega","Take-Two"],
["Need for Speed","Which entry is set in Palm City?","Need for Speed Heat","Underground 2","Most Wanted","Rivals"],
["Need for Speed","Who chases you in Most Wanted?","The police","Zombies","Aliens","Bounty hunters"]
];
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const build=(n,g)=>shuf(g?DB.filter(d=>g.includes(d[0])):DB).slice(0,n).map(([g,q,...o])=>{const opts=shuf(o.map((t,i)=>({t,ok:i===0})));return{g,q,o:opts.map(x=>x.t),a:opts.findIndex(x=>x.ok)}});
const GM={"GTA VI":["🌴","#ec4899","#7c3aed"],"GTA V":["🚓","#f59e0b","#b91c1c"],"Counter-Strike 2":["🔫","#f97316","#1e3a8a"],"Valorant":["🎯","#ef4444","#1e1b4b"],"Fortnite":["🪂","#38bdf8","#a855f7"],"Minecraft":["⛏️","#16a34a","#78350f"],"Call of Duty":["🪖","#4d7c0f","#0f172a"],"PUBG":["🍗","#eab308","#334155"],"Red Dead Redemption 2":["🤠","#dc2626","#78350f"],"EA Sports FC":["⚽","#22c55e","#0f766e"],"Roblox":["🧱","#ef4444","#2563eb"],"League of Legends":["⚔️","#d4a017","#1d4ed8"],"God of War":["🪓","#b91c1c","#1f2937"],"Resident Evil":["🧟","#991b1b","#022c22"],"The Last of Us":["🍄","#65a30d","#1c1917"],"Elden Ring":["💍","#f59e0b","#292524"],"Cyberpunk 2077":["🤖","#facc15","#db2777"],"Assassin’s Creed":["🗡️","#e5e7eb","#7f1d1d"],"Rocket League":["🚀","#f97316","#2563eb"],"Need for Speed":["🏎️","#06b6d4","#9333ea"]};
const P=(x,y)=>`<path d='M${x} 160 Q${x+8} ${y+40} ${x+30} ${y}' stroke='#0b0720' stroke-width='5' fill='none'/><path d='M${x+30} ${y}q-35-5-50 15M${x+30} ${y}q30-22 58-3M${x+30} ${y}q-12-28-42-28M${x+30} ${y}q22-28 50-24' stroke='#0b0720' stroke-width='4' fill='none'/>`;
const B=(a,c)=>a.map(([x,h,w])=>`<rect x='${x}' y='${160-h}' width='${w}' height='${h}' fill='${c}'/>`).join('');
const CH=(x,y,c)=>`<path d='M${x-30} ${y}a30 30 0 0 1 60 0z' fill='${c}'/><path d='M${x-30} ${y}L${x} ${y+40}L${x+30} ${y}' stroke='#fff' stroke-width='1.5' fill='none'/><rect x='${x-5}' y='${y+40}' width='10' height='10' fill='#222'/>`;
const CAR=(x,y,c)=>`<rect x='${x}' y='${y}' width='110' height='22' rx='8' fill='${c}'/><path d='M${x+25} ${y}l15-16h40l15 16z' fill='${c}'/><circle cx='${x+25}' cy='${y+22}' r='9' fill='#111'/><circle cx='${x+85}' cy='${y+22}' r='9' fill='#111'/>`;
const GR=c=>`<rect y='125' width='400' height='35' fill='${c}'/>`;
const SC={
'GTA VI':`<circle cx='200' cy='105' r='48' fill='#fde047' opacity='.9'/>${B([[0,50,30],[35,70,25],[300,60,30],[335,80,28],[368,55,32]],'#1e1b4b')}${GR('#1e1b4b')}${P(50,60)}${P(290,50)}${CAR(150,112,'#ec4899')}`,
'GTA V':`<circle cx='320' cy='45' r='22' fill='#fde68a'/>${B([[20,60,22],[45,90,26],[75,70,20],[100,110,30],[135,80,24],[165,120,28],[200,75,26],[232,100,22],[260,65,30]],'#1c1917')}${GR('#292524')}${CAR(270,112,'#f59e0b')}`,
'Counter-Strike 2':`<circle cx='200' cy='70' r='34' stroke='#22ff88' stroke-width='3' fill='none'/><path d='M200 20v30M200 90v30M150 70h30M220 70h30' stroke='#22ff88' stroke-width='3'/>${GR('#78350f')}<rect x='30' y='85' width='45' height='40' fill='#a16207'/><rect x='75' y='100' width='35' height='25' fill='#854d0e'/><rect x='300' y='80' width='50' height='45' fill='#a16207'/>`,
'Valorant':`<polygon points='200,15 260,80 200,145 140,80' fill='none' stroke='#fff' stroke-width='4' opacity='.8'/><polygon points='200,45 235,80 200,115 165,80' fill='#ff4655' opacity='.9'/><path d='M0 150L90 100L130 150M270 150L320 95L400 150' fill='#0f172a'/>`,
'Fortnite':`${CH(110,25,'#fff')}${CH(290,45,'#fde047')}${GR('#16a34a')}<path d='M180 125l25-20 25 20 25-20 25 20' stroke='#7c3aed' stroke-width='6' fill='none'/>`,
'Minecraft':`<rect x='320' y='15' width='30' height='30' fill='#fde047'/><rect y='120' width='400' height='15' fill='#22c55e'/><rect y='135' width='400' height='25' fill='#78350f'/><rect x='90' y='70' width='12' height='50' fill='#713f12'/><rect x='60' y='40' width='72' height='34' fill='#15803d'/><rect x='72' y='22' width='48' height='22' fill='#16a34a'/><rect x='250' y='88' width='32' height='32' fill='#65a30d'/><rect x='258' y='98' width='6' height='6' fill='#111'/><rect x='270' y='98' width='6' height='6' fill='#111'/><rect x='262' y='108' width='12' height='8' fill='#111'/>`,
'Call of Duty':`<path d='M0 125L70 70L120 105L190 55L260 110L330 65L400 120V160H0z' fill='#1c2a14'/><path d='M200 20l5 12h13l-10 8 4 13-12-8-12 8 4-13-10-8h13z' fill='#fde047'/>${GR('#0f172a')}<rect x='60' y='100' width='60' height='25' fill='#3f6212'/><rect x='260' y='95' width='80' height='30' fill='#365314'/>`,
'PUBG':`${CH(280,18,'#eab308')}<path d='M0 125Q100 95 200 120T400 115V160H0z' fill='#475569'/><rect x='60' y='95' width='50' height='30' fill='#64748b'/><rect x='90' y='85' width='25' height='15' fill='#94a3b8'/><path d='M0 150Q100 130 200 148T400 140V160H0z' fill='#0f172a'/>`,
'Red Dead Redemption 2':`<circle cx='300' cy='95' r='40' fill='#fb923c'/><path d='M0 125L40 70h60l25 55zM230 125l30-50h70l40 50z' fill='#7c2d12'/>${GR('#451a03')}<ellipse cx='172' cy='108' rx='26' ry='5' fill='#1c1917'/><path d='M158 108q14-30 28 0z' fill='#1c1917'/>`,
'EA Sports FC':`<rect y='20' width='400' height='140' fill='#15803d'/><path d='M0 90h400M0 20h400' stroke='#fff' stroke-width='2' opacity='.6'/><circle cx='200' cy='90' r='34' stroke='#fff' stroke-width='3' fill='none' opacity='.7'/><rect x='170' y='20' width='60' height='24' stroke='#fff' stroke-width='3' fill='none'/><circle cx='200' cy='90' r='12' fill='#fff'/><path d='M200 82l7 5-3 8h-8l-3-8z' fill='#111'/>`,
'Roblox':`${[0,1,2,3].map(i=>`<rect x='${70+i*65}' y='110' width='60' height='40' fill='${['#ef4444','#3b82f6','#facc15','#22c55e'][i]}'/>`).join('')}${[0,1,2].map(i=>`<rect x='${102+i*65}' y='68' width='60' height='40' fill='${['#a855f7','#f97316','#06b6d4'][i]}'/>`).join('')}${[0,1].map(i=>`<rect x='${135+i*65}' y='26' width='60' height='40' fill='${['#ec4899','#84cc16'][i]}'/>`).join('')}`,
'League of Legends':`<circle cx='200' cy='60' r='55' stroke='#fbbf24' stroke-width='2' fill='none' opacity='.5'/><path d='M200 20l22 40-22 40-22-40z' fill='#38bdf8'/><path d='M200 20l22 40-22 40z' fill='#0ea5e9'/>${B([[50,70,26],[324,70,26]],'#1e3a8a')}<polygon points='50,90 63,60 76,90' fill='#fbbf24'/><polygon points='324,90 337,60 350,90' fill='#fbbf24'/>${GR('#172554')}`,
'God of War':`<path d='M0 125L60 60 110 100 170 45 250 110 320 55 400 120V160H0z' fill='#1f2937'/>${GR('#111827')}<rect x='198' y='30' width='6' height='100' fill='#78350f'/><path d='M204 35q45 5 40 35-5 25-40 20z' fill='#cbd5e1'/><circle cx='120' cy='70' r='28' stroke='#ef4444' stroke-width='2' fill='none'/>`,
'Resident Evil':`<circle cx='320' cy='38' r='22' fill='#e5e7eb'/>${B([[60,70,100]],'#0c0a09')}<polygon points='50,90 110,50 170,90' fill='#0c0a09'/>${GR('#052e16')}<rect x='80' y='95' width='10' height='14' fill='#fbbf24'/><rect x='120' y='95' width='10' height='14' fill='#fbbf24'/><rect x='98' y='118' width='14' height='20' fill='#7f1d1d'/><path d='M250 125v-30l12 10 12-10v30M310 125v-40l10 8 10-8v40' fill='#14532d'/>`,
'The Last of Us':`${B([[10,90,40],[55,120,34],[95,70,30],[290,110,38],[335,80,44],[380,100,20]],'#1c1917')}<path d='M0 160Q60 110 120 150T240 140T400 150V160z' fill='#4d7c0f'/><circle cx='150' cy='60' r='3' fill='#d9f99d'/><circle cx='185' cy='45' r='2' fill='#d9f99d'/><circle cx='215' cy='75' r='3' fill='#d9f99d'/><circle cx='245' cy='50' r='2' fill='#d9f99d'/>`,
'Elden Ring':`<circle cx='200' cy='70' r='55' stroke='#fde68a' stroke-width='3' fill='none' opacity='.7'/><path d='M200 160V90M200 110Q150 90 110 40M200 100Q250 80 290 35M200 120Q140 110 90 85M200 118Q260 105 310 80' stroke='#fbbf24' stroke-width='5' fill='none'/><circle cx='110' cy='40' r='14' fill='#fde047' opacity='.8'/><circle cx='290' cy='35' r='14' fill='#fde047' opacity='.8'/>${GR('#1c1917')}`,
'Cyberpunk 2077':`${B([[10,90,30],[45,120,28],[80,75,26],[115,130,32],[155,100,28],[195,140,34],[235,95,28],[270,125,30],[305,80,28],[340,115,34],[378,90,22]],'#1e1b4b')}<rect x='115' y='45' width='32' height='4' fill='#f0abfc'/><rect x='195' y='25' width='34' height='4' fill='#fde047'/><rect x='340' y='60' width='34' height='4' fill='#22d3ee'/>${GR('#0f0a1e')}<path d='M0 140h400' stroke='#f0abfc' stroke-width='2'/>`,
'Assassin’s Creed':`<circle cx='320' cy='40' r='24' fill='#f3f4f6'/><path d='M0 125L50 100H120L150 125zM250 125l30-35h110v70H250z' fill='#1c1917'/>${GR('#0c0a09')}<path d='M200 125l-14 0 14-60 14 60z' fill='#e5e7eb'/><circle cx='200' cy='60' r='8' fill='#7f1d1d'/>`,
'Rocket League':`${GR('#1d4ed8')}<path d='M0 150H400' stroke='#fff' stroke-width='2' opacity='.4'/>${CAR(120,98,'#f97316')}<path d='M120 110H20M120 118H40' stroke='#38bdf8' stroke-width='5' opacity='.7'/><circle cx='300' cy='95' r='24' fill='#f3f4f6'/><path d='M300 80l8 6-3 9h-10l-3-9z' fill='#111'/>`,
'Need for Speed':`<path d='M200 40L0 160H400z' fill='#111827'/><path d='M200 60v100' stroke='#fbbf24' stroke-width='4' stroke-dasharray='12 10'/>${CAR(145,108,'#06b6d4')}<path d='M0 40h90M310 55h90M20 80h60M320 90h70' stroke='#fff' stroke-width='3' opacity='.6'/>`
};
const PH=[[90,"GAMING LEGEND! 🏆"],[70,"PRO GAMER! 🔥"],[50,"GOOD JOB! 🎮"],[30,"KEEP PRACTICING! 💪"],[0,"YOU NEED MORE TRAINING! 😂"]];

const idb=()=>new Promise((ok,no)=>{const r=indexedDB.open("gqc",1);r.onupgradeneeded=()=>r.result.createObjectStore("i");r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
const idbAll=async()=>{try{const d=await idb();return await new Promise(ok=>{const o={};const rq=d.transaction("i").objectStore("i").openCursor();rq.onsuccess=()=>{const c=rq.result;if(c){o[c.key]=c.value;c.continue()}else ok(o)};rq.onerror=()=>ok({})})}catch(e){return{}}};
const idbSet=async(k,v)=>{try{const d=await idb();const s=d.transaction("i","readwrite").objectStore("i");v?s.put(v,k):s.delete(k)}catch(e){}};
const shrink=f=>new Promise(ok=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,1280/Math.max(im.width,im.height));const c=document.createElement("canvas");c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);ok(c.toDataURL("image/jpeg",.82))};im.onerror=()=>ok(null);im.src=r.result};r.onerror=()=>ok(null);r.readAsDataURL(f)});
function Slot({k,imgs,setImg,label,cls}){
  return html`<div class=${"relative overflow-hidden rounded-xl border border-violet-500/40 bg-black/40 "+cls}>
    ${imgs[k]?html`<img src=${imgs[k]} alt=${label} class="w-full h-full object-cover"/>`:html`<div class="w-full h-full flex items-center justify-center text-slate-400 text-xs sm:text-sm text-center p-2">+ Add picture<br/>${label}</div>`}
    <label class="absolute inset-0 cursor-pointer"><input type="file" accept="image/*" class="hidden" onChange=${e=>{const f=e.target.files[0];if(f)setImg(k,f);e.target.value=""}}/></label>
    ${imgs[k]&&html`<button onClick=${()=>setImg(k,null)} class="absolute top-1 right-1 z-10 bg-black/70 rounded-full w-7 h-7 text-sm">✕</button>`}
  </div>`;
}
function Home({onStart,imgs,setImg}){
  const [name,setName]=useState("");const [lv,setLv]=useState(null);
  const ok=name.trim().length>0&&lv;
  const names=[...new Set(DB.map(d=>d[0]))];
  return html`<main class="min-h-screen flex flex-col items-center justify-center px-4 py-10 fade">
    <div class="text-center max-w-3xl">
      <div class="text-6xl mb-3">🎮</div>
      <h1 class="o glow text-3xl sm:text-5xl font-black leading-tight">WELCOME TO <span class="text-cyan-300">GAMING QUIZ CHALLENGE</span></h1>
      <p class="text-xl sm:text-2xl mt-3 text-violet-200">Think you’re a real gamer? Prove it!</p>
    </div>
    <div class="card w-full max-w-2xl mt-8 p-5 sm:p-8">
      <label class="o text-sm text-cyan-300 tracking-widest">PLAYER NAME</label>
      <input value=${name} maxLength=${16} onInput=${e=>setName(e.target.value)} placeholder="Enter your gamer tag…" class="w-full mt-2 mb-6 px-4 py-3 rounded-xl bg-black/50 border border-violet-500/60 text-xl outline-none focus:border-cyan-300 focus:shadow-[0_0_18px_#22d3ee88]" />
      <label class="o text-sm text-cyan-300 tracking-widest">SELECT DIFFICULTY</label>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
        ${Object.entries(LV).map(([k,v])=>html`<button key=${k} onClick=${()=>setLv(k)} class="btn rounded-xl p-4 text-center bg-black/40" style=${{border:`2px solid ${v.c}${lv===k?"":"66"}`,boxShadow:lv===k?`0 0 26px ${v.c}99, inset 0 0 18px ${v.c}33`:"none",color:v.c}}>
          <div class="o text-xl font-black">${v.l}</div><div class="text-white text-lg">${v.n} Questions</div><div class="text-sm text-slate-400">${v.d}</div></button>`)}
      </div>
      <button disabled=${!ok} onClick=${()=>onStart(name.trim(),lv)} class="btn start o w-full mt-7 py-4 rounded-2xl text-xl sm:text-2xl font-black text-white">▶ START QUIZ</button>
      ${!ok&&html`<p class="text-center text-slate-400 mt-3">Enter your name and pick a level to begin.</p>`}
    </div>
    <section class="w-full max-w-4xl mt-10">
      <div class="relative rounded-2xl overflow-hidden border-2 border-pink-500/70" style=${{boxShadow:"0 0 40px #ec489966"}}>
        <svg viewBox="0 0 800 260" preserveAspectRatio="xMidYMid slice" class="absolute inset-0 w-full h-full"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2e1065"/><stop offset=".55" stopColor="#db2777"/><stop offset="1" stopColor="#fb923c"/></linearGradient></defs><rect width="800" height="260" fill="url(#sk)"/><circle cx="400" cy="170" r="70" fill="#fde047" opacity=".9"/><rect y="200" width="800" height="60" fill="#1e1b4b"/><path d="M90 260 Q100 170 140 110" stroke="#0b0720" strokeWidth="7" fill="none"/><path d="M140 110 q-50 -10 -75 20 M140 110 q40 -30 80 -5 M140 110 q-20 -40 -60 -40 M140 110 q30 -40 70 -35" stroke="#0b0720" strokeWidth="6" fill="none"/><path d="M710 260 Q700 180 665 130" stroke="#0b0720" strokeWidth="7" fill="none"/><path d="M665 130 q-50 -10 -75 20 M665 130 q40 -30 80 -5 M665 130 q-20 -40 -60 -40 M665 130 q30 -40 70 -35" stroke="#0b0720" strokeWidth="6" fill="none"/></svg>
        <div class="relative p-6 sm:p-10 text-center">
          <div class="o text-5xl sm:text-7xl font-black" style=${{color:"#fff",textShadow:"0 0 18px #ec4899,0 0 40px #f97316"}}>GTA VI</div>
          <div class="o tracking-[.35em] text-xs sm:text-lg text-yellow-200 mt-1">WELCOME TO LEONIDA</div>
          <div class="flex flex-wrap justify-center gap-2 mt-4">${["📍 Setting: Leonida","🌴 Vice City","👥 Lucia & Jason","🎬 Rockstar Games"].map(x=>html`<span key=${x} class="px-3 py-1 rounded-full bg-black/50 border border-pink-400/60">${x}</span>`)}</div>
        </div>
      </div>
      <div class="card p-4 mt-4">
        
        
        
        <button disabled=${!name.trim()} onClick=${()=>onStart(name.trim(),"easy",true)} class="btn start o w-full mt-4 py-3 rounded-xl text-white font-black">🌴 PLAY GTA SPECIAL · 5 QUESTIONS</button>
        ${!name.trim()&&html`<p class="text-center text-slate-400 mt-2">Enter your name above to unlock it.</p>`}
      </div>
      <details class="card p-4 mt-4"><summary class="o cursor-pointer text-cyan-300 text-sm tracking-widest">🖼️ MY PICTURES FOR THE OTHER GAMES</summary>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">${Object.keys(GM).map(g=>html`<div key=${g}><${Slot} k=${g} imgs=${imgs} setImg=${setImg} label=${g} cls="aspect-video"/><div class="text-xs text-center mt-1 text-slate-300 truncate">${g}</div></div>`)}</div>
        <p class="text-xs text-slate-400 mt-2">Each picture appears above that game’s questions during the quiz.</p>
      </details>
    </section>
    <div class="w-full max-w-4xl overflow-hidden mt-8 opacity-80" style=${{maskImage:"linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)"}}>
      <div class="tick">${[...names,...names].map((n,i)=>html`<span key=${i} class="mx-2 px-3 py-1 rounded-full border border-violet-500/50 text-violet-200 whitespace-nowrap">${n}</span>`)}</div>
    </div>
  </main>`;
}

function Timer({t}){
  const c=t>6?"#22ff88":t>3?"#fbbf24":"#ff3b5c";const r=34,C=2*Math.PI*r;
  return html`<div class="relative w-20 h-20 shrink-0" style=${{filter:`drop-shadow(0 0 8px ${c})`}}>
    <svg viewBox="0 0 80 80" class="w-full h-full -rotate-90"><circle cx="40" cy="40" r=${r} stroke="#ffffff22" stroke-width="7" fill="none"/>
    <circle cx="40" cy="40" r=${r} stroke=${c} stroke-width="7" fill="none" strokeLinecap="round" strokeDasharray=${C} strokeDashoffset=${C*(1-t/10)}/></svg>
    <div class="o absolute inset-0 flex items-center justify-center text-2xl font-black" style=${{color:c}}>${Math.ceil(t)}</div></div>`;
}

function Quiz({qs,name,lv,onDone,imgs}){
  const [i,setI]=useState(0);const [t,setT]=useState(10);const [sel,setSel]=useState(null);const [res,setRes]=useState([]);const [pk,setPk]=useState([]);
  const lock=useRef(false);const q=qs[i];const n=qs.length;const L=LV[lv];
  const resolve=choice=>{if(lock.current)return;lock.current=true;setSel(choice);setRes(p=>[...p,choice===-1?"u":choice===q.a?"c":"w"]);setPk(p=>[...p,choice])};
  const active=sel===null;
  useEffect(()=>{
    if(!active)return;
    const end=Date.now()+10000;
    const id=setInterval(()=>{const left=Math.max(0,(end-Date.now())/1000);setT(left);if(left<=0){clearInterval(id);resolve(-1)}},100);
    return()=>clearInterval(id);
  },[i,active]);
  useEffect(()=>{
    if(sel===null)return;
    const id=setTimeout(()=>{if(i+1>=n)onDone(res,pk);else{setI(i+1);setT(10);setSel(null);lock.current=false}},1900);
    return()=>clearTimeout(id);
  },[sel]);
  const score=res.filter(r=>r==="c").length*10;
  const good=sel===q.a;
  const emo=good?["😍","😁"][i%2]:sel===-1?"⏰":["😡","😢"][i%2];
  const msg=good?"CORRECT! WELL DONE!":sel===-1?"TIME’S UP!":"WRONG ANSWER!";
  return html`<main class="min-h-screen flex flex-col items-center px-4 py-6">
    <div class="w-full max-w-3xl">
      <div class="flex justify-between items-center gap-3 o text-xs sm:text-sm">
        <span class="text-cyan-300 truncate">👾 ${name}</span>
        <span class="px-3 py-1 rounded-full" style=${{border:`1px solid ${L.c}`,color:L.c}}>${L.l}</span>
        <span class="text-emerald-300">SCORE: ${score}</span>
      </div>
      <div class="h-3 rounded-full bg-white/10 mt-3 overflow-hidden"><div class="h-full rounded-full transition-all duration-500" style=${{width:`${(i+(sel!==null?1:0))/n*100}%`,background:"linear-gradient(90deg,#7c3aed,#38bdf8,#22ff88)",boxShadow:"0 0 14px #38bdf8"}}></div></div>
      <div key=${i} class="card p-5 sm:p-8 mt-5 fade">
        <div class="flex items-center justify-between gap-4">
          <div><div class="o text-violet-300 text-lg">QUESTION ${i+1}/${n}</div><span class="inline-block mt-1 px-3 py-0.5 rounded-full bg-violet-600/30 border border-violet-400/50 text-sm">${q.g}</span></div>
          <${Timer} t=${t}/>
        </div>
        <div class="relative mt-5 h-28 sm:h-40 rounded-xl overflow-hidden flex items-center justify-center" style=${{background:`linear-gradient(135deg,${GM[q.g][1]},${GM[q.g][2]})`,boxShadow:`0 0 24px ${GM[q.g][1]}88`}}>
          <div class="absolute inset-0 opacity-20" style=${{backgroundImage:"repeating-linear-gradient(45deg,#fff 0 2px,transparent 2px 14px)"}}></div>
          ${imgs[q.g]?html`<img src=${imgs[q.g]} alt=${q.g} class="absolute inset-0 w-full h-full object-cover"/>`:html`<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice" class="absolute inset-0 w-full h-full" dangerouslySetInnerHTML=${{__html:SC[q.g]}}></svg>`}
          <span class="o absolute bottom-2 right-3 text-xs sm:text-sm font-black tracking-widest text-white/90 bg-black/50 px-2 py-0.5 rounded">${q.g.toUpperCase()}</span></div>
        <h2 class="text-2xl sm:text-3xl font-bold mt-5 mb-6 leading-snug">${q.q}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${q.o.map((o,k)=>{
            let st="border-violet-500/50 bg-black/40 hover:border-cyan-300 hover:shadow-[0_0_18px_#22d3ee77]";
            if(sel!==null)st=k===q.a?"border-emerald-400 bg-emerald-500/30 shadow-[0_0_22px_#22ff88aa]":k===sel?"border-red-500 bg-red-500/30 shadow-[0_0_22px_#ff3b5caa]":"border-white/10 bg-black/30 opacity-50";
            return html`<button key=${k} disabled=${sel!==null} onClick=${()=>resolve(k)} class=${"btn flex items-center gap-3 text-left rounded-xl border-2 px-4 py-4 text-lg sm:text-xl "+st}>
              <span class="o w-8 h-8 shrink-0 rounded-lg bg-violet-600/50 flex items-center justify-center text-sm">${"ABCD"[k]}</span>${o}</button>`})}
        </div>
      </div>
      ${sel!==null&&html`<div class="text-center mt-5"><div key=${i} class=${"text-7xl "+(good?"bounce":"shake")}>${emo}</div>
        <div class=${"o text-2xl sm:text-3xl font-black mt-2 "+(good?"text-emerald-300":"text-red-400")}>${msg}</div>
        ${!good&&html`<div class="text-lg text-slate-300 mt-1">Correct answer: <b class="text-emerald-300">${q.o[q.a]}</b></div>`}</div>`}
    </div>
  </main>`;
}

function Confetti(){
  const p=useMemo(()=>Array.from({length:70},()=>({l:Math.random()*100,d:Math.random()*2.5,s:2.5+Math.random()*3,c:["#a855f7","#38bdf8","#22ff88","#fbbf24","#ff3b5c"][Math.floor(Math.random()*5)]})),[]);
  return p.map((x,i)=>html`<i key=${i} class="conf" style=${{left:x.l+"%",background:x.c,animationDuration:x.s+"s",animationDelay:x.d+"s"}}></i>`);
}

function Result({name,lv,res,qs,pk,onAgain,onHome}){
  const n=res.length,c=res.filter(r=>r==="c").length,u=res.filter(r=>r==="u").length,w=n-c-u;
  const acc=Math.round(c/n*100);const rate=PH.find(p=>acc>=p[0])[1];
  const [cp,setCp]=useState(false);const [dl,setDl]=useState("");
  const esc=s=>String(s).replace(/[&<>"]/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x]));
  const report=async()=>{
    const rows=qs.map((q,k)=>{const r=res[k],p=pk[k];return `<tr><td>${k+1}</td><td>${esc(q.g)}</td><td>${esc(q.q)}</td><td>${p===-1?"—":esc(q.o[p])}</td><td>${esc(q.o[q.a])}</td><td class="${r}">${r==="c"?"Correct":r==="u"?"Unanswered":"Wrong"}</td></tr>`}).join("");
    const doc=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Quiz Report – ${esc(name)}</title><style>body{font-family:Arial,sans-serif;max-width:820px;margin:30px auto;padding:0 16px;color:#1a1a2e}h1{color:#6d28d9;margin-bottom:0}.s{font-size:44px;font-weight:bold;color:#2563eb}table{border-collapse:collapse;width:100%;margin-top:12px;font-size:14px}td,th{border:1px solid #ccc;padding:6px 8px;text-align:left}th{background:#ede9fe}.c{color:#059669;font-weight:bold}.w{color:#dc2626;font-weight:bold}.u{color:#d97706;font-weight:bold}</style></head><body><h1>GAMING QUIZ CHALLENGE</h1><p>Player report · ${new Date().toLocaleString()}</p><h2>Player: ${esc(name)}</h2><div class="s">${c*10} / ${n*10} points</div><h3>${esc(rate)}</h3><table><tr><th>Difficulty</th><th>Correct</th><th>Wrong</th><th>Unanswered</th><th>Accuracy</th></tr><tr><td>${LV[lv].l}</td><td>${c}</td><td>${w}</td><td>${u}</td><td>${acc}%</td></tr></table><h3>Question details</h3><table><tr><th>#</th><th>Game</th><th>Question</th><th>Your answer</th><th>Correct answer</th><th>Result</th></tr>${rows}</table></body></html>`;
    const fname="Gaming-Quiz-Report-"+(name.replace(/[^\w-]+/g,"_")||"player")+".html";
    try{
      const d=window.claude&&await window.claude.use("downloads");
      if(d){await d.save({filename:fname,data:doc})}
      else{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([doc],{type:"text/html"}));a.download=fname;document.body.appendChild(a);a.click();a.remove()}
      setDl("✅ REPORT SAVED")}
    catch(e){setDl(e&&e.code==="declined"?"":"⚠️ SAVE FAILED")}
  };
  const share=async()=>{
    const text=`🎮 ${name} scored ${c*10}/${n*10} (${acc}%) on ${LV[lv].l} in GAMING QUIZ CHALLENGE – ${rate} Can you beat me?`;
    try{if(navigator.share){await navigator.share({title:"GAMING QUIZ CHALLENGE",text});return}}catch(e){}
    try{await navigator.clipboard.writeText(text)}catch(e){}
    setCp(true);setTimeout(()=>setCp(false),2000);
  };
  const S=(l,v,col)=>html`<div class="rounded-xl bg-black/40 border border-white/10 p-3"><div class="o text-2xl font-black" style=${{color:col}}>${v}</div><div class="text-sm text-slate-300">${l}</div></div>`;
  return html`<main class="min-h-screen flex items-center justify-center px-4 py-8 fade">
    ${acc>=70&&html`<${Confetti}/>`}
    <div class="card w-full max-w-2xl p-6 sm:p-10 text-center">
      <h2 class="o glow text-2xl sm:text-4xl font-black">${rate}</h2>
      <p class="text-xl mt-2 text-violet-200">Great run, <b class="text-cyan-300">${name}</b>!</p>
      <div class="o text-6xl sm:text-8xl font-black my-5 bg-clip-text text-transparent" style=${{backgroundImage:"linear-gradient(90deg,#a855f7,#38bdf8,#22ff88)"}}>${c*10}<span class="text-2xl text-slate-400"> / ${n*10}</span></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        ${S("Correct",c,"#22ff88")}${S("Wrong",w,"#ff3b5c")}${S("Unanswered",u,"#fbbf24")}
        ${S("Accuracy",acc+"%","#38bdf8")}${S("Difficulty",LV[lv].l,LV[lv].c)}${S("Questions",n,"#c4b5fd")}
      </div>
      <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-7">
        <button onClick=${onAgain} class="btn start o flex-1 py-3 rounded-xl text-white font-black">🔁 PLAY AGAIN</button>
        <button onClick=${onHome} class="btn o flex-1 py-3 rounded-xl border-2 border-violet-400 font-black">🏠 BACK TO HOME</button>
        <button onClick=${share} class="btn o flex-1 py-3 rounded-xl border-2 border-cyan-300 text-cyan-300 font-black">${cp?"✅ COPIED!":"📤 SHARE"}</button>
        <button onClick=${report} class="btn start o sm:basis-full py-3 rounded-xl text-white font-black">${dl||"📄 DOWNLOAD MY REPORT"}</button>
      </div>
    </div>
  </main>`;
}

function App(){
  const [s,setS]=useState({v:"home"});
  const [imgs,setImgs]=useState({});
  useEffect(()=>{idbAll().then(setImgs)},[]);
  const setImg=async(k,f)=>{const d=f?await shrink(f):null;if(f&&!d)return;setImgs(p=>{const n={...p};if(d)n[k]=d;else delete n[k];return n});idbSet(k,d)};
  const start=(name,lv,gta)=>setS({v:"quiz",name,lv,gta,qs:build(LV[lv].n,gta?["GTA VI","GTA V"]:null),k:Date.now()});
  if(s.v==="home")return html`<${Home} onStart=${start} imgs=${imgs} setImg=${setImg}/>`;
  if(s.v==="quiz")return html`<${Quiz} key=${s.k} imgs=${imgs} qs=${s.qs} name=${s.name} lv=${s.lv} onDone=${(res,pk)=>setS({...s,v:"result",res,pk})}/>`;
  return html`<${Result} name=${s.name} lv=${s.lv} res=${s.res} pk=${s.pk} qs=${s.qs} onAgain=${()=>start(s.name,s.lv,s.gta)} onHome=${()=>setS({v:"home"})}/>`;
}
ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
