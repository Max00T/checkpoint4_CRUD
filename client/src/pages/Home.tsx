import { useLoaderData } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  //const cds = useLoaderData();
  const cds = useLoaderData() as Cd[];

  return (
    <>
      <h2>liste des Cds</h2>

      <ul className="cd-list">
        {cds.map((cd) => (
          <li key={cd.id} className="cd-item">
            <div className="description">
              <h3>
                {cd.band_name} - {cd.album_name} ({cd.release_year})
              </h3>

              {cd.rating && (
                <div className="cd-details">
                  <p>Note : {cd.rating}/5</p>
                  <p>{cd.review_text}</p>
                </div>
              )}
            </div>

            {cd.cover && (
              <img
                src={cd.cover}
                alt={`${cd.album_name} cover`}
                className="cd-cover"
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
