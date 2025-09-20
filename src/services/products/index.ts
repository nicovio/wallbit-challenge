import type { Product } from '../../lib/types';

const BASE_URL = 'https://fakestoreapi.com/products';

const getProduct = async (id: number): Promise<Product> => {
	const response = await fetch(`${BASE_URL}/${id}`);
	return await response.json();
};

export const productsService = { getProduct };
