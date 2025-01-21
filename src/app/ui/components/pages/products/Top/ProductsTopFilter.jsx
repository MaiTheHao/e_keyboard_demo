"use client";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useState } from "react";

import { FILTER_FIELDS_OPTIONS } from "@/app/setting";
import useProductsContext from "@/contexts/products/useProductsContext";
import { upperFirst } from "@/utils/text";
import styles from "./ProductsTop.module.scss";

function FieldComponent({ title, field, thisFilter, handleSetThisFilter }) {
	const options = FILTER_FIELDS_OPTIONS[field].options;
	const isBool = options.includes("Yes");
	const generateKey = (index) => `${title}-${field}-${index}`;
	return (
		<li className={styles.filterWrapperContent__list__item}>
			<label className={styles.filterWrapperContent__list__item__label}>{upperFirst(title)}</label>
			<ul className={styles.filterWrapperContent__list__item__options}>
				{isBool
					? [
							{ value: null, label: "Tất cả" },
							{ value: true, label: "Có" },
							{ value: false, label: "Không" },
					  ].map(({ value, label }, index) => (
							<button
								key={generateKey(index)}
								className={clsx(styles.filterWrapperContent__list__item__options__item, {
									[styles.selected]: thisFilter[field] === value,
								})}
								onClick={() => handleSetThisFilter(field, value)}
							>
								{upperFirst(label)}
							</button>
					  ))
					: options.map((option, index) => (
							<button
								key={generateKey(index)}
								className={clsx(styles.filterWrapperContent__list__item__options__item, {
									[styles.selected]: thisFilter[field].includes(option),
								})}
								onClick={() => handleSetThisFilter(field, option)}
							>
								{upperFirst(option)}
							</button>
					  ))}
			</ul>
		</li>
	);
}

function ProductsTopFilter() {
	const { filter, handleSetFilter, initialFilters } = useProductsContext();
	const [thisFilter, setThisFilter] = useState(initialFilters);
	const [wrapperVisible, setWrapperVisible] = useState(false);
	console.log(thisFilter);

	const handleSetThisFilter = (field, value) => {
		const curr = filter[field];
		if (Array.isArray(curr)) {
			const res = thisFilter[field];
			if (res.includes(value)) {
				setThisFilter((prev) => ({ ...prev, [field]: res.filter((v) => v !== value) }));
			} else {
				setThisFilter((prev) => ({ ...prev, [field]: [...res, value] }));
			}
		} else {
			setThisFilter((prev) => ({ ...prev, [field]: value }));
		}
	};

	const handleAsyncFilterToContext = () => {
		handleSetFilter(thisFilter);
		setWrapperVisible(false);
	}

	const handleResetFilter = () => {
		setThisFilter(initialFilters);
	}

	return (
		<div className={styles.filterContainer}>
			<ul className={styles.filterBar}>
				<div className={`${styles.filterPrimaryButton} ${styles.filterBar__button}`} onClick={() => setWrapperVisible(!wrapperVisible)}>
					<FontAwesomeIcon icon={faFilter} />
					<span>Bộ lọc</span>
				</div>
				<div className={styles.filterBar__button}>
					Sắp xếp
				</div>
			</ul>
			<div className={clsx(styles.filterWrapperContainer, { [styles.visible]: wrapperVisible })}>
				<div className={styles.filterWrapperContent}>
					<div className={styles.filterWrapperContent__header}>
						<button className={styles.filterWrapperContent__header__close} onClick={() => setWrapperVisible(false)}>
							<FontAwesomeIcon icon={faXmark} /> Đóng
						</button>
					</div>
					<ul className={styles.filterWrapperContent__list}>
						{
							Object.keys(FILTER_FIELDS_OPTIONS).map((field, index) => {
								const title = FILTER_FIELDS_OPTIONS[field].title;
								return (
									<FieldComponent
										key={`filterfieldcomponent-${field}-${index}`}
										title={title}
										field={field}
										thisFilter={thisFilter}
										handleSetThisFilter={handleSetThisFilter}
									/>
								);
							})
						}
					</ul>
					<div className={styles.filterWrapperContent__buttons}>
						<button className={styles.filterWrapperContent__buttons__discard} onClick={() => handleResetFilter()}>Xóa lọc</button>
						<button className={styles.filterWrapperContent__buttons__apply} onClick={() => handleAsyncFilterToContext()}>Xem kết quả</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductsTopFilter;
