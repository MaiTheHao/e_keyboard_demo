"use client";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProductsContext from "@/contexts/products/useProductsContext";
import styles from "./ProductsTop.module.scss";
import { useState, useEffect } from "react";
import { upperFirst } from "@/utils/text";
import clsx from "clsx";

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

const BOOLEAN_OPTIONS = [
	{ value: null, label: "All" },
	{ value: true, label: "Yes" },
	{ value: false, label: "No" },
];

const BooleanOptions = ({ selectedField, filters, handleFilterChange }) => (
	<div className={styles.filterOptions}>
		{BOOLEAN_OPTIONS.map(({ value, label }) => (
			<div
				key={label}
				className={clsx(styles.filterOption, {
					[styles.selectedOption]: filters[selectedField] === value,
				})}
				onClick={() => handleFilterChange(selectedField, value)}
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
	const { filter, initialFilters, filterFieldsOptions, handleSetFilter } = useProductsContext();
	const [filters, setFilters] = useState(filter);
	const [selectedField, setSelectedField] = useState("brand");
	const [showFilterTable, setShowFilterTable] = useState(false);

	const handleFilterChange = (field, value) => {
		setFilters((prevFilters) => {
			if (typeof value === "boolean" || value === null) {
				return { ...prevFilters, [field]: value };
			}
			const updatedField = prevFilters[field].includes(value)
				? prevFilters[field].filter((item) => item !== value)
				: [...prevFilters[field], value];
			return { ...prevFilters, [field]: updatedField };
		});
	};

	useEffect(() => {
		handleSetFilter(initialFilters);
	}, []);

	return (
		<div className={styles.filterContainer}>
			<div className={styles.filterButton} onClick={() => setShowFilterTable(!showFilterTable)}>
				<FontAwesomeIcon icon={faFilter} />
				<span>Bộ lọc</span>
			</div>
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
											filters={filters}
											handleFilterChange={handleFilterChange}
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
											setFilters(initialFilters);
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
