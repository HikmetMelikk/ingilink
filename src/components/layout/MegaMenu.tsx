"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigationData } from "@/lib/navigation-data";
import type { MegaMenuState, NavigationItem } from "@/types/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface MegaMenuProps {
	isLoggedIn?: boolean;
}

export function MegaMenu({ isLoggedIn = false }: MegaMenuProps) {
	const [menuState, setMenuState] = useState<MegaMenuState>({
		isOpen: false,
		activeItem: null,
		hoveredItem: null,
	});
	const [searchQuery, setSearchQuery] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	// Check if mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Close menu on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuState((prev) => ({ ...prev, isOpen: false, activeItem: null }));
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMenuState((prev) => ({ ...prev, isOpen: false, activeItem: null }));
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const handleMouseEnter = useCallback((itemId: string) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setMenuState((prev) => ({
			...prev,
			isOpen: true,
			activeItem: itemId,
			hoveredItem: itemId,
		}));
	}, []);

	const handleMouseLeave = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			setMenuState((prev) => ({
				...prev,
				isOpen: false,
				activeItem: null,
				hoveredItem: null,
			}));
		}, 300); // Increased from 150ms to 300ms
	}, []);

	const handleClick = useCallback((itemId: string) => {
		setMenuState((prev) => ({
			...prev,
			isOpen: !prev.isOpen || prev.activeItem !== itemId,
			activeItem: prev.activeItem === itemId ? null : itemId,
		}));
	}, []);

	const closeMenu = useCallback(() => {
		setMenuState((prev) => ({ ...prev, isOpen: false, activeItem: null }));
	}, []);

	const renderMegaMenuContent = (item: NavigationItem) => {
		if (!item.children) return null;

		return (
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 10 }}
				transition={{ duration: 0.2 }}
				className="right-0 left-0 z-[60] fixed bg-white shadow-2xl border-t-2 border-blue-600 rounded-b-lg"
				style={{
					top: "72px", // Header height
					minHeight: "400px",
					width: "100vw",
				}}
			>
				<div className="mx-auto container">
					<div className="py-8">
						<div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							{item.children.map((subItem, index) => {
								const SubIcon = subItem.icon;
								return (
									<motion.div
										key={subItem.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.05, duration: 0.3 }}
										className="group"
									>
										<div className="mb-4">
											<Link
												href={subItem.href || "#"}
												className="flex items-center gap-3 mb-2 font-semibold text-gray-900 hover:text-blue-600 text-lg transition-colors"
												onClick={closeMenu}
											>
												{SubIcon && (
													<SubIcon className="w-5 h-5 text-blue-600" />
												)}
												{subItem.label}
											</Link>
											{subItem.description && (
												<p className="text-gray-600 text-sm">
													{subItem.description}
												</p>
											)}
										</div>

										{subItem.children && (
											<ul className="space-y-2">
												{subItem.children.map((subSubItem) => {
													const SubSubIcon = subSubItem.icon;
													return (
														<li key={subSubItem.id}>
															<Link
																href={subSubItem.href || "#"}
																className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-md text-gray-700 hover:text-blue-700 text-sm transition-colors"
																onClick={closeMenu}
															>
																{SubSubIcon && (
																	<SubSubIcon className="w-4 h-4" />
																)}
																<div>
																	<div className="font-medium">
																		{subSubItem.label}
																	</div>
																	{subSubItem.description && (
																		<div className="text-gray-500 text-xs">
																			{subSubItem.description}
																		</div>
																	)}
																</div>
															</Link>
														</li>
													);
												})}
											</ul>
										)}
									</motion.div>
								);
							})}
						</div>

						{/* Featured Section */}
						<div className="mt-8 pt-6 border-gray-200 border-t">
							<div className="gap-6 grid grid-cols-1 md:grid-cols-2">
								<div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
									<h4 className="mb-2 font-semibold text-blue-900">
										Popüler Kaynaklar
									</h4>
									<p className="mb-3 text-blue-700 text-sm">
										En çok beğenilen {item.label.toLowerCase()} kaynaklarını
										keşfedin
									</p>
									<Link
										href={`/resources?category=${item.id}&sort=popular`}
										className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 text-sm transition-colors"
										onClick={closeMenu}
									>
										Popüler Kaynakları Gör →
									</Link>
								</div>
								<div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
									<h4 className="mb-2 font-semibold text-green-900">
										Yeni Eklenenler
									</h4>
									<p className="mb-3 text-green-700 text-sm">
										Son eklenen {item.label.toLowerCase()} materyallerini
										inceleyin
									</p>
									<Link
										href={`/resources?category=${item.id}&sort=newest`}
										className="inline-flex items-center font-medium text-green-600 hover:text-green-800 text-sm transition-colors"
										onClick={closeMenu}
									>
										Yeni Kaynakları Gör →
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		);
	};

	const renderMobileMenu = () => (
		<AnimatePresence>
			{menuState.isOpen && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}
					className="md:hidden bg-white shadow-lg border-t overflow-hidden"
				>
					<div className="px-4 py-6">
						{/* Mobile Search */}
						<div className="relative mb-6">
							<Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
							<Input
								placeholder="Kaynak ara..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 w-full"
							/>
						</div>

						{/* Mobile Navigation */}
						<nav className="space-y-4">
							{navigationData.map((item) => (
								<div key={item.id}>
									{item.children ? (
										<div>
											<button
												type="button"
												onClick={() => handleClick(item.id)}
												className="flex justify-between items-center py-2 w-full font-medium text-gray-900 text-left"
												aria-expanded={menuState.activeItem === item.id}
											>
												{item.label}
												<ChevronDown
													className={`w-4 h-4 transition-transform ${
														menuState.activeItem === item.id ? "rotate-180" : ""
													}`}
												/>
											</button>
											<AnimatePresence>
												{menuState.activeItem === item.id && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: "auto" }}
														exit={{ opacity: 0, height: 0 }}
														transition={{ duration: 0.2 }}
														className="space-y-2 mt-2 ml-4 overflow-hidden"
													>
														{item.children.map((subItem) => (
															<Link
																key={subItem.id}
																href={subItem.href || "#"}
																className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
																onClick={closeMenu}
															>
																{subItem.label}
															</Link>
														))}
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									) : (
										<Link
											href={item.href || "#"}
											className="block py-2 font-medium text-gray-900 hover:text-blue-600 transition-colors"
											onClick={closeMenu}
										>
											{item.label}
										</Link>
									)}
								</div>
							))}
						</nav>

						{/* Mobile Auth Buttons */}
						<div className="mt-6 pt-6 border-t">
							{isLoggedIn ? (
								<div className="space-y-2">
									<Button
										asChild
										className="bg-blue-600 hover:bg-blue-700 w-full"
									>
										<Link href="/upload" onClick={closeMenu}>
											Kaynak Yükle
										</Link>
									</Button>
									<Button asChild variant="outline" className="w-full">
										<Link href="/dashboard" onClick={closeMenu}>
											Profilim
										</Link>
									</Button>
								</div>
							) : (
								<div className="space-y-2">
									<Button asChild variant="outline" className="w-full">
										<Link href="/login" onClick={closeMenu}>
											Giriş Yap
										</Link>
									</Button>
									<Button
										asChild
										className="bg-blue-600 hover:bg-blue-700 w-full"
									>
										<Link href="/register" onClick={closeMenu}>
											Kayıt Ol
										</Link>
									</Button>
								</div>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return (
		<div
			ref={menuRef}
			className="static md:static relative w-full"
			onMouseLeave={handleMouseLeave}
		>
			{/* Desktop Navigation */}
			<nav className="hidden md:flex justify-center items-center space-x-8">
				{navigationData.map((item) => {
					const isActive = menuState.activeItem === item.id;
					const Icon = item.icon;

					return (
						<div
							key={item.id}
							className="relative"
							onMouseEnter={() => item.children && handleMouseEnter(item.id)}
						>
							{item.children ? (
								<button
									type="button"
									onClick={() => handleClick(item.id)}
									className={`flex items-center gap-1 px-3 py-2 font-medium transition-colors rounded-md ${
										isActive
											? "text-blue-600 bg-blue-50"
											: "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
									}`}
									aria-expanded={isActive}
									aria-haspopup="true"
								>
									{Icon && <Icon className="w-4 h-4" />}
									{item.label}
									<ChevronDown
										className={`w-4 h-4 transition-transform ${
											isActive ? "rotate-180" : ""
										}`}
									/>
								</button>
							) : (
								<Link
									href={item.href || "#"}
									className="flex items-center gap-1 hover:bg-blue-50 px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 transition-colors"
								>
									{Icon && <Icon className="w-4 h-4" />}
									{item.label}
								</Link>
							)}

							{/* Mega Menu Content */}
							{item.children && (
								<AnimatePresence>
									{isActive && renderMegaMenuContent(item)}
								</AnimatePresence>
							)}
						</div>
					);
				})}
			</nav>

			{/* Mobile Menu Button */}
			<button
				type="button"
				onClick={() =>
					setMenuState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
				}
				className="md:hidden flex justify-center items-center hover:bg-blue-50 p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
				aria-label="Toggle menu"
				aria-expanded={menuState.isOpen}
			>
				{menuState.isOpen ? (
					<X className="w-5 h-5" />
				) : (
					<div className="space-y-1">
						<div className="bg-current rounded-full w-5 h-0.5" />
						<div className="bg-current rounded-full w-5 h-0.5" />
						<div className="bg-current rounded-full w-5 h-0.5" />
					</div>
				)}
			</button>

			{/* Mobile Menu */}
			{renderMobileMenu()}
		</div>
	);
}
