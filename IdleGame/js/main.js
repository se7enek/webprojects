let coswybrane = false;
let wybrany_obj;
let wybrany;
let id = 1;

const wrog_hp = document.querySelector("#walka #zycie #hpbar");
const wrog_hp_txt = document.querySelector("#walka #zycie span");
const wrog_name = document.querySelector("#walka #wrog p");
const wrog_img = document.querySelector("#walka #img_wrog");

const wybrani = document.getElementById("wybrani").children;

const walka = document.getElementById("walka");
const animacja = document.getElementById("overlay");

const info = document.getElementById("info");
const info_popup = document.getElementById("info-popup-bg");

const staty = document.getElementById("staty");

let wrog_id = 0;

let bohaterowie_obj = [];
let wybrani_obj = [];

const bohaterowie = [ //nazwa, koszt, obrazenia, typ, poziom
  ["Ninja", 10, 2, 1, 0], //typy: 1-wojownik 2-lucznik 3-mag
  ["Amazonka", 10, 2, 2, 0],
  ["Wielki Mag", 10, 2, 3, 0], //dac imie
  ["Berserker", 500, 50, 1, 0],
  ["Centaur", 500, 50, 2, 0],
  ["Loki", 500, 50, 3, 0],
  ["Spartan", 2500, 300, 1, 0],
  ["Legolas", 2500, 300, 2, 0],
  ["Hagrid", 2500, 300, 3, 0],
  ["Geralt", 10000, 1500, 1, 0],
  ["Robin Hood", 10000, 1500, 2, 0],
  ["Arya", 10000, 1500, 3, 0],
  ["Thor", 50000, 10000, 1, 0],
  ["Artemida", 50000, 10000, 2, 0],
  ["Zeus", 50000, 10000, 3, 0]
]

let dps = 0;
let gold = 0; //Startowy Gold

function pokaz_liczbe(liczba,dps=0){
  if(liczba >= 1000000){
    if(dps==1)
      return Math.ceil(liczba*15/10000)/100 + "M";
    else
      return Math.floor(liczba/10000)/100 + "M";
  }
  else if(liczba >= 10000){
    if (dps==1)
      return Math.ceil(liczba*15/10)/100 + "K";
    else
      return Math.floor(liczba/10)/100 + "K";
  }
    
  else {
    if(dps==1)
      return Math.ceil(liczba*15*100)/100;
    else
      return liczba;
  }
    
}

function update_weapon(bron_id){
  const bronie = document.getElementById("bronie").children;
  let i = 0;
  
  for(let bron of bronie){
    bron.style.backgroundColor = "gray";
  }
  switch (bron_id) {
    case 1: bronie[2].style.backgroundColor = "gold"; break;
    case 2: bronie[0].style.backgroundColor = "gold"; break;
    case 3: bronie[1].style.backgroundColor = "gold"; break;
    default:
      break;
  }
}

//dps 15
//zmiana bohatera i dps 32

function update_dps(){
  let multiplier = 0;
  dps = 0;
  wybrani_obj.forEach(function(obj,index,array){
    // bonus od typu
    if (obj.type == wrog.vulnerable)
      multiplier = 1;
    else
      multiplier = 0.25;
    
    obj.dmg; //10
    obj.level; //1
    dps += (obj.dmg / 30) * obj.level * multiplier;
  });
  staty.querySelector("#dps").innerHTML = `DPS Bohaterów: ${pokaz_liczbe(dps,1)}`;
}

function update(click=0) {
  if(wrog.id == 0)
    click  *= 10;
  click *= wrog.maxhp / 50;
 
  wrog.hp -= (dps + click);

  wrog.check();

  wrog_hp.style.width = `${(wrog.hp / wrog.maxhp) * 100}%`;
  wrog_hp_txt.innerHTML = `${Math.floor(wrog.hp)} / ${wrog.maxhp} HP`;
  document.querySelector("#gold > div span").innerHTML = pokaz_liczbe(gold);
}

class Wrog {
  
  constructor() {
    const wrogowie_nazwy = ["Wilk","Szkielet","Hydra","Toksyczna Hydra","Zombie","Pustynny Robak","Mantykora","Ogr","Ork","Hipogryf","Leśny Demon","Wielka Żaba","Wielki Pająk","Skorpion","Smok","Kraken","Minotaur","Wilkołak","Wampirołak"];
    this.name = wrogowie_nazwy[Math.floor(Math.random() * wrogowie_nazwy.length)];
    this.maxhp = wrog_id * 50 + 100; // kalkulacja zycia -- wrog_id, kolejni wrogowie
    this.type = Math.floor(Math.random() * 3) + 1; // 1-wojownik (mag[3] bije) 2-lucznik (wojownik[1] bije) 3-mag (lucznik[2] bije)
    this.hp = this.maxhp;
    this.id = wrog_id++;
    this.vulnerable = this.type == 1 ? 3 : this.type == 2 ? 1 : 2;

    const self = this;

    wrog_name.innerHTML = this.name;
    wrog_name.innerHTML += this.type == 1 ? ", Wojownik " : this.type == 2 ? ", Łucznik " : ", Mag ";
    wrog_name.innerHTML += `[Lv. ${this.id+1}]`;
    wrog_img.src = `./img/wrogowie/${this.name}.jpg`;

    staty.querySelector("#click-dps").innerHTML = `Obrazenia Kliku: ${this.maxhp / 50}`;
    update_weapon(this.type);
    //console.log(this.type);

    

  }
  check(){
    if(this.hp < 1){
      gold += 10 + wrog.id * this.maxhp / 100;
      wrog = new Wrog();
      update_dps();
      return false;
    } else
      return true;
  }
}

class Bohater {
  constructor(array) {
    this.name = array[0];
    this.cost = array[1];
    this.dmg = array[2];
    this.type = array[3];
    this.level = array[4];
    this.id = id++;
    this.click = true;
    this.type_txt;
    const self = this;

    switch (this.type) {
      case 1: self.type_txt = "Wojownik"; break;
      case 2: self.type_txt = "Łucznik"; break;
      case 3: self.type_txt = "Mag"; break;
      default: self.type_txt = "Bledna Klasa"; break;
    }


    const blankdiv = document.createElement("div");
    blankdiv.className = "blank empty";
    blankdiv.id = "blank" + this.id;

    document.getElementById("bohaterowie").append(blankdiv);

    self.bohater = document.createElement("div");
    self.bohater.className = "blank";
    self.bohater.id = this.id;
    self.bohater.classList.add("locked");

    blankdiv.append(self.bohater);

    const karta_tlo = document.createElement("div");
    karta_tlo.className = "karta-tlo";
    
    self.bohater.append(karta_tlo);

    const ramka = document.createElement("div");
    ramka.className = "karta-ramka";

    karta_tlo.append(ramka);

    const tekst_main = document.createElement("div");
    tekst_main.className = "karta-tekst";

    const paragraf_main = document.createElement("p");
    paragraf_main.innerHTML = this.name;
    const paragraf_lvl = document.createElement("p");
    paragraf_lvl.className = "right";

    ramka.append(tekst_main);
    tekst_main.append(paragraf_main);
    tekst_main.append(paragraf_lvl);

    const div_obrazek = document.createElement("div");
    ramka.append(div_obrazek);

    const obrazek = document.createElement("img");
    obrazek.className = "karta-img";
    obrazek.src = `./img/bohaterowie/${this.name}.png`;
    // obrazek.src = `http://se7en.pl/upload/1576927296.png`;
    div_obrazek.append(obrazek);

    const tekst_typ = document.createElement("div");
    tekst_typ.className = "karta-tekst";

    const paragraf_typ = document.createElement("p");
    paragraf_typ.innerHTML = self.type_txt;
    ramka.append(tekst_typ);
    tekst_typ.append(paragraf_typ);

    const ulepsz = document.createElement("div");
    ulepsz.className = "karta-ulepsz";

    const paragraf_ulepsz = document.createElement("p");
    paragraf_ulepsz.innerHTML = "Odblokuj";
    ramka.append(ulepsz);
    ulepsz.append(paragraf_ulepsz);

    const karta_dol = document.createElement("div");
    karta_dol.className = "karta-dol";

    const koszt = document.createElement("div");
    koszt.className = "koszt";
    koszt.innerHTML = pokaz_liczbe(this.cost) + " $";

    ramka.append(karta_dol);
    karta_dol.append(koszt);

    let poczekaj;
    const powiadomienie = document.querySelector(".powiadomienie");
    const powiadomienie_txt = document.querySelector("#powiadomienie_txt");

    ulepsz.addEventListener("click", function() { //wczersnij "btn"
      event.stopPropagation();

      let cost = Math.floor(self.cost + self.level * self.cost * 0.25);
      let newcost = Math.floor(self.cost + (self.level+1) * self.cost * 0.25);

      powiadomienie_txt.innerHTML = "";

      if(gold >= cost) {
        gold -= cost;
        self.level++;
        self.bohater.classList.remove("locked");
        
        paragraf_ulepsz.innerHTML = "Ulepsz";// (" + newcost + " $)";
        koszt.innerHTML = pokaz_liczbe(newcost) + " $";

        paragraf_main.innerHTML = `${self.name}`;
        paragraf_lvl.innerHTML = `${self.level}`;

        update_dps();

        if(!powiadomienie.classList.contains("aktywne")){
          powiadomienie.classList.add("aktywne");
        } else {
          clearTimeout(poczekaj);
        }
        powiadomienie_txt.className = "sukces";
        powiadomienie_txt.innerHTML = self.level == 1 ? `Pomyslnie zakupiono Bohatera: <b>${self.name}</b>` : `Bohater <b>${self.name}</b> zostal ulepszony na poziom: <b>${self.level}</b>`;
      } else {
        //blad, nie masz tyle hajsu
        if(!powiadomienie.classList.contains("aktywne")){
          powiadomienie.classList.add("aktywne");
        } else {        
          clearTimeout(poczekaj);
        }
        powiadomienie_txt.className = "blad";
        powiadomienie_txt.innerHTML = self.level == 0 ? `Potrzebujesz <b>${pokaz_liczbe(cost)} $</b>, aby kupić Bohatera: <b>${self.name}</b>.` : `Potrzebujesz <b>${pokaz_liczbe(cost)} $</b>, aby ulepszyć Bohatera: <b>${self.name}</b> na <b>${self.level+1}</b>. poziom.`;
      }

      poczekaj = setTimeout(function() {
        powiadomienie.classList.remove("aktywne");
      }, 2500);
    });

    self.bohater.addEventListener("click", function() {
      //console.log(self.id);
      if (self.click){
        event.stopPropagation();
        if (self.level>0){
          if (karta_tlo.classList.contains("selected")){
            karta_tlo.classList.remove("selected");
            document.querySelectorAll(".slot").forEach(item => item.style.cursor = "initial"); //dla pustego slotu
            document.querySelectorAll(".slot .karta-tlo").forEach(item => item.style.cursor = "initial"); //dla slotu z czyms
            coswybrane = false;
          }
          else {
            document.querySelectorAll(".selected").forEach(item => item.classList.remove("selected"));
            karta_tlo.classList.add("selected");
            document.querySelectorAll(".slot").forEach(item => item.style.cursor = "move"); //dla pustego slotu
            document.querySelectorAll(".slot .karta-tlo").forEach(item => item.style.cursor = "move"); //dla slotu z czyms
            wybrany = self.bohater;
            wybrany_obj = self;
            coswybrane = true;
            //console.log("Hero Selected: " + self.name);
          }
        }
      }  
    });
  }
}


for(let slot of wybrani){
  slot.addEventListener("click", function(){
    event.stopPropagation();
    let id = this.id;
    //console.log(`Slot Selected: ` + id);
    if(coswybrane){
      if(document.getElementById(id).children.length > 0){
        //zabierz
        wybrani_obj.forEach(function(obj,index,array){
          if(obj.id == document.getElementById(id).firstChild.id){
            array.splice(index,1);
            bohaterowie_obj.push(obj);
            obj.click = true;
          }
        })
        document.getElementById("blank" + document.getElementById(id).firstChild.id).append(document.getElementById(id).firstChild);
      }
      //umiesc
      wybrany.querySelector(".selected").classList.remove("selected"); // test na usuniecie zaznaczenia
      //
      document.querySelectorAll(".slot").forEach(item => item.style.cursor = "initial"); //dla pustego slotu
      document.querySelectorAll(".slot .karta-tlo").forEach(item => item.style.cursor = "initial"); //dla slotu z czyms
      //
      document.getElementById(this.id).append(wybrany);
      bohaterowie_obj.splice(bohaterowie_obj.indexOf(wybrany_obj), 1);
      wybrani_obj.push(wybrany_obj);
      wybrany_obj.click = false;
      coswybrane = false;
      update_dps();
    }
  })
}

walka.addEventListener("click", function(){
  event.stopPropagation();
  let pozycja = [Math.floor(Math.random() * 35) + 15, Math.floor(Math.random() * 60) + 20];
  let bron = "";
// 1-wojownik (mag[3] bije) 2-lucznik (wojownik[1] bije) 3-mag (lucznik[2] bije)
  switch (wrog.type) {
    case 1: 
      bron = "rozdzka.png"; 
      animacja.style.transform = `scaleX(${Math.floor(Math.random() * 2) == 0 ? 1 : -1})`;  
      break;
    case 2: 
      bron = "miecz.png";
      pozycja[1] = Math.floor(Math.random() * 50) + 20
      animacja.style.transform = `rotate(${0 - Math.floor(Math.random() * 50)}deg)`;
      break;
    case 3:
      bron = "luk.png"; 
      pozycja[1] = Math.floor(Math.random() * 40) + 10;
      animacja.style.transform = `rotate(${Math.floor(Math.random() * 45)}deg)`;  
      break;
    default: break;
  }

  animacja.querySelector("img").src = `./img/bronie/${bron}`;
  animacja.style.top = pozycja[0] + "%";
  animacja.style.left = pozycja[1] + "%";

  animacja.style.display = "block";
  setTimeout(function() {
    animacja.style.display = "none";
  }, 100);

  update(1);

})

info.addEventListener("click", function(){
  info_popup.style.display = "block";
});

info_popup.addEventListener("click", function(){
  event.stopPropagation();
  info_popup.style.display = "none";
});

let wrog = new Wrog();

for(i=0;i<bohaterowie.length;i++){
    bohaterowie_obj[i] = new Bohater(bohaterowie[i]);
    //console.log(bohaterowie_obj[i].name);
}

setInterval(update, 1000/15);


////////////////// dev /////////////////
document.querySelector(".shape").addEventListener("contextmenu", function(){
  event.preventDefault();
  gold += 10000;
});