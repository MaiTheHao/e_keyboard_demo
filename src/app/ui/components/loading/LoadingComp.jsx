import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styles from './LoadingComp.module.scss';

function LoadingComp({ iconStyle, message }) {
	return (
		<div className={styles.container}>
			<FontAwesomeIcon className={styles.icon} icon={faSpinner} spin style={iconStyle} />
			<span className={styles.title}>{message}</span>
		</div>
	);
}

LoadingComp.propTypes = {
	iconStyle: PropTypes.object,
	message: PropTypes.string,
};

LoadingComp.defaultProps = {
	iconStyle: {},
	message: 'Loading...',
};

export default LoadingComp;
