"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
	staggerContainer, 
	staggerItem, 
	cardHover, 
	buttonHover,
	scrollTriggered 
} from "@/lib/motion-variants";
import { motion } from "framer-motion";
import {
	BookOpen,
	Eye,
	MessageCircle,
	Mic,
	PenTool,
	Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
	{
		id: "grammar",
		name: "Grammar",
		description: "Dilbilgisi kuralları ve uygulamaları",
		icon: BookOpen,
		color: "bg-blue-500",
		lightColor: "bg-blue-50",
		count: 245,
		image:
			"https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300",
	},
	{
		id: "vocabulary",
		name: "Vocabulary",
		description: "Kelime hazinesi ve kullanımları",
		icon: MessageCircle,
		color: "bg-purple-500",
		lightColor: "bg-purple-50",
		count: 189,
		image:
			"https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
	},
	{
		id: "listening",
		name: "Listening",
		description: "Dinleme becerileri ve pratikleri",
		icon: Volume2,
		color: "bg-green-500",
		lightColor: "bg-green-50",
		count: 156,
		image:
			"https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300",
	},
	{
		id: "speaking",
		name: "Speaking",
		description: "Konuşma pratiği ve telaffuz",
		icon: Mic,
		color: "bg-orange-500",
		lightColor: "bg-orange-50",
		count: 134,
		image:
			"https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300",
	},
	{
		id: "writing",
		name: "Writing",
		description: "Yazma becerileri ve teknikleri",
		icon: PenTool,
		color: "bg-pink-500",
		lightColor: "bg-pink-50",
		count: 98,
		image:
			"https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300",
	},
	{
		id: "reading",
		name: "Reading",
		description: "Okuma anlama ve hız teknikleri",
		icon: Eye,
		color: "bg-indigo-500",
		lightColor: "bg-indigo-50",
		count: 167,
		image:
			"https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300",
	},
];

export function CategoriesSection() {
	return (
		<motion.section 
			className="bg-gray-50 py-20"
			{...scrollTriggered}
		>
			<div className="mx-auto px-4 container">
				<motion.div 
					className="mb-16 text-center"
					variants={staggerContainer}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.h2 
						className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl"
						variants={staggerItem}
					>
						Kategoriler
					</motion.h2>
					<motion.p 
						className="mx-auto max-w-2xl text-gray-600 text-xl"
						variants={staggerItem}
					>
						İhtiyacınıza uygun kategoriyi seçin ve İngilizce öğrenme
						yolculuğunuza başlayın
					</motion.p>
				</motion.div>

				<motion.div 
					className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
					variants={staggerContainer}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					{categories.map((category, index) => {
						const IconComponent = category.icon;
						return (
							<motion.div
								key={category.id}
								variants={staggerItem}
								custom={index}
							>
								<motion.div variants={cardHover}>
									<Card className="group shadow-md hover:shadow-xl border-0 overflow-hidden transition-all duration-300">
										<div className="relative">
											<Image
												src={category.image}
												alt={category.name}
												width={1000}
												height={1000}
												className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
											/>
											<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
											<div
												className={`absolute top-4 left-4 w-12 h-12 ${category.lightColor} rounded-full flex items-center justify-center`}
											>
												<IconComponent className="w-6 h-6 text-gray-700" />
											</div>
										</div>

										<CardContent className="p-6">
											<div className="flex justify-between items-center mb-3">
												<h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-xl transition-colors">
													{category.name}
												</h3>
												<span className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
													{category.count} kaynak
												</span>
											</div>

											<p className="mb-4 text-gray-600 text-sm leading-relaxed">
												{category.description}
											</p>

											<motion.div variants={buttonHover}>
												<Button
													asChild
													variant="outline"
													className="group-hover:bg-blue-50 group-hover:border-blue-200 w-full group-hover:text-blue-600"
												>
													<Link href={`/resources?category=${category.id}`}>
														Kaynakları Görüntüle
													</Link>
												</Button>
											</motion.div>
										</CardContent>
									</Card>
								</motion.div>
							</motion.div>
						);
					})}
				</motion.div>

				<motion.div 
					className="mt-12 text-center"
					variants={staggerItem}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.div variants={buttonHover}>
						<Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
							<Link href="/resources">Tüm Kategorileri Keşfet</Link>
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
}