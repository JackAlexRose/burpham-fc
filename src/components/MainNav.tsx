import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const routes = [
	{ href: "/", label: "Home" },
	{ href: "/about-us", label: "About Us" },
	{ href: "/get-involved", label: "Get Stuck In" },
];

export function MainNav() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex items-center">
			{/* Mobile Menu */}
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild className="z-10">
					<Button
						variant="ghost"
						size="icon"
						className="text-white md:hidden z-10"
						aria-label="Open Menu"
					>
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="bg-zinc-950 p-0">
					<SheetHeader className="border-b border-zinc-800 p-6 flex flex-row items-center justify-between">
						<SheetTitle className="text-white">Burpham FC</SheetTitle>
					</SheetHeader>
					<div className="flex flex-col space-y-3 p-6">
						{routes.map((route) => (
							<a
								key={route.href}
								href={route.href}
								className="w-full text-lg text-zinc-400 transition-colors hover:text-white"
								onClick={() => setIsOpen(false)}
							>
								{route.label}
							</a>
						))}
					</div>
				</SheetContent>
			</Sheet>

			{/* Desktop Menu */}
			<nav className="hidden md:flex md:items-center md:gap-6">
				<div className="hidden sm:flex items-center md:gap-3 gap-0 z-10 justify-end">
					<a href="/">
						<Button
							variant="ghost"
							className="text-zinc-200 hover:text-burpham-yellow hover:bg-burpham-green"
						>
							Home
						</Button>
					</a>
					<a href="/about-us">
						<Button
							variant="ghost"
							className="text-zinc-200 hover:text-burpham-yellow hover:bg-burpham-green"
						>
							About Us
						</Button>
					</a>
					<a href="/get-involved">
						<Button
							variant="ghost"
							className="text-white bg-burpham-green hover:bg-burpham-yellow"
						>
							Get Stuck In
						</Button>
					</a>
				</div>
			</nav>
		</div>
	);
}
