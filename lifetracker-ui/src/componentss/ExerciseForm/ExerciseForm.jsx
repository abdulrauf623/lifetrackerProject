import { useState } from "react";

import "./ExerciseForm.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import APIClient from "../service/APIClient";
import { useEffect } from "react";

import axios from "axios";

const categoryOptions = [
  { key: 1, label: "Endurance", value: "endurance" },
  { key: 2, label: "Strength", value: "strength" },
  { key: 3, label: "Flexibility", value: "flexibility" },
  { key: 4, label: "Balance", value: "balance" },
];

export default function ExerciseForm({ addPost, user }) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    exercise_name: "",
    category: "",
    date: "",
    duration: "",
    intensity: 0,
  });

  const handleOnInputChange = (event) => {
    if (form.intensity > 10) {
      console.log("In here?");
      setErrors((e) => ({
        ...e,
        intensity: "Intensity cannot be greater than 10 or less than 0",
      }));
    } else {
      setErrors((e) => ({ ...e, intensity: null }));
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  console.log("Form?", form);

  const handleOnSubmit = async (event) => {
    setErrors((e) => ({ ...e, form: null }));

    event.preventDefault();

    const { data, error } = await APIClient.createPost({
      exercise_name: form.exercise_name,
      category: form.category,
      intensity: form.intensity,
      duration: form.duration,
    });

    console.log("Error?", error);
    console.log("Data?", data);

    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    if (data) {
      addPost(data.exercisePost);
    }
  };
  return (
    <div className="Register">
      <div className="media"></div>
      <div className="card">
        <h2>Add Exercise</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="exercise_name"
              placeholder="Jane"
              value={form.exercise_name}
              onChange={handleOnInputChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="name">Select a date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleOnInputChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="name">Category</label>
            <select
              name="category"
              onChange={(event) =>
                setForm((f) => ({ ...f, category: event.target.value }))
              }
              value={form.category}
            >
              {categoryOptions.map((category) => (
                <option key={category.key} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <br />

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">Duration(min)</label>
              <input
                type="number"
                name="duration"
                placeholder="1"
                value={form.duration}
                onChange={handleOnInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="name">Intensity</label>
              <input
                type="number"
                name="intensity"
                placeholder="1"
                value={form.intensity}
                onChange={handleOnInputChange}
              />
            </div>
          </div>

          {errors.intensity && (
            <span className="error">{errors.intensity}</span>
          )}

          <Link to="/exercise">
            <button onClick={handleOnSubmit}> Save</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
