export const inferFilterDataTypes = (filterFieldsOptions) => {
	const filter = {};
	for (const key in filterFieldsOptions) {
        const filterField = filterFieldsOptions[key].options;
        if (filterField.includes("Yes") || filterField.includes("No")) {
            filter[key] = null;
        } else if (Array.isArray(filterField)) {
            filter[key] = [];
        }
	}
	return filter;
};
