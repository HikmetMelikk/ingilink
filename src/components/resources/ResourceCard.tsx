import Link from "next/link";
import { Star, Eye, Download, Heart, User, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Resource {
	id: number;
	title: string;
	description: string;
	author: string;
	category: string;
	difficulty: string;
	contentType: string;
	rating: number;
	ratingCount: number;
	views: number;
	downloads: number;
	publishDate: string;
	thumbnail: string;
	tags: string[];
	isFavorite: boolean;
}

interface ResourceCardProps {
	resource: Resource;
	viewMode?: "grid" | "list";
	onToggleFavorite?: (id: number) => void;
}

export function ResourceCard({ 
	resource, 
	viewMode = "grid", 
	onToggleFavorite 
}: ResourceCardProps) {
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
		<Card
			className={`group shadow-md hover:shadow-xl border-0 transition-all duration-300 ${
				viewMode === "list" ? "flex" : ""
			}`}
		>
			<div className={`relative overflow-hidden ${
				viewMode === "list" ? "w-48 flex-shrink-0" : ""
			}`}>
				<Link href={`/resources/${resource.id}`}>
					<img
						src={resource.thumbnail}
						alt={resource.title}
						className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
							viewMode === "list" ? "w-full h-full" : "w-full h-48"
						}`}
					/>
				</Link>
				<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
				<Button
					variant="ghost"
					size="icon"
					onClick={() => onToggleFavorite?.(resource.id)}
					className="top-2 right-2 absolute bg-white/80 hover:bg-white"
				>
					<Heart
						className={`w-4 h-4 ${
							resource.isFavorite
								? "fill-red-500 text-red-500"
								: "text-gray-600"
						}`}
					/>
				</Button>
				<div className="bottom-2 left-2 absolute">
					<span className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
						{resource.contentType}
					</span>
				</div>
			</div>

			<CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
				<div className="flex justify-between items-start mb-3">
					<div className="flex-1">
						<Link href={`/resources/${resource.id}`}>
							<h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
								{resource.title}
							</h3>
						</Link>
						<p className="text-gray-600 text-sm line-clamp-2 mb-3">
							{resource.description}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2 mb-3">
					<span className="bg-blue-100 px-2 py-1 rounded-full text-blue-800 text-xs">
						{resource.category}
					</span>
					<span className="bg-gray-100 px-2 py-1 rounded-full text-gray-800 text-xs">
						{resource.difficulty}
					</span>
				</div>

				<div className="flex items-center justify-between mb-4 text-sm text-gray-500">
					<div className="flex items-center gap-4">
						<div className="flex items-center">
							{renderStars(resource.rating)}
							<span className="ml-1 font-medium">
								{resource.rating}
							</span>
							<span className="ml-1">
								({resource.ratingCount})
							</span>
						</div>
						<div className="flex items-center">
							<Eye className="mr-1 w-4 h-4" />
							<span>{resource.views}</span>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center text-sm text-gray-600">
						<User className="mr-1 w-4 h-4" />
						<span>{resource.author}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-gray-500 text-xs">
							<Calendar className="inline mr-1 w-3 h-3" />
							{formatDate(resource.publishDate)}
						</span>
						<Button size="sm" variant="outline">
							<Download className="mr-1 w-4 h-4" />
							İndir
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}