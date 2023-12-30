import "./style.css";
export const PlaylistCard = ({
  name,
  count,
  addTo,
  image,
  handleTransfer,
  id,
}) => {
  return (
    <div className="card_item">
      <div className="card_inner">
        {image && <img src={image} alt="Song image" />}
        <div className="songName">{name}</div>
        <div className="detail-box">
          <div className="songCount">
            <span>Song Count : {count}</span>
          </div>
        </div>
        <button className="addTo" onClick={() => handleTransfer(id)}>
          Transfer To {addTo}
        </button>
      </div>
    </div>
  );
};
