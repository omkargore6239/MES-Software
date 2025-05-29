
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
const API_BASE_URL = "http://localhost:8080/products";

const ProductMaster = () => {
  return (
<div className="w-full max-w-full mx-auto border border-b-2 bg-gray-100 shadow-md p-1">
  <div className="flex justify-between items-center p-3">
    <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md w-fit">
      PRODUCT MASTER
    </label>
    <div className="relative w-full max-w-4xl p-1">
      <div className="flex flex-wrap md:flex-nowrap whitespace-nowrap items-center gap-x-3 gap-y-2 justify-end">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          
          <label className="text-gray-700 text-sm font-medium">Product Category</label>
          <select className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>FINISHED_GOODS</option>
            <option>RAW_MATERIAL</option>
            <option>CONSUMABLE</option>
            <option>SCRAP</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-gray-700 text-sm font-medium">Product Type</label>
          <select className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>GOOD</option>
            <option>SERVICE</option>
          </select>
        </div>
        <div className="ml-3">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-2 px-2 sm:px-4 rounded-md shadow-md transition duration-200">
            Search
          </button>
        </div>
        <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
      />
      </div>
    </div>
  </div>
</div>


  );
};
const ProductForm = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    product || {
      productName: "",
      description: "",
      productGroup: "CUST_ABC",
      dimensions: "",
      weight: "",
      packingType: "CUSTOMIZED",  // Fixed field name
      qualitySpecs: "FAIL",
      productCategory: "FINISHED_GOODS",
      productType: "GOOD",
      uom:"KG",
      stock: 0,
      hsnCode: "",
      addedBy: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "", // Ensure empty selection is handled correctly
    }));
  
    console.log(`🔄 Updated field: ${name}, New value: ${value}`);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      stock: parseInt(formData.stock, 10), // Convert to number
      weight: parseFloat(formData.weight) || 0, // Ensure weight is numeric
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2  z-[1001]">
        <h3 className="text-lg font-bold mb-4 ">
          {product ? "Edit Product" : "Add Product"}
        </h3>
        <form onSubmit={handleSubmit} autoComplete="off" className="grid grid-cols-2 gap-4">
          <div>
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div>
            <label>Product Group</label>
            <select
              name="productGroup"
              value={formData.productGroup}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            >
              <option>CUST_ABC</option>
              <option>CUST_XYZ</option>
              </select>
          </div>
          <div>
            <label>Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div>
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div>
            <label>Packing Type</label>
            <select
              name="packingType" // Fixed name
              value={formData.packingType} // Fixed value reference
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            ><option>CUSTOMIZED</option>
              <option>STD</option>
              </select>
          </div>
          <div>
            <label>Quality Specs</label>
            <select
              name="qualitySpecs"
              value={formData.qualitySpecs}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            >
              <option>FAIL</option>
              <option>PASS</option>
              </select>
          </div>
          <div>
            <label>Product Category</label>
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            >
              <option>FINISHED_GOODS</option>
              <option>RAW_MATERIAL</option>
              <option>CONSUMABLE</option>
              <option>SCRAP</option>
            </select>
          </div>
          <div>
            <label>UOM</label>
            <select
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            > <option>KG</option>
              <option>TON</option>
              </select>
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div>
            <label>Product Type</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            >
              <option>GOOD</option>
              <option>SERVICE</option>
            </select>
          </div>
          <div>
            <label>HSN Code</label>
            <input
              type="text"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div>
            <label>Added By</label>
            <input
              type="text"
              name="addedBy"
              value={formData.addedBy}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
      fetchProducts();
  }, []);

  // ✅ Fetch updated product list from backend
  const fetchProducts = async () => {
      try {
          const response = await axios.get(`${API_BASE_URL}/all`);
          setTableData(response.data);
      } catch (error) {
          console.error("❌ Error fetching products:", error);
      } finally {
          setIsLoading(false);
      }
  };

  // ✅ Add new product
  const handleAdd = () => {
      setEditingProduct(null);
      setShowForm(true);
  };

  // ✅ Edit existing product
  const handleEdit = (product) => {
      setEditingProduct(product);
      setShowForm(true);
  };

  // ✅ Save (Add / Update) Product
  const handleSave = async (product) => {
      try {
          if (!product || typeof product !== "object") {
              console.error("❌ Invalid product data:", product);
              return;
          }

          console.log("📦 Payload being sent:", JSON.stringify(product, null, 2));

          const headers = { "Content-Type": "application/json" };
          let response;

          if (product.productId) {
              // ✅ Update existing product
              response = await axios.put(
                  `${API_BASE_URL}/update/${product.productId}`,
                  product,
                  { headers }
              );
          } else {
              // ✅ Add new product
              response = await axios.post(`${API_BASE_URL}/add`, product, { headers });
          }

          console.log("✅ Successfully saved product:", response.data);

          // ✅ Fetch updated data to sync frontend instantly
          fetchProducts();

          setShowForm(false); // Hide form after save
      } catch (error) {
          console.error("❌ Error saving product:", error);
          if (error.response) {
              console.error("🔍 Backend Response Data:", error.response.data);
          }
      }
  };

  // ✅ Delete product
  const handleDelete = async (productId) => {
      try {
          await axios.delete(`${API_BASE_URL}/delete/${productId}`);

          // ✅ Fetch updated data after deletion
          fetchProducts();
      } catch (error) {
          console.error("❌ Error deleting product:", error);
      }
  };

  
 // Pagination Logic
 const totalPages = Math.ceil(tableData.length / rowsPerPage);
 const displayedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
 
 // Generate page numbers for display
 const generatePaginationNumbers = () => {
   const pageNumbers = [];
   const maxPageButtons = 5;
   
   if (totalPages <= maxPageButtons) {
     // If we have 5 or fewer pages, show all of them
     for (let i = 1; i <= totalPages; i++) {
       pageNumbers.push(i);
     }
   } else {
     // Always add page 1
     pageNumbers.push(1);
     
     // Calculate which pages to show around the current page
     let startPage = Math.max(2, currentPage - 1);
     let endPage = Math.min(totalPages - 1, currentPage + 1);
     
     // Handle edge cases
     if (currentPage <= 3) {
       endPage = Math.min(4, totalPages - 1);
     } else if (currentPage >= totalPages - 2) {
       startPage = Math.max(2, totalPages - 3);
     }
     
     // Add ellipsis after page 1 if needed
     if (startPage > 2) {
       pageNumbers.push('...');
     }
     
     // Add middle pages
     for (let i = startPage; i <= endPage; i++) {
       pageNumbers.push(i);
     }
     
     // Add ellipsis before last page if needed
     if (endPage < totalPages - 1) {
       pageNumbers.push('...');
     }
     
     // Always add last page
     if (totalPages > 1) {
       pageNumbers.push(totalPages);
     }
   }
   
   return pageNumbers;
 };
 
 const pageNumbers = generatePaginationNumbers();

  return (
        <div className="mt-8 w-full max-w-full mx-auto">
            <div className="relative border border-gray-300 shadow-lg rounded-lg bg-white overflow-auto">
                {/* Table Section */}
                <table className="p-4 w-full min-w-[800px] border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-teal-600 text-white text-base whitespace-nowrap">
                            {[
                                "Product ID", "Product Name", "Description", "Product Group",
                                "Dimensions", "Weight", "Packing Type", "Quality Specs",
                                "Product Category", "UOM", "Stock", "Product Type",
                                "HSN Code", "Added By", "Actions"
                            ].map((heading, i) => (
                                <th key={i} className="border border-gray-300 p-4 text-left">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="15" className="text-center p-4">Loading products...</td>
                            </tr>
                        ) : tableData.length === 0 ? (
                            <tr>
                                <td colSpan="15" className="text-center p-4">No products found.</td>
                            </tr>
                        ) : (
                          displayedData.map((product, index) => (
                                <tr key={index} className="bg-white text-black text-center">
                                    {[
                                        product.productId, product.productName, product.description,
                                        product.productGroup, product.dimensions, product.weight,
                                        product.packingType, product.qualitySpecs, product.productCategory,
                                        product.uom, product.stock, product.productType,
                                        product.hsnCode, product.addedBy
                                    ].map((cell, colIndex) => (
                                        <td key={colIndex} className="border p-2">{cell}</td>
                                    ))}
                                    <td className="border p-2">
                                        <button onClick={() => handleEdit(product)} className="text-blue-500 px-2">
                                            <AiOutlineEdit />
                                        </button>
                                        <button onClick={() => handleDelete(product.productId)} className="text-red-500 px-2">
                                            <AiOutlineDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSave={handleSave}
                    onClose={() => setShowForm(false)}
                />
            )}

           {/* New Pagination Component */}
 <div className="flex justify-end items-center mt-4 mb-2">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          « Previous
        </button>
        
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
            disabled={page === '...'}
            className={`px-3 py-1 rounded text-sm ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : page === '...'
                ? 'text-gray-500'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          Next »
        </button>
      </div>
    </div>
        
        {/* Buttons (Add) */}
        <div className="flex  justify-end space-x-4 p-3 bg-gray-100 border-t border-gray-300">
        <button
            onClick={handleAdd}
            className="bg-green-900 text-white px-5 py-2 rounded-md shadow-md"
        >
            Add
        </button>
    </div>
    </div>
  );
};



const ProductMasterComponent = () => {
  return (
    <div className="relative">
      <ProductMaster />
      <TableComponent />
    </div>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductMasterComponent;