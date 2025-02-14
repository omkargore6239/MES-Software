export default function Inventory() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Raw Materials</h2>
            <ul className="space-y-2">
              {['Steel', 'Plastic', 'Electronics'].map((material) => (
                <li key={material} className="flex justify-between">
                  <span>{material}</span>
                  <span>1,234 kg</span>
                </li>
              ))}
            </ul>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Finished Goods</h2>
            <ul className="space-y-2">
              {['Product A', 'Product B', 'Product C'].map((product) => (
                <li key={product} className="flex justify-between">
                  <span>{product}</span>
                  <span>456 units</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }