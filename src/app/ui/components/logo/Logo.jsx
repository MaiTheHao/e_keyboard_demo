import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Logo.module.scss";
import { WEB_ICON, WEB_NAME } from "@/app/constants";

function Logo() {
	return (
		<div className={`${styles.container} web-logo`}>
			<div className={`${styles.main} web-logo__block`}>
                <FontAwesomeIcon icon = {WEB_ICON}/>
                <span>{WEB_NAME}</span>
            </div>
		</div>
	);
}

export default Logo;
