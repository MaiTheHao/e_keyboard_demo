"use client";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useState } from "react";

import { FILTER_FIELDS_OPTIONS, SORT_OPTIONS } from "@/app/constants";
import useProductsContext from "@/contexts/products/useProductsContext";
import { upperFirst } from "@/utils/text";
import styles from "./ProductsTop.module.scss";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";

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
					: [{ value: [], label: "Tất cả" }, ...options.map((option) => ({ value: option, label: option }))].map(
							({ value, label }, index) => (
								<button
									key={generateKey(index)}
									className={clsx(styles.filterWrapperContent__list__item__options__item, {
										[styles.selected]:
											value.length === 0
												? thisFilter[field].length === 0
												: thisFilter[field].includes(value),
									})}
									onClick={() => handleSetThisFilter(field, value)}
								>
									{upperFirst(label)}
								</button>
							)
					  )}
			</ul>
		</li>
	);
}

function ProductsTopDataControl() {
	const { filter, handleSetFilter, initialFilters, sort, setSort } = useProductsContext();
	const [thisFilter, setThisFilter] = useState(initialFilters);
	const [wrapperVisible, setWrapperVisible] = useState({
		filterButton: false,
		sortButton: false,
	});

	const handleSetThisFilter = (field, value) => {
		const curr = filter[field];
		if (Array.isArray(curr)) {
			const res = thisFilter[field];
			if (value.length === 0) setThisFilter((prev) => ({ ...prev, [field]: [] }));
			else if (res.includes(value)) {
				setThisFilter((prev) => ({ ...prev, [field]: res.filter((v) => v !== value) }));
			} else {
				setThisFilter((prev) => ({ ...prev, [field]: [...res, value] }));
			}
		} else {
			setThisFilter((prev) => ({ ...prev, [field]: value }));
		}
	};

	const handleAsyncFilterToContext = () => {
		setWrapperVisible({ ...wrapperVisible, filterButton: false });
		handleSetFilter(thisFilter);
	};

	const handleResetFilter = () => {
		setThisFilter(initialFilters);
	};

	const handleSetSort = (options) => {
		if (options.value === "default") {
			setSort(null);
			return;
		}
		
		setSort(options);
		setWrapperVisible({ ...wrapperVisible, sortButton: false });
	};

	return (
		<div className={styles.filterContainer}>
			<ul className={styles.filterBar}>
				<div className={styles.filterBar__element}>
					<button
						className={`${styles.filterPrimaryButton} ${styles.filterBar__element__button}`}
						onClick={() =>
							setWrapperVisible({
								...wrapperVisible,
								filterButton: !wrapperVisible.filterButton,
							})
						}
					>
						<FontAwesomeIcon icon={faFilter} />
						<span>Bộ lọc</span>
					</button>
				</div>
				<div className={styles.filterBar__element}>
					<button
						className={styles.filterBar__element__button}
						onClick={() => setWrapperVisible({ ...wrapperVisible, sortButton: !wrapperVisible.sortButton })}
					>
						<FontAwesomeIcon icon={faArrowDownWideShort} />
						<span>Sắp xếp</span>
					</button>
					<ul
						className={styles.filterBar__element__wrapper}
						style={{ display: wrapperVisible.sortButton ? "block" : "none" }}
					>
						{SORT_OPTIONS.map((options, index) => {
							return (
								<li key={`sort-option-${options.value}`}>
									<button
										className={clsx(styles.sortOption, {
											[styles.selected]:
												sort?.value === options.value || (!sort && options.value === "default"),
										})}
										onClick={() => handleSetSort(options)}
										title={options.label}
									>
										{options.label}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</ul>
			<div className={clsx(styles.filterWrapperContainer, { [styles.visible]: wrapperVisible.filterButton })}>
				<div className={styles.filterWrapperContent}>
					<div className={styles.filterWrapperContent__header}>
						<button className={styles.filterWrapperContent__header__close} onClick={() => setWrapperVisible(false)}>
							<FontAwesomeIcon icon={faXmark} /> Đóng
						</button>
					</div>
					<ul className={styles.filterWrapperContent__list}>
						{Object.keys(FILTER_FIELDS_OPTIONS).map((field, index) => {
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
						})}
					</ul>
					<div className={styles.filterWrapperContent__buttons}>
						<button className={styles.filterWrapperContent__buttons__discard} onClick={() => handleResetFilter()}>
							Xóa lọc
						</button>
						<button
							className={styles.filterWrapperContent__buttons__apply}
							onClick={() => handleAsyncFilterToContext()}
						>
							Xem kết quả
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductsTopDataControl;
