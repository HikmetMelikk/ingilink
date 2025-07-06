import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Heart, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredResources = [
	{
		id: 1,
		title: "Advanced English Grammar Guide",
		description:
			"Comprehensive guide covering all advanced grammar topics with practical examples and exercises.",
		category: "Grammar",
		difficulty: "Advanced",
		rating: 4.8,
		views: 1250,
		author: "Sarah Johnson",
		type: "PDF",
		image:
			"https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 2,
		title: "Business English Vocabulary",
		description:
			"Essential vocabulary for professional communication in business environments.",
		category: "Vocabulary",
		difficulty: "Intermediate",
		rating: 4.6,
		views: 890,
		author: "Michael Chen",
		type: "Audio",
		image:
			"https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 3,
		title: "IELTS Listening Practice Tests",
		description:
			"Complete set of IELTS listening practice tests with detailed explanations.",
		category: "Listening",
		difficulty: "Intermediate",
		rating: 4.9,
		views: 2100,
		author: "Emma Wilson",
		type: "Audio",
		image:
			"https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 4,
		title: "English Pronunciation Masterclass",
		description:
			"Master English pronunciation with phonetic exercises and audio examples.",
		category: "Speaking",
		difficulty: "Beginner",
		rating: 4.7,
		views: 1680,
		author: "David Brown",
		type: "Video",
		image:
			"https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 5,
		title: "Academic Writing Essentials",
		description:
			"Learn the fundamentals of academic writing for essays, reports, and research papers.",
		category: "Writing",
		difficulty: "Advanced",
		rating: 4.5,
		views: 950,
		author: "Dr. Lisa Anderson",
		type: "PDF",
		image:
			"https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	{
		id: 6,
		title: "Daily English Conversations",
		description:
			"Common English conversations for everyday situations with native speakers.",
		category: "Speaking",
		difficulty: "Beginner",
		rating: 4.4,
		views: 1420,
		author: "Jennifer Lee",
		type: "Video",
		image:
			"https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
];

const getDifficultyColor = (difficulty: string) => {
	switch (difficulty) {
		case "Beginner":
			return "bg-green-100 text-green-800";
		case "Intermediate":
			return "bg-yellow-100 text-yellow-800";
		case "Advanced":
			return "bg-red-100 text-red-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const getCategoryColor = (category: string) => {
	switch (category) {
		case "Grammar":
			return "bg-blue-100 text-blue-800";
		case "Vocabulary":
			return "bg-purple-100 text-purple-800";
		case "Listening":
			return "bg-green-100 text-green-800";
		case "Speaking":
			return "bg-orange-100 text-orange-800";
		case "Writing":
			return "bg-pink-100 text-pink-800";
		case "Reading":
			return "bg-indigo-100 text-indigo-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export function FeaturedResources() {
	return (
		<section className="bg-white py-20">
			<div className="mx-auto px-4 container">
				<div className="mb-16 text-center">
					<h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
						Öne Çıkan Kaynaklar
					</h2>
					<p className="mx-auto max-w-2xl text-gray-600 text-xl">
						Topluluğumuzun en beğenilen ve en çok kullanılan İngilizce öğrenme
						kaynaklarını keşfedin
					</p>
				</div>

				<div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
					{featuredResources.map((resource) => (
						<Card
							key={resource.id}
							className="group shadow-md hover:shadow-xl border-0 transition-all duration-300"
						>
							<div className="relative rounded-t-lg overflow-hidden">
								<Image
									src={resource.image}
									alt={resource.title}
									width={1000}
									height={1000}
									className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="top-4 right-4 absolute">
									<Button
										variant="ghost"
										size="icon"
										className="bg-white/80 hover:bg-white"
									>
										<Heart className="w-4 h-4" />
									</Button>
								</div>
								<div className="bottom-4 left-4 absolute">
									<Badge
										variant="secondary"
										className="bg-white/90 text-gray-800"
									>
										{resource.type}
									</Badge>
								</div>
							</div>

							<CardHeader className="pb-3">
								<div className="flex justify-between items-start mb-2">
									<CardTitle className="group-hover:text-blue-600 text-lg line-clamp-2 transition-colors">
										<Link href={`/resources/${resource.id}`}>
											{resource.title}
										</Link>
									</CardTitle>
								</div>
								<p className="mb-3 text-gray-600 text-sm line-clamp-2">
									{resource.description}
								</p>
								<div className="flex items-center gap-2 mb-3">
									<Badge className={getCategoryColor(resource.category)}>
										{resource.category}
									</Badge>
									<Badge
										variant="outline"
										className={getDifficultyColor(resource.difficulty)}
									>
										{resource.difficulty}
									</Badge>
								</div>
							</CardHeader>

							<CardContent className="pt-0">
								<div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
									<div className="flex items-center gap-4">
										<div className="flex items-center">
											<Star className="fill-yellow-400 mr-1 w-4 h-4 text-yellow-400" />
											<span className="font-medium">{resource.rating}</span>
										</div>
										<div className="flex items-center">
											<Eye className="mr-1 w-4 h-4" />
											<span>{resource.views}</span>
										</div>
									</div>
								</div>

								<div className="flex justify-between items-center">
									<div className="flex items-center text-gray-600 text-sm">
										<User className="mr-1 w-4 h-4" />
										<span>{resource.author}</span>
									</div>
									<Button
										size="sm"
										variant="outline"
										className="hover:bg-blue-50 hover:text-blue-600"
									>
										<Download className="mr-1 w-4 h-4" />
										İndir
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center">
					<Button asChild size="lg" variant="outline" className="border-2">
						<Link href="/resources">Tüm Kaynakları Görüntüle</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
