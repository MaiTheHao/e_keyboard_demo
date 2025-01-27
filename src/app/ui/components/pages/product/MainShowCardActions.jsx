"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/app/(pages)/product/[id]/Product.module.scss";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";

function MainShowCardActions({ productId = null, maxQuantity = 1 }) {
	if (!productId) {
		return null;
	}

	const [quantity, setQuantity] = useState(1);
	const timeoutRef = useRef(null);
	const intervalRef = useRef(null);
	const touchInProgress = useRef(false);

	const handleAddToCart = (action) => {
		const addValue = action === "add" ? 1 : -1;
		setQuantity((prev) => Math.min(Math.max(prev + addValue, 1), maxQuantity));
	};

	const handleMouseDown = (action) => {
		if (touchInProgress.current) {
			touchInProgress.current = false;
			return;
		}

		handleAddToCart(action);
		timeoutRef.current = setTimeout(() => {
			intervalRef.current = setInterval(() => {
				handleAddToCart(action);
			}, 50);
		}, 500);
	};

	const handleMouseUpOrLeave = () => {
		clearTimeout(timeoutRef.current);
		clearInterval(intervalRef.current);
	};

	const handleTouchStart = (action) => {
		touchInProgress.current = true;
		handleAddToCart(action);
		timeoutRef.current = setTimeout(() => {
			intervalRef.current = setInterval(() => {
				handleAddToCart(action);
			}, 50);
		}, 500);
	};

	const handleTouchEnd = () => {
		handleMouseUpOrLeave();
		setTimeout(() => {
			touchInProgress.current = false;
		}, 100);
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
			clearInterval(intervalRef.current);
		};
	}, []);

	return (
		<div className={styles.mainShowCard__info__actions}>
			<div className={styles.mainShowCard__info__actions__quantity}>
				<button
					className={`${styles.mainShowCard__info__actions__quantity__button} ${styles.mainShowCard__info__actions__quantity__button_add}`}
					type="button"
					onMouseDown={() => handleMouseDown("add")}
					onMouseUp={handleMouseUpOrLeave}
					onMouseLeave={handleMouseUpOrLeave}
					onTouchStart={() => handleTouchStart("add")}
					onTouchEnd={handleTouchEnd}
				>
					+
				</button>
				<span className={styles.mainShowCard__info__actions__quantity__label}>{quantity}</span>
				<button
					className={`${styles.mainShowCard__info__actions__quantity__button} ${styles.mainShowCard__info__actions__quantity__button_decrease}`}
					type="button"
					onMouseDown={() => handleMouseDown("decrease")}
					onMouseUp={handleMouseUpOrLeave}
					onMouseLeave={handleMouseUpOrLeave}
					onTouchStart={() => handleTouchStart("decrease")}
					onTouchEnd={handleTouchEnd}
				>
					-
				</button>
			</div>
			<button
				className={`${styles.mainShowCard__info__actions__button} ${styles.mainShowCard__info__actions__button_cart}`}
			>
				<FontAwesomeIcon icon={faCartShopping} />
				Thêm vào giỏ hàng
			</button>
			<button className={`${styles.mainShowCard__info__actions__button} ${styles.mainShowCard__info__actions__button_buy}`}>
				<FontAwesomeIcon icon={faHandHoldingDollar} />
				Mua ngay
			</button>
		</div>
	);
}

export default MainShowCardActions;
