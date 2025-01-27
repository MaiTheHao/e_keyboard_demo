import { getProductById } from "@/lib/fetchProduct";
import { PRODUCT_PAGE_METADATA } from "../../../../../constants";
import { upperFirst } from "@/utils/text";
import { Suspense } from "react";
import ProductShow from "@/app/ui/components/pages/product/ProductShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// {
// 	"_id": {
// 	  "$oid": "6786515b0fd9afe1b707ccf6"
// 	},
// 	"name": "Varmilo VA87M",
// 	"category": "Keyboard",
// 	"brand": "Varmilo",
// 	"layout": "TKL",
// 	"caseMaterial": "Plastic",
// 	"collabTheme": null,
// 	"rgbBacklit": false,
// 	"hotswap": false,
// 	"switchType": "Mechanical Switch",
// 	"rappodTrigger": false,
// 	"tags": [
// 	  "Keyboard"
// 	],
// 	"price": 3359760,
// 	"model": "VA87M",
// 	"series": "VA",
// 	"stock": 50,
// 	"currency": "VND",
// 	"src": "https://th.bing.com/th/id/OIP.BwHrNAuheFqLK9nxR1PrMAHaEK?rs=1&pid=ImgDetMain"
// }

// export async function generateMetadata({ params }) {
// 	const { id } = await params;
// 	const product = await getProductById(id);
// 	const metadata = product ? { title: upperFirst(product.name), description: product.description } : PRODUCT_PAGE_METADATA;
// 	return metadata;
// }

export const metadata = PRODUCT_PAGE_METADATA;

async function Product({ params }) {
	const { id } = await params;
	return (
		<ProductShow id={id} />
	);
}

export default Product;
