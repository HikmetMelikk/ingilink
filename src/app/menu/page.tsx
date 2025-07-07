"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
	BookOpen,
	Users,
	Info,
	HelpCircle,
	Mail,
	Settings,
	Shield,
	FileText,
	Star,
	Upload,
	Search,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";

const menuSections = [
	{
		title: "Ana Menü",
		items: [
			{
				icon: BookOpen,
				label: "Kaynaklar",
				href: "/resources",
				description: "Tüm İngilizce öğrenme kaynaklarını keşfet",
			},
			{
				icon: Search,
				label: "Ara",
				href: "/search",
				description: "Kaynak, yazar veya kategori ara",
			},
			{
				icon: Upload,
				label: "Kaynak Yükle",
				href: "/upload",
				description: "Kendi kaynaklarını paylaş",
			},
			{
				icon: TrendingUp,
				label: "Popüler",
				href: "/resources?sort=popular",
				description: "En popüler kaynakları gör",
			},
		],
	},
	{
		title: "Topluluk",
		items: [
			{
				icon: Users,
				label: "Topluluk",
				href: "/community",
				description: "Diğer öğrencilerle etkileşime geç",
			},
			{
				icon: Star,
				label: "Değerlendirmeler",
				href: "/reviews",
				description: "Kaynak değerlendirmelerini gör",
			},
		],
	},
	{
		title: "Hesap",
		items: [
			{
				icon: Settings,
				label: "Ayarlar",
				href: "/settings",
				description: "Hesap ayarlarını yönet",
			},
		],
	},
	{
		title: "Bilgi",
		items: [
			{
				icon: Info,
				label: "Hakkımızda",
				href: "/about",
				description: "ingilink hakkında bilgi al",
			},
			{
				icon: HelpCircle,
				label: "Yardım",
				href: "/help",
				description: "Sık sorulan sorular ve yardım",
			},
			{
				icon: Mail,
				label: "İletişim",
				href: "/contact",
				description: "Bizimle iletişime geç",
			},
		],
	},
	{
		title: "Yasal",
		items: [
			{
				icon: Shield,
				label: "Gizlilik Politikası",
				href: "/privacy",
				description: "Gizlilik politikamızı oku",
			},
			{
				icon: FileText,
				label: "Kullanım Şartları",
				href: "/terms",
				description: "Kullanım şartlarını incele",
			},
		],
	},
];

export default function MenuPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 bg-gray-50">
				<div className="mx-auto px-4 py-8 container">
					{/* Header */}
					<motion.div
						className="mb-8 text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
							Menü
						</h1>
						<p className="text-gray-600 text-lg">
							ingilink'in tüm özelliklerine buradan erişebilirsiniz
						</p>
					</motion.div>

					{/* Menu Sections */}
					<div className="space-y-8">
						{menuSections.map((section, sectionIndex) => (
							<motion.div
								key={section.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
							>
								<h2 className="mb-4 font-semibold text-gray-900 text-xl">
									{section.title}
								</h2>
								<div className="gap-4 grid grid-cols-1 md:grid-cols-2">
									{section.items.map((item, itemIndex) => {
										const IconComponent = item.icon;
										return (
											<motion.div
												key={item.label}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{
													delay: sectionIndex * 0.1 + itemIndex * 0.05,
													duration: 0.6,
												}}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												<Card className="hover:shadow-md border-0 h-full transition-shadow">
													<Link href={item.href}>
														<CardContent className="p-6">
															<div className="flex items-start space-x-4">
																<div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
																	<IconComponent className="w-6 h-6 text-blue-600" />
																</div>
																<div className="flex-1">
																	<h3 className="mb-2 font-medium text-gray-900">
																		{item.label}
																	</h3>
																	<p className="text-gray-600 text-sm">
																		{item.description}
																	</p>
																</div>
															</div>
														</CardContent>
													</Link>
												</Card>
											</motion.div>
										);
									})}
								</div>
							</motion.div>
						))}
					</div>

					{/* Quick Actions */}
					<motion.div
						className="mt-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.6 }}
					>
						<Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
							<CardContent className="p-6 text-center">
								<h3 className="mb-4 font-semibold text-gray-900 text-xl">
									Hızlı İşlemler
								</h3>
								<div className="flex sm:flex-row flex-col justify-center gap-4">
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button
											asChild
											size="lg"
											className="bg-blue-600 hover:bg-blue-700"
										>
											<Link href="/register">
												<Users className="mr-2 w-5 h-5" />
												Kayıt Ol
											</Link>
										</Button>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button asChild size="lg" variant="outline">
											<Link href="/login">
												<Settings className="mr-2 w-5 h-5" />
												Giriş Yap
											</Link>
										</Button>
									</motion.div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</main>
			<Footer />
		</div>
	);
}