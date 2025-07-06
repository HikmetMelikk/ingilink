"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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
import { cn } from "@/lib/utils";
import type { Resource, ResourceFilters } from "@/types/resource";
import { BookOpen, Filter, Search, Star, X } from "lucide-react";
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
	"Tümü",
	"Grammar",
	"Vocabulary",
	"Listening",
	"Speaking",
	"Writing",
	"Reading",
];
const difficulties = ["Tümü", "Beginner", "Intermediate", "Advanced"];
const contentTypes = ["Tümü", "PDF", "Video", "Audio", "Article", "Test"];
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

		const matchesCategory =
			filters.category === "Tümü" || resource.category === filters.category;
		const matchesDifficulty =
			filters.difficulty === "Tümü" ||
			resource.difficulty === filters.difficulty;
		const matchesContentType =
			filters.contentType === "Tümü" ||
			resource.contentType === filters.contentType;
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
			matchesCategory &&
			matchesDifficulty &&
			matchesContentType &&
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
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	// Create unique IDs for skeleton cards
	const skeletonIds = Array.from({ length: 6 }, () => crypto.randomUUID());

	const [filters, setFilters] = useState<ResourceFilters>({
		search: "",
		category: "Tümü",
		difficulty: "Tümü",
		contentType: "Tümü",
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
		value: string | number,
	) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const clearFilters = () => {
		setFilters({
			search: "",
			category: "Tümü",
			difficulty: "Tümü",
			contentType: "Tümü",
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
		return value !== "Tümü";
	});

	const toggleFavorite = (id: number) => {
		// Gerçek uygulamada API çağrısı yapılacak
		console.log(`Toggle favorite for resource ${id}`);
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < Math.floor(rating)
						? "fill-yellow-400 text-yellow-400"
						: "text-gray-300"
				}`}
			/>
		));
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("tr-TR", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 bg-gray-50">
				<div className="mx-auto px-4 py-8 container">
					{/* Page Header */}
					<div className="mb-8">
						<h1 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
							İngilizce Öğrenme Kaynakları
						</h1>
						<p className="text-gray-600 text-lg">
							Binlerce kaliteli kaynak arasından ihtiyacınıza uygun olanları
							keşfedin
						</p>
					</div>

					{/* Search and Controls */}
					<div className="mb-8">
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

							{/* Sort Dropdown */}
							<div className="flex items-center gap-4">
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
							</div>
						</div>

						{/* Results Info */}
						<div className="flex justify-between items-center text-gray-600 text-sm">
							<span>
								{filteredResources.length} kaynak bulundu
								{hasActiveFilters && " (filtrelenmiş)"}
							</span>
							{hasActiveFilters && (
								<Button
									variant="ghost"
									size="sm"
									onClick={clearFilters}
									className="text-blue-600 hover:text-blue-700"
								>
									<X className="mr-1 w-4 h-4" />
									Filtreleri Temizle
								</Button>
							)}
						</div>
					</div>

					<div className="flex gap-8">
						{/* Filters Sidebar */}
						{showFilters && (
							<div className="hidden lg:block w-80">
								<Card className="top-8 sticky">
									<CardContent className="p-6">
										<h3 className="mb-6 font-semibold text-lg">Filtreler</h3>

										{/* Category Filter */}
										<div className="mb-6">
											<Label className="block mb-3 font-medium">Kategori</Label>
											<div className="gap-2 grid grid-cols-2">
												{categories.map((category) => (
													<Button
														key={category}
														variant={
															filters.category === category
																? "default"
																: "outline"
														}
														size="sm"
														onClick={() =>
															handleFilterChange("category", category)
														}
														className="justify-start text-xs"
													>
														{category}
													</Button>
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
													<Button
														key={difficulty}
														variant={
															filters.difficulty === difficulty
																? "default"
																: "outline"
														}
														size="sm"
														onClick={() =>
															handleFilterChange("difficulty", difficulty)
														}
														className="justify-start text-xs"
													>
														{difficulty}
													</Button>
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
													<Button
														key={type}
														variant={
															filters.contentType === type
																? "default"
																: "outline"
														}
														size="sm"
														onClick={() =>
															handleFilterChange("contentType", type)
														}
														className="justify-start text-xs"
													>
														{type}
													</Button>
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
											<Button
												variant="outline"
												onClick={clearFilters}
												className="w-full"
											>
												<X className="mr-2 w-4 h-4" />
												Tüm Filtreleri Temizle
											</Button>
										)}
									</CardContent>
								</Card>
							</div>
						)}

						{/* Main Content */}
						<div className="flex-1">
							{isLoading ? (
								// Skeleton Loading
								<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
									{skeletonIds.map((id) => (
										<Card key={id} className="animate-pulse">
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
									))}
								</div>
							) : (
								<>
									{/* Resources Grid */}
									<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
										{paginatedResources.map((resource) => (
											<ResourceCard
												key={resource.id}
												resource={resource}
												onToggleFavorite={toggleFavorite}
											/>
										))}
									</div>

									{/* No Results */}
									{filteredResources.length === 0 && (
										<div className="py-16 text-center">
											<BookOpen className="mx-auto mb-4 w-16 h-16 text-gray-400" />
											<h3 className="mb-2 font-semibold text-gray-900 text-xl">
												Kaynak Bulunamadı
											</h3>
											<p className="mb-6 text-gray-600">
												Arama kriterlerinize uygun kaynak bulunamadı. Filtreleri
												değiştirmeyi deneyin.
											</p>
											<Button onClick={clearFilters} variant="outline">
												Filtreleri Temizle
											</Button>
										</div>
									)}

									{/* Pagination */}
									{totalPages > 1 && (
										<div className="flex justify-center items-center gap-2 mt-12">
											<Button
												variant="outline"
												onClick={() =>
													setCurrentPage((prev) => Math.max(1, prev - 1))
												}
												disabled={currentPage === 1}
											>
												Önceki
											</Button>

											{/* First page */}
											<Button
												variant={currentPage === 1 ? "default" : "outline"}
												onClick={() => setCurrentPage(1)}
												className="w-10"
											>
												1
											</Button>

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
													<Button
														key={`pagination-${pageNum}`}
														variant={
															currentPage === pageNum ? "default" : "outline"
														}
														onClick={() => setCurrentPage(pageNum)}
														className="w-10"
													>
														{pageNum}
													</Button>
												);
											})}

											{/* Ellipsis if needed */}
											{currentPage < totalPages - 2 && (
												<span className="text-gray-500">...</span>
											)}

											{/* Last page */}
											{totalPages > 1 && (
												<Button
													variant={
														currentPage === totalPages ? "default" : "outline"
													}
													onClick={() => setCurrentPage(totalPages)}
													className="w-10"
												>
													{totalPages}
												</Button>
											)}

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
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
