"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, BookOpen } from "lucide-react";
import { useState } from "react";

const trendingSearches = [
	"IELTS Listening",
	"Business English",
	"Grammar Rules",
	"Pronunciation",
	"Vocabulary Building",
	"Speaking Practice",
];

const recentSearches = [
	"Advanced Grammar",
	"Daily Conversations",
	"Academic Writing",
];

const quickCategories = [
	{
		id: "listening",
		name: "Listening",
		icon: "🎧",
		count: "245 kaynak",
	},
	{
		id: "speaking",
		name: "Speaking",
		icon: "🗣️",
		count: "189 kaynak",
	},
	{
		id: "writing",
		name: "Writing",
		icon: "✍️",
		count: "156 kaynak",
	},
	{
		id: "reading",
		name: "Reading",
		icon: "📖",
		count: "234 kaynak",
	},
];

export default function SearchPage() {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		// Implement search logic here
		console.log("Searching for:", query);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 bg-gray-50">
				<div className="mx-auto px-4 py-8 container">
					{/* Search Header */}
					<motion.div
						className="mb-8 text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
							Kaynak Ara
						</h1>
						<p className="text-gray-600 text-lg">
							Binlerce İngilizce öğrenme kaynağı arasından aradığınızı bulun
						</p>
					</motion.div>

					{/* Search Bar */}
					<motion.div
						className="mx-auto mb-8 max-w-2xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
					>
						<div className="relative">
							<Search className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
							<Input
								placeholder="Kaynak, yazar, kategori ara..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										handleSearch(searchQuery);
									}
								}}
								className="pl-12 pr-4 py-4 text-lg"
							/>
							<Button
								onClick={() => handleSearch(searchQuery)}
								className="top-1/2 right-2 absolute bg-blue-600 hover:bg-blue-700 -translate-y-1/2 transform"
							>
								Ara
							</Button>
						</div>
					</motion.div>

					{/* Quick Categories */}
					<motion.div
						className="mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						<h2 className="mb-4 font-semibold text-gray-900 text-xl">
							Hızlı Erişim
						</h2>
						<div className="gap-4 grid grid-cols-2 md:grid-cols-4">
							{quickCategories.map((category, index) => (
								<motion.div
									key={category.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Card className="hover:shadow-md border-0 cursor-pointer transition-shadow">
										<CardContent className="p-4 text-center">
											<div className="mb-2 text-2xl">{category.icon}</div>
											<h3 className="mb-1 font-medium text-gray-900">
												{category.name}
											</h3>
											<p className="text-gray-500 text-sm">{category.count}</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Trending and Recent Searches */}
					<div className="gap-8 grid grid-cols-1 md:grid-cols-2">
						{/* Trending Searches */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.5, duration: 0.6 }}
						>
							<Card className="border-0">
								<CardContent className="p-6">
									<div className="flex items-center mb-4">
										<TrendingUp className="mr-2 w-5 h-5 text-orange-600" />
										<h3 className="font-semibold text-gray-900 text-lg">
											Popüler Aramalar
										</h3>
									</div>
									<div className="space-y-2">
										{trendingSearches.map((search, index) => (
											<motion.button
												key={search}
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.6 + index * 0.05,
													duration: 0.3,
												}}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												onClick={() => handleSearch(search)}
												className="flex items-center hover:bg-gray-50 p-2 rounded-lg w-full text-left transition-colors"
											>
												<TrendingUp className="mr-2 w-4 h-4 text-gray-400" />
												<span className="text-gray-700">{search}</span>
											</motion.button>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* Recent Searches */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.5, duration: 0.6 }}
						>
							<Card className="border-0">
								<CardContent className="p-6">
									<div className="flex items-center mb-4">
										<Clock className="mr-2 w-5 h-5 text-blue-600" />
										<h3 className="font-semibold text-gray-900 text-lg">
											Son Aramalar
										</h3>
									</div>
									<div className="space-y-2">
										{recentSearches.map((search, index) => (
											<motion.button
												key={search}
												initial={{ opacity: 0, x: 10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.6 + index * 0.05,
													duration: 0.3,
												}}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												onClick={() => handleSearch(search)}
												className="flex items-center hover:bg-gray-50 p-2 rounded-lg w-full text-left transition-colors"
											>
												<Clock className="mr-2 w-4 h-4 text-gray-400" />
												<span className="text-gray-700">{search}</span>
											</motion.button>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>

					{/* Search Tips */}
					<motion.div
						className="mt-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.6 }}
					>
						<Card className="bg-blue-50 border-blue-200">
							<CardContent className="p-6">
								<div className="flex items-center mb-3">
									<BookOpen className="mr-2 w-5 h-5 text-blue-600" />
									<h3 className="font-semibold text-blue-900">Arama İpuçları</h3>
								</div>
								<ul className="space-y-1 text-blue-800 text-sm">
									<li>• Belirli bir kategori için "kategori:listening" yazın</li>
									<li>• Zorluk seviyesi için "seviye:beginner" kullanın</li>
									<li>• Dosya türü için "tür:pdf" veya "tür:video" arayın</li>
									<li>• Yazar adı için "yazar:sarah" şeklinde arama yapın</li>
								</ul>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</main>
			<Footer />
		</div>
	);
}