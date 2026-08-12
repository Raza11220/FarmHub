function WishlistCard({ item }) {
  return (
    <div className="wishlist-card">
      <div className="wishlist-icon">{item.emoji}</div>

      <div className="wishlist-copy">
        <h4>{item.name}</h4>
        <p>{item.breed}</p>
      </div>

      <div className="wishlist-right">
        <strong>{item.price}</strong>
        <button type="button" className="wishlist-btn">View</button>
      </div>
    </div>
  );
}

export default WishlistCard;
