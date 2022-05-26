export interface ISongInfo {
  id: number | string
  displayName: string
  original_name: string
  singer: string
  language: string
  keyword: string
  isNull: boolean
}

export interface ISongLanguage {
  language: string
  sortNum: number,
}

export interface ISongkeyword {
  id: number
  keyword: string
  sortNum: number
}