import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  Pencil,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

const initialAnimals = [
  {
    id: 1,
    name: "Sahiwal Cow",
    category: "Cattle",
    breed: "Sahiwal",
    age: "18 months",
    gender: "Female",
    price: 285000,
    stock: 2,
    status: "Available",
    description: "High-yield dairy cow with strong health and excellent temperament.",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b0?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: 2,
    name: "Beetal Goat",
    category: "Goats",
    breed: "Beetal",
    age: "10 months",
    gender: "Male",
    price: 48000,
    stock: 5,
    status: "Reserved",
    description: "Strong and active goat ideal for breeding and farm productivity.",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

const emptyForm = {
  name: "",
  category: "Cattle",
  breed: "",
  age: "",
  gender: "Female",
  price: "",
  stock: "1",
  status: "Available",
  description: "",
  image: "",
  gallery: [],
};

const categories = ["Cattle", "Goats", "Sheep", "Poultry", "Horses"];
const genders = ["Male", "Female", "Unknown"];
const statuses = ["Available", "Reserved", "Sold"];

function AdminAnimals() {
  const [animals, setAnimals] = useState(initialAnimals);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const totalAnimals = useMemo(() => animals.length, [animals]);
  const availableAnimals = useMemo(
    () => animals.filter((animal) => animal.status === "Available").length,
    [animals]
  );

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Animal name is required.";
    if (!form.category.trim()) nextErrors.category = "Category is required.";
    if (!form.breed.trim()) nextErrors.breed = "Breed is required.";
    if (!form.age.trim()) nextErrors.age = "Age is required.";
    if (!form.description.trim()) nextErrors.description = "Description is required.";
    if (!form.price || Number(form.price) <= 0) nextErrors.price = "Valid price is required.";
    if (!form.stock || Number(form.stock) < 1) nextErrors.stock = "Stock must be at least 1.";
    if (!form.image && form.gallery.length === 0) nextErrors.image = "Please upload at least one image.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList).filter((file) => file.type.startsWith("image/"));

    if (!files.length) {
      setErrors((current) => ({ ...current, image: "Please upload valid image files." }));
      return;
    }

    const readers = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Failed to read image"));
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers)
      .then((images) => {
        setForm((current) => ({
          ...current,
          gallery: [...current.gallery, ...images],
          image: current.image || images[0],
        }));
        setErrors((current) => ({ ...current, image: "" }));
      })
      .catch(() => {
        setErrors((current) => ({ ...current, image: "Image upload failed. Please try again." }));
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const payload = {
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      category: form.category,
      breed: form.breed.trim(),
      age: form.age.trim(),
      gender: form.gender,
      price: Number(form.price),
      stock: Number(form.stock),
      status: form.status,
      description: form.description.trim(),
      image: form.image || form.gallery[0],
      gallery: form.gallery.length ? form.gallery : [form.image || ""].filter(Boolean),
    };

    if (editingId) {
      setAnimals((current) => current.map((animal) => (animal.id === editingId ? payload : animal)));
      setSuccessMessage("Animal updated successfully.");
    } else {
      setAnimals((current) => [payload, ...current]);
      setSuccessMessage("Animal added successfully.");
    }

    setIsSubmitting(false);
    resetForm();
  };

  const handleEdit = (animal) => {
    setEditingId(animal.id);
    setForm({
      name: animal.name,
      category: animal.category,
      breed: animal.breed,
      age: animal.age,
      gender: animal.gender,
      price: String(animal.price),
      stock: String(animal.stock),
      status: animal.status,
      description: animal.description,
      image: animal.image,
      gallery: animal.gallery || [animal.image],
    });
    setErrors({});
    setSuccessMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (animalId) => {
    setAnimals((current) => current.filter((animal) => animal.id !== animalId));
    if (editingId === animalId) resetForm();
    setSuccessMessage("Animal deleted successfully.");
  };

  const removePreview = (indexToRemove) => {
    setForm((current) => ({
      ...current,
      gallery: current.gallery.filter((_, index) => index !== indexToRemove),
      image: current.gallery[indexToRemove] || current.image,
    }));
  };

  return (
    <div className="admin-dashboard-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-brand-mark">FH</div>
          <div>
            <p className="admin-brand-kicker">Operations</p>
            <h3>FarmHub Admin</h3>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin animal navigation">
          <Link to="/admin" className="admin-nav-item">
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/animals" className="admin-nav-item active">
            <span>Animals</span>
          </Link>
        </nav>

        <div className="admin-sidebar-card">
          <p>Inventory</p>
          <strong>{totalAnimals}</strong>
          <span>{availableAnimals} available</span>
        </div>
      </aside>

      <main className="admin-main-panel">
        <header className="admin-topbar">
          <div className="admin-topbar-actions align-start">
            <Link to="/admin" className="admin-icon-btn" aria-label="Back to dashboard">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <p className="admin-kicker">Inventory</p>
              <h1 className="page-title">Animal Management</h1>
            </div>
          </div>
          <button type="button" className="admin-primary-btn" onClick={resetForm}>
            <Plus size={16} />
            New Animal
          </button>
        </header>

        {successMessage && (
          <div className="admin-success-banner">
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="admin-animals-layout">
          <section className="admin-panel admin-form-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-kicker">{editingId ? "Edit" : "Add"}</p>
                <h2>{editingId ? "Update Animal" : "Add New Animal"}</h2>
              </div>
            </div>

            <form className="admin-animal-form" onSubmit={handleSubmit} noValidate>
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label htmlFor="animal-name">Animal name</label>
                  <input id="animal-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Sahiwal Cow" />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="admin-field">
                  <label htmlFor="animal-category">Category</label>
                  <select id="animal-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <span className="field-error">{errors.category}</span>}
                </div>

                <div className="admin-field">
                  <label htmlFor="animal-breed">Breed</label>
                  <input id="animal-breed" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} placeholder="Sahiwal" />
                  {errors.breed && <span className="field-error">{errors.breed}</span>}
                </div>

                <div className="admin-field">
                  <label htmlFor="animal-age">Age</label>
                  <input id="animal-age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="18 months" />
                  {errors.age && <span className="field-error">{errors.age}</span>}
                </div>

                <div className="admin-field">
                  <label htmlFor="animal-gender">Gender</label>
                  <select id="animal-gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="animal-status">Status</label>
                  <select id="animal-status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="animal-price">Price (PKR)</label>
                  <input id="animal-price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="285000" />
                  {errors.price && <span className="field-error">{errors.price}</span>}
                </div>

                <div className="admin-field">
                  <label htmlFor="animal-stock">Stock</label>
                  <input id="animal-stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} min="1" />
                  {errors.stock && <span className="field-error">{errors.stock}</span>}
                </div>
              </div>

              <div className="admin-field full-width">
                <label htmlFor="animal-description">Description</label>
                <textarea id="animal-description" rows="5" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the animal, health, breeding traits, and value proposition." />
                {errors.description && <span className="field-error">{errors.description}</span>}
              </div>

              <div
                className={dragActive ? "admin-upload-dropzone active" : "admin-upload-dropzone"}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragActive(false);
                  handleFiles(event.dataTransfer.files);
                }}
              >
                <input
                  type="file"
                  id="animal-upload"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleFiles(event.target.files)}
                  style={{ display: "none" }}
                />

                <label htmlFor="animal-upload" className="upload-trigger">
                  <UploadCloud size={20} />
                  <span>Drag & drop images here or click to upload</span>
                </label>
              </div>

              {errors.image && <span className="field-error">{errors.image}</span>}

              {form.gallery.length > 0 && (
                <div className="admin-image-preview-grid">
                  {form.gallery.map((src, index) => (
                    <div key={`${src}-${index}`} className="admin-image-preview-card">
                      <img src={src} alt={`Animal preview ${index + 1}`} />
                      <button type="button" className="preview-remove-btn" onClick={() => removePreview(index)} aria-label="Remove image">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="admin-form-actions">
                <button type="button" className="admin-secondary-btn" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn" disabled={isSubmitting}>
                  {isSubmitting ? <><LoaderCircle size={16} className="button-spinner" /> Saving...</> : <><Save size={16} /> {editingId ? "Update Animal" : "Save Animal"}</>}
                </button>
              </div>
            </form>
          </section>

          <section className="admin-panel admin-list-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-kicker">Inventory</p>
                <h2>Animal List</h2>
              </div>
            </div>

            <div className="admin-animal-list">
              {animals.map((animal) => (
                <article className="admin-animal-card" key={animal.id}>
                  <img src={animal.image} alt={animal.name} />

                  <div className="admin-animal-card-body">
                    <div className="admin-animal-header-row">
                      <div>
                        <h3>{animal.name}</h3>
                        <p>{animal.breed}</p>
                      </div>
                      <span className={`admin-pill ${animal.status.toLowerCase()}`}>{animal.status}</span>
                    </div>

                    <div className="admin-animal-meta">
                      <span>{animal.category}</span>
                      <span>{animal.age}</span>
                      <span>{animal.stock} in stock</span>
                    </div>

                    <div className="admin-animal-price-row">
                      <strong>PKR {animal.price.toLocaleString()}</strong>
                    </div>

                    <div className="admin-animal-actions">
                      <button type="button" className="admin-edit-btn" onClick={() => handleEdit(animal)}>
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button type="button" className="admin-delete-btn" onClick={() => handleDelete(animal.id)}>
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminAnimals;
