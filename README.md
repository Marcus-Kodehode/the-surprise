# 🎁 The Surprise

Et lite interaktivt webprogram som kombinerer brukerinndata med visuell og auditiv respons for å skape en personlig og engasjerende opplevelse. Programmet er bygget med tanke på å være nøytralt og mystisk ved første blikk – brukeren vet ikke helt hva som venter før de fyller inn informasjonen sin.

Grensesnittet er enkelt og oversiktlig: brukeren blir bedt om å fylle inn navnet sitt, en fødsels dato, og hvilken dag det er i dag. Basert på dette vises en tilpasset melding som enten er hverdagslig hyggelig – eller… kanskje noe litt mer uventet. Opplevelsen forsterkes med animasjoner, stemningsendringer, farger, lyd og små effekter som får siden til å “leve”.

Designet er lagt opp slik at du ikke skjønner med én gang hva formålet er – du må rett og slett prøve selv. Hele opplevelsen er laget for å overraske, skape smil og litt wow-faktor på veien 🎈

## 🛠️ Hvordan det er laget – teknisk gjennomgang

Programmet er laget i React (med Vite), og hele logikken ligger i én hovedkomponent (`App.jsx`) kombinert med stilark (`App.css`). Jeg har brukt React sine `useState`-hooks for å holde styr på brukerens input (navn og to datoer), og `useRef` til å styre musikkavspillingen direkte via et `<audio>`-element. `useEffect` brukes til å kontrollere når lyden skal spilles basert på tilstanden i appen.

Sammenligning av datoer gjøres ved å hente ut kun dag og måned fra datoene brukeren skriver inn, og sammenligne dem direkte. Året brukes kun til å regne ut hvor "gammel" brukeren teknisk sett blir i inneværende år, basert på fødselsdatoen de oppgir.

Hvis betingelsene stemmer, vises en annen melding enn den vanlige, og grensesnittet forvandles med visuelle effekter: animerte ballonger, konfetti, stjerner og gaver som flyter over skjermen, samt endring i bakgrunnsfarger og typografi. `canvas-confetti` brukes til å lage selve konfettien, mens resten av animasjonene er laget med rene CSS keyframes.

Musikken er også tilpasset – standard er en stemningsskapende lydfil som looper, men enkelte brukernavn er knyttet opp mot egne overraskelser: de trigger alternative meldinger eller egne lydspor. Dette er gjort ved hjelp av enkle string-sjekker (`trim().toLowerCase()`) og noen `if`-betingelser. Navn kan enkelt utvides og justeres etter behov, slik at det blir mer personlig og morsomt for bestemte brukere.

Alt innhold er kommentert grundig i både JSX og CSS, slik at det er lett å forstå, endre og videreutvikle. Jeg har jobbet bevisst med både struktur, gjenbrukbarhet og utseende – og gjort mitt beste for å lage noe som er enkelt, men samtidig gir en minneverdig opplevelse.

Dette har vært et lærerikt og morsomt prosjekt å jobbe med, hvor jeg har kombinert det jeg har lært innen frontend-utvikling med personlige og kreative ideer. Det er mye jeg ønsker å legge til etter hvert – flere effekter, tilpasninger til spesielle anledninger, og kanskje støtte for å kunne dele opplevelsen videre på en kul måte.
