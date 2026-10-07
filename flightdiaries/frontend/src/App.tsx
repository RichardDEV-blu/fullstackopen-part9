import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import type { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          <p>Comment: {diary.comment ?? ""}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
