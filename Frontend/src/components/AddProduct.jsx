import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("chocolate");
  const [cookiesType, setCookiesType] = useState("chocolate cookies");
  const [variants, setVariants] = useState([{ weight: "", price: "" }]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    setLoading(true);
    setSuccessMessage(""); // Reset success message
      // Log the user-entered data
  console.log("Product Name:", name);
  console.log("Category:", category);
  console.log("Category:", cookiesType);
  console.log("Variants:", variants);
  console.log("Images:", images);

    try {
      // 1. Create Product
      const productResponse = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          CookiesType: category === "cookies" ? cookiesType : null,
          ProductId: category === "cookies" ? 1 : 2, // 1 = Cookies, 2 = Chocolate
        }),
      });

      if (!productResponse.ok) {
        throw new Error("Failed to create product");
      }

      const productData = await productResponse.json();
      const productId = productData.id;
      console.log("product data",productData)
      console.log("product ID",productId)

      // 2. Upload Images
      const imageFormData = new FormData();
      images.forEach((image) => {
        imageFormData.append("images", image);
      });
      imageFormData.append("id", productId);

      const imageResponse = await fetch(
        "http://localhost:3000/images/upload",
        {
          method: "POST",
          body: imageFormData,
        }
      );

      if (!imageResponse.ok) {
        throw new Error("Failed to upload images");
      }
      console.log(productId)
      // 3. Add Prices
      for (const variant of variants) {
        const priceResponse = await fetch(
          "http://localhost:3000/add/prices",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId,
              Weight: variant.weight,
              Price: parseInt(variant.price),
            }),
          }
        );
        console.log(priceResponse)

        if (!priceResponse.ok) {
          throw new Error("Failed to add price");
        }
      }

      // Success Message
      setSuccessMessage("Product added successfully!");
      setName("");
      setCategory("chocolate");
      setCookiesType("chocolate cookies");
      setVariants([{ weight: "", price: "" }]);
      setImages([]);
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
          className="p-6 rounded-lg max-w-lg w-full"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
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
              <div>
                <label className="block mb-2">Weight:</label>
                <input
                  type="text"
                  value={variant.weight}
                  onChange={(e) =>
                    handleVariantChange(index, "weight", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Price:</label>
                <input
                  type="text"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
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
              onChange={handleImageChange}
              className="border p-2 w-full rounded"
              multiple
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 mt-4 w-full rounded flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {successMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">{successMessage}</h2>
            <button
              onClick={() => setSuccessMessage("")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
