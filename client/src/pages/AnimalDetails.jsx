import { ArrowLeft, CheckCircle, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { livestock } from "../data/livestock";
import Navbar from "../components/Navbar";
import "./AnimalDetails.css";

function AnimalDetails() {
  const { id } = useParams();

  const animal = livestock.find(
    (item) => item.id === id
  );

  if (!animal) {
    return (
      <main className="not-found">
        <h1>Animal Not Found</h1>
        <p>
          The livestock you are looking for does not exist.
        </p>

        <Link to="/livestock">
          <ArrowLeft size={18} />
          Back to Livestock
        </Link>
      </main>
    );
  }

  const formattedPrice = new Intl.NumberFormat(
    "en-PK"
  ).format(animal.price);

  return (
    <>
      <Navbar />
      <main className="animal-details-page">

        <Link
          to="/livestock"
          className="back-link"
        >
          <ArrowLeft size={18} />
          Back to Livestock
        </Link>

        <section className="animal-detail-layout">

          {/* Animal Visual */}
          <div className="animal-detail-visual">

            <span className="detail-animal-id">
              {animal.id}
            </span>

            <span className="detail-emoji">
              {animal.emoji}
            </span>

          </div>

          {/* Animal Information */}
          <div className="animal-detail-content">

            <span className="detail-category">
              {animal.category} · {animal.breed}
            </span>

            <h1>{animal.name}</h1>

            <p className="detail-description">
              {animal.description}
            </p>

            <div className="detail-info-grid">

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

              <div>
                <span>Breed</span>
                <strong>{animal.breed}</strong>
              </div>

            </div>

            <div className="detail-purchase">

              <div>
                <span>Price</span>

                <strong>
                  PKR {formattedPrice}
                </strong>
              </div>

              <span
                className={
                  animal.status === "Sold"
                    ? "detail-status sold"
                    : "detail-status available"
                }
              >
                {animal.status}
              </span>

            </div>

            {animal.status === "Available" && (
              <Link
                to="/contact"
                className="enquire-btn"
              >
                <Phone size={18} />
                Enquire Now
              </Link>
            )}

            {animal.status === "Available" && (
              <div className="verified-message">
                <CheckCircle size={18} />
                This livestock is currently available.
              </div>
            )}

          </div>

        </section>

      </main>
    </>
  );
}

export default AnimalDetails;