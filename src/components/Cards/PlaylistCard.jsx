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
        <div className="userName">{name}</div>
        <div className="detail-box">
          <div className="gitDetail">
            <span>Song Count</span>
            {count}
          </div>
        </div>
        <button className="addTo" onClick={() => handleTransfer(id)}>
          Add To {addTo}
        </button>
      </div>
    </div>
  );
};
