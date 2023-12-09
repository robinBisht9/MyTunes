import "./style.css";
export const PlaylistCard = ({ name, count, addTo, image, handleTransfer }) => {
  return (
    <div className="card_item">
      <div className="card_inner">
        <img src={image} alt="Song image" />
        <div className="userName">{name}</div>
        <div className="detail-box">
          <div className="gitDetail">
            <span>Song Count</span>
            {count}
          </div>
        </div>
        <button className="addTo">Add To {addTo}</button>
      </div>
    </div>
  );
};
