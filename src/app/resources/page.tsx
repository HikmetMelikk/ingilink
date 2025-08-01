"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileFilterDrawer } from "@/components/resources/MobileFilterDrawer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	cardHover,
	filterButtonVariants,
	pageVariants,
	staggerContainer,
	staggerItem,
} from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import type { Resource, ResourceFilters, ViewMode } from "@/types/resource";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Filter, Grid3X3, List, Search, X, Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Mock data - gerçek uygulamada API'den gelecek
const mockResources = [
	{
		id: 1,
		title: "Advanced English Grammar Guide",
		description:
			"Comprehensive guide covering all advanced grammar topics with practical examples and exercises.",
		author: "Sarah Johnson",
		category: "Grammar",
		difficulty: "Advanced",
		contentType: "PDF",
		rating: 4.8,
		ratingCount: 124,
		views: 1250,
		downloads: 890,
		publishDate: "2024-01-15",
		thumbnail:
			"https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
		tags: ["grammar", "advanced", "exercises"],
		isFavorite: false,
	},
	{
		id: 2,
		title: "Business English Vocabulary",
		description:
			"Essential vocabulary for professional communication in business environments.",
		author: "Michael Chen",
		category: "Vocabulary",
		difficulty: "Intermediate",
		contentType: "Audio",
		rating: 4.6,
		ratingCount: 89,
		views: 890,
		downloads: 650,
		publishDate: "2024-01-10",
		thumbnail:
			"https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
		tags: ["business", "vocabulary", "professional"],
		isFavorite: true,
	},
	{
		id: 3,
		title: "IELTS Listening Practice Tests",
		description:
			"Complete set of IELTS listening practice tests with detailed explanations.",
		author: "Emma Wilson",
		category: "Listening",
		difficulty: "Intermediate",
		contentType: "Audio",
		rating: 4.9,
		ratingCount: 156,
		views: 2100,
		downloads: 1200,
		publishDate: "2024-01-08",
		thumbnail:
			"https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
		tags: ["ielts", "listening", "practice"],
		isFavorite: false,
	},
	{
		id: 4,
		title: "English Pronunciation Masterclass",
		description:
			"Master English pronunciation with phonetic exercises and audio examples.",
		author: "David Brown",
		category: "Speaking",
		difficulty: "Beginner",
		contentType: "Video",
		rating: 4.7,
		ratingCount: 203,
		views: 1680,
		downloads: 980,
		publishDate: "2024-01-05",
		thumbnail:
			"https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
		tags: ["pronunciation", "speaking", "phonetics"],
		isFavorite: false,
	},
	{
		id: 5,
		title: "Academic Writing Essentials",
		description:
			"Learn the fundamentals of academic writing for essays, reports, and research papers.",
		author: "Dr. Lisa Anderson",
		category: "Writing",
		difficulty: "Advanced",
		contentType: "PDF",
		rating: 4.5,
		ratingCount: 78,
		views: 950,
		downloads: 720,
		publishDate: "2024-01-03",
		thumbnail:
			"https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400",
		tags: ["academic", "writing", "essays"],
		isFavorite: true,
	},
	{
		id: 6,
		title: "Daily English Conversations",
		description:
			"Common English conversations for everyday situations with native speakers.",
		author: "Jennifer Lee",
		category: "Speaking",
		difficulty: "Beginner",
		contentType: "Video",
		rating: 4.4,
		ratingCount: 92,
		views: 1420,
		downloads: 850,
		publishDate: "2024-01-01",
		thumbnail:
			"https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
		tags: ["conversation", "daily", "beginner"],
		isFavorite: false,
	},
];

const categories = [
	"Grammar",
	"Vocabulary",
	"Listening",
	"Speaking",
	"Writing",
	"Reading",
];
const difficulties = ["Beginner", "Intermediate", "Advanced"];
const contentTypes = ["PDF", "Video", "Audio", "Article", "Test"];
const sortOptions = [
	{ value: "popular", label: "En Popüler" },
	{ value: "rating", label: "En Yüksek Puanlı" },
	{ value: "newest", label: "En Yeni" },
	{ value: "oldest", label: "En Eski" },
	{ value: "title", label: "Alfabetik" },
];

const filterAndSortResources = (
	resources: Resource[],
	filters: ResourceFilters,
): Resource[] => {
	// Filter resources
	const filtered = resources.filter((resource) => {
		const matchesSearch =
			resource.title.toLowerCase().includes(filters.search.toLowerCase()) ||
			resource.description
				.toLowerCase()
				.includes(filters.search.toLowerCase()) ||
			resource.tags.some((tag) =>
				tag.toLowerCase().includes(filters.search.toLowerCase()),
			);

		const matchesCategories =
			filters.categories.length === 0 ||
			filters.categories.includes(resource.category);
		const matchesDifficulties =
			filters.difficulties.length === 0 ||
			filters.difficulties.includes(resource.difficulty);
		const matchesContentTypes =
			filters.contentTypes.length === 0 ||
			filters.contentTypes.includes(resource.contentType);
		const matchesAuthor =
			!filters.author ||
			resource.author.toLowerCase().includes(filters.author.toLowerCase());
		const matchesRating = resource.rating >= filters.minRating;

		let matchesDate = true;
		if (filters.dateFrom) {
			matchesDate =
				matchesDate &&
				new Date(resource.publishDate) >= new Date(filters.dateFrom);
		}
		if (filters.dateTo) {
			matchesDate =
				matchesDate &&
				new Date(resource.publishDate) <= new Date(filters.dateTo);
		}

		return (
			matchesSearch &&
			matchesCategories &&
			matchesDifficulties &&
			matchesContentTypes &&
			matchesAuthor &&
			matchesRating &&
			matchesDate
		);
	});

	// Sort filtered resources
	return [...filtered].sort((a, b) => {
		switch (filters.sortBy) {
			case "popular":
				return b.views - a.views;
			case "rating":
				return b.rating - a.rating;
			case "newest":
				return (
					new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
				);
			case "oldest":
				return (
					new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
				);
			case "title":
				return a.title.localeCompare(b.title);
			default:
				return 0;
		}
	});
};

export default function ResourcesPage() {
	const [showFilters, setShowFilters] = useState(false);
	const [showMobileFilters, setShowMobileFilters] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [viewMode, setViewMode] = useState<ViewMode>("grid");
	const itemsPerPage = 12;

	// Create unique IDs for skeleton cards
	const skeletonIds = Array.from({ length: 6 }, () => crypto.randomUUID());

	const [filters, setFilters] = useState<ResourceFilters>({
		search: "",
		categories: [],
		difficulties: [],
		contentTypes: [],
		author: "",
		minRating: 0,
		dateFrom: "",
		dateTo: "",
		sortBy: "popular",
	});

	// Filtrelenmiş ve sıralanmış kaynaklar
	const filteredResources = useMemo(() => {
		return filterAndSortResources(mockResources, filters);
	}, [filters]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
	const pageNumbers = Array.from(
		{ length: Math.min(5, totalPages) },
		(_, i) => i + 1,
	);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedResources = filteredResources.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	// Filtre değişikliklerinde sayfa 1'e dön
	useEffect(() => {
		setCurrentPage(1);
	}, []);

	const handleFilterChange = (
		key: keyof ResourceFilters,
		value: string | number | string[],
	) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const handleMultiSelectToggle = (
		key: "categories" | "difficulties" | "contentTypes",
		value: string,
	) => {
		setFilters((prev) => {
			const currentValues = prev[key] as string[];
			const newValues = currentValues.includes(value)
				? currentValues.filter((v) => v !== value)
				: [...currentValues, value];
			return { ...prev, [key]: newValues };
		});
	};

	const clearFilters = () => {
		setFilters({
			search: "",
			categories: [],
			difficulties: [],
			contentTypes: [],
			author: "",
			minRating: 0,
			dateFrom: "",
			dateTo: "",
			sortBy: "popular",
		});
	};

	const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
		if (
			key === "search" ||
			key === "author" ||
			key === "dateFrom" ||
			key === "dateTo"
		) {
			return value !== "";
		}
		if (key === "minRating") {
			return value > 0;
		}
		if (key === "sortBy") {
			return value !== "popular";
		}
		if (Array.isArray(value)) {
			return value.length > 0;
		}
		return false;
	});

	const toggleFavorite = (id: number) => {
		// Gerçek uygulamada API çağrısı yapılacak
		console.log(`Toggle favorite for resource ${id}`);
	};

	const handleApplyFilters = () => {
		// Filtreleri uygula - gerçek uygulamada API çağrısı yapılacak
		console.log("Applying filters:", filters);
	};

	return (
		<motion.div
			className="flex flex-col min-h-screen"
			initial="initial"
			animate="animate"
			variants={pageVariants}
		>
			<Header />
			<main className="flex-1 bg-gray-50">
				<div className="mx-auto px-4 py-8 container">
					{/* Page Header */}
					<motion.div
						className="mb-8"
						variants={staggerContainer}
						initial="initial"
						animate="animate"
					>
						<motion.h1
							className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl"
							variants={staggerItem}
						>
							İngilizce Öğrenme Kaynakları
						</motion.h1>
						<motion.p className="text-gray-600 text-lg" variants={staggerItem}>
							Binlerce kaliteli kaynak arasından ihtiyacınıza uygun olanları
							keşfedin
						</motion.p>
					</motion.div>

					{/* Search and Controls */}
					<motion.div
						className="mb-8"
						variants={staggerItem}
						initial="initial"
						animate="animate"
					>
						<div className="flex lg:flex-row flex-col gap-4 mb-6">
							{/* Search Bar */}
							<div className="relative flex-1">
								<Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
								<Input
									placeholder="Kaynak, yazar veya etiket ara..."
									value={filters.search}
									onChange={(e) => handleFilterChange("search", e.target.value)}
									className="pl-10 h-9 text-lg"
								/>
							</div>

							{/* Controls */}
							<div className="flex items-center gap-4">
								{/* Mobile Filter Button */}
								<div className="md:hidden">
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button
											variant="outline"
											onClick={() => setShowMobileFilters(true)}
											className={cn(
												"flex items-center gap-2",
												hasActiveFilters && "border-blue-500 text-blue-600 bg-blue-50"
											)}
										>
											<Menu className="w-4 h-4" />
											Filtreler
											{hasActiveFilters && (
												<span className="bg-blue-500 rounded-full w-2 h-2" />
											)}
										</Button>
									</motion.div>
								</div>

								{/* View Mode Toggle */}
								<div className="hidden sm:flex border rounded-md overflow-hidden">
									<motion.button
										onClick={() => setViewMode("grid")}
										className={cn(
											"p-2 transition-colors",
											viewMode === "grid"
												? "bg-blue-600 text-white"
												: "bg-white text-gray-600 hover:bg-gray-50",
										)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Grid3X3 className="w-4 h-4" />
									</motion.button>
									<motion.button
										onClick={() => setViewMode("list")}
										className={cn(
											"p-2 transition-colors",
											viewMode === "list"
												? "bg-blue-600 text-white"
												: "bg-white text-gray-600 hover:bg-gray-50",
										)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<List className="w-4 h-4" />
									</motion.button>
								</div>

								{/* Sort Dropdown */}
								<Select
									value={filters.sortBy}
									onValueChange={(value) => handleFilterChange("sortBy", value)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Sıralama" />
									</SelectTrigger>
									<SelectContent>
										{sortOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								{/* Filter Toggle */}
								<motion.div
									className="hidden md:block"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										variant="outline"
										onClick={() => setShowFilters(!showFilters)}
										className={cn(
											hasActiveFilters && "border-blue-500 text-blue-600",
										)}
									>
										<Filter className="mr-2 w-4 h-4" />
										Filtreler
										{hasActiveFilters && (
											<span className="bg-blue-500 ml-2 rounded-full w-2 h-2" />
										)}
									</Button>
								</motion.div>
							</div>
						</div>

						{/* Results Info */}
						<div className="flex justify-between items-center text-gray-600 text-sm">
							<span>
								{filteredResources.length} kaynak bulundu
								{hasActiveFilters && " (filtrelenmiş)"}
							</span>
							{hasActiveFilters && (
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										variant="ghost"
										size="sm"
										onClick={clearFilters}
										className="text-blue-600 hover:text-blue-700"
									>
										<X className="mr-1 w-4 h-4" />
										Filtreleri Temizle
									</Button>
								</motion.div>
							)}
						</div>
					</motion.div>

					<div className="flex gap-8">
						{/* Filters Sidebar */}
						<AnimatePresence>
							{showFilters && (
								<motion.div
									className="hidden md:block w-80"
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -50 }}
									transition={{ duration: 0.3 }}
								>
									<Card className="top-8 sticky">
										<CardContent className="p-6">
											<h3 className="mb-6 font-semibold text-lg">Filtreler</h3>

											{/* Category Filter */}
											<div className="mb-6">
												<Label className="block mb-3 font-medium">
													Kategori
												</Label>
												<div className="gap-2 grid grid-cols-2">
													{categories.map((category) => (
														<motion.button
															key={category}
															onClick={() =>
																handleMultiSelectToggle("categories", category)
															}
															className={cn(
																"px-3 py-2 text-xs rounded-md border transition-all",
																filters.categories.includes(category)
																	? "bg-blue-600 text-white border-blue-600"
																	: "bg-white text-gray-700 border-gray-300 hover:border-blue-300",
															)}
															variants={filterButtonVariants}
															animate={
																filters.categories.includes(category)
																	? "active"
																	: "inactive"
															}
															whileHover="hover"
														>
															{category}
														</motion.button>
													))}
												</div>
											</div>

											{/* Difficulty Filter */}
											<div className="mb-6">
												<Label className="block mb-3 font-medium">
													Zorluk Seviyesi
												</Label>
												<div className="gap-2 grid">
													{difficulties.map((difficulty) => (
														<motion.button
															key={difficulty}
															onClick={() =>
																handleMultiSelectToggle(
																	"difficulties",
																	difficulty,
																)
															}
															className={cn(
																"px-3 py-2 text-xs rounded-md border transition-all text-left",
																filters.difficulties.includes(difficulty)
																	? "bg-blue-600 text-white border-blue-600"
																	: "bg-white text-gray-700 border-gray-300 hover:border-blue-300",
															)}
															variants={filterButtonVariants}
															animate={
																filters.difficulties.includes(difficulty)
																	? "active"
																	: "inactive"
															}
															whileHover="hover"
														>
															{difficulty}
														</motion.button>
													))}
												</div>
											</div>

											{/* Content Type Filter */}
											<div className="mb-6">
												<Label className="block mb-3 font-medium">
													İçerik Türü
												</Label>
												<div className="gap-2 grid grid-cols-2">
													{contentTypes.map((type) => (
														<motion.button
															key={type}
															onClick={() =>
																handleMultiSelectToggle("contentTypes", type)
															}
															className={cn(
																"px-3 py-2 text-xs rounded-md border transition-all",
																filters.contentTypes.includes(type)
																	? "bg-blue-600 text-white border-blue-600"
																	: "bg-white text-gray-700 border-gray-300 hover:border-blue-300",
															)}
															variants={filterButtonVariants}
															animate={
																filters.contentTypes.includes(type)
																	? "active"
																	: "inactive"
															}
															whileHover="hover"
														>
															{type}
														</motion.button>
													))}
												</div>
											</div>

											{/* Author Filter */}
											<div className="mb-6">
												<Label
													htmlFor="author"
													className="block mb-2 font-medium"
												>
													Yazar
												</Label>
												<Input
													id="author"
													placeholder="Yazar adı ara..."
													value={filters.author}
													onChange={(e) =>
														handleFilterChange("author", e.target.value)
													}
												/>
											</div>

											{/* Rating Filter */}
											<div className="mb-6">
												<Label className="block mb-3 font-medium">
													Minimum Puan:{" "}
													{filters.minRating > 0 ? filters.minRating : "Tümü"}
												</Label>
												<input
													type="range"
													min="0"
													max="5"
													step="0.5"
													value={filters.minRating}
													onChange={(e) =>
														handleFilterChange(
															"minRating",
															Number.parseFloat(e.target.value),
														)
													}
													className="w-full"
												/>
												<div className="flex justify-between text-gray-500 text-xs">
													<span>0</span>
													<span>5</span>
												</div>
											</div>

											{/* Date Range Filter */}
											<div className="mb-6">
												<Label className="block mb-3 font-medium">
													Yayın Tarihi
												</Label>
												<div className="space-y-2">
													<Input
														type="date"
														value={filters.dateFrom}
														onChange={(e) =>
															handleFilterChange("dateFrom", e.target.value)
														}
														placeholder="Başlangıç tarihi"
													/>
													<Input
														type="date"
														value={filters.dateTo}
														onChange={(e) =>
															handleFilterChange("dateTo", e.target.value)
														}
														placeholder="Bitiş tarihi"
													/>
												</div>
											</div>

											{hasActiveFilters && (
												<motion.div
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
												>
													<Button
														variant="outline"
														onClick={clearFilters}
														className="w-full"
													>
														<X className="mr-2 w-4 h-4" />
														Tüm Filtreleri Temizle
													</Button>
												</motion.div>
											)}
										</CardContent>
									</Card>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Main Content */}
						<div className="flex-1">
							{isLoading ? (
								// Skeleton Loading
								<motion.div
									className={cn(
										"gap-6 grid",
										viewMode === "grid"
											? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
											: "grid-cols-1",
									)}
									variants={staggerContainer}
									initial="initial"
									animate="animate"
								>
									{skeletonIds.map((id, index) => (
										<motion.div key={id} variants={staggerItem} custom={index}>
											<Card className="animate-pulse">
												<CardContent className="p-6">
													<div className="bg-gray-200 mb-4 rounded-lg w-full h-48" />
													<div className="bg-gray-200 mb-2 rounded w-3/4 h-4" />
													<div className="bg-gray-200 mb-4 rounded w-1/2 h-4" />
													<div className="flex justify-between">
														<div className="bg-gray-200 rounded w-20 h-4" />
														<div className="bg-gray-200 rounded w-16 h-4" />
													</div>
												</CardContent>
											</Card>
										</motion.div>
									))}
								</motion.div>
							) : (
								<>
									{/* Resources Grid/List */}
									<AnimatePresence mode="wait">
										<motion.div
											key={`${viewMode}-${JSON.stringify(filters)}`}
											className={cn(
												"gap-6 grid",
												viewMode === "grid"
													? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
													: "grid-cols-1",
											)}
											variants={staggerContainer}
											initial="initial"
											animate="animate"
											exit="exit"
										>
											{paginatedResources.map((resource, index) => (
												<motion.div
													key={resource.id}
													variants={staggerItem}
													custom={index}
													layout
												>
													<motion.div variants={cardHover}>
														<ResourceCard
															resource={resource}
															onToggleFavorite={toggleFavorite}
															viewMode={viewMode}
														/>
													</motion.div>
												</motion.div>
											))}
										</motion.div>
									</AnimatePresence>

									{/* No Results */}
									{filteredResources.length === 0 && (
										<motion.div
											className="py-16 text-center"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.6 }}
										>
											<BookOpen className="mx-auto mb-4 w-16 h-16 text-gray-400" />
											<h3 className="mb-2 font-semibold text-gray-900 text-xl">
												Kaynak Bulunamadı
											</h3>
											<p className="mb-6 text-gray-600">
												Arama kriterlerinize uygun kaynak bulunamadı. Filtreleri
												değiştirmeyi deneyin.
											</p>
											<motion.div
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												<Button onClick={clearFilters} variant="outline">
													Filtreleri Temizle
												</Button>
											</motion.div>
										</motion.div>
									)}

									{/* Pagination */}
									{totalPages > 1 && (
										<motion.div
											className="flex justify-center items-center gap-2 mt-12"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.3, duration: 0.6 }}
										>
											<motion.div
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												<Button
													variant="outline"
													onClick={() =>
														setCurrentPage((prev) => Math.max(1, prev - 1))
													}
													disabled={currentPage === 1}
												>
													Önceki
												</Button>
											</motion.div>

											{/* First page */}
											<motion.div
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												<Button
													variant={currentPage === 1 ? "default" : "outline"}
													onClick={() => setCurrentPage(1)}
													className="w-10"
												>
													1
												</Button>
											</motion.div>

											{/* Ellipsis if needed */}
											{currentPage > 3 && (
												<span className="text-gray-500">...</span>
											)}

											{/* Pages around current page */}
											{Array.from({ length: 3 }, (_, i) => {
												const pageNum = Math.min(
													Math.max(currentPage - 1 + i, 2),
													totalPages - 1,
												);
												if (pageNum <= 1 || pageNum >= totalPages) return null;
												return (
													<motion.div
														key={`pagination-${pageNum}`}
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}
													>
														<Button
															variant={
																currentPage === pageNum ? "default" : "outline"
															}
															onClick={() => setCurrentPage(pageNum)}
															className="w-10"
														>
															{pageNum}
														</Button>
													</motion.div>
												);
											})}

											{/* Ellipsis if needed */}
											{currentPage < totalPages - 2 && (
												<span className="text-gray-500">...</span>
											)}

											{/* Last page */}
											{totalPages > 1 && (
												<motion.div
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													<Button
														variant={
															currentPage === totalPages ? "default" : "outline"
														}
														onClick={() => setCurrentPage(totalPages)}
														className="w-10"
													>
														{totalPages}
													</Button>
												</motion.div>
											)}

											<motion.div
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												<Button
													variant="outline"
													onClick={() =>
														setCurrentPage((prev) =>
															Math.min(totalPages, prev + 1),
														)
													}
													disabled={currentPage === totalPages}
												>
													Sonraki
												</Button>
											</motion.div>
										</motion.div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</main>
			
			{/* Mobile Filter Drawer */}
			<MobileFilterDrawer
				isOpen={showMobileFilters}
				onClose={() => setShowMobileFilters(false)}
				filters={filters}
				onFilterChange={handleFilterChange}
				onApplyFilters={handleApplyFilters}
				onClearFilters={clearFilters}
				hasActiveFilters={hasActiveFilters}
				resultCount={filteredResources.length}
			/>
			
			<Footer />
		</motion.div>
	);
}
