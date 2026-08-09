import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { ADDRESS_ONE_LINE, BUSINESS, MAILTO_HREF, TEL_HREF } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | The Dental Lounge Mirpur AJK" },
  description:
    "How The Dental Lounge, Mirpur AJK collects, uses and protects the personal information you share when booking an appointment or contacting the clinic.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
];

const LAST_UPDATED = "10 August 2026";

export default function PrivacyPolicy() {
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
                Privacy Policy
              </h1>
              <p className="mb-10 text-sm text-muted-foreground">
                Last updated: <time dateTime="2026-08-10">{LAST_UPDATED}</time>
              </p>

              <div className="space-y-8 leading-relaxed text-muted-foreground">
                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Who we are
                  </h2>
                  <p>
                    The Dental Lounge is a dental clinic at {ADDRESS_ONE_LINE}. This policy
                    explains what personal information we collect through this website, why we
                    collect it, and what we do with it.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Information we collect
                  </h2>
                  <ul className="ml-5 list-disc space-y-2">
                    <li>
                      <strong className="text-foreground">Appointment enquiries.</strong> When you
                      use the booking form we collect your name, phone number, and optionally your
                      email address, preferred date and a short message.
                    </li>
                    <li>
                      <strong className="text-foreground">Messages you send us.</strong> Anything
                      you choose to tell us by WhatsApp, phone or email, including details about
                      your symptoms.
                    </li>
                    <li>
                      <strong className="text-foreground">Analytics.</strong> We use Google
                      Analytics to understand how many people visit the site and which pages they
                      read. This collects usage data such as approximate location, device type and
                      pages viewed.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    How the booking form works
                  </h2>
                  <p>
                    The booking form on this website does not store your details on a server. When
                    you submit it, the information you entered is formatted into a WhatsApp message
                    and opened in WhatsApp on your own device, for you to send to the clinic. That
                    means your details are transmitted through WhatsApp and are subject to
                    WhatsApp&apos;s own privacy terms.
                  </p>
                  <p className="mt-3">
                    Please do not send detailed medical history, photographs of clinical conditions,
                    or identity documents through the website form or WhatsApp. Bring those to your
                    appointment instead.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    How we use your information
                  </h2>
                  <ul className="ml-5 list-disc space-y-2">
                    <li>To contact you about an appointment you requested</li>
                    <li>To answer a question you have asked us</li>
                    <li>To keep clinical records required for your dental treatment</li>
                    <li>To understand, in aggregate, how the website is used</li>
                  </ul>
                  <p className="mt-3">
                    We do not sell your information, and we do not use it for advertising or share
                    it with third parties for marketing.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Clinical records
                  </h2>
                  <p>
                    Records created during treatment at the clinic — notes, X-rays, photographs and
                    treatment plans — are kept confidentially as part of standard dental practice
                    and are only accessed by the treating clinician and clinic staff. They are not
                    connected to this website.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Cookies and analytics
                  </h2>
                  <p>
                    Google Analytics sets cookies to measure site usage. You can block cookies in
                    your browser settings or use private browsing; the website will still work
                    normally. We do not use advertising or retargeting cookies.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Your choices
                  </h2>
                  <p>
                    You can ask us what information we hold about you, ask us to correct it, or ask
                    us to delete enquiry details we no longer need. Contact us and we will deal with
                    the request.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    Contact us
                  </h2>
                  <p>
                    The Dental Lounge, {ADDRESS_ONE_LINE}
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
