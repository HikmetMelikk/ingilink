"use client";

import { MegaMenu } from "@/components/layout/MegaMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Upload, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<motion.header
			className="top-0 z-50 sticky bg-white/95 backdrop-blur-sm border-b"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<div className="mx-auto px-4 py-4 container">
				<div className="relative flex justify-between items-center">
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<Link
							href="/"
							className="font-bold text-blue-600 hover:text-blue-700 text-2xl transition-colors"
						>
							ingilink
						</Link>
					</motion.div>

					{/* Desktop Navigation - Centered */}
					<motion.div
						className="hidden left-1/2 absolute md:block -translate-x-1/2 transform"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<MegaMenu isLoggedIn={isLoggedIn} />
					</motion.div>

					{/* Right Side - Search & Auth */}
					<motion.div
						className="flex items-center space-x-4"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						{/* Search Bar - Desktop */}
						<div className="hidden lg:flex items-center">
							<div className="relative">
								<Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
								<Input
									placeholder="Kaynak ara..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 w-64 focus:w-80 transition-all duration-300"
								/>
							</div>
						</div>

						{/* Auth Buttons - Desktop */}
						<div className="hidden md:flex items-center space-x-2">
							{isLoggedIn ? (
								<>
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button asChild className="bg-blue-600 hover:bg-blue-700">
											<Link href="/upload">
												<Upload className="mr-2 w-4 h-4" />
												Yükle
											</Link>
										</Button>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button variant="ghost" asChild>
											<Link href="/dashboard">
												<User className="w-4 h-4" />
											</Link>
										</Button>
									</motion.div>
								</>
							) : (
								<>
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button variant="ghost" asChild>
											<Link href="/login">Giriş</Link>
										</Button>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button asChild className="bg-blue-600 hover:bg-blue-700">
											<Link href="/register">Kayıt Ol</Link>
										</Button>
									</motion.div>
								</>
							)}
						</div>

						{/* Mobile Menu */}
						<div className="md:hidden">
							<MegaMenu isLoggedIn={isLoggedIn} />
						</div>
					</motion.div>
				</div>
			</div>
		</motion.header>
	);
}