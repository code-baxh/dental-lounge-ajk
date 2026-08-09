import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { ADDRESS_ONE_LINE, BUSINESS, MAILTO_HREF, TEL_HREF } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use & Medical Disclaimer | The Dental Lounge Mirpur" },
  description:
    "Terms of use, appointment policy and medical disclaimer for The Dental Lounge, Fazal Chowk, New Mirpur City, Azad Kashmir.",
  alternates: { canonical: "/terms" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Terms & Disclaimer", path: "/terms" },
];

const LAST_UPDATED = "10 August 2026";

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <main id="main" className="flex-1">
        <Breadcrumbs trail={trail} />

        <article className="bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                Terms of Use &amp; Medical Disclaimer
              </h1>
              <p className="mb-10 text-sm text-muted-foreground">
                Last updated: <time dateTime="2026-08-10">{LAST_UPDATED}</time>
              </p>

              {/* The disclaimer leads, because it is the part that matters. */}
              <div className="mb-10 rounded-2xl border-2 border-primary/30 bg-secondary/50 p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                  Medical disclaimer
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  The information on this website is general dental health information. It is
                  written to help you understand common treatments and what they involve — it is
                  not a diagnosis, and it is not a treatment plan for your mouth. No website can
                  substitute for an examination.
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Do not delay seeking care because of something you read here. If you have facial
                  swelling, difficulty swallowing or breathing, uncontrolled bleeding, or an injury
                  involving the jaw, treat it as an emergency and seek immediate medical attention
                  at the nearest hospital rather than waiting for a dental appointment.
                </p>
              </div>

              <div className="space-y-8 leading-relaxed text-muted-foreground">
                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    About prices shown on this site
                  </h2>
                  <p>
                    Where this website shows a price range for a treatment, that range describes
                    what private clinics across Pakistan generally publish for that treatment. It is
                    provided so you can budget before visiting. It is not a quotation, and it is not
                    a statement of this clinic&apos;s fees.
                  </p>
                  <p className="mt-3">
                    Your actual cost depends on your clinical situation, the number of teeth or
                    units involved, and the materials chosen. We give you a written treatment plan
                    with the cost before any treatment begins, and we will not start work you have
                    not agreed to.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Treatment outcomes
                  </h2>
                  <p>
                    Dentistry is not an exact science and no clinician can guarantee a specific
                    outcome. Success rates for procedures such as root canals, implants and
                    orthodontics depend on factors including your oral hygiene, general health,
                    smoking, grinding and whether you attend follow-up appointments. We will explain
                    the realistic prospects and the risks for your case before you consent.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Appointments and cancellations
                  </h2>
                  <ul className="ml-5 list-disc space-y-2">
                    <li>
                      Appointment requests made through this website are requests, not confirmed
                      bookings. An appointment is confirmed only when we reply to you.
                    </li>
                    <li>
                      Please give as much notice as you can if you need to cancel or rearrange, so
                      the slot can go to someone waiting in pain.
                    </li>
                    <li>
                      If you are travelling in from Dadyal, Bhimber, Kotli or further, call ahead so
                      we can confirm the time before you set off.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Communication by WhatsApp
                  </h2>
                  <p>
                    We use WhatsApp for appointment coordination because it is what most patients
                    here prefer. It is not a secure clinical channel. Please do not send detailed
                    medical history, identity documents, or clinical photographs through it, and do
                    not rely on it for anything urgent — call the clinic instead.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Website content and accuracy
                  </h2>
                  <p>
                    We review the clinical information on this site periodically and correct
                    anything found to be out of date or inaccurate. If you spot an error, please
                    tell us. Where this site links to external websites, we are not responsible for
                    their content.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Contact
                  </h2>
                  <p>
                    The Dental Lounge, {ADDRESS_ONE_LINE}
                    <br />
                    {BUSINESS.openingHours.human}
                    <br />
                    Phone:{" "}
                    <a href={TEL_HREF} className="text-primary underline underline-offset-2 hover:decoration-2">
                      {BUSINESS.phoneIntlDisplay}
                    </a>
                    <br />
                    Email:{" "}
                    <a href={MAILTO_HREF} className="text-primary underline underline-offset-2 hover:decoration-2">
                      {BUSINESS.email}
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
