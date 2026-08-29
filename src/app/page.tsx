import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { AboutSection } from "@/components/AboutSection";
import { TrackRecord } from "@/components/TrackRecord";
import { ContactCTA } from "@/components/ContactCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/**
 * Section order is deliberately proof-first.
 *
 * A visitor deciding whether to hire someone wants evidence before offers and
 * offers before biography. Experience and education sit below the pitch — they
 * confirm the story rather than open it.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <Process />
      <AboutSection />
      <TrackRecord />
      <ContactCTA />
      <WhatsAppButton />
    </>
  );
}
