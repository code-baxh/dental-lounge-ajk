import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Languages, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GOOGLE_REVIEW_QUOTES, PRACTITIONER } from "@/lib/site";
import drJalal from "../../public/jalal.jpeg";

/**
 * Puts the dentist's face and credentials on the homepage. The top queries are
 * "best dentist in mirpur ajk" and "best dental clinic mirpur": people choosing
 * a person, on a medical (YMYL) topic, where who treats you is the first trust
 * question. Until now his photo and training were only on /about.
 *
 * The quote is pulled from the stored Google review by match, so it stays word
 * for word; it is one that names him and is not already in the homepage
 * reviews section.
 */
const review = GOOGLE_REVIEW_QUOTES.find((q) => q.author === "Aimen J.");
const reviewLine = review?.text.match(/After taking opinions[^!]*!/)?.[0];

const MeetTheDentist = () => (
  <section className="border-t border-border bg-background py-20" aria-labelledby="meet-dentist">
    <div className="container mx-auto px-4">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[2fr_3fr] md:gap-14">
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          {/* Square (the whole photo) on phones, where a tall crop pushes the
              text a screen further down; 4:5 beside the text on wider screens,
              shifted right to keep him centred. */}
          <div className="aspect-square overflow-hidden rounded-2xl border border-border shadow-sm md:aspect-[4/5]">
            <Image
              src={drJalal}
              alt={`${PRACTITIONER.name} in the treatment room at The Dental Lounge, Mirpur AJK`}
              className="h-full w-full object-cover md:object-[90%_50%]"
              sizes="(max-width: 768px) 384px, 400px"
              placeholder="blur"
            />
          </div>
        </div>

        <div className="min-w-0">
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Your dentist
          </span>
          <h2
            id="meet-dentist"
            className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Meet {PRACTITIONER.name}
          </h2>
          <p className="mb-6 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {PRACTITIONER.jobTitle}
            {PRACTITIONER.degree ? ` · ${PRACTITIONER.degree}` : ""}
          </p>

          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            Dr. Jalal leads the clinic at Fazal Chowk. He works at your pace: the tooth is fully
            numb before he starts, and each step is explained before he does it, along with what
            it will cost.
          </p>

          <ul className="mb-8 grid gap-3 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span className="text-sm leading-snug text-foreground">
                Trained at the {PRACTITIONER.alumniOf}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Languages className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span className="text-sm leading-snug text-foreground">
                Consults in Urdu, English and Pahari-Pothwari
              </span>
            </li>
          </ul>

          {reviewLine && (
            <figure className="mb-8 rounded-xl border border-border bg-secondary/40 p-5">
              <Quote className="mb-2 h-5 w-5 text-primary/40" aria-hidden />
              <blockquote className="mb-2 leading-relaxed text-foreground">
                &ldquo;{reviewLine}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-muted-foreground">
                {review?.author}, Google review · {review?.service}
              </figcaption>
            </figure>
          )}

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-primary px-8 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/about">
              More about Dr. Jalal
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default MeetTheDentist;
