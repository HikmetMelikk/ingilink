"use client";

import { Button } from "@/components/ui/button";
import { 
	slideFromTop, 
	staggerContainer, 
	staggerItem, 
	buttonHover,
	progressiveReveal 
} from "@/lib/motion-variants";
import { motion } from "framer-motion";
import { BookOpen, Search, Upload, Users } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
			<div className="mx-auto px-4 container">
				<motion.div 
					className="mx-auto max-w-4xl text-center"
					variants={staggerContainer}
					initial="initial"
					animate="animate"
				>
					{/* Main Heading */}
					<motion.h1 
						className="mb-6 font-bold text-gray-900 text-4xl md:text-6xl leading-tight"
						variants={slideFromTop}
					>
						İngilizce Öğrenme
						<motion.span 
							className="block text-blue-600"
							variants={staggerItem}
						>
							Kaynaklarını
						</motion.span>
						<motion.span 
							className="text-green-600"
							variants={staggerItem}
						>
							Keşfet ve Paylaş
						</motion.span>
					</motion.h1>

					{/* Subtitle */}
					<motion.p 
						className="mx-auto mb-8 max-w-3xl text-gray-600 text-xl md:text-2xl leading-relaxed"
						variants={staggerItem}
					>
						Binlerce kaliteli İngilizce öğrenme kaynağına erişin. Kendi
						kaynaklarınızı paylaşın, toplulukla etkileşime geçin ve İngilizce
						yolculuğunuzu hızlandırın.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div 
						className="flex sm:flex-row flex-col justify-center gap-4 mb-16"
						variants={staggerItem}
					>
						<motion.div variants={buttonHover}>
							<Button
								asChild
								size="lg"
								className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
							>
								<Link href="/resources">
									<Search className="mr-2 w-5 h-5" />
									Kaynakları Keşfet
								</Link>
							</Button>
						</motion.div>
						<motion.div variants={buttonHover}>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="px-8 py-6 border-2 text-lg"
							>
								<Link href="/upload">
									<Upload className="mr-2 w-5 h-5" />
									Kaynak Yükle
								</Link>
							</Button>
						</motion.div>
					</motion.div>

					{/* Stats */}
					<motion.div 
						className="gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto max-w-2xl"
						variants={staggerContainer}
					>
						<motion.div className="text-center" variants={progressiveReveal}>
							<div className="flex justify-center items-center bg-blue-100 mx-auto mb-4 rounded-full w-16 h-16">
								<BookOpen className="w-8 h-8 text-blue-600" />
							</div>
							<div className="mb-2 font-bold text-gray-900 text-3xl">1000+</div>
							<div className="text-gray-600">Kaliteli Kaynak</div>
						</motion.div>
						<motion.div className="text-center" variants={progressiveReveal}>
							<div className="flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-16 h-16">
								<Users className="w-8 h-8 text-green-600" />
							</div>
							<div className="mb-2 font-bold text-gray-900 text-3xl">5000+</div>
							<div className="text-gray-600">Aktif Öğrenci</div>
						</motion.div>
						<motion.div className="text-center" variants={progressiveReveal}>
							<div className="flex justify-center items-center bg-orange-100 mx-auto mb-4 rounded-full w-16 h-16">
								<Upload className="w-8 h-8 text-orange-600" />
							</div>
							<div className="mb-2 font-bold text-gray-900 text-3xl">500+</div>
							<div className="text-gray-600">Katkıda Bulunan</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>

			{/* Background decoration */}
			<div className="top-0 left-0 absolute w-full h-full overflow-hidden pointer-events-none">
				<motion.div 
					className="top-20 left-10 absolute bg-blue-200 opacity-20 rounded-full w-20 h-20"
					animate={{ 
						y: [0, -10, 0],
						opacity: [0.2, 0.3, 0.2]
					}}
					transition={{ 
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div 
					className="top-40 right-20 absolute bg-green-200 opacity-20 rounded-full w-16 h-16"
					animate={{ 
						y: [0, 10, 0],
						opacity: [0.2, 0.3, 0.2]
					}}
					transition={{ 
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1
					}}
				/>
				<motion.div 
					className="bottom-20 left-20 absolute bg-orange-200 opacity-20 rounded-full w-24 h-24"
					animate={{ 
						y: [0, -15, 0],
						opacity: [0.2, 0.3, 0.2]
					}}
					transition={{ 
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2
					}}
				/>
			</div>
		</section>
	);
}