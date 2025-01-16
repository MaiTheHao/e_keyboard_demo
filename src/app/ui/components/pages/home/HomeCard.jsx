import React from "react";
import styles from "./HomeCard.module.scss";
import LinkBtn from "../../button/LinkBtn";

function HomeCard({
	title = "This is title",
	description = ["This is paragraph 1", "This is paragraph 2"],
	href = null,
	buttonText = null,
	icon = null,
}) {
	return (
		<div className={styles.card}>
			<h1 className={styles.card__title}>{title}</h1>
			<div className={styles.card__description}>
				{description.map((paragraph, index) => (
					<p key={`homecardparagraph-${index}`}>{paragraph}</p>
				))}
			</div>
			{href && buttonText && <LinkBtn href={href} text={buttonText} icon={icon} />}
		</div>
	);
}

export default HomeCard;
