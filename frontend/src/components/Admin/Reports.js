import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const fetchedReports = [
        { id: 1, title: 'Spam Content', user: 'John Doe', date: '2024-08-30', status: 'Pending' },
        { id: 2, title: 'Inappropriate Language', user: 'Jane Smith', date: '2024-08-28', status: 'Resolved' },
        { id: 3, title: 'Duplicate Content', user: 'Alice Johnson', date: '2024-08-27', status: 'Pending' },
      ];
      setReports(fetchedReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleView = (reportId) => {
    console.log(`View report with ID: ${reportId}`);
    // Implement view functionality here
  };

  const handleResolve = (reportId) => {
    console.log(`Resolve report with ID: ${reportId}`);
    // Implement resolve functionality here
    const updatedReports = reports.map(report => 
      report.id === reportId ? { ...report, status: 'Resolved' } : report
    );
    setReports(updatedReports);
  };

  if (isLoading) {
    return <div>Loading reports...</div>;
  }

  if (error) {
    return <div>Error loading reports: {error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Reports Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map(report => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">{report.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${report.status === 'Resolved' ? 'text-green-600' : 'text-red-600'}`}>{report.status}</td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button 
                    onClick={() => handleView(report.id)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-sm text-sm hover:bg-blue-600"
                  >
                    View
                  </button>
                  {report.status !== 'Resolved' && (
                    <button 
                      onClick={() => handleResolve(report.id)} 
                      className="px-4 py-2 bg-green-500 text-white rounded-sm text-sm hover:bg-green-600"
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
