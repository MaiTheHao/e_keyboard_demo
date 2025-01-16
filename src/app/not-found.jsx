import React from "react";
import styles from "./not-found.module.scss"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import LinkBtn from "./ui/components/button/LinkBtn";

function NotFound() {
	return <div className={`${styles.container} top-container`}>
        <h1 className={styles.icon}><FontAwesomeIcon icon={faTriangleExclamation} /></h1>
        <h2 className={styles.title}>Không tìm thấy bất kì trang hoặc tài liệu hợp lệ nào!</h2>
        <LinkBtn href="home" text="Quay về trang chủ" icon={faArrowPointer}/>
    </div>;
}

export default NotFound;
