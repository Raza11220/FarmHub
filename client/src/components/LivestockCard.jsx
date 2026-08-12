import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function LivestockCard({ animal }) {
  const { addToCart } = useCart();
  const formattedPrice = new Intl.NumberFormat("en-PK").format(
    animal.price
  );

  return (
    <Link
      to={`/livestock/${animal.id}`}
      className="livestock-card-link"
    >
      <article className="livestock-card">

        {/* Animal Image */}
        <div className="animal-image">

          <img
            src={animal.image}
            alt={animal.name}
            className="animal-photo"
          />

          <span className="animal-id">
            {animal.id}
          </span>

        </div>


        {/* Animal Content */}
        <div className="animal-content">

          <p className="animal-category">
            {animal.category} · {animal.breed}
          </p>


          <h3>
            {animal.name}
          </h3>


          {/* Animal Details */}
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


          {/* Description */}
          <p className="animal-description">
            {animal.description}
          </p>


          {/* Footer */}
          <div className="animal-footer">

            <strong>
              PKR {formattedPrice}
            </strong>


            <span
              className={
                animal.status === "Sold"
                  ? "status sold"
                  : "status available"
              }
            >
              {animal.status}
            </span>

          </div>

          <div className="card-actions">
            <button
              className="cart-btn"
              onClick={(e) => {
                e.preventDefault();

                addToCart(animal);

                console.log("Added:", animal.name);
              }}
            >
              🛒 Add to Cart
            </button>
          </div>

        </div>

      </article>
    </Link>
  );
}

export default LivestockCard;