import { BlogLayout } from "@/components/BlogLayout";
import { ManifestBox } from "@/components/BlogBits";
import { mount } from "@/lib/mount";

function Post() {
  return (
    <BlogLayout
      eyebrow="Manifest"
      title="Dlaczego buduję silniki dla biznesu? O rzemiośle, monterce i systemach bez fuszerki"
      date="Wrzesień 2026"
    >
      <p>Często słyszę pytanie: „po co kolejna agencja marketingu i sprzedaży?”.</p>
      <p>Nie założyłem Vantix, żeby być agencją. Założyłem to z inżynieryjnej potrzeby budowania precyzyjnych maszyn biznesowych.</p>
      <p>Mój punkt widzenia ukształtowało coś zupełnie innego niż siedzenie w salkach konferencyjnych: praca na montażu i przy fizycznych instalacjach.</p>

      <h2>Czego uczy budowa</h2>
      <ul>
        <li><strong>Porządek w narzędziach to tempo i bezpieczeństwo.</strong> Jeśli materiał leży posegregowany, a narzędzia są na swoim miejscu, praca idzie dwa razy szybciej, a błędów jest mniej. Chaos na stanowisku to zawsze opóźnienia i straty.</li>
        <li><strong>Mały błąd kosztuje majątek.</strong> Źle docięty element, nieszczelne połączenie czy krzywo puszczona trasa mszczą się natychmiast. Na poprawki traci się więcej czasu i pieniędzy niż na zrobienie tego dobrze za pierwszym razem.</li>
        <li><strong>Sztuka rzemiosła.</strong> Robota musi być zrobiona solidnie, równo i estetycznie — także w miejscach, których klient na co dzień nie widzi.</li>
      </ul>

      <p>Dokładnie tę samą filozofię przenoszę do software'u, automatyzacji i lejków sprzedaży.</p>
      <p>Większość firm traktuje marketing jak zbieraninę losowych wtyczek, niespójnych narzędzi i prowizorycznych arkuszy. Ja projektuję to jak instalację, która ma przetrwać lata:</p>
      <ol>
        <li><strong>Silnik zamiast chaosu.</strong> Wszystko połączone bez zbędnego luzu — od pierwszego kliknięcia, przez API i webhooki, po bazę danych i powiadomienie na telefonie.</li>
        <li><strong>Wysoki standard przy rozsądnym koszcie.</strong> Wykorzystuję AI i nowoczesne narzędzia, żeby dowozić architekturę, która kiedyś wymagałaby zespołu — bez armii programistów i bez przepalania budżetu.</li>
        <li><strong>Zero fuszerki.</strong> Każdy proces ma swoje miejsce, każdy lead ma jasną ścieżkę, a system działa bezawaryjnie w tle.</li>
      </ol>

      <ManifestBox
        title="Zasady rzemiosła Vantix"
        items={[
          { n: "01", k: "Zero prowizorek", v: "Każdy proces ma dokumentację i czysty przepływ danych." },
          { n: "02", k: "Precyzja instalacji", v: "Błąd na wejściu to strata na wyjściu, dlatego architekturę testuję zanim trafi na produkcję." },
          { n: "03", k: "Cicha praca w tle", v: "Dobry system poznaje się po tym, że właściciel nie musi do niego zaglądać w weekendy." },
        ]}
      />

      <p>Jara mnie tworzenie mechanizmów, które po prostu klikają z zegarmistrzowską precyzją. Niezależnie od tego, czy kładziesz instalację w budynku, czy stawiasz architekturę sprzedaży — zasada jest ta sama: albo robisz to zgodnie ze sztuką, albo wcale.</p>
    </BlogLayout>
  );
}

mount(<Post />);
