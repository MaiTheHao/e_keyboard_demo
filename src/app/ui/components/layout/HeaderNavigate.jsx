"use client";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faBoxesStacked, faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const configPaths = [
	{
		href: "/home",
		title: "Home",
		icon: faHouseChimney,
	},
	{
		href: "/products",
		title: "Products",
		icon: faBoxesStacked,
	},
	{
		href: "/cart",
		title: "Cart",
		icon: faCartShopping,
	},
];

function HeaderNavigate() {
	const pathName = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<button 
				className={styles.menuButton}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				<FontAwesomeIcon icon={faBars} />
			</button>
			<ul className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ''}`}>
				{configPaths.map((path, index) => (
					<Link
						key={`headernavigate-${index}`}
						href={path.href}
						className={clsx({
							[styles.navActived]: pathName === path.href,
						})}
					>
						<FontAwesomeIcon icon={path.icon} />
						<span>{path.title}</span>
					</Link>
				))}
			</ul>
		</>
	);
}

export default HeaderNavigate;
