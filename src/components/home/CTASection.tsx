"use client";

import { Button } from "@/components/ui/button";
import {
	buttonHover,
	staggerContainer,
	staggerItem,
} from "@/lib/motion-variants";
import { motion } from "framer-motion";
import { Star, Upload, Users } from "lucide-react";
import Link from "next/link";

export function CTASection() {
	return (
		<section className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
			<div className="mx-auto px-4 container">
				<motion.div
					className="mx-auto max-w-4xl text-white text-center"
					variants={staggerContainer}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.h2
						className="mb-6 font-bold text-3xl md:text-4xl"
						variants={staggerItem}
					>
						Topluluğa Katıl ve Katkıda Bulun
					</motion.h2>
					<motion.p
						className="opacity-90 mb-8 text-xl leading-relaxed"
						variants={staggerItem}
					>
						Binlerce öğrenci ile birlikte İngilizce öğrenme yolculuğunda
						ilerleyin. Kendi kaynaklarınızı paylaşın ve topluluktan geri
						bildirim alın.
					</motion.p>

					<motion.div
						className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-12"
						variants={staggerContainer}
					>
						<motion.div className="text-center" variants={staggerItem}>
							<div className="flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-16 h-16">
								<Upload className="w-8 h-8" />
							</div>
							<h3 className="mb-2 font-semibold text-xl">Kaynak Paylaş</h3>
							<p className="opacity-90">
								Kendi materyallerinizi yükleyin ve toplulukla paylaşın
							</p>
						</motion.div>
						<motion.div className="text-center" variants={staggerItem}>
							<div className="flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-16 h-16">
								<Users className="w-8 h-8" />
							</div>
							<h3 className="mb-2 font-semibold text-xl">Topluluk</h3>
							<p className="opacity-90">
								Diğer öğrencilerle etkileşime geçin ve deneyim paylaşın
							</p>
						</motion.div>
						<motion.div className="text-center" variants={staggerItem}>
							<div className="flex justify-center items-center bg-white/20 mx-auto mb-4 rounded-full w-16 h-16">
								<Star className="w-8 h-8" />
							</div>
							<h3 className="mb-2 font-semibold text-xl">Değerlendir</h3>
							<p className="opacity-90">
								Kaynakları değerlendirin ve kaliteli içeriği destekleyin
							</p>
						</motion.div>
					</motion.div>

					<motion.div
						className="flex sm:flex-row flex-col justify-center gap-4"
						variants={staggerItem}
					>
						<motion.div variants={buttonHover}>
							<Button
								asChild
								size="lg"
								variant="secondary"
								className="bg-white hover:bg-gray-100 text-blue-600"
							>
								<Link href="/register">Ücretsiz Kayıt Ol</Link>
							</Button>
						</motion.div>
						<motion.div variants={buttonHover}>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="hover:bg-white border-white text-blue-600 hover:text-blue-400"
							>
								<Link href="/upload">İlk Kaynağını Yükle</Link>
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
