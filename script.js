/* =========================================================
   DATA LAYER (localStorage)
========================================================= */
var DB_KEY = "agrisales_db_v1";
var DEFAULT_DB = {
  products: [], customers: [], orders: [], invoices: [], payments: [],
  batches: [], mfgBatches: [],
  settings: { companyName:"My Agro Company", address:"", phone:"", email:"", gstin:"", invPrefix:"INV-", orderPrefix:"SO-", bank:"", terms:"Goods once sold will not be taken back.\nSubject to local jurisdiction." },
  counters: { order:0, invoice:0 }
};
function loadDB(){
  try{
    var raw = localStorage.getItem(DB_KEY);
    if(!raw) return JSON.parse(JSON.stringify(DEFAULT_DB));
    var parsed = JSON.parse(raw);
    for(var k in DEFAULT_DB){ if(!(k in parsed)) parsed[k] = DEFAULT_DB[k]; }
    return parsed;
  }catch(e){ return JSON.parse(JSON.stringify(DEFAULT_DB)); }
}
var DB = loadDB();
function saveDB(){
  try{ localStorage.setItem(DB_KEY, JSON.stringify(DB)); }catch(e){ showToast("Storage full or unavailable"); }
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
function fmtMoney(n){ n = Number(n)||0; return "₹" + n.toLocaleString("en-IN", {maximumFractionDigits:2, minimumFractionDigits: (n%1!==0)?2:0}); }
function fmtDate(d){ if(!d) return "-"; var dt = new Date(d); if(isNaN(dt)) return d; return dt.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function daysBetween(d1,d2){ return Math.round((new Date(d2) - new Date(d1)) / 86400000); }

/* =========================================================
   NAVIGATION
========================================================= */