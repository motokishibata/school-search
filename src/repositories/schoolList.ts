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

export function getSchoolList(): SchoolList {
  return schools;
}