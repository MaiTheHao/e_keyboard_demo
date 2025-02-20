import styles from './Product.module.scss';
import { getProductById } from '@/lib/fetchProduct';
import { PRODUCT_PAGE_METADATA } from '../../../../../constants';
import Image from 'next/image';
import { generateCurrencyString, upperFirst } from '@/utils/text';
import clsx from 'clsx';
import MainShowCardActions from '@/app/ui/components/pages/product/MainShowCardActions';

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
	const product = await getProductById(id);
	return (
		<div className={styles.container}>
			<div className={`${styles.mainShowCard} ${styles.showCard}`}>
				<div className={styles.mainShowCard__image}>
					<Image
						src={product.src}
						alt={product.name}
						fill
						priority
						quality={100}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						style={{
							objectFit: 'contain',
							padding: 'clamp(0.5rem, 2vw, 1rem)',
						}}
					/>
				</div>
				<div className={styles.mainShowCard__info}>
					<h1 className={styles.mainShowCard__info__name}>{upperFirst(product.name)}</h1>
					<span className={styles.mainShowCard__info__splitLine}></span>
					<span className={styles.mainShowCard__info__price}>
						{generateCurrencyString(product.price, product.currency)} {product.currency}
					</span>
					<div className={styles.mainShowCard__info__details}>
						<span className={styles.mainShowCard__info__details__item}>
							Bố cục:<span>{upperFirst(product.layout)}</span>
						</span>
						<span className={styles.mainShowCard__info__details__item}>
							Chất liệu vỏ:
							<span>{upperFirst(product.caseMaterial)}</span>
						</span>
						<span className={styles.mainShowCard__info__details__item}>
							RGB Backlit:
							<span>{product.rgbBacklit ? 'Có' : 'Không'}</span>
						</span>
						<span className={styles.mainShowCard__info__details__item}>
							Hotswap:
							<span>{product.hotswap ? 'Có' : 'Không'}</span>
						</span>
						<span className={styles.mainShowCard__info__details__item}>
							Loại switch:
							<span>{upperFirst(product.switchType)}</span>
						</span>
						<span className={styles.mainShowCard__info__details__item}>
							Rappod Trigger:
							<span>{product.rappodTrigger ? 'Có' : 'Không'}</span>
						</span>
						<span className={styles.mainShowCard__info__details__item}>
							Tồn kho:
							<span
								className={clsx({
									[styles.mainShowCard__info__details__item__goodStatus]: product.stock > 0,
									[styles.mainShowCard__info__details__item__badStatus]: product.stock <= 0,
								})}>
								{product.stock}
							</span>
						</span>
					</div>
					<MainShowCardActions productId={id} maxQuantity={product.stock} />
				</div>
			</div>
			<div className={`${styles.subShowCard} ${styles.showCard}`}></div>
		</div>
	);
}

export default Product;
