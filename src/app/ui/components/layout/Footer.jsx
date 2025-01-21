'use client'
import React from "react";
import styles from "./Footer.module.scss";
import Logo from "../logo/Logo";
import Link from "next/link";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CREATOR } from "@/app/constants";

const contactConfigs = [
	{
		href: "/facebook.com",
		icon: faFacebook,
		title: "Facbook của chúng tôi.",
		id: "facebook",
	},
	{
		href: "/instagram.com",
		icon: faInstagram,
		title: "Instagram của chúng tôi.",
		id: "instagram",
	},
	{
		href: "/youtube.com",
		icon: faYoutube,
		title: "Youtube của chúng tôi.",
		id: "youtube",
	},
];

function Footer() {
	return (
		<footer className={`${styles.container} webpart`}>
			<div className={`${styles.block} top-container`}>
				<Logo />
				<span>Chân trọng cảm ơn bạn đã ghé thăm website của chúng tôi</span>
				<span className={styles.copyright}>© {CREATOR} 2024</span>
				<ul className={styles.contact}>
					{contactConfigs.map((contact, index) => (
						<Link key={`webfooter-contact-${index}`} href={contact?.href} title={contact?.title}>
							<FontAwesomeIcon id={contact?.id} icon={contact?.icon} />
						</Link>
					))}
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
