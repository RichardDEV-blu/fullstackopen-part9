export interface NewDiaryEntry {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export type Visibility = "great" | "good" | "ok" | "poor";
