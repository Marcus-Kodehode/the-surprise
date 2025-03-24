import { useState, useEffect, useRef } from "react"; // Importerer hooks fra React: useState for tilstand, useEffect for sideeffekter, useRef for å få tilgang til HTML-elementer
import confetti from "canvas-confetti"; // Importerer konfetti-biblioteket for visuell effekt
import "./App.css"; // Importerer styling fra CSS-filen

function App() {
  // Ballongfarger som brukes til animasjon i party-modus
  const balloonColors = [
    'radial-gradient(circle at 30% 30%, #ff69b4, #ff1493)',
    'radial-gradient(circle at 30% 30%, #ffa07a, #ff6347)',
    'radial-gradient(circle at 30% 30%, #90ee90, #32cd32)',
    'radial-gradient(circle at 30% 30%, #add8e6, #1e90ff)',
    'radial-gradient(circle at 30% 30%, #ffff99, #ffd700)',
    'radial-gradient(circle at 30% 30%, #dda0dd, #ba55d3)',
  ];

  // Liste over spesielle navn som skal få en alternativ lydfil (easter egg)
  const easterEggNames = ["joakim", "anders", "lars-petter"];

  // Tilstandsvariabler (state) for å lagre brukerens input og appens tilstand
  const [name, setName] = useState(""); // Navn skrevet inn av brukeren
  const [birthDate, setBirthDate] = useState(""); // Fødselsdato valgt av bruker
  const [todayDate, setTodayDate] = useState(""); // Dagens dato valgt av bruker
  const [message, setMessage] = useState(""); // Meldingen som skal vises (gratulasjon eller vanlig hilsen)
  const [isBirthday, setIsBirthday] = useState(false); // True hvis det er brukerens bursdag
  const [hasChecked, setHasChecked] = useState(false); // True når brukeren har trykket "Check"

  const audioRef = useRef(null); // Referanse til audio-elementet i DOM-en for å kontrollere avspilling

  // Sjekker om navnet skrevet inn matcher en av de spesielle navnene (easterEggNames)
  const isEasterEggUser = easterEggNames.includes(name.trim().toLowerCase());

  // Funksjon som utføres når brukeren trykker på "Check"-knappen
  const handleCheck = () => {
    if (!name || !birthDate || !todayDate) {
      setMessage("Please fill in all fields 😊"); // Viser feilmelding hvis noe mangler
      setIsBirthday(false); // Avslår party-modus
      setHasChecked(true);
      return;
    }

    // Gjør om input-feltene til Date-objekter
    const birth = new Date(birthDate);
    const today = new Date(todayDate);

    // Trekker ut dag, måned og år fra input
    const birthDay = birth.getDate();
    const birthMonth = birth.getMonth();
    const birthYear = birth.getFullYear();

    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const currentYear = today.getFullYear();

    setHasChecked(true); // Forteller appen at vi nå har gjort et sjekk

    // Sjekker om dag og måned matcher -> det er bursdag!
    if (birthDay === todayDay && birthMonth === todayMonth) {
      const age = currentYear - birthYear; // Regner ut hvor gammel brukeren blir i år

      // Sjekker om brukeren er deg, Marcus – viser spesialmelding
      if (["marcus", "joakim"].includes(name.trim().toLowerCase())) {
        setMessage(`👑 Happy Birthday to the code wizard himself, Marcus! 🎉 You’ve officially leveled up to age ${age} – may your bugs be few and your coffee forever strong ☕⚡`);
      } else {
        // Hvis ikke Marcus: tilfeldig emoji og standard gratulasjonsmelding
        const emojis = ["🎉", "🎂", "🥳", "🎈", "🎊"];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        setMessage(`Happy Birthday, ${name}! ${emoji} You turn ${age} today!`);
      }

      setIsBirthday(true); // Aktiverer party-modus
      launchConfetti(); // Starter konfetti-effekten
    } else {
      // Hvis det ikke er bursdag – vis en hyggelig hilsen
      setMessage(`Wishing you a great day, ${name}! 😊`);
      setIsBirthday(false);
    }
  };

  // Funksjon som nullstiller hele appen når brukeren trykker på "Return"
  const resetApp = () => {
    setName(""); // Tilbakestiller navn
    setBirthDate(""); // Tilbakestiller fødselsdato
    setTodayDate(""); // Tilbakestiller dagens dato
    setMessage(""); // Tømmer meldingen
    setIsBirthday(false); // Skru av party
    setHasChecked(false); // Skru av "has checked"

    // Stopper og nullstiller lydfilen
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Skyter konfetti (visuell effekt når det er bursdag)
  const launchConfetti = () => {
    confetti({
      particleCount: 100, // Antall konfettibiter
      spread: 100, // Hvor bredt konfettien sprer seg
      origin: { y: 0.6 }, // Hvor konfettien starter vertikalt (ca midt på skjermen)
    });
  };

  // Effekt som spiller lyd når party-modus aktiveres
  useEffect(() => {
    if (isBirthday && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.log("Autoplay blocked or error:", e); // Hvis nettleseren blokkerer lyd
      });
    } else if (audioRef.current) {
      audioRef.current.pause(); // Stopper musikken
      audioRef.current.currentTime = 0; // Går tilbake til start
    }
  }, [isBirthday]); // Kjør denne funksjonen hver gang "isBirthday" endres

  return (
    <div className={`container ${isBirthday ? "party" : ""}`}> {/* Endrer bakgrunn hvis bursdag */}

      {!isBirthday && ( // Tittel og undertekst vises kun når det IKKE er bursdag
        <>
          <h1>
            The Surprise <span className="wiggle">🎁</span> {/* Liten animert gave ved siden av tittelen */}
          </h1>
          <p className="instructions">This could be fun. No promises.</p>
        </>
      )}

      {/* Lyd-elementet som spiller musikk. Velger fil basert på om navnet er spesial eller ikke */}
      <audio
        ref={audioRef}
        src={
          isBirthday && isEasterEggUser
            ? "/sounds/giveup.mp3"
            : "/sounds/birthday.mp3"
        }
        loop // Spilles i loop helt til man trykker return
      />

      {/* Skjema – vises når man ikke er i party, eller man ikke har sjekket enda */}
      {(!isBirthday || !hasChecked) && (
        <>
          <label className="label">Enter your name:</label>
          <input
            type="text"
            placeholder="Start by typing your name..."
            value={name}
            onChange={(e) => setName(e.target.value)} // Oppdaterer navn når man skriver
          />

          <label className="label">Enter your birth date:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)} // Oppdaterer fødselsdato
          />

          <label className="label">Enter today's date:</label>
          <input
            type="date"
            value={todayDate}
            onChange={(e) => setTodayDate(e.target.value)} // Oppdaterer dagens dato
          />

          <button onClick={handleCheck}>Check</button> {/* Sjekker input */}
        </>
      )}

      {/* Viser meldingen uansett – bursdag eller ikke */}
      {message && (
        <p className={`message ${isBirthday ? "party" : ""}`}>{message}</p>
      )}

      {/* Return-knappen vises kun hvis man har fått bursdagsmelding */}
      {isBirthday && hasChecked && (
        <button className="return-btn" onClick={resetApp}>Return</button>
      )}

      {/* 🎉 Festlige visuelle effekter som vises kun i party-modus */}
      {isBirthday && (
        <>
          {/* Ballonger */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`balloon-${i}`}
              className="balloon"
              style={{
                left: `${10 + i * 10}%`, // Spre ballongene horisontalt utover skjermen
                animationDelay: `${i * 1.2}s`, // Forsinkelse så de svever i ulik rytme
                background: balloonColors[i % balloonColors.length], // Fargerik bakgrunn
              }}
            />
          ))}

          {/* Stjerner */}
          {[...Array(25)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="star"
              style={{
                left: `${Math.random() * 100}%`, // Plasseres tilfeldig i bredden
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >★</div>
          ))}

          {/* Gaver */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`gift-${i}`}
              className="gift"
              style={{
                left: `${Math.random() * 100}%`, // Tilfeldig plassering
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >🎁</div>
          ))}
        </>
      )}
    </div>
  );
}

export default App; // Eksporterer komponenten så den kan brukes i prosjektet
