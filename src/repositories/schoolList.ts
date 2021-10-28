import { ParsedUrlQuery } from 'querystring';
import schoolData from './schoolList.json';
import courceData from './cources.json';

export function getSchool(id: string): School {
  const schools = getSchoolData();
  return schools[id];
}

function getSchoolData(): SchoolList {
  const schools = JSON.parse(JSON.stringify(schoolData));
  const keys = Object.keys(schools);
  for (const key of keys) {
    if (key in courceData) {
      schools[key].courses = courceData[key];
    }
  }
  return schools;
}

type Course = {
  name: string,
  skills: string[],
  plans: Plan[],
};

export type Plan = Partial<{
  name: string,
  period: number,
  lessons: number,
  target: string,
  addmisionFee: number,
  monthlyFee: number,
  tuitionFee: number
  subplans: Omit<Plan, "subplans">[]
}>;

export type School = {
  name: string,
  summary: string,
  thumbnail: string,
  learnStyle: string[]
  skills: string[]
  url: {
    official: string,
    detail: string
  },
  courses: Course[]
}

export interface SchoolList {
  [key: string]: School
}

type Condition = {
  skills?: string[],
  price?: [number?, number?],
  period?: [number?, number?],
  area?: string,
  target?: string,
  features?: string[]
};

export function toCondition(query: ParsedUrlQuery): Condition {
  const condition: Condition = {};
  const skills: string[] = [];
  const keys = Object.keys(query);
  for (const key of keys) {
    if (key.startsWith("skill_")) {
      const name = key.substring(6);
      skills.push(name);
    }
    if (key === "price" && query[key] !== "") {
      const [left, right] = query[key].toString().split("_");
      const lower = (left === "") ? null : parseInt(left);
      const upper = (right === "") ? null : parseInt(right);
      condition['price'] = [lower, upper];
    }
    if (key === "period" && query[key] !== "") {
      const [left, right] = query[key].toString().split("_");
      const lower = (left === "") ? null : parseInt(left);
      const upper = (right === "") ? null : parseInt(right);
      condition['period'] = [lower, upper];
    }
  }

  if (skills.length > 0) {
    condition['skills'] = skills;
  }
  return condition;
}

function isEmpty(condition: Condition): boolean {
  return Object.keys(condition).length === 0;
}

function isMatchSkill(skills: string[], school: School): boolean {
  const schoolSkills = school.courses.flatMap(c => c.skills);
  for (const skill of skills) {
    if (schoolSkills.includes(skill)) {
      return true;
    }
  }
  return false;
}

function isMatchPrice([lower, upper]: [number?, number?], school: School): boolean {
  if (!lower && !upper) {
    return false;
  }
  
  const plans = school.courses.map(course => course.plans).flat();
  const coursePrices = plans.map(p => p.tuitionFee);
  if (lower && upper) {
    for (const price of coursePrices) {
      if (lower <= price && price <= upper) {
        return true;
      }
    }
    return false;
  }
  else if (!lower && upper) {
    for (const price of coursePrices) {
      if (price <= upper) {
        return true;
      }
    }
    return false;
  }
  else {
    for (const price of coursePrices) {
      if (lower <= price) {
        return true;
      }
    }
    return false;
  }
}

function isMatchPeriod([lower, upper]: [number?, number?], school: School): boolean {
  if (!lower && !upper) {
    return false;
  }
  
  const plans = school.courses.flatMap(c => c.plans);
  const periods = plans.map(p => p.period);
  if (lower && upper) {
    for (const period of periods) {
      if (lower <= period && period <= upper) {
        return true;
      }
    }
    return false;
  }
  else if (!lower && upper) {
    for (const period of periods) {
      if (period <= upper) {
        return true;
      }
    }
    return false;
  }
  else {
    for (const period of periods) {
      if (lower <= period) {
        return true;
      }
    }
    return false;
  }
}

export function getSchoolList(condition: Condition): SchoolList {
  const schools = getSchoolData();
  if (isEmpty(condition)) {
    return schools;
  }
  
  const result: SchoolList = {};
  for (const key of Object.keys(schools)) {
    const school = schools[key];
    if (condition.skills && isMatchSkill(condition.skills, school)) {
      result[key] = school;
      continue;
    }
    
    if (condition.price && isMatchPrice(condition.price, school)) {
      result[key] = school;
      continue;
    }

    if (condition.period && isMatchPeriod(condition.period, school)) {
      result[key] = school;
      continue;
    }
  }
  return result;
}