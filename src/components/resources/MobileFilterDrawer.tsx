"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResourceFilters } from "@/types/resource";
import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDown,
	ChevronUp,
	Filter,
	Star,
	X,
} from "lucide-react";
import { useState } from "react";

interface MobileFilterDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	filters: ResourceFilters;
	onFilterChange: (key: keyof ResourceFilters, value: string | number | string[]) => void;
	onApplyFilters: () => void;
	onClearFilters: () => void;
	hasActiveFilters: boolean;
	resultCount: number;
}

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

interface AccordionSectionProps {
	title: string;
	isOpen: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}

function AccordionSection({ title, isOpen, onToggle, children }: AccordionSectionProps) {
	return (
		<div className="border-b border-gray-200">
			<motion.button
				onClick={onToggle}
				className="flex justify-between items-center py-4 w-full text-left"
				whileTap={{ scale: 0.98 }}
			>
				<span className="font-medium text-gray-900">{title}</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<ChevronDown className="w-5 h-5 text-gray-500" />
				</motion.div>
			</motion.button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="pb-4 overflow-hidden"
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export function MobileFilterDrawer({
	isOpen,
	onClose,
	filters,
	onFilterChange,
	onApplyFilters,
	onClearFilters,
	hasActiveFilters,
	resultCount,
}: MobileFilterDrawerProps) {
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({
		categories: true,
		difficulty: false,
		contentType: false,
		rating: false,
		author: false,
		date: false,
	});

	const toggleSection = (section: string) => {
		setOpenSections(prev => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const handleMultiSelectToggle = (
		key: "categories" | "difficulties" | "contentTypes",
		value: string,
	) => {
		const currentValues = filters[key] as string[];
		const newValues = currentValues.includes(value)
			? currentValues.filter((v) => v !== value)
			: [...currentValues, value];
		onFilterChange(key, newValues);
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < rating
						? "fill-yellow-400 text-yellow-400"
						: "text-gray-300"
				}`}
			/>
		));
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden top-0 left-0 z-40 fixed bg-black/50 w-full h-full"
						onClick={onClose}
					/>

					{/* Drawer */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="md:hidden top-0 right-0 z-50 fixed bg-white shadow-xl w-4/5 max-w-sm h-full overflow-hidden"
					>
						{/* Header */}
						<div className="flex justify-between items-center bg-white shadow-sm px-4 py-4 border-b">
							<div className="flex items-center space-x-2">
								<Filter className="w-5 h-5 text-blue-600" />
								<h2 className="font-semibold text-gray-900 text-lg">Filtreler</h2>
								{hasActiveFilters && (
									<span className="bg-blue-100 px-2 py-1 rounded-full text-blue-800 text-xs">
										Aktif
									</span>
								)}
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={onClose}
								className="flex justify-center items-center hover:bg-gray-100 rounded-full w-8 h-8 transition-colors"
							>
								<X className="w-5 h-5 text-gray-600" />
							</motion.button>
						</div>

						{/* Content */}
						<div className="flex flex-col h-full">
							{/* Scrollable Filter Content */}
							<div className="flex-1 px-4 py-4 overflow-y-auto">
								{/* Categories */}
								<AccordionSection
									title="Kategoriler"
									isOpen={openSections.categories}
									onToggle={() => toggleSection("categories")}
								>
									<div className="gap-2 grid grid-cols-1">
										{categories.map((category) => (
											<motion.label
												key={category}
												className="flex items-center min-h-[44px] cursor-pointer"
												whileTap={{ scale: 0.98 }}
											>
												<input
													type="checkbox"
													checked={filters.categories.includes(category)}
													onChange={() =>
														handleMultiSelectToggle("categories", category)
													}
													className="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												/>
												<span className="text-gray-700">{category}</span>
											</motion.label>
										))}
									</div>
								</AccordionSection>

								{/* Difficulty */}
								<AccordionSection
									title="Zorluk Seviyesi"
									isOpen={openSections.difficulty}
									onToggle={() => toggleSection("difficulty")}
								>
									<div className="gap-2 grid grid-cols-1">
										{difficulties.map((difficulty) => (
											<motion.label
												key={difficulty}
												className="flex items-center min-h-[44px] cursor-pointer"
												whileTap={{ scale: 0.98 }}
											>
												<input
													type="checkbox"
													checked={filters.difficulties.includes(difficulty)}
													onChange={() =>
														handleMultiSelectToggle("difficulties", difficulty)
													}
													className="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												/>
												<span className="text-gray-700">{difficulty}</span>
											</motion.label>
										))}
									</div>
								</AccordionSection>

								{/* Content Type */}
								<AccordionSection
									title="İçerik Türü"
									isOpen={openSections.contentType}
									onToggle={() => toggleSection("contentType")}
								>
									<div className="gap-2 grid grid-cols-1">
										{contentTypes.map((type) => (
											<motion.label
												key={type}
												className="flex items-center min-h-[44px] cursor-pointer"
												whileTap={{ scale: 0.98 }}
											>
												<input
													type="checkbox"
													checked={filters.contentTypes.includes(type)}
													onChange={() =>
														handleMultiSelectToggle("contentTypes", type)
													}
													className="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												/>
												<span className="text-gray-700">{type}</span>
											</motion.label>
										))}
									</div>
								</AccordionSection>

								{/* Rating */}
								<AccordionSection
									title="Minimum Puan"
									isOpen={openSections.rating}
									onToggle={() => toggleSection("rating")}
								>
									<div className="space-y-3">
										{[0, 1, 2, 3, 4, 5].map((rating) => (
											<motion.label
												key={rating}
												className="flex items-center min-h-[44px] cursor-pointer"
												whileTap={{ scale: 0.98 }}
											>
												<input
													type="radio"
													name="rating"
													checked={filters.minRating === rating}
													onChange={() => onFilterChange("minRating", rating)}
													className="mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
												/>
												<div className="flex items-center space-x-2">
													{rating === 0 ? (
														<span className="text-gray-700">Tümü</span>
													) : (
														<>
															<div className="flex">
																{renderStars(rating)}
															</div>
															<span className="text-gray-700">ve üzeri</span>
														</>
													)}
												</div>
											</motion.label>
										))}
									</div>
								</AccordionSection>

								{/* Author */}
								<AccordionSection
									title="Yazar"
									isOpen={openSections.author}
									onToggle={() => toggleSection("author")}
								>
									<Input
										placeholder="Yazar adı ara..."
										value={filters.author}
										onChange={(e) => onFilterChange("author", e.target.value)}
										className="w-full"
									/>
								</AccordionSection>

								{/* Date Range */}
								<AccordionSection
									title="Yayın Tarihi"
									isOpen={openSections.date}
									onToggle={() => toggleSection("date")}
								>
									<div className="space-y-3">
										<div>
											<Label className="block mb-2 text-sm">Başlangıç Tarihi</Label>
											<Input
												type="date"
												value={filters.dateFrom}
												onChange={(e) => onFilterChange("dateFrom", e.target.value)}
												className="w-full"
											/>
										</div>
										<div>
											<Label className="block mb-2 text-sm">Bitiş Tarihi</Label>
											<Input
												type="date"
												value={filters.dateTo}
												onChange={(e) => onFilterChange("dateTo", e.target.value)}
												className="w-full"
											/>
										</div>
									</div>
								</AccordionSection>
							</div>

							{/* Footer Actions */}
							<div className="bg-gray-50 px-4 py-4 border-t">
								{/* Result Count */}
								<div className="mb-4 text-center">
									<span className="text-gray-600 text-sm">
										{resultCount} kaynak bulundu
									</span>
								</div>

								{/* Action Buttons */}
								<div className="space-y-3">
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button
											onClick={() => {
												onApplyFilters();
												onClose();
											}}
											className="bg-blue-600 hover:bg-blue-700 w-full h-12 text-base"
										>
											Filtreleri Uygula
										</Button>
									</motion.div>

									{hasActiveFilters && (
										<motion.div
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Button
												onClick={onClearFilters}
												variant="outline"
												className="w-full h-12 text-base"
											>
												Filtreleri Temizle
											</Button>
										</motion.div>
									)}
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}