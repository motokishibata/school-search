import data from './searchCondition.json';

export type SkillConditions = {
	langage: string[],
	framework: string[],
	database: string[],
	cloud: string[],
	virtual: string[],
	tool: string[]
}
export type Conditions = {
	skills: SkillConditions,
	prices: RangeOption[],
	learnStyles: string[],
	periods: RangeOption[],
	areas: string[],
	targets: string[]
};

export type RangeOption = {
	range: {
		min: number,
		max: number
	},
	display: string
};

const skills: SkillConditions = data.skill;
const prices: RangeOption[] = data.price.map(p => {
		return {
			range: {
				min: Number(p[0]),
				max: Number(p[1])
			},
			display: p[2].toString()
		} as RangeOption;
	});

const learnStyles: string[] = data.style;
const periods: RangeOption[] = data.period.map(p => {
	return {
		range: {
			min: Number(p[0]),
			max: Number(p[1])
		},
		display: p[2].toString()
	};
});
const areas: string[] = data.area;
const targets: string[] = data.target;

const conditions: Conditions = {
	skills: skills,
	prices: prices,
	learnStyles: learnStyles,
	periods: periods,
	areas: areas,
	targets: targets,
};
export default conditions;