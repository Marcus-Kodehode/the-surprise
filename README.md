# 🎁 The Surprise

**The Surprise** er en mystisk og interaktiv nettside laget med React og Vite.  
Ved første øyekast virker alt rolig og nøytralt, men etter noen enkle inputs kan opplevelsen snu helt – til noe fargerikt, festlig og overraskende.

Appen er laget for å overraske brukeren på en bestemt type dag, uten å avsløre hensikten på forhånd.  
Når forholdene stemmer, forvandles siden med konfetti, musikk, animasjoner og spesialeffekter – og noen brukere får til og med egne meldinger eller lydspor 🎈

---

## 🔧 Funksjoner

✅ Brukeren skriver inn sitt navn, fødselsdato og dagens dato  
📆 Appen sjekker om dag og måned stemmer – ikke år  
🎉 Når datoen stemmer, vises en fargerik gratulasjon og siden forvandles  
🌈 Bakgrunnen blir animerte fargegrader, og skjermen fylles med ballonger, stjerner og gaver  
🎊 Konfettianimasjon med `canvas-confetti`  
🔊 Lydfil som looper festmusikk – eller byttes ut for spesielle brukere  
💬 Egendefinerte meldinger for utvalgte navn (easter eggs)  
🧙‍♂️ Skreddersydd “admin-hilsen” for navngitte brukere  
🎁 Knapp for å “returnere” og prøve på nytt  
🎨 Hele UI-et er responsivt og festlig, men starter nøytralt for å skjule overraskelsen

---

## 🧪 Teknologi brukt

⚛️ React  
⚡ Vite  
🎨 CSS (vanlig og keyframe-animasjoner)  
🎊 [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)  
🔉 HTML `<audio>`-element m/ `useRef` og `useEffect`  
🧠 JavaScript-logikk for dato og navnesjekk

---

## 🧠 Hvordan jeg har jobbet

Jeg startet med å sette opp et nytt prosjekt med React + Vite, og bygde alt inn i én komponent (`App.jsx`) for enkelhetens skyld. Jeg brukte `useState` til å holde styr på navn, datoer og meldingsstatus, og `useRef` for å kontrollere lydspilling direkte.

Datoene brukeren skriver inn konverteres til `Date`-objekter, men kun dag og måned sammenlignes for å ignorere hvilket år personen er født. Hvis datoen stemmer med dagens, aktiveres en "party state" der meldingen endres, animasjoner starter og musikk settes i gang.

Stylingen er gjort med én `App.css`, der jeg har brukt `@keyframes` til å animere bakgrunner, ballonger, stjerner og gaver. Jeg brukte `canvas-confetti` til å lage konfettieffekten, og `<audio>`-tag med loop for å spille musikk.

Det finnes også flere spesialhilsener – noen brukere får egne meldinger (f.eks. Marcus og Joakim), noen får en annen lyd (som “giveup.mp3”), og én spesifikk bruker (Sylivia) får en ekstra koselig bursdagsvariant 💖

Alt er kommentert linje for linje i både JSX og CSS for å gjøre det lett å forstå og bygge videre på.

---

## 🧱 Filstruktur

public/ ├── sounds/ │ ├── birthday.mp3 ← standard festmusikk │ └── giveup.mp3 ← spesiell easter egg-musikk

src/ ├── App.jsx ← hovedkomponent ├── App.css ← komplett styling og animasjoner └── main.jsx ← inngangspunkt


---

## 📈 Neste steg

🔁 Knapper for å lagre og dele gratulasjonen som bilde  
🌒 Dark mode toggle  
🌍 Støtte for flere språk  
🎨 Flere spesialtemaer (jul, nyttår, valentinsdag)  
🎮 En liten interaktiv lek/gave under gratulasjonen  
🎥 Egen animasjon eller video som “åpner en gave”

---

## ✍️ Laget av

Marcus @ Kodehode  
_"Som elsker å bygge små, rare, visuelle ting som gjør folk glade – uten at de vet hva som kommer."_

// 💍 One bug to find them,
// 🔥 One fix to bring them all,
// 💡 And in the darkness bind them.

---

## 📄 Lisens

Dette prosjektet er laget som en del av læring og kreativ utvikling.  
Bruk det, remix det, tilpass det – og kanskje overrask noen du kjenner 🎁
