//tehdään kaikille nappuloille muuttuja
var nappula1 = document.getElementById("nappula1");
var nappula2 = document.getElementById("nappula2");
var nappula3 = document.getElementById("nappula3");
var nappula4 = document.getElementById("nappula4");
var nappula5 = document.getElementById("nappula5");

//Lisätään kuuntelija ensimmäiselle nappulalle, joka vastaa uuden listan tehtävän lisäämisestä
nappula1.addEventListener("click",function lisataanListaan(){
    //Otetaan käyttäjän syöte ylös
    var syote = document.getElementById("kentta").value;
    //Varmistetaan, että kentässä on tarpeeksi tekstiä ja jos ei ole, niin siitä huomautetaan
    if(syote == null || syote == "" || syote.length < 2) {
        document.getElementById("kentta").style.borderColor = "red";
        alert("Kenttän tekstiä ei voi jättää tyhjäksi tai liian lyhyeksi.")
        return false;
    }
    //Tehdään uusi <li> elementti listaa varten
    var liElementti = document.createElement("li");
    //Lisatään uuteen listan elemettiin luokka "kesken"
    liElementti.setAttribute("class", "kesken");
    //Tehdään käyttäjän syötteestä text Node
    var x = document.createTextNode(syote);
    //Yhdistetään toisiinsa
    liElementti.appendChild(x);
    //Yhdistetään lista ja liElementti, eli listään syöte listaan
    document.getElementById("lista").appendChild(liElementti);
    //Muutetaan kentän kehys takaisin taustan väriseksi siltä varalta, että se on nyt punainen
    document.getElementById("kentta").style.borderColor = "rgb(178, 230, 212)";
    //Tallennetaan lista selaimen muistiin
    var lista = document.getElementById("lista");
    localStorage.setItem("muistilista", lista.innerHTML);
    //Lisätään laskuri, jotta keskeneräisten tehtävien määrä kasvaa yhdellä
    laskuri();
});

//lisätää toiseen nappulaan kuuntelija, joka tuo listan kaikki tehtävät esille
nappula2.addEventListener("click", function naytaKaikki(){
     //Lasketaan yhteen kaikki listan tehtävät
     var lista = document.getElementsByTagName("LI");
     //Tehdään looppi, joka muuttaa kaikki listan tehtävät näkyviksi
     for (i = 0; i < lista.length; i++) {
         var kesken = document.getElementsByClassName("kesken")[i];
         kesken.style.display = "block";
     }
});

//Lisätään kolmanteen nappulaan kuuntelija, joka näyttää vain keskeneräiset tehtävät
nappula3.addEventListener("click", function naytaKeskeneraiset(){
    //Tehdään lista kaikista tehtävistä, joilla on luokka "kesken"
    var lista1 = document.getElementsByClassName("kesken");
    //Tehdään looppi, jossa kaikki tehtävät joilla on luokka "kesken" muutetaan näkyviksi
    for (i = 0; i < lista1.length; i++) {
        var kesken = document.getElementsByClassName("kesken")[i];
        kesken.style.display = "block";
    }
    //Tehdään lista, joka sisältää kaikki tehtävät, joilla on luokka "valmis"
    var lista2 = document.getElementsByClassName("valmis");
    //Tehdään looppi, jossa kaikki tehtävät joilla on luokka "valmis" muutetaan näkymättömiksi
    for (i = 0; i < lista2.length; i++) {
        var valmis = document.getElementsByClassName("valmis")[i];
        valmis.style.display = "none";
    }
});

//Lisätään neljännelle nappulalle kuuntelija, joka näyttää vain valmiit tehtävät
nappula4.addEventListener("click", function naytaValmiit(){
    //Tehdään lista kaikista tehtävistä, joilla on luokka "kesken"
    var lista1 = document.getElementsByClassName("kesken");
    //Tehdään looppi, jossa kaikki tehtävät joilla on luokka "kesken" muutetaan näkymättömiksi
    for (i = 0; i < lista1.length; i++) {
        var kesken = document.getElementsByClassName("kesken")[i];
        kesken.style.display = "none";
    }
    //Tehdään lista, joka sisältää kaikki tehtävät, joilla on luokka "valmis"
    var lista2 = document.getElementsByClassName("valmis");
    //Tehdään looppi, jossa kaikki tehtävät joilla on luokka "valmis" muutetaan näkyviksi
    for (i = 0; i < lista2.length; i++) {
        var valmiit = document.getElementsByClassName("valmis")[i];
        valmiit.style.display = "block";
    }
});

//lisätään kuuntelija toiselle nappulalle, joka poistaa listan tehtävät kokonaan
nappula5.addEventListener("click",function poistaLista(){
    //Poistetaan lista selaimen muistista
    window.localStorage.removeItem("muistilista");
    //Poistetaan lista ruudulta loopin avulla
    var lista = document.getElementsByTagName("LI");
    for (i = 0; i < lista.length; i++) {
        var x = document.getElementsByTagName("LI")[i];
        x.style.display = "none";
     }
     //Tyhjennetään listan HTML-koodi
    document.getElementById("lista").innerHTML = "";
    //Listään laskuri tänne, jotta luku nollaantuu listan tyhjentyessä
    laskuri();
});

//lisätään kuuntelija listan tehtäviin, jolloin tehtävää painaessa sen luokkaan lisätään "valmis" ja uudestaan painaessa tämä luokka poistetaan
lista.addEventListener('click', function(x) {
    if (x.target.tagName === 'LI') {
        x.target.classList.toggle('valmis');
    }
//Tallennetaan muutos tehtävän luokassa selaimen muistiin
    var lista = document.getElementById("lista");
    localStorage.setItem("muistilista", lista.innerHTML);
//lisätään laskuri tänne, jotta keskeneräisten tehtävien määrä päivittyy tehtävän luokan muuttuessa
    laskuri();
}, false);

//Tehdään laskin joka kertoo montako listan tehtävää on vielä kesken
function laskuri() {
//Valitaan kaikki listan tehtävät
var kokonaismaara = document.getElementsByTagName("LI");
//Valitaan kaikki valmiit tehtävät
var valmiitMaara = document.getElementsByClassName("valmis");
//Tehdään muutuja, joka ottaa ylös kaikkien tehtävien ja valmiiden tehtävien erotuksen, eli keskeneräiset tehtävät
var keskenMaara = kokonaismaara.length - valmiitMaara.length;
//Asetetaan tämä muuttuja sille tarkoitettuun diviin sivulla br-tagin kanssa muotoilusyistä
document.getElementById("laskuri").innerHTML = "<br><div' class='laskuri'>Tehtäviä jäljellä: "+keskenMaara+"</div>";
//Tallennetaan tämän divin sisältö selaimen muistiin
localStorage.setItem("laskurinMuisti", document.getElementById("laskuri").innerHTML);
}

//Asetetaan listan sisällöksi selaimen muistissa oleva lista
document.getElementById("lista").innerHTML = localStorage.getItem("muistilista");

//Asetetaan laskurin numero selaimen muistista
document.getElementById("laskuri").innerHTML = localStorage.getItem("laskurinMuisti");