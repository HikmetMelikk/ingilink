export interface Resource {
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
	fileUrl?: string;
	originalUrl?: string;
	shortCode?: string;
	isPublic?: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface ResourceFilters {
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

export interface ResourcesResponse {
	resources: Resource[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export type ViewMode = "grid" | "list";
export type SortOption = "popular" | "rating" | "newest" | "oldest" | "title";