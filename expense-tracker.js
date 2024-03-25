const ekleBtn = document.getElementById("ekle-btn");
const gelirInput = document.getElementById("gelir-input");
const ekleFormu = document.getElementById("ekle-formu");

const gelirinizTd = document.getElementById("geliriniz");
const giderinizTd = document.getElementById("gideriniz");
const kalanTd = document.getElementById("kalan");

let gelirler = 0;
let harcamaListesi = [];

ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(gelirInput.value);
  ekleFormu.reset();

  localStorage.setItem("gelirler", gelirler);
  hesaplaVeGuncelle();
});

const harcamaFormu = document.getElementById("harcama-formu");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");
const harcamaAlaniInput = document.getElementById("harcama-alani");

const harcamaBody = document.getElementById("harcama-body");
const temizleBtn = document.getElementById("temizle-btn");

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  const yeniHarcama = {
    tarih: tarihInput.value,
    miktar: miktarInput.value,
    alan: harcamaAlaniInput.value,
    id: new Date().getTime(),
  };

  harcamaListesi.push(yeniHarcama);

  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
  harcamayiDomaYaz(yeniHarcama);

  harcamaFormu.reset();
  tarihInput.valueAsDate = new Date();
  hesaplaVeGuncelle();
});

const harcamayiDomaYaz = ({ id, miktar, tarih, alan }) => {
  const tr = document.createElement("tr");

  const appendTd = (content) => {
    const td = document.createElement("td");
    td.textContent = content;
    return td;
  };

  const createLastTd = () => {
    const td = document.createElement("td");
    const iElement = document.createElement("i");
    iElement.id = id;
    iElement.className = "fa-solid fa-trash-can text-danger";
    iElement.type = "button";
    iElement.style = "cursor:pointer";
    td.appendChild(iElement);
    return td;
  };

  tr.append(appendTd(tarih), appendTd(alan), appendTd(miktar), createLastTd());

  harcamaBody.append(tr);
};

const hesaplaVeGuncelle = () => {
  const giderler = harcamaListesi.reduce(
    (toplam, harcama) => toplam + Number(harcama.miktar),
    0
  );

  console.log(giderler);

  giderinizTd.textContent = giderler;
  gelirinizTd.textContent = gelirler;
  kalanTd.textContent = gelirler - giderler;
};

window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler")) || 0;
  harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || [];

  harcamaListesi.forEach((harcama) => {
    harcamayiDomaYaz(harcama);
  });

  gelirinizTd.textContent = gelirler;

  hesaplaVeGuncelle();
  tarihInput.valueAsDate = new Date();
});

harcamaBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    e.target.parentElement.parentElement.remove();
    const id = e.target.id;
    harcamaListesi = harcamaListesi.filter((harcama) => harcama.id != id);

    localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
  }
});

temizleBtn.addEventListener("click", () => {
  if (confirm("Do you want to clear all data?")) {
    harcamaListesi = [];
    gelirler = 0;
    harcamaBody.innerHTML = "";

    localStorage.removeItem("gelirler");
    localStorage.removeItem("harcamalar");
    hesaplaVeGuncelle();
  }
});
