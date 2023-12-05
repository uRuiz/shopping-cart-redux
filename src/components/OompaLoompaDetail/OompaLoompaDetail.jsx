import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOompaLoompaDetailsIfNeeded } from "../../store/oompaLoompa/oompaLoompaThunks";
import "./OompaLoompaDetail.css";
import { OompaLoompaDescription } from "./OompaLoompaDescription";

export const OompaLoompaDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(
    (state) => state.oompaLoompas.details,
  );
  const details = useSelector((state) => state.oompaLoompas.details.data[id]);

  useEffect(() => {
    if (!details || (details && !details.lastFetched)) {
      dispatch(fetchOompaLoompaDetailsIfNeeded(id));
    }
  }, [dispatch, id, details]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!details) return <div>No Oompa Loompa found</div>;

  return (
    <div className="detail-view">
      <div className="detail-image">
        <img
          src={details.image}
          alt={`${details.firstName} ${details.lastName}`}
        />
      </div>
      <div className="detail-info">
        <h2>{`${details.firstName} ${details.lastName}`}</h2>
        <p>{details.gender === "F" ? "Woman" : "Man"}</p>
        <p>{details.profession}</p>
        <div className="detail-description">
          <OompaLoompaDescription description={details.description} />
        </div>
      </div>
    </div>
  );
};
