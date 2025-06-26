import React from "react";
import HomeFooterSection from "../components/home/HomeFooterSection";
import NavBar from "../components/nav/NavBar";
import HomePlansSection from "../components/home/HomePlansSection";
import FaqAccordion from "../components/faq/FaqAccordion";

export default function PricingPage() {
  return (
    <>
      <NavBar />
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
