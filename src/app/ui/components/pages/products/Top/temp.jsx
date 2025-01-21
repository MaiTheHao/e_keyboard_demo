"use client";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProductsContext from "@/contexts/products/useProductsContext";
import styles from "./ProductsTop.module.scss";
import { useState, useEffect } from "react";
import { upperFirst } from "@/utils/text";
import clsx from "clsx";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FilterFields = ({ filters, selectedField, setSelectedField }) => (
	<div className={styles.filterFields}>
		{Object.keys(filters).map((field) => (
			<span
				key={field}
				className={clsx(styles.filterField, { [styles.activeField]: selectedField === field })}
				onClick={() => setSelectedField(field)}
			>
				{`${upperFirst(field)}`}
			</span>
		))}
	</div>
);

const BooleanOptions = ({ selectedField, filter, handleSetFilter }) => (
	<div className={styles.filterOptions}>
		{[
			{ value: null, label: "All" },
			{ value: true, label: "Yes" },
			{ value: false, label: "No" },
		].map(({ value, label }) => (
			<div
				key={label}
				className={clsx(styles.filterOption, {
					[styles.selectedOption]: filter[selectedField] === value,
				})}
				onClick={() => handleSetFilter({ [selectedField]: value })}
			>
				{label}
			</div>
		))}
	</div>
);

const FilterOptions = ({ selectedField, filters, filterFieldsOptions, handleFilterChange }) =>
	filterFieldsOptions[selectedField].map((option) => (
		<div
			key={option}
			className={clsx(styles.filterOption, {
				[styles.selectedOption]: filters[selectedField]?.includes(option),
			})}
			onClick={() => handleFilterChange(selectedField, option)}
		>
			{option}
		</div>
	));

function ProductsTopFilter() {
	const [filters, setFilters] = useState({
		brand: [],
		layout: [],
		caseMaterial: [],
		collabTheme: [],
		rgbBacklit: null,
		hotswap: null,
		switchType: [],
		rappodTrigger: null,
		tag: [],
	});
	const [selectedField, setSelectedField] = useState("brand");
	const [showFilterTable, setShowFilterTable] = useState(false);
	const { filter, filterFieldsOptions, handleSetFilter } = useProductsContext();

	const handleFilterChange = (field, value) => {
		setFilters((prevFilters) => {
			const updatedField = prevFilters[field].includes(value)
				? prevFilters[field].filter((item) => item !== value)
				: [...prevFilters[field], value];
			return { ...prevFilters, [field]: updatedField };
		});

	};

	useEffect(() => {
		handleSetFilter({
			brand: [],
			layout: [],
			caseMaterial: [],
			collabTheme: [],
			rgbBacklit: null,
			hotswap: null,
			switchType: [],
			rappodTrigger: null,
			tag: [],
		});
	}, []);

	return (
		<div className={styles.filterContainer}>
			<FontAwesomeIcon icon={faFilter} onClick={() => setShowFilterTable(!showFilterTable)} />
			{showFilterTable && (
				<div className={styles.filterTableWrapper}>
					<div className={styles.filterTableContent}>
						<div className={styles.filterTableContentTop}>
							<button className={styles.closeButton} onClick={() => setShowFilterTable(false)}>
								<FontAwesomeIcon icon={faXmark} /> Đóng
							</button>
						</div>
						<div className={styles.filterTableContentBottom}>
							<FilterFields filters={filters} selectedField={selectedField} setSelectedField={setSelectedField} />
							<div className={styles.filterOptionsContainer}>
								<div className={styles.filterOptions}>
									{!Array.isArray(filters[selectedField]) ? (
										<BooleanOptions
											selectedField={selectedField}
											filter={filter}
											handleSetFilter={handleSetFilter}
										/>
									) : (
										<FilterOptions
											selectedField={selectedField}
											filters={filters}
											filterFieldsOptions={filterFieldsOptions}
											handleFilterChange={handleFilterChange}
										/>
									)}
								</div>
								<div className={styles.filterButtons}>
									<button
										onClick={() => {
											setFilters({
												brand: [],
												layout: [],
												caseMaterial: [],
												collabTheme: [],
												rgbBacklit: null,
												hotswap: null,
												switchType: [],
												rappodTrigger: null,
												tag: [],
											});
											handleSetFilter({});
										}}
										className={styles.clearButton}
									>
										Bỏ chọn
									</button>
									<button
										onClick={() => {
											handleSetFilter(filters);
											setShowFilterTable(false);
										}}
										className={styles.submitButton}
									>
										Xem kết quả
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductsTopFilter;
