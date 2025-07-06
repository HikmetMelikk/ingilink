"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface Filters {
	search: string;
	category: string;
	difficulty: string;
	contentType: string;
	author: string;
	minRating: number;
	dateFrom: string;
	dateTo: string;
	sortBy: string;
}

interface ResourceFiltersProps {
	filters: Filters;
	onFilterChange: (key: keyof Filters, value: string | number) => void;
	onClearFilters: () => void;
	hasActiveFilters: boolean;
}

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

export function ResourceFilters({
	filters,
	onFilterChange,
	onClearFilters,
	hasActiveFilters,
}: ResourceFiltersProps) {
	return (
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
								variant={filters.category === category ? "default" : "outline"}
								size="sm"
								onClick={() => onFilterChange("category", category)}
								className="justify-start text-xs"
							>
								{category}
							</Button>
						))}
					</div>
				</div>

				{/* Difficulty Filter */}
				<div className="mb-6">
					<Label className="block mb-3 font-medium">Zorluk Seviyesi</Label>
					<div className="gap-2 grid">
						{difficulties.map((difficulty) => (
							<Button
								key={difficulty}
								variant={
									filters.difficulty === difficulty ? "default" : "outline"
								}
								size="sm"
								onClick={() => onFilterChange("difficulty", difficulty)}
								className="justify-start text-xs"
							>
								{difficulty}
							</Button>
						))}
					</div>
				</div>

				{/* Content Type Filter */}
				<div className="mb-6">
					<Label className="block mb-3 font-medium">İçerik Türü</Label>
					<div className="gap-2 grid grid-cols-2">
						{contentTypes.map((type) => (
							<Button
								key={type}
								variant={filters.contentType === type ? "default" : "outline"}
								size="sm"
								onClick={() => onFilterChange("contentType", type)}
								className="justify-start text-xs"
							>
								{type}
							</Button>
						))}
					</div>
				</div>

				{/* Author Filter */}
				<div className="mb-6">
					<Label htmlFor="author" className="block mb-2 font-medium">
						Yazar
					</Label>
					<Input
						id="author"
						placeholder="Yazar adı ara..."
						value={filters.author}
						onChange={(e) => onFilterChange("author", e.target.value)}
					/>
				</div>

				{/* Rating Filter */}
				<div className="mb-6">
					<Label className="block mb-3 font-medium">
						Minimum Puan: {filters.minRating > 0 ? filters.minRating : "Tümü"}
					</Label>
					<input
						type="range"
						min="0"
						max="5"
						step="0.5"
						value={filters.minRating}
						onChange={(e) =>
							onFilterChange("minRating", Number.parseFloat(e.target.value))
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
					<Label className="block mb-3 font-medium">Yayın Tarihi</Label>
					<div className="space-y-2">
						<Input
							type="date"
							value={filters.dateFrom}
							onChange={(e) => onFilterChange("dateFrom", e.target.value)}
							placeholder="Başlangıç tarihi"
						/>
						<Input
							type="date"
							value={filters.dateTo}
							onChange={(e) => onFilterChange("dateTo", e.target.value)}
							placeholder="Bitiş tarihi"
						/>
					</div>
				</div>

				{hasActiveFilters && (
					<Button variant="outline" onClick={onClearFilters} className="w-full">
						<X className="mr-2 w-4 h-4" />
						Tüm Filtreleri Temizle
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
