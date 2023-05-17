import { useParams } from "react-router-dom";

export default function Note() {
  const { id } = useParams();

  return (
    <div>
      <p>This is the note with ID: {id}</p>
    </div>
  );
}
