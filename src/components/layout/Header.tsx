"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Upload, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context

	return (
		<header className="top-0 z-50 sticky bg-white/95 backdrop-blur-sm border-b">
			<div className="mx-auto px-4 py-4 container">
				<div className="relative flex justify-between items-center">
					{/* Logo */}
					<Link
						href="/"
						className="font-bold text-blue-600 hover:text-blue-700 text-2xl transition-colors"
					>
						ingilink
					</Link>

					{/* Desktop Navigation - Centered */}
					<nav className="hidden left-1/2 absolute md:flex items-center space-x-8 -translate-x-1/2 transform">
						<Link
							href="/resources"
							className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
						>
							Kaynaklar
						</Link>
						<Link
							href="/discover"
							className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
						>
							Keşfet
						</Link>
						<Link
							href="/about"
							className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
						>
							Hakkımızda
						</Link>
						<Link
							href="/community"
							className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
						>
							Topluluk
						</Link>
					</nav>

					{/* Search Bar - Desktop */}
					<div className="hidden lg:flex items-center space-x-4">
						<div className="relative">
							<Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
							<Input
								placeholder="Kaynak ara..."
								className="pl-10 w-64 focus:w-80 transition-all duration-300"
							/>
						</div>

						{isLoggedIn ? (
							<div className="flex items-center space-x-2">
								<Button asChild className="bg-blue-600 hover:bg-blue-700">
									<Link href="/upload">
										<Upload className="mr-2 w-4 h-4" />
										Yükle
									</Link>
								</Button>
								<Button variant="ghost" asChild>
									<Link href="/dashboard">
										<User className="w-4 h-4" />
									</Link>
								</Button>
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<Button variant="ghost" asChild>
									<Link href="/login">Giriş</Link>
								</Button>
								<Button asChild className="bg-blue-600 hover:bg-blue-700">
									<Link href="/register">Kayıt Ol</Link>
								</Button>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</Button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden mt-4 pt-4 pb-4 border-t">
						<div className="flex flex-col space-y-4">
							{/* Mobile Search */}
							<div className="relative">
								<Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
								<Input placeholder="Kaynak ara..." className="pl-10 w-full" />
							</div>

							{/* Mobile Navigation */}
							<nav className="flex flex-col space-y-2">
								<Link
									href="/resources"
									className="py-2 font-medium text-gray-600 hover:text-gray-900"
								>
									Kaynaklar
								</Link>
								<Link
									href="/discover"
									className="py-2 font-medium text-gray-600 hover:text-gray-900"
								>
									Keşfet
								</Link>
								<Link
									href="/about"
									className="py-2 font-medium text-gray-600 hover:text-gray-900"
								>
									Hakkımızda
								</Link>
								<Link
									href="/community"
									className="py-2 font-medium text-gray-600 hover:text-gray-900"
								>
									Topluluk
								</Link>
							</nav>

							{/* Mobile Auth Buttons */}
							{isLoggedIn ? (
								<div className="flex flex-col space-y-2 pt-2">
									<Button
										asChild
										className="bg-blue-600 hover:bg-blue-700 w-full"
									>
										<Link href="/upload">
											<Upload className="mr-2 w-4 h-4" />
											Kaynak Yükle
										</Link>
									</Button>
									<Button variant="outline" asChild className="w-full">
										<Link href="/dashboard">
											<User className="mr-2 w-4 h-4" />
											Profilim
										</Link>
									</Button>
								</div>
							) : (
								<div className="flex flex-col space-y-2 pt-2">
									<Button variant="outline" asChild className="w-full">
										<Link href="/login">Giriş Yap</Link>
									</Button>
									<Button
										asChild
										className="bg-blue-600 hover:bg-blue-700 w-full"
									>
										<Link href="/register">Kayıt Ol</Link>
									</Button>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
