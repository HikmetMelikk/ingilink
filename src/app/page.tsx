import { CTASection } from "@/components/home/CTASection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedResources } from "@/components/home/FeaturedResources";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="flex-1">
				<HeroSection />
				<FeaturedResources />
				<CategoriesSection />
				<CTASection />
			</main>
			<Footer />
		</>
	);
}
