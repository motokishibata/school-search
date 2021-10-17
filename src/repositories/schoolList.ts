import { ParsedUrlQuery } from 'querystring';
import schoolData from './schoolList.json';

function getSchoolData(): SchoolList {
  return JSON.parse(JSON.stringify(schoolData));
}

type Course = {
  name: string,
  price: number,
  period: number,
};

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

//const schools: SchoolList = schoolData;

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

export function getSchoolList(condition: Condition): SchoolList {
  const schools = getSchoolData();
  if (isEmpty(condition)) {
    return schools;
  }
  
  const result: SchoolList = {};
  const isMatchSkill = (skills: string[], school: School): boolean => {
    for (const skill of skills) {
      if (school.skills.includes(skill)) {
        return true;
      }
    }
    return false;
  }

  const isMatchPrice = ([lower, upper]: [number?, number?], school: School): boolean => {
    if (!lower && !upper) {
      return false;
    }
    
    const coursePrices = school.courses.map(course => course.price);
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

  const isMatchPeriod = ([lower, upper]: [number?, number?], school: School): boolean => {
    if (!lower && !upper) {
      return false;
    }
    
    const periods = school.courses.map(c => c.period);
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