import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Logo.module.scss";
import { WEB_ICON, WEB_NAME } from "@/app/constants";

function Logo() {
	return (
		<div className={styles.container}>
			<span className={styles.main}>
                <FontAwesomeIcon icon = {WEB_ICON}/>
                {WEB_NAME}
            </span>
		</div>
	);
}

export default Logo;
