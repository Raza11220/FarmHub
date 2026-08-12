import { Link } from "react-router-dom";
import { Heart, ArrowLeftRight, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

function LivestockCard({
  animal,
  isFavorite = false,
  isCompared = false,
  onToggleFavorite,
  onToggleCompare,
  viewMode = "grid",
}) {
  const { addToCart } = useCart();
  const formattedPrice = new Intl.NumberFormat("en-PK").format(animal.price);

  return (
    <Link to={`/livestock/${animal.id}`} className="livestock-card-link">
      <article className={viewMode === "list" ? "livestock-card list-view" : "livestock-card"}>
        <div className="animal-image">
          <img src={animal.image} alt={animal.name} className="animal-photo" />
          <span className="animal-id">{animal.id}</span>

          <div className="quick-actions">
            <button
              type="button"
              className={isFavorite ? "quick-action active" : "quick-action"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onToggleFavorite) onToggleFavorite();
              }}
              aria-label="Favorite animal"
            >
              <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
            </button>

            <button
              type="button"
              className={isCompared ? "quick-action active" : "quick-action"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onToggleCompare) onToggleCompare();
              }}
              aria-label="Compare animal"
            >
              <ArrowLeftRight size={15} />
            </button>
          </div>
        </div>

        <div className="animal-content">
          <p className="animal-category">
            {animal.category} · {animal.breed}
          </p>

          <h3>{animal.name}</h3>

          <div className="animal-details">
            <div>
              <span>Gender</span>
              <strong>{animal.gender}</strong>
            </div>

            <div>
              <span>Age</span>
              <strong>{animal.age}</strong>
            </div>

            <div>
              <span>Weight</span>
              <strong>{animal.weight}</strong>
            </div>
          </div>

          <p className="animal-description">{animal.description}</p>

          <div className="animal-footer">
            <strong>PKR {formattedPrice}</strong>
            <span className={animal.status === "Sold" ? "status sold" : "status available"}>{animal.status}</span>
          </div>

          <div className="card-actions">
            <button
              type="button"
              className="cart-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(animal);
              }}
            >
              <ShoppingCart size={15} />
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default LivestockCard;