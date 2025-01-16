import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./loading.module.scss";

function RootLoading() {
	return (
		<div className={styles.container}>
			<FontAwesomeIcon 
				className={styles.icon} 
				icon={faSpinner} 
				spin 
				style={{ animationDuration: '0.75s', animationTimingFunction: 'ease-in-out' }} 
			/>
			<span className={styles.title}>Đang chuyển trang</span>
		</div>
	);
}

export default RootLoading;
