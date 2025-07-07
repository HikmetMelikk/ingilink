"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
	User,
	Settings,
	Heart,
	Download,
	Upload,
	Trophy,
	BookOpen,
	Star,
} from "lucide-react";
import Image from "next/image";

const userStats = [
	{
		icon: BookOpen,
		label: "İndirilen Kaynaklar",
		value: "47",
		color: "text-blue-600",
	},
	{
		icon: Heart,
		label: "Favoriler",
		value: "23",
		color: "text-red-600",
	},
	{
		icon: Upload,
		label: "Paylaşılan Kaynaklar",
		value: "8",
		color: "text-green-600",
	},
	{
		icon: Trophy,
		label: "Puan",
		value: "1,250",
		color: "text-orange-600",
	},
];

const recentActivity = [
	{
		type: "download",
		title: "Advanced Grammar Guide",
		time: "2 saat önce",
		icon: Download,
	},
	{
		type: "favorite",
		title: "IELTS Listening Practice",
		time: "1 gün önce",
		icon: Heart,
	},
	{
		type: "upload",
		title: "Business Vocabulary List",
		time: "3 gün önce",
		icon: Upload,
	},
];

export default function ProfilePage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 bg-gray-50">
				<div className="mx-auto px-4 py-8 container">
					{/* Profile Header */}
					<motion.div
						className="mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<Card className="border-0">
							<CardContent className="p-6">
								<div className="flex sm:flex-row flex-col items-center gap-6">
									<motion.div
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ delay: 0.2, duration: 0.6 }}
									>
										<Image
											src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
											alt="Profile"
											width={150}
											height={150}
											className="rounded-full w-24 h-24 object-cover"
										/>
									</motion.div>
									<div className="flex-1 text-center sm:text-left">
										<motion.h1
											className="mb-2 font-bold text-gray-900 text-2xl"
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.3, duration: 0.6 }}
										>
											Ahmet Yılmaz
										</motion.h1>
										<motion.p
											className="mb-4 text-gray-600"
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.4, duration: 0.6 }}
										>
											İngilizce öğrenme yolculuğunda aktif bir üye
										</motion.p>
										<motion.div
											className="flex sm:flex-row flex-col gap-2"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.5, duration: 0.6 }}
										>
											<Button variant="outline" className="flex items-center">
												<Settings className="mr-2 w-4 h-4" />
												Profili Düzenle
											</Button>
											<Button className="flex items-center bg-blue-600 hover:bg-blue-700">
												<Upload className="mr-2 w-4 h-4" />
												Kaynak Yükle
											</Button>
										</motion.div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Stats Grid */}
					<motion.div
						className="gap-6 grid grid-cols-2 md:grid-cols-4 mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.6 }}
					>
						{userStats.map((stat, index) => {
							const IconComponent = stat.icon;
							return (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
									whileHover={{ scale: 1.02 }}
								>
									<Card className="hover:shadow-md border-0 text-center transition-shadow">
										<CardContent className="p-6">
											<IconComponent
												className={`w-8 h-8 mx-auto mb-3 ${stat.color}`}
											/>
											<div className="mb-1 font-bold text-2xl text-gray-900">
												{stat.value}
											</div>
											<div className="text-gray-600 text-sm">{stat.label}</div>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</motion.div>

					{/* Recent Activity */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.6 }}
					>
						<Card className="border-0">
							<CardContent className="p-6">
								<h2 className="mb-6 font-semibold text-gray-900 text-xl">
									Son Aktiviteler
								</h2>
								<div className="space-y-4">
									{recentActivity.map((activity, index) => {
										const IconComponent = activity.icon;
										return (
											<motion.div
												key={index}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.9 + index * 0.1,
													duration: 0.6,
												}}
												className="flex items-center hover:bg-gray-50 p-3 rounded-lg transition-colors"
											>
												<div className="flex justify-center items-center bg-blue-100 mr-4 rounded-full w-10 h-10">
													<IconComponent className="w-5 h-5 text-blue-600" />
												</div>
												<div className="flex-1">
													<h3 className="font-medium text-gray-900">
														{activity.title}
													</h3>
													<p className="text-gray-500 text-sm">
														{activity.time}
													</p>
												</div>
											</motion.div>
										);
									})}
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Achievement Section */}
					<motion.div
						className="mt-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.0, duration: 0.6 }}
					>
						<Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
							<CardContent className="p-6">
								<div className="flex items-center mb-4">
									<Trophy className="mr-2 w-6 h-6 text-orange-600" />
									<h2 className="font-semibold text-gray-900 text-xl">
										Başarılar
									</h2>
								</div>
								<div className="gap-4 grid grid-cols-1 md:grid-cols-3">
									<div className="flex items-center bg-white p-4 rounded-lg">
										<Star className="mr-3 w-8 h-8 text-yellow-500" />
										<div>
											<h3 className="font-medium text-gray-900">
												İlk İndirme
											</h3>
											<p className="text-gray-500 text-sm">
												İlk kaynağını indirdin!
											</p>
										</div>
									</div>
									<div className="flex items-center bg-white p-4 rounded-lg">
										<Heart className="mr-3 w-8 h-8 text-red-500" />
										<div>
											<h3 className="font-medium text-gray-900">
												Favori Koleksiyoncusu
											</h3>
											<p className="text-gray-500 text-sm">
												20+ kaynak favorilere eklendi
											</p>
										</div>
									</div>
									<div className="flex items-center bg-white p-4 rounded-lg">
										<Upload className="mr-3 w-8 h-8 text-green-500" />
										<div>
											<h3 className="font-medium text-gray-900">
												İçerik Üreticisi
											</h3>
											<p className="text-gray-500 text-sm">
												İlk kaynağını paylaştın!
											</p>
										</div>
									</div>
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