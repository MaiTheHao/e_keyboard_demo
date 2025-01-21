'use client';
import React from "react";
import Logo from "../logo/Logo";
import styles from "./Header.module.scss";
import HeaderNavigate from "./HeaderNavigate";
import HeaderSearchBar from "./HeaderSearchBar";

function Header() {
	return (
		<header className={`${styles.container} webpart`}>
			<div className={`${styles.block} top-container`}>
				<div className={styles.left}>
					<Logo />
				</div>
				<div className={styles.search}>
					<HeaderSearchBar />
				</div>
				<div className={styles.right}>
					<HeaderNavigate />
				</div>
			</div>
		</header>
	);
}

export default Header;
