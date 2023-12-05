import { useNavigate } from "react-router-dom";
import "./OompaLoompaItem.css";

export const OompaLoompaItem = ({
  id,
  firstName,
  lastName,
  gender,
  profession,
  image,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${id}`);
  };
  return (
    <div className="oompaLoompaItem" onClick={handleClick}>
      <img
        src={image}
        alt={`${firstName} ${lastName}`}
        className="oompaLoompaImage"
      />
      <h3 className="oompaLoompaName">{`${firstName} ${lastName}`}</h3>
      <p className="oompaLoompaGender">{gender === "F" ? "Woman" : "Man"}</p>
      <p className="oompaLoompaProfession">{profession}</p>
    </div>
  );
};
