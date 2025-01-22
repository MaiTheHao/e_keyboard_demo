import React from "react";
import styles from "./Product.module.scss";
import Image from "next/image";
import NullImage from "@/app/ui/components/itemCard/NullImage";
import LinkBtn from "@/app/ui/components/button/LinkBtn";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { capitalize, upperFirst } from "@/utils/text";
import { getProductById } from "@/lib/fetchProduct";
import { PRODUCT_PAGE_METADATA } from "@/app/constants";

export async function generateMetadata({ params }) {
	const { id } = await params;
	const product = await getProductById(id);
	const metadata = product ? { title: upperFirst(product.name), description: product.description } : PRODUCT_PAGE_METADATA;
	return metadata;
}

const ProductSpecs = ({ label, value, colorVar = null }) => (
	<>
		<div className={styles.specLabel}>{label}:</div>
		<div className={styles.specValue} style={colorVar ? { color: `var(${colorVar})` } : undefined}>
			{value}
		</div>
	</>
);

const ProductImage = ({ src, name }) => (src ? <Image src={src} alt={`Ảnh sản phẩm: ${name}`} fill priority /> : <NullImage />);

async function Product({ params }) {
	const { id } = await params;
	const product = await getProductById(id);
	if (!product) return <div>Product not found</div>;

	const locale = product.currency === "VND" ? "vi-VN" : "en-US";
	const stockStatus = product.stock > 0 ? `Còn hàng (${product.stock})` : "Hết hàng";

	const specs = [
		{ label: "Thương hiệu", value: capitalize(product.brand) },
		{ label: "Layout", value: product.layout },
		{ label: "Chất liệu", value: upperFirst(product.caseMaterial) },
		{ label: "Switch", value: upperFirst(product.switchType) },
		{ label: "Model", value: upperFirst(product.model) },
		{ label: "Series", value: upperFirst(product.series) },
		{ label: "Tình trạng", value: upperFirst(stockStatus), colorVar: product.stock > 0 ? "--success" : "--error" },
	];

	return (
		<div className={`${styles.container} top-container`}>
			<div className={styles.imageSection}>
				<ProductImage src={product.src} name={product.name} />
			</div>
			<div className={styles.detailsSection}>
				<h1 className={styles.name}>{product.name.toUpperCase()}</h1>
				<h2 className={styles.price}>
					{product.price.toLocaleString(locale)}
					<span> {product.currency}</span>
				</h2>
				<p className={styles.description}>{product.description}</p>

				<div className={styles.specs}>
					{specs.map(({ label, value, colorVar }) => (
						<ProductSpecs key={label} label={label} value={value} colorVar={colorVar} />
					))}
				</div>

				<div className={styles.actions}>
					<LinkBtn href="/cart" text="Thêm vào giỏ hàng" icon={faCartShopping} disabled={product.stock <= 0} />
				</div>
			</div>
		</div>
	);
}

export default Product;
