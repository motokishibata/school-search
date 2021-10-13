import { ParsedUrlQuery } from 'querystring';
import thumbnail from '../assets/150x150.png';

type Course = {
  name: string,
  price: number,
  period: number,
};

export type School = {
  name: string,
  summary: string,
  thumbnail: StaticImageData,
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

const schools: SchoolList = {
  techacademy: {
    name: "TechAcademy",
    summary: "オンライン完結のスクールとして実績が豊富。",
    thumbnail: thumbnail,
    learnStyle: ["オンライン"],
    skills: ["HTML/CSS", "Ruby", "Ruby on Rails", "Python"],
    url: {
      official: "https://techacademy.jp/",
      detail: "/posts/techacademy",
    },
    courses: [
      { name: "AA", price: 100000, period: 16 },
      { name: "BB", price: 200000, period: 48 }
    ]
  },
  techcamp: {
    name: "テックキャンプ",
    summary: "最短4週間で未経験からエンジニアを目指せる",
    thumbnail: thumbnail,
    learnStyle: ["オンライン", "通学"],
    skills: ["HTML/CSS", "Ruby", "Ruby on Rails"],
    url: {
      official: "https://tech-camp.in/",
      detail: "/posts/techcamp",
    },
    courses: [
      { name: "AA", price: 30000, period: 2 },
      { name: "BB", price: 600000, period: 24 }
    ]
  },
  samurai: {
    name: "SAMURAIエンジニア塾",
    summary: "オーダーメイドのカリキュラム",
    thumbnail: thumbnail,
    learnStyle: ["オンライン"],
    skills: ["ALL"],
    url: {
      official: "https://www.sejuku.net/",
      detail: "/posts/samurai",
    },
    courses: [
      { name: "AA", price: 30000, period: 2},
      { name: "BB", price: 800000, period: 24 }
    ]
  },
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

export function getSchoolList(condition: Condition): SchoolList {
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