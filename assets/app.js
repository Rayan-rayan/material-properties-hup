/* Material Properties Hub: material dataset. Typical room-temperature values.
   E GPa, sy MPa (null = no distinct yield), su MPa, el % in 50 mm, rho g/cm3, hb Brinell, nu, k W/m.K, cte um/m.C */
(function(root){
const CATS=["Carbon steel","Alloy steel","Stainless steel","Aluminum","Titanium","Copper alloy","Cast iron","Nickel alloy","Magnesium"];
const D=[
["aisi-1018-cd","AISI 1018 Steel","Cold drawn","Carbon steel","G10180",205,370,440,15,7.87,126,.29,51.9,12.0,"Shafts, pins, bolts and machined parts that need good weldability and machinability."],
["aisi-1020-hr","AISI 1020 Steel","Hot rolled","Carbon steel","G10200",200,210,380,25,7.87,111,.29,51.9,11.7,"General structural parts, brackets, and carburized gears and cams."],
["aisi-1045-cd","AISI 1045 Steel","Cold drawn","Carbon steel","G10450",205,530,625,12,7.87,179,.29,49.8,11.2,"Axles, shafts, gears, bolts and studs that need medium strength."],
["aisi-1095-an","AISI 1095 Steel","Annealed","Carbon steel","G10950",205,380,655,13,7.85,192,.29,49.8,11.0,"Springs, knives, cutting tools and wear parts after hardening."],
["astm-a36","ASTM A36 Steel","Hot rolled plate and shapes","Carbon steel","K02600",200,250,450,23,7.85,140,.26,50.0,11.7,"Building frames, bridges, base plates and general welded structures."],
["aisi-4140-an","AISI 4140 Steel","Annealed","Alloy steel","G41400",205,415,655,26,7.85,197,.29,42.6,12.2,"Gears, crankshafts, spindles and tool holders before hardening."],
["aisi-4140-qt","AISI 4140 Steel","Quenched and tempered at 425 °C","Alloy steel","G41400",205,1140,1250,13,7.85,370,.29,42.6,12.2,"High-strength shafts, couplings, bolts and heavy-duty gears."],
["aisi-4340-an","AISI 4340 Steel","Annealed","Alloy steel","G43400",205,470,745,22,7.85,217,.29,44.5,12.3,"Stock for landing gear, shafts and heavy forgings before heat treatment."],
["aisi-4340-qt","AISI 4340 Steel","Quenched and tempered at 425 °C","Alloy steel","G43400",205,1360,1470,10,7.85,430,.29,44.5,12.3,"Landing gear, high-load shafts, fasteners and structural aerospace parts."],
["ss-304","Stainless Steel 304","Annealed","Stainless steel","S30400",193,215,505,70,8.00,123,.29,16.2,17.3,"Food equipment, sinks, chemical tanks and architectural trim."],
["ss-316","Stainless Steel 316","Annealed","Stainless steel","S31600",193,205,515,60,8.00,149,.30,16.3,16.0,"Marine hardware, medical devices, and chemical and pharmaceutical piping."],
["ss-410","Stainless Steel 410","Annealed","Stainless steel","S41000",200,275,485,20,7.74,155,.28,24.9,9.9,"Cutlery, valve trim, pump shafts and steam turbine parts."],
["ss-17-4ph","Stainless Steel 17-4 PH","Condition H1025","Stainless steel","S17400",196,1000,1070,12,7.78,331,.27,18.3,10.8,"Aerospace fittings, valve stems, pump shafts and nuclear components."],
["al-1100-h14","Aluminum 1100","H14 temper","Aluminum","A91100",69,115,125,9,2.71,32,.33,218,23.6,"Sheet metal work, heat exchanger fins, cookware and reflectors."],
["al-2024-t3","Aluminum 2024","T3 temper","Aluminum","A92024",73.1,345,483,18,2.78,120,.33,121,23.2,"Aircraft skins and fuselage structures, rivets and truck wheels."],
["al-5052-h32","Aluminum 5052","H32 temper","Aluminum","A95052",70.3,193,228,12,2.68,60,.33,138,23.8,"Marine parts, fuel tanks, pressure vessels and sheet metal enclosures."],
["al-6061-t6","Aluminum 6061","T6 temper","Aluminum","A96061",68.9,276,310,12,2.70,95,.33,167,23.6,"Machined parts, bicycle frames, fixtures and general structures."],
["al-6063-t5","Aluminum 6063","T5 temper","Aluminum","A96063",68.9,145,186,12,2.70,60,.33,209,23.4,"Architectural extrusions such as window frames, door frames and railings."],
["al-7075-t6","Aluminum 7075","T6 temper","Aluminum","A97075",71.7,503,572,11,2.81,150,.33,130,23.6,"Aircraft structures, high-stress fittings, molds and sporting goods."],
["ti-grade-2","Titanium Grade 2","Commercially pure, annealed","Titanium","R50400",105,275,345,20,4.51,null,.37,16.4,8.6,"Chemical process equipment, marine parts and heat exchangers."],
["ti-6al-4v","Titanium Ti-6Al-4V","Grade 5, annealed","Titanium","R56400",113.8,880,950,14,4.43,334,.34,6.7,8.6,"Aerospace structures, jet engine parts and medical implants."],
["cu-c11000","Copper C11000 (ETP)","Annealed","Copper alloy","C11000",115,69,220,50,8.89,null,.31,388,17.0,"Electrical bus bars, wiring, heat exchangers and roofing."],
["cu-c26000","Cartridge Brass C26000","Annealed","Copper alloy","C26000",110,105,325,62,8.53,null,.37,120,19.9,"Ammunition cases, radiator cores, lamp fixtures and deep-drawn parts."],
["cu-c36000","Free-Cutting Brass C36000","Half hard (H02)","Copper alloy","C36000",97,310,385,25,8.50,null,.31,115,20.5,"Screw-machine parts, fittings, valve bodies and fasteners."],
["cu-c51000","Phosphor Bronze C51000","Hard (H04)","Copper alloy","C51000",110,515,560,10,8.86,null,.34,84,17.8,"Springs, electrical contacts, bushings and bellows."],
["ci-gray-30","Gray Cast Iron Class 30","ASTM A48, as cast","Cast iron","F12401",100,null,214,0.6,7.15,210,.26,46,10.5,"Engine blocks, brake drums, machine bases and pump housings."],
["ci-ductile-65","Ductile Iron 65-45-12","ASTM A536","Cast iron","F33100",169,310,448,12,7.10,170,.29,36,11.2,"Crankshafts, gears, pipe fittings and suspension parts."],
["ni-718","Inconel 718","Solution treated and aged","Nickel alloy","N07718",200,1035,1240,12,8.19,null,.29,11.4,13.0,"Gas turbine discs, rocket engine parts and high-temperature fasteners."],
["mg-az31b","Magnesium AZ31B","H24 sheet","Magnesium","M11311",45,220,290,15,1.77,73,.35,96,26.0,"Laptop and camera housings, and lightweight aerospace and automotive panels."]
].map(r=>({id:r[0],name:r[1],cond:r[2],cat:r[3],uns:r[4],E:r[5],sy:r[6],su:r[7],el:r[8],rho:r[9],hb:r[10],nu:r[11],k:r[12],cte:r[13],uses:r[14]}));

const API={CATS,D};if(typeof module!=='undefined')module.exports=API;else root.MPH_DATA=API;
})(this);

;
/* Material Properties Hub: shared rendering (runs in Node at build time and in the browser). */
(function(root){
const {CATS,D}=typeof module!=="undefined"?require("./data.js"):root.MPH_DATA;
const BY=Object.fromEntries(D.map(m=>[m.id,m]));
const SERIES=["var(--s1)","var(--s2)","var(--s3)","var(--s4)"];
const POPULAR=[["al-6061-t6","al-7075-t6"],["aisi-1018-cd","aisi-1045-cd"],["ss-304","ss-316"],["aisi-4140-an","aisi-4140-qt"],
  ["al-6061-t6","ss-304"],["ti-6al-4v","al-7075-t6"],["aisi-1045-cd","aisi-4140-an"],["al-6061-t6","al-6063-t5"],
  ["al-2024-t3","al-7075-t6"],["aisi-4140-qt","aisi-4340-qt"],["astm-a36","aisi-1018-cd"],["cu-c11000","al-1100-h14"]];
const S={units:"SI",sel:[],sort:{key:"cat",dir:1},f:{q:"",cats:[],ymin:null,umin:null,dmax:null},zoom:false,root:""};

/* ---------- links ---------- */
const slugOf=ids=>ids.join("-vs-");
const POP_SLUGS=new Set(POPULAR.map(slugOf));
const L={
  home:()=>S.root||"./", mat:id=>S.root+"materials/"+id+"/",
  cmp:ids=>{const s=slugOf(ids);return POP_SLUGS.has(s)?S.root+"compare/"+s+"/":S.root+"compare/"+(ids.length?"?m="+ids.join(","):"")},
  page:p=>S.root+p+"/"};

/* ---------- units ---------- */
const KSI=0.1450377;
function nf(v,d){if(v==null||isNaN(v))return"—";return Number(v).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d})}
const US=()=>S.units==="US";
const stU=()=>US()?"ksi":"MPa";
const st=v=>v==null?null:(US()?v*KSI:v);
const stIn=v=>US()?v/KSI:v;
const stF=v=>nf(st(v),US()?1:0);
const eU=()=>US()?"Msi":"GPa"; const eF=E=>nf(US()?E*KSI:E,US()?1:(E<100?1:0));
const dU=()=>US()?"lb/in³":"g/cm³"; const dV=r=>US()?r*0.0361273:r; const dF=r=>nf(dV(r),US()?3:2);
const kU=()=>US()?"BTU/h·ft·°F":"W/m·K"; const kF=k=>nf(US()?k*0.577789:k,US()?1:(k<20?1:0));
const cU=()=>US()?"µin/in·°F":"µm/m·°C"; const cF=c=>nf(US()?c*0.555556:c,1);
function stressStr(mpa){const a=Math.abs(mpa);const d=US()?(a<10?2:1):(a<10?2:a<100?1:0);return nf(st(mpa),d)+" "+stU()}
const both=mpa=>`${nf(mpa,0)} MPa (${nf(mpa*KSI,1)} ksi)`;

/* ---------- mechanics ---------- */
function curve(m){
  const E=m.E*1000, ef=m.el/100, pts=[];
  if(!m.sy){const k=Math.max(1.05,E*ef/m.su);
    for(let i=0;i<=80;i++){const e=ef*i/80;pts.push([e,m.su*(1-Math.pow(1-e/ef,k))])}
    return {pts,yieldPt:null,utsPt:[ef,m.su],frac:[ef,m.su]}}
  let eu=ef*0.75; if(eu<m.su/E+0.003) eu=m.su/E+0.003;
  const ep=eu-m.su/E;
  let n=(m.su>m.sy*1.001)?Math.log(ep/0.002)/Math.log(m.su/m.sy):200; n=Math.min(Math.max(n,2),220);
  for(let i=0;i<=220;i++){const t=i/220;const s=m.su*(1-(1-t)*(1-t));pts.push([s/E+0.002*Math.pow(s/m.sy,n),s])}
  const drop=ef>0.05?0.17:0.06;
  for(let i=1;i<=40;i++){const t=i/40;pts.push([eu+(ef-eu)*t,m.su*(1-drop*t*t)])}
  return {pts,yieldPt:[m.sy/E+0.002,m.sy],utsPt:[eu,m.su],frac:[ef,m.su*(1-drop)]};
}
function interp(pts,e){if(e<0||e>pts[pts.length-1][0])return null;let lo=0,hi=pts.length-1;
  while(hi-lo>1){const mid=(lo+hi)>>1;if(pts[mid][0]<=e)lo=mid;else hi=mid}
  const a=pts[lo],b=pts[hi];const t=b[0]===a[0]?0:(e-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*t}
function toughness(pts){let a=0;for(let i=1;i<pts.length;i++)a+=(pts[i][0]-pts[i-1][0])*(pts[i][1]+pts[i-1][1])/2;return a}
function niceMax(max){const raw=max/5;const p=Math.pow(10,Math.floor(Math.log10(raw)));const f=raw/p;const step=(f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*p;return {step,max:Math.ceil(max/step-1e-9)*step}}

/* ---------- helpers ---------- */
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function short(m){return m.cond.replace(/ temper$/,"").replace("Quenched and tempered at","Q&T")}
function full(m){return m.name+" ("+short(m)+")"}
function matOptions(sel,exclude=[]){return CATS.map(c=>{const ms=D.filter(m=>m.cat===c&&!exclude.includes(m.id));if(!ms.length)return"";
  return `<optgroup label="${c}">${ms.map(m=>`<option value="${m.id}"${m.id===sel?" selected":""}>${esc(m.name)} (${esc(short(m))})</option>`).join("")}</optgroup>`}).join("")}
const zoomSeg=lab=>`<div class="seg" role="group" aria-label="Chart range"><button type="button" data-zoom="0" aria-pressed="${!S.zoom}">Full curve</button><button type="button" data-zoom="1" aria-pressed="${S.zoom}">${lab}</button></div>`;

/* ---------- chart ---------- */
let CH=null;
function chartHTML(mats,opts={}){
  const cs=mats.map(m=>({m,c:curve(m)}));
  const W=720,H=400,ml=62,mr=20,mt=16,mb=46,pw=W-ml-mr,ph=H-mt-mb;
  const xMaxRaw=S.zoom?Math.max(...cs.map(o=>o.c.yieldPt?o.c.yieldPt[0]*2.4:o.c.frac[0]*1.08)):Math.max(...cs.map(o=>o.c.frac[0]))*1.04;
  const xs=niceMax(xMaxRaw*100), ys=niceMax(Math.max(...cs.map(o=>st(o.m.su)))*1.1);
  const X=e=>ml+(e*100)/xs.max*pw, Y=s=>mt+ph-(st(s))/ys.max*ph;
  let g="";
  for(let v=0;v<=ys.max+1e-9;v+=ys.step){const y=mt+ph-v/ys.max*ph;g+=`<line class="gr" x1="${ml}" x2="${W-mr}" y1="${y}" y2="${y}"/><text x="${ml-8}" y="${y+4}" text-anchor="end">${nf(v,ys.step%1!==0?1:0)}</text>`}
  for(let v=0;v<=xs.max+1e-9;v+=xs.step){const x=ml+v/xs.max*pw;const d=xs.step<0.1?2:(xs.step%1!==0)?1:0;g+=`<line class="gr" x1="${x}" x2="${x}" y1="${mt}" y2="${mt+ph}"/><text x="${x}" y="${mt+ph+18}" text-anchor="middle">${nf(v,d)}</text>`}
  g+=`<line class="ax" x1="${ml}" x2="${W-mr}" y1="${mt+ph}" y2="${mt+ph}"/><line class="ax" x1="${ml}" x2="${ml}" y1="${mt}" y2="${mt+ph}"/>`;
  g+=`<text x="${ml+pw/2}" y="${H-6}" text-anchor="middle">Engineering strain (%)</text><text transform="translate(14 ${mt+ph/2}) rotate(-90)" text-anchor="middle">Engineering stress (${stU()})</text>`;
  let paths="",marks="";
  cs.forEach((o,i)=>{const col=opts.single?"var(--accent)":SERIES[i];
    const d=o.c.pts.map((p,j)=>(j?"L":"M")+X(p[0]).toFixed(1)+" "+Y(p[1]).toFixed(1)).join("");
    paths+=`<path d="${d}" fill="none" style="stroke:${col}" stroke-width="2.4" stroke-linejoin="round"/>`;
    if(o.c.yieldPt)marks+=`<circle cx="${X(o.c.yieldPt[0]).toFixed(1)}" cy="${Y(o.c.yieldPt[1]).toFixed(1)}" r="5" style="fill:var(--surface);stroke:var(--mark)" stroke-width="2"/>`;
    marks+=`<circle cx="${X(o.c.utsPt[0]).toFixed(1)}" cy="${Y(o.c.utsPt[1]).toFixed(1)}" r="4.5" style="fill:var(--mark)"/>`;
    const fx=X(o.c.frac[0]),fy=Y(o.c.frac[1]);marks+=`<path d="M${(fx-4).toFixed(1)} ${(fy-4).toFixed(1)}L${(fx+4).toFixed(1)} ${(fy+4).toFixed(1)}M${(fx+4).toFixed(1)} ${(fy-4).toFixed(1)}L${(fx-4).toFixed(1)} ${(fy+4).toFixed(1)}" style="stroke:${col}" stroke-width="2"/>`;
  });
  let off="";
  if(opts.single&&cs[0].c.yieldPt){const m=cs[0].m,E=m.E*1000,s2=m.sy*1.18;off=`<path d="M${X(0.002).toFixed(1)} ${Y(0).toFixed(1)}L${X(0.002+s2/E).toFixed(1)} ${Y(s2).toFixed(1)}" style="stroke:var(--muted)" stroke-width="1.4" stroke-dasharray="5 4"/>`}
  CH={cs,X,Y,xmaxE:xs.max/100,ml,pw,mt,ph,W,single:!!opts.single};
  const label=opts.single?`Stress-strain curve of ${full(mats[0])}`:"Stress-strain curves of "+mats.map(full).join(", ");
  return `<div class="readout" id="readout" aria-live="polite">Move across the chart to read stress at any strain.</div>
  <svg class="chart" id="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">
    <defs><clipPath id="clip"><rect x="${ml}" y="${mt-6}" width="${pw+6}" height="${ph+6}"/></clipPath></defs>
    ${g}<g clip-path="url(#clip)">${off}${paths}${marks}</g>
    <g id="hov" style="display:none"><line id="hl" y1="${mt}" y2="${mt+ph}" style="stroke:var(--muted)" stroke-dasharray="2 3"/>${cs.map((o,i)=>`<circle id="hd${i}" r="4" style="fill:${opts.single?"var(--accent)":SERIES[i]};stroke:var(--surface)" stroke-width="2"/>`).join("")}</g>
    <rect id="hit" x="${ml}" y="${mt}" width="${pw}" height="${ph}" fill="transparent"/>
  </svg>
  <div class="legend">${opts.single?"":cs.map((o,i)=>`<span><i style="background:${SERIES[i]}"></i>${esc(full(o.m))}</span>`).join("")}
    <span><i class="dot"></i>Yield (0.2% offset)</span><span><i class="dot f"></i>Tensile strength</span>${opts.single&&cs[0].c.yieldPt?'<span><i class="dash"></i>0.2% offset line</span>':""}<span>× Fracture</span></div>`;
}

/* ---------- index ---------- */
function viewList(){
  const f=S.f;
  return `<div class="intro"><div><h1>Mechanical properties of engineering metals</h1>
    <p>Look up yield strength, tensile strength, elastic modulus and elongation for ${D.length} common metals. Open a material for its stress–strain curve, or tick up to four to compare.</p></div></div>
  <div class="index">
    <aside class="panel" aria-label="Filters">
      <div class="field"><label class="label" for="q">Search</label><input id="q" type="search" placeholder="6061, 4140, S30400…" value="${esc(f.q)}" autocomplete="off"></div>
      <div class="field"><span class="label">Material family</span><div class="chips">${CATS.map(c=>`<button type="button" class="chip" data-cat="${c}" aria-pressed="${f.cats.includes(c)}">${c}</button>`).join("")}</div></div>
      <div class="field"><label class="label" for="ymin">Yield strength at least</label><div class="unit-in"><input id="ymin" type="number" min="0" inputmode="decimal" placeholder="Any" value="${f.ymin!=null?+st(f.ymin).toFixed(1):""}"><em>${stU()}</em></div></div>
      <div class="field"><label class="label" for="umin">Tensile strength at least</label><div class="unit-in"><input id="umin" type="number" min="0" inputmode="decimal" placeholder="Any" value="${f.umin!=null?+st(f.umin).toFixed(1):""}"><em>${stU()}</em></div></div>
      <div class="field"><label class="label" for="dmax">Density at most</label><div class="unit-in"><input id="dmax" type="number" min="0" step="0.01" inputmode="decimal" placeholder="Any" value="${f.dmax!=null?+dV(f.dmax).toFixed(3):""}"><em>${dU()}</em></div></div>
      <button type="button" class="linkbtn" data-act="clear-f">Clear all filters</button>
    </aside>
    <section style="min-width:0"><p class="count" id="count"></p><div class="tbl-wrap"><table id="tbl"><thead>${tableHead()}</thead><tbody>${tableBody()}</tbody></table></div></section>
  </div>
  <section class="card prose" style="margin-top:28px"><h2 style="margin-top:0">Popular comparisons</h2><div class="links">${POPULAR.map(p=>`<a href="${L.cmp(p)}">${esc(p.map(id=>BY[id].name.replace(/ Steel$/,"")+" "+short(BY[id]).replace(/^(Annealed|Cold drawn|Hot rolled)$/,s=>s.toLowerCase())).join(" vs "))}</a>`).join("")}</div></section>`;
}
const COLS=[["name","Material",""],["cat","Family",""],["sy","Yield","stress"],["su","Tensile","stress"],["E","Modulus E","mod"],["el","Elong.","%"],["rho","Density","dens"]];
function filtered(){
  const f=S.f,q=f.q.trim().toLowerCase();
  let rows=D.filter(m=>(!q||(m.name+" "+m.cond+" "+m.uns+" "+m.cat+" "+m.id).toLowerCase().includes(q))
    &&(!f.cats.length||f.cats.includes(m.cat))&&(f.ymin==null||(m.sy!=null&&m.sy>=f.ymin))&&(f.umin==null||m.su>=f.umin)&&(f.dmax==null||m.rho<=f.dmax));
  const {key,dir}=S.sort;
  rows.sort((a,b)=>{let x=a[key],y=b[key];if(key==="cat"){x=CATS.indexOf(a.cat);y=CATS.indexOf(b.cat);if(x===y)return a.name.localeCompare(b.name)}
    if(x==null)return 1;if(y==null)return -1;return(typeof x==="string"?x.localeCompare(y):x-y)*dir});
  return rows;
}
function tableHead(){const {key,dir}=S.sort;const unit=t=>t==="stress"?stU():t==="mod"?eU():t==="dens"?dU():t;
  return `<tr><th style="width:36px"><span class="sr">Compare</span></th>${COLS.map(([k,l,t])=>`<th class="${t?"n":""}" aria-sort="${key===k?(dir>0?"ascending":"descending"):"none"}"><button type="button" data-sort="${k}">${l}${t?` <small>${unit(t)}</small>`:""}${key===k?(dir>0?" ↑":" ↓"):""}</button></th>`).join("")}</tr>`}
function tableBody(rows=filtered()){
  return rows.length?rows.map(m=>`<tr>
    <td><input class="cb" type="checkbox" data-pick="${m.id}" aria-label="Compare ${esc(m.name)}" ${S.sel.includes(m.id)?"checked":""} ${!S.sel.includes(m.id)&&S.sel.length>=4?"disabled":""}></td>
    <td class="mat"><a href="${L.mat(m.id)}">${esc(m.name)}</a><span class="sub">${esc(m.cond)}, UNS ${m.uns}</span></td>
    <td class="cat">${m.cat}</td><td class="n">${m.sy==null?'<span class="muted" title="No distinct yield point">—</span>':stF(m.sy)}</td><td class="n">${stF(m.su)}</td><td class="n">${eF(m.E)}</td><td class="n">${nf(m.el,m.el<1?1:0)}</td><td class="n">${dF(m.rho)}</td></tr>`).join("")
    :`<tr><td colspan="8" class="empty">No materials match these filters. Lower a limit or clear the filters.</td></tr>`}
function countText(n){return `Showing ${n} of ${D.length} materials`+(S.sel.length?`. ${S.sel.length} of 4 picked for comparison.`:"")}

/* ---------- material ---------- */
function overview(m){
  const ys=m.sy?`a typical yield strength of ${both(m.sy)}, `:"no distinct yield point, ";
  return `${esc(full(m))} has ${ys}an ultimate tensile strength of ${both(m.su)} and a modulus of elasticity of ${nf(m.E,m.E<100?1:0)} GPa (${nf(m.E*KSI,1)} Msi). Elongation at break is about ${nf(m.el,m.el<1?1:0)}% and density is ${nf(m.rho,2)} g/cm³ (${nf(m.rho*0.0361273,3)} lb/in³).`}
function viewMat(m){
  const c=curve(m),E=m.E*1000,G=m.E/(2*(1+m.nu)),T=toughness(c.pts);
  const ey=m.sy?m.sy/E*100:null, Ur=m.sy?m.sy*m.sy/(2*E):null;
  const peers=D.filter(x=>x.cat===m.cat&&x.id!==m.id).slice(0,5);
  const rivals=D.filter(x=>x.cat!==m.cat&&x.sy&&m.sy&&Math.abs(x.sy-m.sy)/m.sy<0.35).slice(0,4);
  const inSel=S.sel.includes(m.id);
  const toughU=US()?"in·lbf/in³":"MJ/m³",tV=v=>US()?nf(v*145.038,0):nf(v,v<10?2:1);
  const nm=esc(m.name+" "+short(m));
  return `<nav class="crumb" aria-label="Breadcrumb"><a href="${L.home()}">Materials</a> / ${m.cat} / ${esc(m.name)}</nav>
  <div class="sheet-head"><div><h1>${esc(m.name)} properties</h1><div class="meta"><span class="tag">${esc(m.cond)}</span><span>UNS ${m.uns}</span><span>Family: ${m.cat}</span></div></div>
    <button type="button" class="btn ${inSel?"ghost":"pri"}" data-act="toggle-sel" data-id="${m.id}" ${!inSel&&S.sel.length>=4?"disabled":""}>${inSel?"✓ In comparison":"+ Add to comparison"}</button></div>
  <p class="prose" style="margin:-8px 0 20px">${overview(m)}</p>
  <div class="keyrow">
    <div><div class="label">Yield strength</div><div class="v">${m.sy?stF(m.sy):"—"}<small>${m.sy?stU():"no distinct yield"}</small></div></div>
    <div><div class="label">Tensile strength</div><div class="v">${stF(m.su)}<small>${stU()}</small></div></div>
    <div><div class="label">Elastic modulus</div><div class="v">${eF(m.E)}<small>${eU()}</small></div></div>
    <div><div class="label">Elongation at break</div><div class="v">${nf(m.el,m.el<1?1:0)}<small>%</small></div></div>
  </div>
  <div class="sheet">
    <div class="stack">
      <section class="card"><div class="card-h"><h2>Stress–strain curve</h2>${zoomSeg(m.sy?"Yield region":"Elastic region")}</div>
        ${chartHTML([m],{single:true})}
        <p class="note">${m.sy?"Idealized curve (Ramberg–Osgood fit to the tabulated yield, tensile strength and modulus). The dashed line is the 0.2% offset used to define yield.":"This material has no distinct yield point and fails with very little plastic strain, so the curve stops at the tensile strength."}</p>
      </section>
      <section class="card"><h2 style="margin-bottom:8px">Typical applications</h2><p style="margin:0">${esc(m.uses)}</p></section>
      <section class="card"><h2 style="margin-bottom:12px">Common questions</h2><div class="faq">
        <div><h3>What is the yield strength of ${nm}?</h3><p>${m.sy?`About ${both(m.sy)}, measured at 0.2% offset.`:"It has no distinct yield point. Designers use the tensile strength, "+both(m.su)+", with a larger factor of safety."}</p></div>
        <div><h3>What is the tensile strength of ${nm}?</h3><p>About ${both(m.su)}.</p></div>
        <div><h3>What is the Young's modulus of ${nm}?</h3><p>About ${nf(m.E,m.E<100?1:0)} GPa (${nf(m.E*KSI,1)} Msi), with a shear modulus of about ${nf(G,1)} GPa.</p></div>
      </div></section>
    </div>
    <div class="stack">
      <section class="card"><h2 style="margin-bottom:6px">Properties</h2>
        <dl class="props">
          <dt>Yield strength <small>0.2% offset</small></dt><dd>${m.sy?stF(m.sy)+`<small>${stU()}</small>`:"—"}</dd>
          <dt>Ultimate tensile strength</dt><dd>${stF(m.su)}<small>${stU()}</small></dd>
          <dt>Modulus of elasticity, E</dt><dd>${eF(m.E)}<small>${eU()}</small></dd>
          <dt>Shear modulus, G <small>E / 2(1+ν)</small></dt><dd>${eF(G)}<small>${eU()}</small></dd>
          <dt>Poisson's ratio, ν</dt><dd>${nf(m.nu,2)}</dd>
          <dt>Elongation at break <small>in 50 mm</small></dt><dd>${nf(m.el,m.el<1?1:0)}<small>%</small></dd>
          <dt>Hardness</dt><dd>${m.hb?nf(m.hb,0)+"<small>HB</small>":"—"}</dd>
          <dt>Density</dt><dd>${dF(m.rho)}<small>${dU()}</small></dd>
          <dt>Thermal conductivity</dt><dd>${kF(m.k)}<small>${kU()}</small></dd>
          <dt>Thermal expansion</dt><dd>${cF(m.cte)}<small>${cU()}</small></dd>
        </dl></section>
      <section class="card"><h2 style="margin-bottom:6px">Derived values</h2>
        <dl class="props">
          <dt>Strain at yield <small>σy / E</small></dt><dd>${ey!=null?nf(ey,3)+"<small>%</small>":"—"}</dd>
          <dt>Yield-to-tensile ratio</dt><dd>${m.sy?nf(m.sy/m.su,2):"—"}</dd>
          <dt>Specific strength <small>σy / ρ</small></dt><dd>${m.sy?nf(m.sy/m.rho,0)+"<small>kN·m/kg</small>":"—"}</dd>
          <dt>Modulus of resilience <small>σy² / 2E</small></dt><dd>${Ur!=null?tV(Ur)+`<small>${toughU}</small>`:"—"}</dd>
          <dt>Toughness, approx. <small>area under curve</small></dt><dd>${tV(T)}<small>${toughU}</small></dd>
        </dl></section>
      <section class="card"><h2 style="margin-bottom:10px;font-size:16px">Compare with</h2><div class="links">
        ${peers.concat(rivals).map(x=>`<a href="${L.cmp([m.id,x.id])}">${esc(x.name)} <span class="muted">${esc(short(x))}</span></a>`).join("")}</div></section>
    </div>
  </div>`;
}

/* ---------- compare ---------- */
function viewCompare(ids){
  const ms=ids.map(id=>BY[id]).filter(Boolean).slice(0,4);
  const pickers=`<div class="picks">${ms.map((m,i)=>`<span class="pick"><i style="background:${SERIES[i]}"></i><a href="${L.mat(m.id)}" style="color:inherit;text-decoration:none">${esc(m.name)} <span class="muted">${esc(short(m))}</span></a><button type="button" data-act="rm" data-id="${m.id}" aria-label="Remove ${esc(m.name)}">×</button></span>`).join("")}
    ${ms.length<4?`<select id="addm" class="add-sel" aria-label="Add a material"><option value="">+ Add material…</option>${matOptions("",ms.map(m=>m.id))}</select>`:""}</div>`;
  if(ms.length<2){
    return `<div class="intro"><div><h1>Compare materials</h1><p>Pick two to four materials to overlay their stress–strain curves and line up their properties.</p></div></div>${pickers}
    <div class="card"><h2 style="margin-bottom:12px;font-size:16px">Popular comparisons</h2><div class="links">${POPULAR.map(p=>`<a href="${L.cmp(p)}">${esc(p.map(id=>full(BY[id])).join(" vs "))}</a>`).join("")}</div></div>`;
  }
  const rows=[
    ["Yield strength","0.2% offset",m=>m.sy,stF,stU()],["Tensile strength","",m=>m.su,stF,stU()],["Modulus of elasticity","",m=>m.E,eF,eU()],
    ["Elongation at break","in 50 mm",m=>m.el,v=>nf(v,v<1?1:0),"%"],["Hardness","",m=>m.hb,v=>nf(v,0),"HB"],["Density","",m=>m.rho,dF,dU()],
    ["Specific strength","σy / ρ",m=>m.sy?m.sy/m.rho:null,v=>nf(v,0),"kN·m/kg"],["Poisson's ratio","",m=>m.nu,v=>nf(v,2),""],
    ["Thermal conductivity","",m=>m.k,kF,kU()],["Thermal expansion","",m=>m.cte,cF,cU()]];
  return `<nav class="crumb" aria-label="Breadcrumb"><a href="${L.home()}">Materials</a> / <a href="${S.root}compare/">Compare</a></nav>
  <div class="intro"><div><h1>${ms.map(m=>esc(m.name.replace(/ Steel$/,"")+" "+short(m))).join(" vs ")}</h1>
  <p>${compareSummary(ms)}</p></div></div>${pickers}
  <section class="card" style="margin-bottom:24px"><div class="card-h"><h2>Stress–strain curves</h2>${zoomSeg("Yield region")}</div>
    ${chartHTML(ms)}<p class="note">Idealized curves from tabulated values, for comparison and learning.</p></section>
  <div class="tbl-wrap"><table class="cmp"><thead><tr><th>Property</th>${ms.map((m,i)=>`<th class="n"><span style="color:${SERIES[i]}">■</span> ${esc(m.name)}</th>`).join("")}</tr></thead><tbody>
  ${rows.map(([l,sub,get,fmt,u])=>{const vals=ms.map(get);const mx=Math.max(...vals.filter(v=>v!=null));
    return `<tr><td>${l}${sub?`<small>${sub}</small>`:""}</td>${vals.map((v,i)=>`<td class="n">${v==null?"—":fmt(v)} <span class="muted" style="font-size:12px">${v==null?"":u}</span><div class="bar"><span style="width:${v==null?0:(v/mx*100).toFixed(1)}%;background:${SERIES[i]}"></span></div></td>`).join("")}</tr>`}).join("")}
  </tbody></table></div>`;
}
function compareSummary(ms){
  const top=(get,lab)=>{const a=ms.filter(m=>get(m)!=null).sort((x,y)=>get(y)-get(x));return a.length?`${esc(full(a[0]))} has the highest ${lab}`:""};
  const light=ms.slice().sort((a,b)=>a.rho-b.rho)[0];
  return [top(m=>m.sy,"yield strength"),top(m=>m.el,"elongation"),`${esc(full(light))} is the lightest`].filter(Boolean).join(". ")+".";
}

/* ---------- calculators ---------- */
const FU={N:1,kN:1000,lbf:4.448222,kip:4448.222},LU={mm:1,in:25.4};
function viewCalc(){
  const lu=US()?"in":"mm",fu=US()?"lbf":"kN";
  const fsel=(id,def)=>`<select id="${id}" class="inp" aria-label="Force unit">${Object.keys(FU).map(k=>`<option${k===def?" selected":""}>${k}</option>`).join("")}</select>`;
  const lsel=id=>`<select id="${id}" class="inp">${Object.keys(LU).map(k=>`<option${k===lu?" selected":""}>${k}</option>`).join("")}</select>`;
  const Lv=v=>US()?+(v/25.4).toFixed(3):v, Fv=v=>US()?+(v*1000/4.448222).toFixed(0):v;
  return `<div class="intro"><div><h1>Engineering calculators</h1><p>Quick checks for axial members, rod sizing and thermal stress, using the property data on this site. Each result shows the formula with your numbers.</p></div></div>
  <div class="calcs">
    <section class="card calc" data-calc="a"><h2>Axial stress, strain and elongation</h2><p class="muted" style="margin:4px 0 14px">A straight bar in tension or compression.</p>
      <div class="grid">
        <div class="field full"><label class="label" for="a-m">Material</label><select id="a-m" class="inp">${matOptions("al-6061-t6")}</select></div>
        <div class="field"><label class="label" for="a-f">Axial force</label><div class="pair"><input id="a-f" class="inp" type="number" inputmode="decimal" value="${Fv(20)}">${fsel("a-fu",fu)}</div></div>
        <div class="field"><label class="label" for="a-s">Cross-section</label><select id="a-s" class="inp"><option value="round">Solid round</option><option value="rect">Rectangle</option><option value="tube">Round tube</option></select></div>
        <div class="field"><label class="label" for="a-d1" id="a-d1l">Diameter</label><input id="a-d1" class="inp" type="number" inputmode="decimal" value="${Lv(12)}"></div>
        <div class="field"><label class="label" for="a-d2" id="a-d2l">Height</label><input id="a-d2" class="inp" type="number" inputmode="decimal" value="${Lv(8)}"></div>
        <div class="field"><label class="label" for="a-l">Bar length</label><input id="a-l" class="inp" type="number" inputmode="decimal" value="${Lv(500)}"></div>
        <div class="field"><label class="label" for="a-lu">Length unit</label>${lsel("a-lu")}</div>
      </div><div class="out" id="a-out"></div></section>
    <section class="card calc" data-calc="b"><h2>Size a round bar</h2><p class="muted" style="margin:4px 0 14px">Smallest solid diameter that carries the load with your factor of safety.</p>
      <div class="grid">
        <div class="field full"><label class="label" for="b-m">Material</label><select id="b-m" class="inp">${matOptions("aisi-1045-cd")}</select></div>
        <div class="field"><label class="label" for="b-f">Axial force</label><div class="pair"><input id="b-f" class="inp" type="number" inputmode="decimal" value="${Fv(50)}">${fsel("b-fu",fu)}</div></div>
        <div class="field"><label class="label" for="b-n">Factor of safety</label><input id="b-n" class="inp" type="number" step="0.1" min="1" inputmode="decimal" value="2.5"></div>
        <div class="field"><label class="label" for="b-lu">Result unit</label>${lsel("b-lu")}</div>
      </div><div class="out" id="b-out"></div></section>
    <section class="card calc" data-calc="c"><h2>Thermal stress in a restrained bar</h2><p class="muted" style="margin:4px 0 14px">Both ends fixed, uniform temperature change.</p>
      <div class="grid">
        <div class="field full"><label class="label" for="c-m">Material</label><select id="c-m" class="inp">${matOptions("astm-a36")}</select></div>
        <div class="field"><label class="label" for="c-t">Temperature change, ΔT</label><input id="c-t" class="inp" type="number" inputmode="decimal" value="${US()?108:60}"></div>
        <div class="field"><label class="label" for="c-tu">Unit</label><select id="c-tu" class="inp"><option value="C"${US()?"":" selected"}>°C</option><option value="F"${US()?" selected":""}>°F</option></select></div>
      </div><div class="out" id="c-out"></div></section>
    <section class="card"><h2>Formulas used</h2>
      <dl class="props" style="margin-top:6px">
        <dt>Normal stress</dt><dd>σ = F / A</dd><dt>Hooke's law (elastic)</dt><dd>ε = σ / E</dd>
        <dt>Elongation</dt><dd>δ = F·L / (A·E)</dd><dt>Factor of safety</dt><dd>n = σy / σ</dd>
        <dt>Required area</dt><dd>A = n·F / σy</dd><dt>Thermal stress</dt><dd>σ = E·α·ΔT</dd></dl>
      <p class="note">Brittle materials with no yield point use tensile strength in place of σy. These checks ignore buckling, stress concentrations and fatigue.</p></section>
  </div>`;
}
function status(n){return n>=2?`<span class="pill ok">Safe, n ≥ 2</span>`:n>=1?`<span class="pill warn">Low margin, 1 ≤ n &lt; 2</span>`:`<span class="pill bad">Exceeds strength, n &lt; 1</span>`}
function row(l,v){return `<div class="row"><span>${l}</span><span>${v}</span></div>`}
function calcAll(doc){
  const g=id=>doc.getElementById(id), num=id=>parseFloat(g(id).value);
  {const m=BY[g("a-m").value],F=num("a-f")*FU[g("a-fu").value],lu=g("a-lu").value,k=LU[lu],sh=g("a-s").value;
   g("a-d1l").textContent=sh==="rect"?"Width ("+lu+")":sh==="tube"?"Outer diameter ("+lu+")":"Diameter ("+lu+")";
   g("a-d2l").textContent=sh==="tube"?"Inner diameter ("+lu+")":"Height ("+lu+")";
   g("a-d2").disabled=sh==="round";g("a-d2").parentElement.style.opacity=sh==="round"?.45:1;
   const d1=num("a-d1")*k,d2=num("a-d2")*k,Ln=num("a-l")*k;
   const A=sh==="round"?Math.PI*d1*d1/4:sh==="rect"?d1*d2:Math.PI*(d1*d1-d2*d2)/4;
   const o=g("a-out");
   if(!(A>0)||!(Math.abs(F)>0)||!(Ln>0)){o.innerHTML=`<p class="muted" style="margin:0">Enter a force and positive dimensions${sh==="tube"?" (inner diameter smaller than outer)":""}.</p>`}
   else{const s=F/A,E=m.E*1000,eps=s/E,del=eps*Ln,lim=m.sy||m.su,n=lim/Math.abs(s);const a2=US()?A/645.16:A,au=US()?"in²":"mm²";
    o.innerHTML=`${status(n)}${row("Area, A",nf(a2,US()?4:1)+" "+au)}${row("Stress, σ",stressStr(s))}${row("Strain, ε",(Math.abs(eps)<0.001?nf(eps*1e6,0)+" µε":nf(eps*100,3)+" %"))}
     ${row("Elongation, δ",Math.abs(s)<lim?nf(del/k,lu==="in"?4:3)+" "+lu:"not valid beyond yield")}${row("Factor of safety, n = "+(m.sy?"σy":"σu")+"/σ",nf(n,2))}
     <div class="formula">σ = ${nf(F,0)} N / ${nf(A,1)} mm² = ${nf(s,1)} MPa${US()?" = "+nf(s*KSI,2)+" ksi":""}</div>`}}
  {const m=BY[g("b-m").value],F=num("b-f")*FU[g("b-fu").value],n=num("b-n"),lu=g("b-lu").value,lim=m.sy||m.su,o=g("b-out");
   if(!(F>0)||!(n>=1)){o.innerHTML=`<p class="muted" style="margin:0">Enter a positive force and a factor of safety of 1 or more.</p>`}
   else{const A=n*F/lim,d=Math.sqrt(4*A/Math.PI);const dd=d/LU[lu];
    const next=lu==="in"?nf(Math.ceil(dd*16)/16,4)+" in":nf(Math.ceil(d),0)+" mm";
    o.innerHTML=`${row("Allowable stress, "+(m.sy?"σy":"σu")+" / n",stressStr(lim/n))}${row("Required area",lu==="in"?nf(A/645.16,4)+" in²":nf(A,1)+" mm²")}
     ${row("Minimum diameter",nf(dd,lu==="in"?3:2)+" "+lu)}${row("Next size up",next)}
     <div class="formula">d = √(4·n·F / π·σ) = √(4 × ${nf(n,2)} × ${nf(F,0)} N / π × ${nf(lim,0)} MPa) = ${nf(d,2)} mm</div>`}}
  {const m=BY[g("c-m").value],dT=num("c-t")*(g("c-tu").value==="F"?5/9:1),o=g("c-out");
   if(isNaN(dT)){o.innerHTML=`<p class="muted" style="margin:0">Enter a temperature change.</p>`}
   else{const s=m.E*1000*m.cte*1e-6*dT,lim=m.sy||m.su,n=Math.abs(s)>0?lim/Math.abs(s):Infinity;
    o.innerHTML=`${Math.abs(s)>0?status(n):""}${row("Thermal stress, σ",stressStr(Math.abs(s))+(s>0?" compressive (heating)":s<0?" tensile (cooling)":""))}${row("Free thermal strain, α·ΔT",nf(Math.abs(m.cte*dT),0)+" µε")}${row("Factor of safety",isFinite(n)?nf(n,2):"—")}
     <div class="formula">σ = ${nf(m.E*1000,0)} MPa × ${nf(m.cte,1)}×10⁻⁶ /°C × ${nf(dT,1)} °C = ${nf(Math.abs(s),1)} MPa</div>`}}
}

/* ---------- unit converter ---------- */
const CU=[["Pa",1e-6],["kPa",1e-3],["MPa",1],["GPa",1e3],["N/mm²",1],["bar",0.1],["psi",0.00689476],["ksi",6.89476],["kgf/mm²",9.80665],["kgf/cm²",0.0980665]];
function convRows(v,from){const f=CU.find(c=>c[0]===from)[1];
  return CU.map(([u,k])=>{const r=v*f/k;const s=isNaN(r)?"—":(Math.abs(r)>=1e6||(Math.abs(r)<1e-3&&r!==0))?r.toExponential(4):(+r.toPrecision(6)).toLocaleString("en-US",{maximumFractionDigits:6});return `<dt>${u}</dt><dd>${s}</dd>`}).join("")}
function viewUnits(){
  return `<div class="intro"><div><h1>Stress and pressure unit converter</h1><p>Type a value once and read it in every unit used in data sheets and textbooks: MPa, ksi, psi, N/mm², kgf/mm² and more.</p></div></div>
  <section class="card conv"><div class="conv-in"><input id="cv" class="inp" type="number" inputmode="decimal" value="250" aria-label="Value"><select id="cu" class="inp" aria-label="From unit">${CU.map(([u])=>`<option${u==="MPa"?" selected":""}>${u}</option>`).join("")}</select></div>
  <dl class="props" id="cout">${convRows(250,"MPa")}</dl><p class="note">1 MPa = 1 N/mm². 1 ksi = 1000 psi = 6.895 MPa.</p></section>`;
}

const API={S,D,CATS,BY,POPULAR,L,slugOf,KSI,nf,esc,short,full,both,stIn,dV,curve,interp,stressStr,
  viewList,viewMat,viewCompare,viewCalc,viewUnits,tableHead,tableBody,filtered,countText,calcAll,convRows,getCH:()=>CH};
if(typeof module!=="undefined")module.exports=API;else root.MPH=API;
})(this);

;
/* Material Properties Hub: browser behaviour. Pages arrive pre-rendered in SI; this script re-renders for the
   viewer's unit choice and wires up interaction. */
(function(){
const M=window.MPH,S=M.S,body=document.body,app=document.getElementById("app");
S.root=body.dataset.root||"";
const store={get(k,d){try{const v=localStorage.getItem("mph-"+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem("mph-"+k,JSON.stringify(v))}catch(e){}}};
S.units=store.get("units","SI");S.sel=store.get("sel",[]).filter(id=>M.BY[id]);
const view=body.dataset.view;

function ids(){if(body.dataset.ids)return body.dataset.ids.split(",");
  const p=new URLSearchParams(location.search).get("m");return p?p.split(",").filter(id=>M.BY[id]).slice(0,4):S.sel.slice()}
function setSel(a){S.sel=a.slice(0,4);store.set("sel",S.sel);tray()}

function render(){
  document.querySelectorAll("[data-units]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.units===S.units));
  if(view==="list"){app.innerHTML=M.viewList();drawTable()}
  else if(view==="mat"){app.innerHTML=M.viewMat(M.BY[body.dataset.id]);bindChart()}
  else if(view==="compare"){app.innerHTML=M.viewCompare(ids());bindChart();bindAdd()}
  else if(view==="calc"){app.innerHTML=M.viewCalc();app.querySelectorAll(".calc").forEach(c=>c.addEventListener("input",()=>M.calcAll(document)));M.calcAll(document)}
  else if(view==="units"){app.innerHTML=M.viewUnits();const run=()=>{document.getElementById("cout").innerHTML=M.convRows(parseFloat(document.getElementById("cv").value),document.getElementById("cu").value)};
    document.getElementById("cv").addEventListener("input",run);document.getElementById("cu").addEventListener("change",run)}
  tray();
}
function drawTable(){const rows=M.filtered();document.querySelector("#tbl thead").innerHTML=M.tableHead();document.querySelector("#tbl tbody").innerHTML=M.tableBody(rows);document.getElementById("count").textContent=M.countText(rows.length)}

function bindChart(){
  const svg=document.getElementById("chart"),CH=M.getCH();if(!svg||!CH)return;
  const hov=svg.querySelector("#hov"),hl=svg.querySelector("#hl"),ro=document.getElementById("readout");
  const move=ev=>{const r=svg.getBoundingClientRect();const vx=(ev.clientX-r.left)/r.width*CH.W;
    if(vx<CH.ml||vx>CH.ml+CH.pw){hov.style.display="none";return}
    const e=(vx-CH.ml)/CH.pw*CH.xmaxE;hov.style.display="";hl.setAttribute("x1",vx);hl.setAttribute("x2",vx);
    const parts=[`<span>ε = <b>${M.nf(e*100,e<0.01?3:2)} %</b></span>`];
    CH.cs.forEach((o,i)=>{const s=M.interp(o.c.pts,e),dot=svg.querySelector("#hd"+i),nm=CH.single?"σ":M.esc(o.m.name);
      if(s==null){dot.style.display="none";parts.push(`<span>${nm}: <b>fractured</b></span>`)}
      else{dot.style.display="";dot.setAttribute("cx",vx);dot.setAttribute("cy",CH.Y(s));parts.push(`<span>${nm} = <b>${M.stressStr(s)}</b></span>`)}});
    ro.innerHTML=parts.join("")};
  svg.addEventListener("pointermove",move);svg.addEventListener("pointerdown",move);
  svg.addEventListener("pointerleave",()=>{hov.style.display="none"});
}
function goCompare(list){location.href=M.L.cmp(list)}
function bindAdd(){const s=document.getElementById("addm");if(s)s.addEventListener("change",()=>{if(!s.value)return;const l=ids().concat(s.value);setSel(l);goCompare(l)})}

function tray(){
  const t=document.getElementById("tray");if(!t)return;
  const show=S.sel.length>0&&(view==="list"||view==="mat");
  t.hidden=!show;if(!show)return;
  t.innerHTML=`<div class="wrap"><span class="names"><b>${S.sel.length} of 4 picked:</b> ${S.sel.map(id=>M.esc(M.full(M.BY[id]))).join(", ")}</span>
    <button type="button" class="btn ghost" data-act="clear-sel">Clear</button>${S.sel.length>=2?`<a class="btn pri" href="${M.L.cmp(S.sel)}">Compare ${S.sel.length}</a>`:`<span style="font-size:13px;opacity:.8">Pick one more to compare</span>`}</div>`;
}

document.addEventListener("click",e=>{
  const u=e.target.closest("[data-units]");if(u){S.units=u.dataset.units;store.set("units",S.units);render();return}
  const z=e.target.closest("[data-zoom]");if(z){S.zoom=z.dataset.zoom==="1";render();return}
  const s=e.target.closest("[data-sort]");if(s){const k=s.dataset.sort;S.sort=S.sort.key===k?{key:k,dir:-S.sort.dir}:{key:k,dir:k==="name"||k==="cat"?1:-1};drawTable();return}
  const c=e.target.closest("[data-cat]");if(c){const cat=c.dataset.cat,a=S.f.cats;S.f.cats=a.includes(cat)?a.filter(x=>x!==cat):a.concat(cat);c.setAttribute("aria-pressed",S.f.cats.includes(cat));drawTable();return}
  const a=e.target.closest("[data-act]");if(!a)return;
  const act=a.dataset.act;
  if(act==="clear-f"){S.f={q:"",cats:[],ymin:null,umin:null,dmax:null};render()}
  else if(act==="clear-sel"){setSel([]);if(view==="list")drawTable();if(view==="mat")render()}
  else if(act==="toggle-sel"){const id=a.dataset.id;setSel(S.sel.includes(id)?S.sel.filter(x=>x!==id):S.sel.concat(id));render()}
  else if(act==="rm"){const l=ids().filter(x=>x!==a.dataset.id);setSel(l);goCompare(l)}
});
document.addEventListener("change",e=>{const p=e.target.closest("[data-pick]");if(!p)return;const id=p.dataset.pick;
  setSel(p.checked?S.sel.concat(id):S.sel.filter(x=>x!==id));drawTable()});
document.addEventListener("input",e=>{const t=e.target;if(view!=="list")return;
  if(t.id==="q"){S.f.q=t.value;drawTable()}
  else if(t.id==="ymin"||t.id==="umin"){const v=parseFloat(t.value);S.f[t.id]=isNaN(v)?null:M.stIn(v);drawTable()}
  else if(t.id==="dmax"){const v=parseFloat(t.value);S.f.dmax=isNaN(v)?null:(S.units==="US"?v/0.0361273:v);drawTable()}
});
render();
})();
