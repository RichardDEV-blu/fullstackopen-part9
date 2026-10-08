import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import type { DiaryEntry, NewDiaryEntry } from "./types";
import axios from "axios";

const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"] as const;
const visibilityOptions = ["great", "good", "ok", "poor"] as const;
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "",
    weather: "sunny",
    visibility: "great",
    comment: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data);
    });
  }, []);
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const createdDiary = await diaryService.create(newDiary);
      setDiaries((previousDiaries) => previousDiaries.concat(createdDiary));
      setNewDiary({
        date: "",
        weather: "sunny",
        visibility: "great",
        comment: "",
      });
      setError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error ?? "Unknown Axios Error");
      } else {
        setError("Unknown error");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({
      ...newDiary,
      [name]: value,
    });
    setError(null);
  };
  return (
    <div>
      {error && <p>Error: {error}</p>}
      <h1>Flight Diaries</h1>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          <p>Comment: {diary.comment ?? ""}</p>
        </div>
      ))}

      <h2>Add new diary entry</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date
            <input
              type="date"
              name="date"
              value={newDiary.date}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          Weather:
          {weatherOptions.map((weather) => (
            <label key={weather}>
              <input
                type="radio"
                name="weather"
                value={weather}
                checked={newDiary.weather === weather}
                onChange={handleChange}
              />
              {weather}
            </label>
          ))}
        </div>

        <div>
          Visibility:
          {visibilityOptions.map((visibility) => (
            <label key={visibility}>
              <input
                type="radio"
                name="visibility"
                value={visibility}
                checked={newDiary.visibility === visibility}
                onChange={handleChange}
              />
              {visibility}
            </label>
          ))}
        </div>

        <div>
          <label>
            Comment
            <input
              name="comment"
              value={newDiary.comment}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
