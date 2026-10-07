import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import type { DiaryEntry, NewDiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "",
    weather: "sunny",
    visibility: "great",
    comment: "",
  });
  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data);
    });
  }, []);
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const createdDiary = await diaryService.create(newDiary);
    setDiaries((previousDiaries) => previousDiaries.concat(createdDiary));
    setNewDiary({
      date: "",
      weather: "sunny",
      visibility: "great",
      comment: "",
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({
      ...newDiary,
      [name]: value,
    });
  };
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

      <h2>Add new diary entry</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date
            <input name="date" value={newDiary.date} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            Weather
            <input
              name="weather"
              value={newDiary.weather}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Visibility
            <input
              name="visibility"
              value={newDiary.visibility}
              onChange={handleChange}
            />
          </label>
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
