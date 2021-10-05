import { ParsedUrlQuery } from 'querystring';
import thumbnail from '../../public/150x150.png';

export type School = {
  name: string,
  summary: string,
  thumbnail: StaticImageData,
  learnStyle: string[]
  skills: string[]
  url: {
    official: string,
    detail: string
  }
}

export interface SchoolList {
  [key: string]: School
}

const schools: SchoolList = {
  techacademy: {
    name: "TechAcademy",
    summary: "オンライン完結のスクールとして実績が豊富。",
    thumbnail: thumbnail,
    learnStyle: ["オンライン", "マンツーマン"],
    skills: ["HTML/CSS", "Ruby", "Ruby on Rails"],
    url: {
      official: "https://google.com",
      detail: "https://google.com",
    }
  },
  techcamp: {
    name: "テックキャンプ",
    summary: "最短4週間で未経験からエンジニアを目指せる",
    thumbnail: thumbnail,
    learnStyle: ["オンライン"],
    skills: ["HTML/CSS", "Ruby", "Ruby on Rails"],
    url: {
      official: "https://google.com",
      detail: "https://google.com",
    }
  },
}

type Condition = {
  skills?: string[]
}

export function toCondition(query: ParsedUrlQuery): Condition {
  const keys = Object.keys(query);
  return query as Condition;
}

function isEmpty(condition: Condition): boolean {
  return Object.keys(condition).length === 0;
}

export function getSchoolList(condition: Condition): SchoolList {
  if (isEmpty(condition)) {
    return schools;
  }
  
  const result: SchoolList = {};
  const checkSkills = (key: string, school: School) => {
    for (const skill of condition.skills) {
      if (school.skills.includes(skill)) {
        result[key] = school;
        return;
      }
    }
  }

  for (const key of Object.keys(schools)) {
    const school = schools[key];
    condition.skills && checkSkills(key, school);
  }
  return result;
}