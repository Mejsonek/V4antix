import { BlogLayout } from "@/components/BlogLayout";
import { mount } from "@/lib/mount";

function Post() {
  return (
    <BlogLayout
      eyebrow="Skąd to się wzięło"
      title="Co montaż klimatyzacji nauczył mnie o sprzedaży"
      date="Sierpień 2026"
    >
      <p>Pamiętam dokładnie ten miesiąc. Cztery montaże w tygodniu, telefon nie milknie, klient dzwoni, żeby zapytać, czy możemy przyjechać wcześniej, bo już nie może czekać. Miesiąc później — cisza. Ten sam telefon, ten sam numer, zero połączeń.</p>
      <p>Nic się nie zmieniło w jakości roboty. Zmieniło się tylko to, ile osób akurat kogoś poleciło.</p>
      <p>Pracowałem fizycznie przy montażach klimatyzacji i instalacjach elektrycznych — w Polsce i w Niemczech — zanim zacząłem budować strony i lejki sprzedażowe. To jest pierwsza rzecz, której nauczyłem się na montażach, długo zanim zrozumiałem ją jako „problem biznesowy”: firma może robić świetną robotę i mimo to głodować, bo cały jej dopływ klientów wisi na przypadku.</p>
      <p>Polecenia są świetne — dopóki jest ich dużo. Problem w tym, że nikt nie steruje tym, ile ich będzie w danym miesiącu. To nie jest system. To jest czekanie.</p>
      <p>Drugą rzeczą, którą zobaczyłem z bliska, było to, jak mało firm instalacyjnych w ogóle myśli o sobie jako o firmie, którą trzeba „sprzedawać”. Skupiają się — słusznie — na robocie. Na jakości montażu, na terminowości, na tym, żeby klient był zadowolony. I to jest dobre. Ale to nie wystarcza, jeśli jedyny sposób, żeby ktoś się o Was dowiedział, to że akurat sąsiad komuś powiedział.</p>
      <p>Kiedy zacząłem budować lejki dla innych branż — biur rachunkowych, kancelarii, agencji — okazało się, że to nie jest problem instalacji. To jest problem każdej firmy usługowej, która jest dobra w swojej robocie i słaba w mówieniu o niej. Ten sam wzór: pełne ręce roboty, potem pusta kolejka, i nikt nie wie dlaczego, bo nikt tego nie mierzy.</p>
      <p>To jest dokładnie powód, dla którego Vantix wygląda tak, jak wygląda. Nie robię „kompleksowej obsługi marketingowej”. Robię jedną rzecz: system, który sprawia, że dopływ klientów nie zależy od tego, czy akurat ktoś kogoś poleci w tym miesiącu. Strona, która realnie zamienia ruch w zapytania. Lejek, który łapie każdego leada, zamiast czekać, aż zadzwoni ponownie. Plan, który pokazuje, co działa, zamiast zgadywać.</p>
      <p>Nie obiecuję cudów. Obiecuję proces — i to, że jedna osoba (ja) odpowiada za cały wynik, tak jak kiedyś odpowiadałem za cały montaż, od pierwszego kabla do ostatniego testu.</p>
    </BlogLayout>
  );
}

mount(<Post />);
