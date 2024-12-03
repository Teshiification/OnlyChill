import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ImpressumPage = () => {
  return (
    <div className="flex p-4 md:p-20">
      <Card
        id="impressum"
        className="flex size-full flex-col gap-8 overflow-y-auto p-4 text-justify"
      >
        <CardContent>
          <h1 className="text-xl font-semibold">Impressum - OnlyChill</h1>
          <p className="italic">Angaben gemäß § 5 TMG</p>
          <p className="flex flex-col">
            <p>Vertreten durch: Danny Sinicco</p>
            <p>Siemensstraße 7 65205 Wiesbaden</p>
            <p>Telefon: 0174-3423291 </p>
            <p>
              {`E-Mail: `}
              <a href="mailto:danny.sinicco@web.de">danny.sinicco@web.de</a>
            </p>
          </p>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold">Haftungsausschluss</h2>
            <p>
              Haftung für Inhalte Die Inhalte unserer Seiten wurden mit größter
              Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
              Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
              Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
            <h2 className="font-semibold">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle
              der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
            <h2 className="font-semibold">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
              Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
              Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
            <h2 className="font-semibold">Datenschutz</h2>
            <p>
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe
              personenbezogener Daten möglich. Soweit auf unseren Seiten
              personenbezogene Daten (beispielsweise Name, Anschrift oder
              eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich,
              stets auf freiwilliger Basis. Diese Daten werden ohne Ihre
              ausdrückliche Zustimmung nicht an Dritte weitergegeben. Wir weisen
              darauf hin, dass die Datenübertragung im Internet (z.B. bei der
              Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
              lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
              nicht möglich. Der Nutzung von im Rahmen der Impressumspflicht
              veröffentlichten Kontaktdaten durch Dritte zur Übersendung von
              nicht ausdrücklich angeforderter Werbung und
              Informationsmaterialien wird hiermit ausdrücklich widersprochen.
              Die Betreiber der Seiten behalten sich ausdrücklich rechtliche
              Schritte im Falle der unverlangten Zusendung von
              Werbeinformationen, etwa durch Spam-Mails, vor.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 flex-col md:flex-row justify-around text-xs italic items-center">
          <p>our project is open source and can be viewed under github:</p>
          <Link
            title="external link to github.com"
            className="text-primary/80  rounded-full border p-2 hover:shadow-md hover:shadow-primary/80"
            href="https://www.github.com/Teshiification/Halle"
          >
            <GithubIcon className="size-8" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImpressumPage;
