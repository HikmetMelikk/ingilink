"use client";

import { CTASection } from "@/components/home/CTASection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedResources } from "@/components/home/FeaturedResources";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { pageVariants, staggerContainer } from "@/lib/motion-variants";
import { motion } from "framer-motion";

export default function HomePage() {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			variants={pageVariants}
			className="min-h-screen"
		>
			<Header />
			<motion.main 
				className="flex-1"
				variants={staggerContainer}
				initial="initial"
				animate="animate"
			>
				<HeroSection />
				<FeaturedResources />
				<CategoriesSection />
				<CTASection />
			</motion.main>
			<Footer />
		</motion.div>
	);
}