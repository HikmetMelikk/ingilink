"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigationData } from "@/lib/navigation-data";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowLeft,
	ChevronRight,
	Search,
	Star,
	TrendingUp,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileResourcesMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

interface MenuState {
	currentLevel: "main" | "category" | "subcategory";
	selectedCategory: string | null;
	selectedSubcategory: string | null;
	breadcrumb: Array<{ label: string; level: string; id?: string }>;
}

export function MobileResourcesMenu({
	isOpen,
	onClose,
}: MobileResourcesMenuProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [menuState, setMenuState] = useState<MenuState>({
		currentLevel: "main",
		selectedCategory: null,
		selectedSubcategory: null,
		breadcrumb: [{ label: "Kaynaklar", level: "main" }],
	});

	const resourcesData = navigationData.find((item) => item.id === "resources");

	const handleCategorySelect = (categoryId: string, categoryLabel: string) => {
		setMenuState({
			currentLevel: "category",
			selectedCategory: categoryId,
			selectedSubcategory: null,
			breadcrumb: [
				{ label: "Kaynaklar", level: "main" },
				{ label: categoryLabel, level: "category", id: categoryId },
			],
		});
	};

	const handleSubcategorySelect = (
		subcategoryId: string,
		subcategoryLabel: string,
	) => {
		setMenuState((prev) => ({
			...prev,
			currentLevel: "subcategory",
			selectedSubcategory: subcategoryId,
			breadcrumb: [
				...prev.breadcrumb,
				{ label: subcategoryLabel, level: "subcategory", id: subcategoryId },
			],
		}));
	};

	const handleBack = () => {
		if (menuState.currentLevel === "subcategory") {
			setMenuState((prev) => ({
				...prev,
				currentLevel: "category",
				selectedSubcategory: null,
				breadcrumb: prev.breadcrumb.slice(0, -1),
			}));
		} else if (menuState.currentLevel === "category") {
			setMenuState({
				currentLevel: "main",
				selectedCategory: null,
				selectedSubcategory: null,
				breadcrumb: [{ label: "Kaynaklar", level: "main" }],
			});
		}
	};

	const handleClose = () => {
		setMenuState({
			currentLevel: "main",
			selectedCategory: null,
			selectedSubcategory: null,
			breadcrumb: [{ label: "Kaynaklar", level: "main" }],
		});
		setSearchQuery("");
		onClose();
	};

	const renderMainMenu = () => (
		<motion.div
			key="main"
			initial={{ x: -20, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -20, opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="space-y-4"
		>
			{/* Quick Actions */}
			<div className="gap-3 grid grid-cols-2">
				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white"
				>
					<Link href="/resources?sort=popular" onClick={handleClose}>
						<TrendingUp className="mb-2 w-6 h-6" />
						<h3 className="mb-1 font-semibold">Popüler</h3>
						<p className="text-blue-100 text-sm">En çok beğenilen kaynaklar</p>
					</Link>
				</motion.div>
				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white"
				>
					<Link href="/resources?sort=rating" onClick={handleClose}>
						<Star className="mb-2 w-6 h-6" />
						<h3 className="mb-1 font-semibold">En İyi</h3>
						<p className="text-green-100 text-sm">Yüksek puanlı içerikler</p>
					</Link>
				</motion.div>
			</div>

			{/* Categories */}
			<div className="space-y-2">
				<h3 className="mb-3 font-semibold text-gray-900 text-lg">
					Kategoriler
				</h3>
				{resourcesData?.children?.map((category, index) => {
					const IconComponent = category.icon;
					return (
						<motion.button
							key={category.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05, duration: 0.3 }}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() =>
								handleCategorySelect(category.id, category.label)
							}
							className="flex justify-between items-center hover:bg-gray-50 p-4 rounded-xl w-full text-left transition-colors"
						>
							<div className="flex items-center space-x-3">
								{IconComponent && (
									<div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
										<IconComponent className="w-5 h-5 text-blue-600" />
									</div>
								)}
								<div>
									<h4 className="font-medium text-gray-900">
										{category.label}
									</h4>
									{category.description && (
										<p className="text-gray-500 text-sm">
											{category.description}
										</p>
									)}
								</div>
							</div>
							<ChevronRight className="w-5 h-5 text-gray-400" />
						</motion.button>
					);
				})}
			</div>
		</motion.div>
	);

	const renderCategoryMenu = () => {
		const selectedCategoryData = resourcesData?.children?.find(
			(cat) => cat.id === menuState.selectedCategory,
		);

		if (!selectedCategoryData) return null;

		return (
			<motion.div
				key="category"
				initial={{ x: 20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 20, opacity: 0 }}
				transition={{ duration: 0.3 }}
				className="space-y-4"
			>
				{/* Category Header */}
				<div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
					<h3 className="mb-2 font-semibold text-blue-900 text-lg">
						{selectedCategoryData.label}
					</h3>
					{selectedCategoryData.description && (
						<p className="text-blue-700 text-sm">
							{selectedCategoryData.description}
						</p>
					)}
				</div>

				{/* Quick Access */}
				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<Link
						href={selectedCategoryData.href || "#"}
						onClick={handleClose}
						className="flex justify-between items-center bg-white hover:bg-gray-50 shadow-sm p-4 border rounded-xl w-full transition-colors"
					>
						<div>
							<h4 className="font-medium text-gray-900">
								Tüm {selectedCategoryData.label} Kaynaklarını Gör
							</h4>
							<p className="text-gray-500 text-sm">
								Kategorideki tüm içerikleri keşfet
							</p>
						</div>
						<ChevronRight className="w-5 h-5 text-gray-400" />
					</Link>
				</motion.div>

				{/* Subcategories */}
				{selectedCategoryData.children && (
					<div className="space-y-2">
						<h4 className="mb-3 font-medium text-gray-900">Alt Kategoriler</h4>
						{selectedCategoryData.children.map((subcategory, index) => {
							const IconComponent = subcategory.icon;
							return (
								<motion.button
									key={subcategory.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05, duration: 0.3 }}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() =>
										subcategory.children
											? handleSubcategorySelect(
													subcategory.id,
													subcategory.label,
												)
											: (() => {
													handleClose();
													window.location.href = subcategory.href || "#";
												})()
									}
									className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-lg w-full text-left transition-colors"
								>
									<div className="flex items-center space-x-3">
										{IconComponent && (
											<IconComponent className="w-5 h-5 text-gray-600" />
										)}
										<div>
											<h5 className="font-medium text-gray-900">
												{subcategory.label}
											</h5>
											{subcategory.description && (
												<p className="text-gray-500 text-sm">
													{subcategory.description}
												</p>
											)}
										</div>
									</div>
									{subcategory.children && (
										<ChevronRight className="w-4 h-4 text-gray-400" />
									)}
								</motion.button>
							);
						})}
					</div>
				)}
			</motion.div>
		);
	};

	const renderSubcategoryMenu = () => {
		const selectedCategoryData = resourcesData?.children?.find(
			(cat) => cat.id === menuState.selectedCategory,
		);
		const selectedSubcategoryData = selectedCategoryData?.children?.find(
			(sub) => sub.id === menuState.selectedSubcategory,
		);

		if (!selectedSubcategoryData) return null;

		return (
			<motion.div
				key="subcategory"
				initial={{ x: 20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 20, opacity: 0 }}
				transition={{ duration: 0.3 }}
				className="space-y-4"
			>
				{/* Subcategory Header */}
				<div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
					<h3 className="mb-2 font-semibold text-green-900 text-lg">
						{selectedSubcategoryData.label}
					</h3>
					{selectedSubcategoryData.description && (
						<p className="text-green-700 text-sm">
							{selectedSubcategoryData.description}
						</p>
					)}
				</div>

				{/* Quick Access */}
				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<Link
						href={selectedSubcategoryData.href || "#"}
						onClick={handleClose}
						className="flex justify-between items-center bg-white hover:bg-gray-50 shadow-sm p-4 border rounded-xl w-full transition-colors"
					>
						<div>
							<h4 className="font-medium text-gray-900">
								Tüm {selectedSubcategoryData.label} Kaynaklarını Gör
							</h4>
							<p className="text-gray-500 text-sm">
								Bu kategorideki tüm içerikleri keşfet
							</p>
						</div>
						<ChevronRight className="w-5 h-5 text-gray-400" />
					</Link>
				</motion.div>

				{/* Sub-subcategories */}
				{selectedSubcategoryData.children && (
					<div className="space-y-2">
						<h4 className="mb-3 font-medium text-gray-900">İçerikler</h4>
						{selectedSubcategoryData.children.map((item, index) => {
							const IconComponent = item.icon;
							return (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05, duration: 0.3 }}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Link
										href={item.href || "#"}
										onClick={handleClose}
										className="flex items-center hover:bg-gray-50 p-3 rounded-lg space-x-3 transition-colors"
									>
										{IconComponent && (
											<IconComponent className="w-5 h-5 text-gray-600" />
										)}
										<div>
											<h5 className="font-medium text-gray-900">
												{item.label}
											</h5>
											{item.description && (
												<p className="text-gray-500 text-sm">
													{item.description}
												</p>
											)}
										</div>
									</Link>
								</motion.div>
							);
						})}
					</div>
				)}
			</motion.div>
		);
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
						onClick={handleClose}
					/>

					{/* Menu Panel */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="md:hidden top-0 right-0 z-50 fixed bg-white shadow-xl w-full max-w-sm h-full overflow-hidden"
					>
						{/* Header */}
						<div className="flex justify-between items-center bg-white shadow-sm px-4 py-4 border-b">
							<div className="flex items-center space-x-3">
								{menuState.currentLevel !== "main" && (
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={handleBack}
										className="flex justify-center items-center hover:bg-gray-100 rounded-full w-8 h-8 transition-colors"
									>
										<ArrowLeft className="w-5 h-5 text-gray-600" />
									</motion.button>
								)}
								<div>
									<h2 className="font-semibold text-gray-900 text-lg">
										{menuState.breadcrumb[menuState.breadcrumb.length - 1]?.label}
									</h2>
									{menuState.breadcrumb.length > 1 && (
										<p className="text-gray-500 text-sm">
											{menuState.breadcrumb
												.slice(0, -1)
												.map((item) => item.label)
												.join(" > ")}
										</p>
									)}
								</div>
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleClose}
								className="flex justify-center items-center hover:bg-gray-100 rounded-full w-8 h-8 transition-colors"
							>
								<X className="w-5 h-5 text-gray-600" />
							</motion.button>
						</div>

						{/* Search Bar */}
						<div className="px-4 py-4 border-b">
							<div className="relative">
								<Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
								<Input
									placeholder="Kaynak ara..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 w-full"
								/>
							</div>
						</div>

						{/* Content */}
						<div className="flex-1 px-4 py-4 overflow-y-auto">
							<AnimatePresence mode="wait">
								{menuState.currentLevel === "main" && renderMainMenu()}
								{menuState.currentLevel === "category" && renderCategoryMenu()}
								{menuState.currentLevel === "subcategory" &&
									renderSubcategoryMenu()}
							</AnimatePresence>
						</div>

						{/* Footer */}
						<div className="bg-gray-50 px-4 py-4 border-t">
							<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
								<Button
									asChild
									className="bg-blue-600 hover:bg-blue-700 w-full"
								>
									<Link href="/resources" onClick={handleClose}>
										Tüm Kaynakları Görüntüle
									</Link>
								</Button>
							</motion.div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}