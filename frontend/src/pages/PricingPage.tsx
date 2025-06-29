import React from "react";
import HomeFooterSection from "../components/home/HomeFooterSection";

import HomePlansSection from "../components/home/HomePlansSection";
import FaqAccordion from "../components/faq/FaqAccordion";

export default function PricingPage() {
  return (
    <>
      <div style={{ marginTop: -50, paddingBottom: 60 }}>
        <HomePlansSection show={true} />
      </div>
      <section className="bg-zinc-100 border-t border-gray-200 text-white py-15">
        <FaqAccordion />
      </section>
      <HomeFooterSection />
    </>
  );
}
