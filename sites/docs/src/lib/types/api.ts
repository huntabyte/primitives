export type PropType = {
	type: string;
	definition: string;
};

export type PropSchema = {
	default?: string;
	type: PropType | string;
	description: string;
	required?: boolean;
};

export type PropObj<T, U = Omit<T, "style">> = {
	[K in keyof U]-?: PropSchema;
};

export type SlotPropObj = Record<string, PropSchema>;

export type DataAttrSchema = {
	name: string;
	value?: string;
	description?: string;
	isEnum?: boolean;
};

export type APISchema<T = Record<string, unknown>> = {
	title: string;
	description: string;
	props?: PropObj<Omit<T, "style">>;
	slotProps?: SlotPropObj;
	dataAttributes?: DataAttrSchema[];
};
