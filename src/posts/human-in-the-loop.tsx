import { BlogLayout } from "@/components/BlogLayout";
import { HitlPhoneMock } from "@/components/BlogBits";
import { mount } from "@/lib/mount";

function Post() {
  return (
    <BlogLayout
      eyebrow="Jak pracuję"
      title="AI jest szybkie, ale człowiek ma wyczucie. Dlaczego stawiam na Human-in-the-Loop?"
      date="Wrzesień 2026"
    >
      <p>Stoisz na drabinie, montujesz instalację, ręce w pyle, a w kieszeni wibruje telefon.</p>
      <p>Nie musisz rzucać roboty, schodzić na dół i odpalać laptopa, żeby odpisać na maila. Na ekranie pojawia się powiadomienie z bota: imię, firma i branża klienta, wynik z kalkulatora na stronie, a pod spodem trzy przyciski do kliknięcia.</p>

      <HitlPhoneMock />

      <p>Jedno kliknięcie kciukiem. Trwa to kilka sekund. Ty wracasz do roboty, majster się nie wkurza, że wisisz na telefonie, a klient po chwili dostaje precyzyjny, spersonalizowany mail z analizą.</p>

      <h2>Dlaczego nie automatyzuję wszystkiego</h2>
      <p>Wielu „specjalistów od AI” próbuje zautomatyzować sto procent procesu, oddając odpisywanie botom bez nadzoru. Kończy się to halucynacjami, ofertami wysłanymi nie tam, gdzie trzeba, i spalonymi relacjami — bo nikt nie sprawdził, co właściwie wyszło.</p>
      <p>Prawdziwa siła leży w Human-in-the-Loop:</p>
      <ul>
        <li><strong>AI robi czarną robotę</strong> — zbiera dane, liczy, przygotowuje szkic maila, układa strukturę.</li>
        <li><strong>Ty podejmujesz decyzję</strong> — masz ostateczną kontrolę, filtrujesz śmieci i zatwierdzasz to, co faktycznie ma wyjść do klienta.</li>
      </ul>
      <p>Nie musisz siedzieć osiem godzin przed monitorem, żeby zarządzać precyzyjnym lejkiem. Dobrze zaprojektowany system ma Ci dawać kontrolę z poziomu telefonu — niezależnie od tego, czy jesteś na spotkaniu, w trasie, czy na montażu.</p>
      <p>Automat, który wyręcza Cię w robocie, jest wart wdrożenia. Automat, który podejmuje za Ciebie decyzje wobec klienta — niekoniecznie.</p>
    </BlogLayout>
  );
}

mount(<Post />);
