import { FiArrowLeft } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center">
      <Container className="text-center">
        <span className="font-display text-8xl font-bold text-gradient">404</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-navy-950 dark:text-white">
          This page went missing during an automation run
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-300">
          The page you&rsquo;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back to the portfolio.
        </p>
        <LinkButton href="/" variant="primary" className="mt-8">
          <FiArrowLeft className="h-4 w-4" />
          Back to Home
        </LinkButton>
      </Container>
    </section>
  );
}
