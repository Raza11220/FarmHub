import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Heart,
  MapPin,
  Phone,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  UserRound,
  Check,
  ZoomIn,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { livestock } from "../data/livestock";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import "./AnimalDetails.css";

const sellerDetails = {
  name: "Green Valley Farms",
  phone: "+92 300 1234567",
  location: "Lahore, Punjab",
  rating: 4.9,
  reviews: 128,
};

const reviewList = [
  {
    name: "Ayesha",
    rating: 5,
    text: "Excellent animal quality and very healthy condition. The farmer was transparent and helpful throughout the process.",
  },
  {
    name: "Ali",
    rating: 5,
    text: "Strong animal, clean documentation, and very professional handling. Highly recommended seller.",
  },
  {
    name: "Hassan",
    rating: 4,
    text: "Good breeding stock and beautiful condition. Delivery and communication were smooth.",
  },
];

function AnimalDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const animal = livestock.find((item) => item.id === id);

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 400);
    return () => window.clearTimeout(timer);
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!animal) return [];
    return [animal.image, animal.image, animal.image, animal.image];
  }, [animal]);

  const relatedAnimals = useMemo(() => {
    if (!animal) return [];
    return livestock.filter((item) => item.category === animal.category && item.id !== animal.id).slice(0, 3);
  }, [animal]);

  if (!animal) {
    return (
      <main className="not-found">
        <h1>Animal Not Found</h1>
        <p>The livestock you are looking for does not exist.</p>

        <Link to="/livestock">
          <ArrowLeft size={18} />
          Back to Livestock
        </Link>
      </main>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-PK").format(animal.price);

  return (
    <>
      <Navbar />
      <main className="animal-details-page">
        <Link to="/livestock" className="back-link">
          <ArrowLeft size={18} />
          Back to Livestock
        </Link>

        <section className="animal-detail-layout">
          <div className="gallery-panel">
            {isLoading ? (
              <div className="detail-loading">
                <div className="detail-loader" />
              </div>
            ) : (
              <>
                <div className="main-image-wrap">
                  <button type="button" className="zoom-toggle" onClick={() => setIsZoomed((value) => !value)}>
                    <ZoomIn size={18} />
                    {isZoomed ? "Exit Zoom" : "Zoom"}
                  </button>

                  <img
                    src={galleryImages[selectedImage]}
                    alt={animal.name}
                    className={isZoomed ? "main-detail-image zoomed" : "main-detail-image"}
                  />

                  <span className="detail-animal-id">{animal.id}</span>
                </div>

                <div className="image-thumbs">
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${animal.id}-${index}`}
                      type="button"
                      className={selectedImage === index ? "thumb active" : "thumb"}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt={`${animal.name} view ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="animal-detail-content">
            <span className="detail-category">
              {animal.category} · {animal.breed}
            </span>

            <div className="title-row">
              <h1>{animal.name}</h1>

              <div className="icon-actions">
                <button type="button" className={isFavorite ? "mini-action active" : "mini-action"} onClick={() => setIsFavorite((value) => !value)}>
                  <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button type="button" className="mini-action" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <p className="detail-description">{animal.description}</p>

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
                <strong>PKR {formattedPrice}</strong>
              </div>

              <span className={animal.status === "Sold" ? "detail-status sold" : "detail-status available"}>{animal.status}</span>
            </div>

            <div className="cta-row">
              <button type="button" className="action-primary" onClick={() => addToCart(animal)}>
                <ShoppingCart size={18} />
                Add To Cart
              </button>

              <Link to="/checkout" className="action-secondary">
                Buy Now
              </Link>
            </div>

            <div className="seller-box">
              <div className="seller-header">
                <div className="seller-avatar">
                  <UserRound size={20} />
                </div>

                <div>
                  <p className="muted-label">Seller</p>
                  <h3>{sellerDetails.name}</h3>
                </div>
              </div>

              <div className="seller-meta">
                <div>
                  <MapPin size={16} />
                  <span>{sellerDetails.location}</span>
                </div>
                <div>
                  <Phone size={16} />
                  <span>{sellerDetails.phone}</span>
                </div>
                <div>
                  <Star size={16} />
                  <span>
                    {sellerDetails.rating} ({sellerDetails.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="info-strip">
              <div>
                <ShieldCheck size={18} />
                <span>Health Certificate</span>
                <strong>Verified</strong>
              </div>

              <div>
                <CheckCircle size={18} />
                <span>Vaccination</span>
                <strong>Complete</strong>
              </div>
            </div>

            {animal.status === "Available" && (
              <div className="verified-message">
                <CheckCircle size={18} />
                This livestock is currently available.
              </div>
            )}
          </div>
        </section>

        <section className="details-lower-grid">
          <div className="info-panel">
            <h3>Health & Care</h3>

            <ul className="check-list">
              <li><Check size={16} /> Health certificate issued by veterinary authority</li>
              <li><Check size={16} /> Vaccination schedule completed and documented</li>
              <li><Check size={16} /> Suitable for breeding and farm use</li>
              <li><Check size={16} /> Under regular monitoring and care</li>
            </ul>
          </div>

          <div className="info-panel reviews-panel">
            <h3>Customer Reviews</h3>

            <div className="review-summary">
              <strong>4.9</strong>
              <div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span>Based on {sellerDetails.reviews} reviews</span>
              </div>
            </div>

            {reviewList.map((review) => (
              <div key={review.name} className="review-item">
                <div className="review-header">
                  <strong>{review.name}</strong>
                  <div className="stars small">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="related-section">
          <div className="related-header">
            <h3>Related Animals</h3>
            <Link to="/livestock">View all</Link>
          </div>

          <div className="related-grid">
            {relatedAnimals.map((item) => (
              <Link key={item.id} to={`/livestock/${item.id}`} className="related-card">
                <div className="related-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="related-body">
                  <span>{item.category}</span>
                  <h4>{item.name}</h4>
                  <strong>PKR {new Intl.NumberFormat("en-PK").format(item.price)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default AnimalDetails;