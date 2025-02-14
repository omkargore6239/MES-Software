export default function Production() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Production Monitoring</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Machine</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Current Order</th>
                <th className="text-left py-3">Output</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3,4].map((item) => (
                <tr key={item} className="border-b">
                  <td className="py-3">Machine {item}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                      Running
                    </span>
                  </td>
                  <td className="py-3">Order #2023{item}</td>
                  <td className="py-3">{item * 50}/hour</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }