import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const balloonColors = [
    'radial-gradient(circle at 30% 30%, #ff69b4, #ff1493)',
    'radial-gradient(circle at 30% 30%, #ffa07a, #ff6347)',
    'radial-gradient(circle at 30% 30%, #90ee90, #32cd32)',
    'radial-gradient(circle at 30% 30%, #add8e6, #1e90ff)',
    'radial-gradient(circle at 30% 30%, #ffff99, #ffd700)',
    'radial-gradient(circle at 30% 30%, #dda0dd, #ba55d3)',
  ];

  const easterEggNames = ["joakim", "anders", "lars-petter"];

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [message, setMessage] = useState("");
  const [isBirthday, setIsBirthday] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const audioRef = useRef(null);
  const isEasterEggUser = easterEggNames.includes(name.trim().toLowerCase());

  const handleCheck = () => {
    if (!name || !birthDate || !todayDate) {
      setMessage("Please fill in all fields 😊");
      setIsBirthday(false);
      setHasChecked(true);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date(todayDate);

    const birthDay = birth.getDate();
    const birthMonth = birth.getMonth();
    const birthYear = birth.getFullYear();

    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const currentYear = today.getFullYear();

    setHasChecked(true);

    if (birthDay === todayDay && birthMonth === todayMonth) {
      const age = currentYear - birthYear;
      setMessage(`Happy Birthday, ${name}! 🎉 You turn ${age} today!`);
      setIsBirthday(true);
      launchConfetti();
    } else {
      setMessage(`Wishing you a great day, ${name}! 😊`);
      setIsBirthday(false);
    }
  };

  const resetApp = () => {
    setName("");
    setBirthDate("");
    setTodayDate("");
    setMessage("");
    setIsBirthday(false);
    setHasChecked(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    if (isBirthday && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.log("Autoplay blocked or error:", e);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isBirthday]);

  return (
    <div className={`container ${isBirthday ? "party" : ""}`}>
      {!isBirthday && (
        <>
          <h1>
            The Surprise <span className="wiggle">🎁</span>
          </h1>
          <p className="instructions">This could be fun. No promises.</p>
        </>
      )}

      <audio
        ref={audioRef}
        src={
          isBirthday && isEasterEggUser
            ? "/sounds/giveup.mp3"
            : "/sounds/birthday.mp3"
        }
        loop
      />

      {(!isBirthday || !hasChecked) && (
        <>
          <label className="label">Enter your name:</label>
          <input
            type="text"
            placeholder="Start by typing your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Enter your birth date:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <label className="label">Enter today's date:</label>
          <input
            type="date"
            value={todayDate}
            onChange={(e) => setTodayDate(e.target.value)}
          />

          <button onClick={handleCheck}>Check</button>
        </>
      )}

      {message && (
        <p className={`message ${isBirthday ? "party" : ""}`}>{message}</p>
      )}

      {isBirthday && hasChecked && (
        <button className="return-btn" onClick={resetApp}>Return</button>
      )}

      {isBirthday && (
        <>
          {[...Array(8)].map((_, i) => (
            <div
              key={`balloon-${i}`}
              className="balloon"
              style={{
                left: `${10 + i * 10}%`,
                animationDelay: `${i * 1.2}s`,
                background: balloonColors[i % balloonColors.length],
              }}
            />
          ))}

          {[...Array(25)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >★</div>
          ))}

          {[...Array(8)].map((_, i) => (
            <div
              key={`gift-${i}`}
              className="gift"
              style={{
                left: `${Math.random() * 100}%`,
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

export default App;
