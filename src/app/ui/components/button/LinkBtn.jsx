import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.scss";
import Link from "next/link"; 
import React from "react";

function LinkBtn({href = "/home", text = "Quay về trang chủ", icon = faArrowPointer}) {
	return (
		<Link href={href} className={styles.linkButton}>
			{text}
			<FontAwesomeIcon icon={icon} />
		</Link>
	);
}

export default LinkBtn;
