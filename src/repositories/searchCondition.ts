import data from './searchCondition.json';

type RangeOption = {
	range: {
		min: number,
		max: number
	},
	display: string
};

export const skills = data.skill;
export const prices: RangeOption[] = data.price.map(p => {
	return {
		range: {
			min: Number(p[0]),
			max: Number(p[1])
		},
		display: p[2].toString()
	};
});
export const learnStyles = data.style;
export const periods: RangeOption[] = data.period.map(p => {
	return {
		range: {
			min: Number(p[0]),
			max: Number(p[1])
		},
		display: p[2].toString()
	};
});
export const areas = data.area;
export const targets = data.target;