import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("chocolate");
  const [cookiesType, setCookiesType] = useState("chocolate cookies");
  const [variants, setVariants] = useState([{ weight: "", price: "" }]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const validWeights = ["250g", "500g", "1kg"];

  const handleVariantChange = (index, field, value) => {
    const newVariants = variants.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );
    setVariants(newVariants);
  };

  const addVariant = () => {
    if (variants.length < 3) {
      setVariants([...variants, { weight: "", price: "" }]);
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("chocolate");
    setCookiesType("chocolate cookies");
    setVariants([{ weight: "", price: "" }]);
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let variant of variants) {
      if (!validWeights.includes(variant.weight)) {
        alert(
          `Invalid weight: ${variant.weight}. Allowed weights are 250g, 500g, 1kg.`
        );
        return;
      }
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("CookiesType", category === "cookies" ? cookiesType : "");
      formData.append("ProductId", category === "cookies" ? 1 : 2);

      images.forEach((image) => formData.append("images", image));
      variants.forEach((variant, index) => {
        formData.append(`prices[${index}][Weight]`, variant.weight);
        formData.append(`prices[${index}][Price]`, variant.price);
      });

      const response = await fetch("http://localhost:3000/product/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create product");

      const data = await response.json();
      console.log("Response Data:", data);
      alert("Product added successfully!");
      resetForm();
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg max-w-lg w-full bg-white bg-opacity-25 shadow-lg backdrop-blur-lg border border-white border-opacity-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
          <div>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 w-full rounded"
              required
            >
              <option value="chocolate">Chocolate</option>
              <option value="cookies">Cookies</option>
            </select>
          </div>
          {category === "cookies" && (
            <div className="mt-4">
              <label className="block mb-2">Cookies Type:</label>
              <select
                value={cookiesType}
                onChange={(e) => setCookiesType(e.target.value)}
                className="border p-2 w-full rounded"
                required
              >
                <option value="chocolate cookies">Chocolate Cookies</option>
                <option value="healthy cookies">Healthy Cookies</option>
                <option value="butter cookies">Butter Cookies</option>
                <option value="oatmeal cookies">Oatmeal Cookies</option>
              </select>
            </div>
          )}
          {variants.map((variant, index) => (
            <div key={index} className="mt-4 grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Weight"
                value={variant.weight}
                onChange={(e) =>
                  handleVariantChange(index, "weight", e.target.value)
                }
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                className="border p-2 rounded"
                required
              />
            </div>
          ))}
          {variants.length < 3 && (
            <button
              type="button"
              onClick={addVariant}
              className="bg-blue-500 text-white p-2 mt-4 w-full rounded"
            >
              Add Variant
            </button>
          )}
          <div className="mt-4">
            <label className="block mb-2">Images (Max 5):</label>
            <input
              type="file"
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="border p-2 w-full rounded"
              multiple
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 mt-4 w-full rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
