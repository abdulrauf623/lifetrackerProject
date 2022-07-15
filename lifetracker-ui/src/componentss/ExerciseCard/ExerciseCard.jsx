import "./ExerciseCard.css";
export default function ExerciseCard({ product }) {
  return (
    <div className="exercise-grid">
      <div className="exercises">
        <div className="category">{product.exercise_name}</div>
        <div className="category">{product.category} </div>
        <div className="category">{product.intensity} </div>
        <div className="category">{product.duration} </div>
      </div>
    </div>
  );
}
