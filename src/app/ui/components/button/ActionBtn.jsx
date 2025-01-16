import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.scss";
import React from "react";

function ActionBtn({action, text = "Click here", icon = faArrowPointer}) {
    return (
        <form action={action} className={styles.linkForm}>
            <button type="submit" className={styles.linkButton}>
                {text}
                <FontAwesomeIcon icon={icon} />
            </button>
        </form>
    );
}

export default ActionBtn;
