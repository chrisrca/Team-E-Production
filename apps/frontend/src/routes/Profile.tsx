import React from "react";

function ProfilePage() {
    const serviceRequests = [
        {
            id: 1,
            date: "2023-04-14",
            type: "Flower Delivery Service",
            status: "Completed",
        },
        {
            id: 2,
            date: "2023-04-20",
            type: "Security Request",
            status: "In Progress",
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold mt-12 m-4">User Profile</h1>
                <p className="text-gray-700">Wong Man | adminD24E@gmail.com</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold">
                    Service Request History
                </h2>
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Service Type
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceRequests.map((request) => (
                            <tr key={request.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {request.date}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {request.type}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {request.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProfilePage;
