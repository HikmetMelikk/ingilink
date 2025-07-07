import { type Variants, easeOut } from "framer-motion";

// Motion variants for consistent animations across the app
export const pageVariants: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: easeOut,
		},
	},
	exit: { opacity: 0, y: -20 },
};

export const slideFromTop: Variants = {
	initial: { opacity: 0, y: -50 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: easeOut,
		},
	},
};

export const slideFromRight: Variants = {
	initial: { opacity: 0, x: 50 },
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
			ease: easeOut,
		},
	},
};

export const slideFromLeft: Variants = {
	initial: { opacity: 0, x: -50 },
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
			ease: easeOut,
		},
	},
};

export const fadeInUp: Variants = {
	initial: { opacity: 0, y: 30 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: easeOut,
		},
	},
};

export const staggerContainer: Variants = {
	animate: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

export const staggerItem: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: easeOut,
		},
	},
};

export const scaleOnHover: Variants = {
	whileHover: {
		scale: 1.05,
		transition: { duration: 0.2 },
	},
	whileTap: { scale: 0.95 },
};

export const buttonHover: Variants = {
	whileHover: {
		scale: 1.02,
		transition: { duration: 0.2 },
	},
	whileTap: { scale: 0.98 },
};

export const cardHover: Variants = {
	whileHover: {
		y: -5,
		boxShadow:
			"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
		transition: { duration: 0.3 },
	},
};

export const filterButtonVariants: Variants = {
	inactive: {
		scale: 1,
		backgroundColor: "rgba(255, 255, 255, 1)",
		color: "rgba(75, 85, 99, 1)",
	},
	active: {
		scale: 1.02,
		backgroundColor: "rgba(37, 99, 235, 1)",
		color: "rgba(255, 255, 255, 1)",
	},
	hover: {
		scale: 1.05,
		transition: { duration: 0.2 },
	},
};

export const progressiveReveal: Variants = {
	initial: { opacity: 0, scale: 0.8 },
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.8,
			ease: easeOut,
		},
	},
};

export const scrollTriggered = {
	initial: { opacity: 0, y: 50 },
	whileInView: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: easeOut,
		},
	},
	viewport: { once: true, amount: 0.3 },
} as const;
