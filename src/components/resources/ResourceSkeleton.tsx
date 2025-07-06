import { Card, CardContent } from "@/components/ui/card";

interface ResourceSkeletonProps {
	viewMode?: "grid" | "list";
	count?: number;
}

export function ResourceSkeleton({ viewMode = "grid", count = 6 }: ResourceSkeletonProps) {
	return (
		<div className={`grid gap-6 ${
			viewMode === "grid" 
				? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
				: "grid-cols-1"
		}`}>
			{Array.from({ length: count }, (_, i) => (
				<Card key={i} className={`animate-pulse ${viewMode === "list" ? "flex" : ""}`}>
					<div className={`bg-gray-200 ${
						viewMode === "list" 
							? "w-48 h-32 flex-shrink-0" 
							: "w-full h-48"
					} rounded-lg`}></div>
					<CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6`}>
						<div className="bg-gray-200 rounded w-3/4 h-4 mb-2"></div>
						<div className="bg-gray-200 rounded w-1/2 h-4 mb-4"></div>
						<div className="flex gap-2 mb-4">
							<div className="bg-gray-200 rounded-full w-16 h-6"></div>
							<div className="bg-gray-200 rounded-full w-20 h-6"></div>
						</div>
						<div className="flex justify-between">
							<div className="bg-gray-200 rounded w-20 h-4"></div>
							<div className="bg-gray-200 rounded w-16 h-4"></div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}