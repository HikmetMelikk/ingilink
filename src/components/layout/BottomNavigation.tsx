"use client";

import { motion } from "framer-motion";
import { BookOpen, Home, Search, User, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileResourcesMenu } from "./MobileResourcesMenu";

interface BottomNavItem {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	href?: string;
	action?: () => void;
}

export function BottomNavigation() {
	const pathname = usePathname();
	const [showResourcesMenu, setShowResourcesMenu] = useState(false);

	const navItems: BottomNavItem[] = [
		{
			id: "home",
			label: "Ana Sayfa",
			icon: Home,
			href: "/",
		},
		{
			id: "resources",
			label: "Kaynaklar",
			icon: BookOpen,
			action: () => setShowResourcesMenu(true),
		},
		{
			id: "search",
			label: "Ara",
			icon: Search,
			href: "/search",
		},
		{
			id: "profile",
			label: "Profil",
			icon: User,
			href: "/profile",
		},
		{
			id: "menu",
			label: "Menü",
			icon: Menu,
			href: "/menu",
		},
	];

	const isActive = (item: BottomNavItem) => {
		if (item.href) {
			return pathname === item.href;
		}
		return false;
	};

	const handleItemPress = (item: BottomNavItem) => {
		if (item.action) {
			item.action();
		}
	};

	return (
		<>
			{/* Bottom Navigation Bar */}
			<motion.div
				className="md:hidden bottom-0 left-0 right-0 z-50 fixed bg-white shadow-lg border-t"
				initial={{ y: 100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			>
				<div className="flex justify-around items-center px-2 py-2">
					{navItems.map((item) => {
						const IconComponent = item.icon;
						const active = isActive(item);

						return (
							<motion.div
								key={item.id}
								className="flex flex-col justify-center items-center min-w-[44px] min-h-[44px] p-2"
								whileTap={{ scale: 0.95 }}
								whileHover={{ scale: 1.05 }}
							>
								{item.href ? (
									<Link
										href={item.href}
										className="flex flex-col justify-center items-center w-full h-full"
									>
										<motion.div
											className={`p-2 rounded-full transition-colors ${
												active
													? "bg-blue-100 text-blue-600"
													: "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
											}`}
											animate={{
												scale: active ? 1.1 : 1,
											}}
											transition={{ duration: 0.2 }}
										>
											<IconComponent className="w-5 h-5" />
										</motion.div>
										<span
											className={`text-xs mt-1 transition-colors ${
												active ? "text-blue-600 font-medium" : "text-gray-600"
											}`}
										>
											{item.label}
										</span>
									</Link>
								) : (
									<button
										type="button"
										onClick={() => handleItemPress(item)}
										className="flex flex-col justify-center items-center w-full h-full"
									>
										<motion.div
											className={`p-2 rounded-full transition-colors ${
												active
													? "bg-blue-100 text-blue-600"
													: "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
											}`}
											animate={{
												scale: active ? 1.1 : 1,
											}}
											transition={{ duration: 0.2 }}
										>
											<IconComponent className="w-5 h-5" />
										</motion.div>
										<span
											className={`text-xs mt-1 transition-colors ${
												active ? "text-blue-600 font-medium" : "text-gray-600"
											}`}
										>
											{item.label}
										</span>
									</button>
								)}
							</motion.div>
						);
					})}
				</div>

				{/* Active Indicator */}
				<motion.div
					className="bg-blue-600 mx-auto rounded-full w-8 h-1"
					layoutId="activeIndicator"
					initial={false}
				/>
			</motion.div>

			{/* Mobile Resources Menu */}
			<MobileResourcesMenu
				isOpen={showResourcesMenu}
				onClose={() => setShowResourcesMenu(false)}
			/>

			{/* Bottom padding to prevent content overlap */}
			<div className="md:hidden h-20" />
		</>
	);
}