import type {} from '$lib/types';

export type FormItem = {
	productId?: number;
	quantity?: number;
};

const isValidFormItem = (item: FormItem): item is Required<FormItem> => {
	return item.productId != undefined && item.quantity != undefined;
};

export const cartUtils = { isValidFormItem };
