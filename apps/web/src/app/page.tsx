import Hero from "@/components/home/hero";
import VisiMisi from "@/components/home/visi-misi";
import BlogNewsPreview from "@/components/home/blog-news-preview";
import VideoSection from "@/components/home/video-section";
import EnvironmentFeatures from "@/components/home/environment-features";
import PrincipalWelcome from "@/components/home/principal-welcome";
import EkstrakurikulerPreview from "@/components/home/ekstrakurikuler-preview";
import PersonalApproach from "@/components/home/personal-approach";
import OsissSection from "@/components/home/osis-section";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 overflow-x-hidden">
        <VisiMisi />
        <BlogNewsPreview />
        <VideoSection />
        <EnvironmentFeatures />
        <PrincipalWelcome />
        <EkstrakurikulerPreview />
        <PersonalApproach />
        <OsissSection />
      </div>

      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 overflow-x-hidden">
        <Testimonials />
      </div>
    </main>
  );
}
