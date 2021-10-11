import { ParsedUrlQuery } from 'querystring';
import thumbnail from '../assets/150x150.png';

type Period = {
  value: number
  unit: string // y:年, m:月, w:週
};

type Course = {
  name: string,
  price: number,
  period: Period
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
      official: "https://google.com",
      detail: "https://google.com",
    },
    courses: [
      { name: "AA", price: 100000, period: { value: 4, unit: 'm'} },
      { name: "BB", price: 200000, period: { value: 1, unit: 'y'} }
    ]
  },
  techcamp: {
    name: "テックキャンプ",
    summary: "最短4週間で未経験からエンジニアを目指せる",
    thumbnail: thumbnail,
    learnStyle: ["オンライン", "通学"],
    skills: ["HTML/CSS", "Ruby", "Ruby on Rails"],
    url: {
      official: "https://google.com",
      detail: "https://google.com",
    },
    courses: [
      { name: "AA", price: 30000, period: { value: 2, unit: 'w'}},
      { name: "BB", price: 600000, period: { value: 6, unit: 'm'} }
    ]
  },
  samurai: {
    name: "SAMURAIエンジニア塾",
    summary: "オーダーメイドのカリキュラム",
    thumbnail: thumbnail,
    learnStyle: ["オンライン"],
    skills: ["ALL"],
    url: {
      official: "https://google.com",
      detail: "https://google.com",
    },
    courses: [
      { name: "AA", price: 30000, period: { value: 2, unit: 'w'}},
      { name: "BB", price: 800000, period: { value: 6, unit: 'm'} }
    ]
  },
}

type Condition = {
  skills?: string[],
  price?: [number?, number?],
  period?: string,
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
      condition['period'] = query[key].toString();
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

  const isMatchPeriod = (period: string, school: School): boolean => {
    const periods = school.courses.map(c => c.period);
    switch (period) {
      case "short": // ~1週間
        for (const p of periods) {
          if (p.unit === 'w' && p.value <= 1) {
              return true;
          }
        }
        return false;
      case "middle": // 1ヶ月~3ヶ月
        for (const p of periods) {
          if (p.unit === 'm' && p.value >= 1 && p.value <= 3) {
            return true;
          }
        }
        return false;
      case "long": // 4ヶ月~6ヶ月
        for (const p of periods) {
          if (p.unit === 'm' && p.value >= 4 && p.value <= 6) {
            return true;
          }
        }
        return false;
      case "longlong": // 6ヶ月~12ヶ月
        for (const p of periods) {
          if (p.unit === 'm' && p.value >= 6 && p.value <= 12) {
            return true;
          }
        }
        return false;
      case "verylong": // 1年~
        for (const p of periods) {
          if (p.unit === 'y' && p.value >= 1) {
            return true;
          }
        }
        return false;
      default:
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