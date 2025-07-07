export interface NavigationItem {
	id: string;
	label: string;
	href?: string;
	icon?: React.ComponentType<{ className?: string }>;
	children?: NavigationSubItem[];
	description?: string;
}

export interface NavigationSubItem {
	id: string;
	label: string;
	href: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
	children?: NavigationSubSubItem[];
}

export interface NavigationSubSubItem {
	id: string;
	label: string;
	href: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
}

export interface MegaMenuState {
	isOpen: boolean;
	activeItem: string | null;
	hoveredItem: string | null;
}