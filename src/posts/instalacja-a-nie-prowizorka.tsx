import { BlogLayout } from "@/components/BlogLayout";
import { CompareCards } from "@/components/BlogBits";
import { mount } from "@/lib/mount";

function Post() {
  return (
    <BlogLayout
      eyebrow="Jak buduję"
      title="Dobry system jest jak instalacja w budynku. Prowizorka zawsze się mści."
      date="Wrzesień 2026"
    >
      <p>Dobry system w firmie jest jak perfekcyjnie położona instalacja w budynku. Jeśli kable wiszą na taśmie malarskiej, a rury ciekną za ścianą z karton-gipsu — prędzej czy później wszystko się posypie. Nie „może”. Prędzej czy później.</p>
      <p>Pracowałem fizycznie przy instalacjach, zanim zacząłem budować systemy sprzedażowe. I to jest jedyna metafora, której naprawdę potrzebuję, żeby wytłumaczyć, czym się różni sklejka od architektury.</p>

      <h2>Standard „fuszerka”</h2>
      <p>Zlepek dziesięciu darmowych wtyczek, chaos w arkuszach, ręczne przepisywanie danych z jednego narzędzia do drugiego. To dokładny odpowiednik plątaniny nieoznaczonych kabli w puszce elektrycznej. Działa. Do pierwszego spięcia.</p>
      <p>Problem z fuszerką nie polega na tym, że nie działa dzisiaj. Polega na tym, że nikt — łącznie z osobą, która to zrobiła — nie wie, co się stanie, kiedy obciążenie wzrośnie dwukrotnie.</p>

      <h2>Standard, który staram się trzymać</h2>
      <p>Ukryte za ścianą, ale ułożone w korytkach. Każdy przewód opisany, bezpieczniki na miejscu, trasy prowadzone tak, żeby dało się do nich wrócić za dwa lata. Na zewnątrz widać tylko elegancki panel i włącznik, który klika z równym oporem.</p>

      <CompareCards
        a={{
          label: "Prowizorka",
          title: "Zlepek narzędzi",
          items: [
            "10 wtyczek, żadna nie zna kontekstu pozostałych",
            "Dane przepisywane ręcznie między arkuszami",
            "Nikt nie wie, gdzie leży błąd, dopóki nie wybuchnie",
            "Każda zmiana wymaga ruszania wszystkiego naraz",
          ],
        }}
        b={{
          label: "Instalacja",
          title: "Zaprojektowany system",
          items: [
            "Jeden przepływ danych, opisany od wejścia do wyjścia",
            "Automatyczne przekazywanie między etapami — zero przeklepywania",
            "Błąd widać od razu, na konkretnym etapie",
            "Zmiana jednego elementu nie rusza reszty",
          ],
        }}
      />

      <h2>Dlaczego to w ogóle ma znaczenie dla klienta</h2>
      <p>Biznes nie potrzebuje nowinek technologicznych ani świecących zabawek. Potrzebuje infrastruktury, która wytrzyma obciążenie, nie zawiesi się pod presją i pozwoli spać spokojnie bez gaszenia pożarów w weekendy.</p>
      <p>Na budowie widać to od razu: klient nie ogląda korytek za ścianą. Ale to od nich zależy, czy za trzy lata będzie musiał kuć tę ścianę.</p>
      <p>Nie buduję prowizorek. Projektuję instalacje, które działają cicho i bezawaryjnie w tle — i o to samo pytam, patrząc na cudzy lejek: czy to jest instalacja, czy taśma malarska.</p>
    </BlogLayout>
  );
}

mount(<Post />);
