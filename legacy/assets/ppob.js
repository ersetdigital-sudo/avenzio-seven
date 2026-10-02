(function(){
function mount(root,INIT){var A=window.AV;if(!A||!root)return;INIT=INIT||{};
var P=A.products,BY={};P.forEach(function(p){BY[p.slug]=p});
var PFX={tsel:["0811","0812","0813","0821","0822","0823","0851","0852","0853"],isat:["0814","0815","0816","0855","0856","0857","0858"],xl:["0817","0818","0819","0859","0877","0878"],axis:["0831","0832","0833","0838"],tri:["0895","0896","0897","0898","0899"],smart:["0881","0882","0883","0884","0885","0886","0887","0888","0889"]};
var PHONE={"pulsa":1,"paket-data":1};
function det(n){var f=n.slice(0,4);for(var k in PFX)if(PFX[k].indexOf(f)>-1)return k;return null}
function rp(n){return "Rp"+Number(n).toLocaleString("id-ID")}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function logo(k){var v=A.provs[k]||[k,k,"#3D0B37","#fff"];return '<span class="pp-lg" style="background:'+v[2]+';color:'+v[3]+'">'+esc(v[1])+'</span>'}
function hp(){var o={};var h=location.hash.replace(/^#/,"");h.split("&").forEach(function(x){var i=x.indexOf("=");if(i>0)o[x.slice(0,i)]=decodeURIComponent(x.slice(i+1))});return o}
var cats=Object.keys(A.cats).filter(function(c){return P.some(function(p){return p.cat===c})});
var S={cat:cats[0],to:"",prov:null,sel:null,step:1};
var H=INIT.p?INIT:hp();if(H.p&&BY[H.p]){S.cat=BY[H.p].cat;S.sel=H.p;S.prov=BY[H.p].prov}else if(H.cat&&cats.indexOf(H.cat)>-1)S.cat=H.cat;if(H.to)S.to=H.to.replace(/\D/g,"");
function provsOf(c){var a=[];P.forEach(function(p){if(p.cat===c&&a.indexOf(p.prov)<0)a.push(p.prov)});return a}
function list(){var c=S.cat;if(PHONE[c]){var d=det(S.to);S.prov=d;return d?P.filter(function(p){return p.cat===c&&p.prov===d}):[]}
 var pv=provsOf(c);if(pv.length===1)S.prov=pv[0];if(!S.prov||pv.indexOf(S.prov)<0)S.prov=pv[0];return P.filter(function(p){return p.cat===c&&p.prov===S.prov})}
function valid(){return new RegExp(A.fields[S.cat][2]).test(S.to)}
function draw(){
 if(S.step===2)return pay();
 var f=A.fields[S.cat],items=list(),pv=provsOf(S.cat);if(S.sel&&!items.some(function(p){return p.slug===S.sel}))S.sel=null;
 var h='<div class="pp-tabs" role="tablist">'+cats.map(function(c){return '<button type="button" role="tab" aria-selected="'+(c===S.cat)+'" class="'+(c===S.cat?"on":"")+'" data-cat="'+c+'">'+esc(A.cats[c])+'</button>'}).join("")+'</div>';
 h+='<div class="pp-body"><label class="pp-lab" for="ppTo">'+esc(f[0])+'</label><div class="pp-in">'+(PHONE[S.cat]&&S.prov?logo(S.prov):'')+'<input id="ppTo" inputmode="numeric" autocomplete="tel" maxlength="16" placeholder="'+esc(f[1])+'" value="'+esc(S.to)+'"></div><p class="pp-hint" id="ppHint">'+esc(f[3])+'</p>';
 if(!PHONE[S.cat]&&pv.length>1)h+='<div class="pp-lab">Pilih layanan</div><div class="pp-chips">'+pv.map(function(k){return '<button type="button" data-prov="'+k+'" class="'+(k===S.prov?"on":"")+'">'+logo(k)+esc(A.provs[k][0])+'</button>'}).join("")+'</div>';
 h+='<div class="pp-lab">'+(items.length&&items[0].bill?"Pilih tagihan":"Pilih nominal")+'</div>';
 if(!items.length)h+='<div class="pp-empty">'+(PHONE[S.cat]?(S.to.length>=4?"Operator tidak dikenali. Periksa kembali nomor kamu.":"Masukkan nomor HP, operator terdeteksi otomatis."):"Produk belum tersedia.")+'</div>';
 else h+='<div class="pp-grid">'+items.map(function(p){return '<button type="button" class="pp-nom'+(p.slug===S.sel?" on":"")+'" data-p="'+p.slug+'"><b>'+esc(p.bill?p.short||p.title:p.nominal)+'</b><span>'+(p.bill?"Biaya admin "+rp(p.price):"Harga "+rp(p.price))+'</span></button>'}).join("")+'</div>';
 var sp=BY[S.sel];
 h+='</div><div class="pp-bar"><div><small>'+(sp&&sp.bill?"Biaya admin · tagihan dicek setelah ini":"Total")+'</small><b>'+(sp?rp(sp.price):"Rp0")+'</b></div><button type="button" class="abtn abtn-g pp-go" id="ppGo">Bayar</button></div>';
 root.innerHTML=h;
 var inp=root.querySelector("#ppTo");
 inp.addEventListener("input",function(){var v=inp.value.replace(/\D/g,"");var before=S.prov;S.to=v;if(PHONE[S.cat]){var d=det(v);if(d!==before){var pos=inp.selectionStart;draw();var n=root.querySelector("#ppTo");n.focus();try{n.setSelectionRange(pos,pos)}catch(e){}return}}inp.value=v});
 root.querySelectorAll("[data-cat]").forEach(function(b){b.onclick=function(){if(S.cat!==b.dataset.cat){S.cat=b.dataset.cat;S.sel=null;S.prov=null;if(!PHONE[S.cat]||!/^08/.test(S.to))S.to="";draw()}}});
 root.querySelectorAll("[data-prov]").forEach(function(b){b.onclick=function(){S.prov=b.dataset.prov;S.sel=null;draw()}});
 root.querySelectorAll("[data-p]").forEach(function(b){b.onclick=function(){S.sel=b.dataset.p;draw()}});
 root.querySelector("#ppGo").onclick=function(){var hint=root.querySelector("#ppHint");
  if(!valid()){hint.textContent="Periksa kembali: "+f[3];hint.className="pp-hint err";root.querySelector("#ppTo").focus();return}
  if(!S.sel){hint.textContent="Pilih "+(items[0]&&items[0].bill?"tagihan":"nominal")+" terlebih dahulu.";hint.className="pp-hint err";return}
  S.step=2;S.inv=inv();S.exp=Date.now()+15*60000;save("menunggu");draw();root.scrollIntoView({behavior:"smooth",block:"start"})};
}
function inv(){var d=new Date();return "INV-"+d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+("0"+d.getDate()).slice(-2)+"-"+String(Math.floor(Math.random()*9000+1000))}
function save(st){try{var all=JSON.parse(localStorage.getItem("av_orders")||"{}");var p=BY[S.sel];all[S.inv]={inv:S.inv,slug:p.slug,to:S.to,total:p.price,created:Date.now(),expires:S.exp,status:st};localStorage.setItem("av_orders",JSON.stringify(all));localStorage.setItem("av_last",S.inv)}catch(e){}}
function qr(seed){var n=25,c=6,h=7,s="";for(var i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))>>>0;function r(){h^=h<<13;h^=h>>>17;h^=h<<5;return(h>>>0)/4294967296}
 function fin(x,y){return '<rect x="'+x*c+'" y="'+y*c+'" width="'+7*c+'" height="'+7*c+'" fill="#241724"/><rect x="'+(x+1)*c+'" y="'+(y+1)*c+'" width="'+5*c+'" height="'+5*c+'" fill="#fff"/><rect x="'+(x+2)*c+'" y="'+(y+2)*c+'" width="'+3*c+'" height="'+3*c+'" fill="#241724"/>'}
 for(var y=0;y<n;y++)for(var x=0;x<n;x++){var f=(x<8&&y<8)||(x>n-9&&y<8)||(x<8&&y>n-9);if(!f&&r()>.52)s+='<rect x="'+x*c+'" y="'+y*c+'" width="'+c+'" height="'+c+'" fill="#241724"/>'}
 return '<svg viewBox="0 0 '+n*c+' '+n*c+'" role="img" aria-label="Kode QRIS pratinjau">'+s+fin(0,0)+fin(n-7,0)+fin(0,n-7)+'</svg>'}
var T;
function pay(){var p=BY[S.sel];clearInterval(T);
 var old=document.getElementById("payScr");if(old)old.remove();
 var el=document.createElement("div");el.id="payScr";el.className="ps";el.setAttribute("role","dialog");el.setAttribute("aria-modal","true");el.setAttribute("aria-label","Pembayaran");
 document.body.appendChild(el);document.documentElement.classList.add("ps-lock");
 try{history.replaceState(null,"","#invoice="+S.inv)}catch(e){}
 var st="menunggu",checking=false;
 function sum(){return '<dl class="ps-dl"><div><dt>Produk</dt><dd>'+esc(p.title)+'</dd></div><div><dt>'+(PHONE[p.cat]||p.cat==="e-wallet"?"Nomor Tujuan":esc(A.fields[p.cat][0]))+'</dt><dd>'+esc(S.to)+'</dd></div><div><dt>Invoice</dt><dd>'+S.inv+'</dd></div><div><dt>Metode Pembayaran</dt><dd>QRIS</dd></div><div class="tot"><dt>Total</dt><dd>'+rp(p.price)+'</dd></div></dl>'}
 function close(){clearInterval(T);el.remove();document.documentElement.classList.remove("ps-lock");try{history.replaceState(null,"",location.pathname)}catch(e){}}
 function render(){var h='<header class="ps-top"><span class="ps-brand">'+logo(p.prov)+'</span><h1>Pembayaran</h1><span class="ps-inv">'+S.inv+'</span></header><div class="ps-main">';
  if(st==="menunggu"){
   h+='<div class="ps-amt"><small>Total pembayaran</small><b>'+rp(p.price)+'</b><span>'+esc(p.title)+'</span></div>'+
   '<div class="ps-qr"><div class="ps-qrlab">QRIS</div>'+qr(S.inv)+'<p>Scan QRIS menggunakan mobile banking atau e-wallet.</p></div>'+
   '<div class="ps-st wait"><span class="ps-dot" aria-hidden="true"></span><div><b>'+(checking?"Memeriksa Pembayaran":"Menunggu Pembayaran")+'</b><p>'+(checking?"Status akan berubah otomatis setelah pembayaran terkonfirmasi.":"Selesaikan pembayaran sesuai nominal yang tertera.")+'</p><p class="ps-cd" id="psCd"></p></div></div>'+
   '<button type="button" class="ps-btn" id="psPaid"'+(checking?' disabled':'')+'>'+(checking?"Sedang dicek…":"Saya Sudah Bayar")+'</button>'+
   sum()+
   '';
  }else if(st==="berhasil"){
   h+='<div class="ps-res ok"><span class="ps-ic">✓</span><h2>Pembayaran Berhasil</h2><p>Pesanan kamu sedang diproses ke tujuan.</p></div>'+sum()+'<a class="ps-btn" href="/cek-pesanan?invoice='+S.inv+'#invoice='+S.inv+'">Lihat Detail Transaksi</a><button type="button" class="ps-btn2" id="psHome">Kembali ke Beranda</button>';
  }else if(st==="gagal"){
   h+='<div class="ps-res bad"><span class="ps-ic">!</span><h2>Pembayaran Tidak Berhasil</h2><p>Dana tidak terpotong. Silakan coba bayar lagi.</p></div>'+sum()+'<button type="button" class="ps-btn" id="psRetry">Coba Lagi</button>';
  }else{
   h+='<div class="ps-res exp"><span class="ps-ic">⏱</span><h2>Transaksi Kedaluwarsa</h2><p>Batas waktu pembayaran 15 menit sudah habis.</p></div>'+sum()+'<button type="button" class="ps-btn" id="psNew">Buat Pesanan Baru</button>';
  }
  el.innerHTML=h+'</div>';el.scrollTop=0;
  var q=function(id){return el.querySelector(id)};
  if(q("#psPaid"))q("#psPaid").onclick=function(){checking=true;render()};
  false&&el.querySelectorAll("[data-s]").forEach(function(b){b.onclick=function(){set(b.dataset.s)}});
  if(q("#psRetry"))q("#psRetry").onclick=function(){S.inv=inv();S.exp=Date.now()+15*60000;save("menunggu");checking=false;set("menunggu")};
  if(q("#psNew"))q("#psNew").onclick=function(){close();S.step=1;S.sel=null;draw()};
  if(q("#psHome"))q("#psHome").onclick=function(){close();location.href="/"};
  tick()}
 function set(x){st=x;if(x!=="menunggu"){clearInterval(T);save(x)}render();if(x==="menunggu"){clearInterval(T);T=setInterval(tick,1000)}}
 function tick(){if(st!=="menunggu")return;var ms=S.exp-Date.now();if(ms<=0)return set("kedaluwarsa");var c=el.querySelector("#psCd");if(c){var d=new Date(S.exp),m=Math.floor(ms/60000),s2=Math.floor(ms%60000/1000);c.textContent="Bayar sebelum "+("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)+" · sisa "+m+":"+("0"+s2).slice(-2)}}
 render();T=setInterval(tick,1000);
 S.step=1;
}
draw();
if(INIT.pay&&S.sel&&valid()&&(!PHONE[S.cat]||det(S.to)===BY[S.sel].prov)){S.step=2;S.inv=inv();S.exp=Date.now()+15*60000;save("menunggu")}draw();
function GO(h){if(h.p&&BY[h.p]){S.cat=BY[h.p].cat;S.sel=h.p;S.prov=BY[h.p].prov;S.step=1;draw()}else if(h.cat&&cats.indexOf(h.cat)>-1){S.cat=h.cat;S.sel=null;S.prov=null;S.step=1;draw()}}window.PPOB_go=GO;if(!INIT.p)window.addEventListener("hashchange",function(){var h=hp();if(h.p&&BY[h.p]){S.cat=BY[h.p].cat;S.sel=h.p;S.prov=BY[h.p].prov;S.step=1;draw()}else if(h.cat&&cats.indexOf(h.cat)>-1){S.cat=h.cat;S.sel=null;S.step=1;draw()}});
}
window.PPOB_mount=mount;mount(document.getElementById("ppob"));
})();
