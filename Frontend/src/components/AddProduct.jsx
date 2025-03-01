import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("chocolate");
  const [variants, setVariants] = useState([{ weight: "", price: "" }]);
  const [images, setImages] = useState([]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    if (variants.length < 3) {
      setVariants([...variants, { weight: "", price: "" }]);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length + images.length <= 5) {
      setImages([...images, ...Array.from(e.target.files)]);
    } else {
      alert("You can upload up to 5 images only");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productResponse = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category })
      });

      if (!productResponse.ok) {
        throw new Error("Failed to add product");
      }

      const productData = await productResponse.json();
      const productId = productData.id;

      for (const variant of variants) {
        const priceResponse = await fetch("http://localhost:5000/api/prices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, weight: variant.weight, price: variant.price })
        });

        if (!priceResponse.ok) {
          throw new Error("Failed to add price and weight");
        }
      }

      for (const image of images) {
        const imageFormData = new FormData();
        imageFormData.append("productId", productId);
        imageFormData.append("image", image);

        const imageResponse = await fetch("http://localhost:5000/api/images", {
          method: "POST",
          body: imageFormData
        });

        if (!imageResponse.ok) {
          throw new Error("Failed to upload image");
        }
      }

      alert("Product added successfully");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <form 
          onSubmit={handleSubmit} 
          className="p-6 rounded-lg max-w-lg w-full" 
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)"
          }}
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
          {variants.map((variant, index) => (
            <div key={index} className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Weight:</label>
                <input
                  type="text"
                  value={variant.weight}
                  onChange={(e) => handleVariantChange(index, "weight", e.target.value)}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Price:</label>
                <input
                  type="text"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
            </div>
          ))}
          {variants.length < 3 && (
            <button type="button" onClick={addVariant} className="bg-blue-500 text-white p-2 mt-4 w-full rounded">
              Add Variant
            </button>
          )}
          <div className="mt-4">
            <label className="block mb-2">Images (Max 5):</label>
            <input type="file" onChange={handleImageChange} className="border p-2 w-full rounded" multiple required />
          </div>
          <button type="submit" className="bg-orange-500 text-white p-2 mt-4 w-full rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
