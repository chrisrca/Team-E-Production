import {
    DBNode,
    Edge,
    FlowerServiceRequest,
    GiftServiceRequest,
    InterpreterServiceRequest,
    SecurityServiceRequest,
    DrugDeliveryData,
    SanitationServiceRequest,
    RoomSchedulingForm,
    MedicalDeviceServiceRequest,
} from "common/src/types";

export default function ViewNodes(inputData: {
    data:
        | Edge[]
        | DBNode[]
        | FlowerServiceRequest[]
        | GiftServiceRequest[]
        | InterpreterServiceRequest[]
        | SecurityServiceRequest[]
        | DrugDeliveryData[]
        | SanitationServiceRequest[]
        | RoomSchedulingForm[]
        | MedicalDeviceServiceRequest[];
}) {
    const data = inputData.data;
    if (data.length !== 0) {
        const isDBNodeData = data.length > 0 && "edges" in data[0];

        return (
            <div className="relative py-10 overflow-x-auto flex flex-col items-center justify-center">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {Object.keys(data[0]).map((value, index) =>
                                isDBNodeData && value === "edges" ? null : (
                                    <th
                                        key={index}
                                        scope="col"
                                        className="px-6 py-3"
                                    >
                                        {value}
                                    </th>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((currentValue, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                {Object.entries(currentValue).map(
                                    ([key, value], index) =>
                                        isDBNodeData &&
                                        key === "edges" ? null : isDBNodeData &&
                                          key === "blocked" &&
                                          value === false ? (
                                            <td
                                                key={index}
                                                className="px-6 py-4 text-green-500"
                                            >
                                                Unblocked
                                            </td>
                                        ) : isDBNodeData &&
                                          key === "blocked" &&
                                          value === true ? (
                                            <td
                                                key={index}
                                                className="px-6 py-4 text-red-500"
                                            >
                                                Blocked
                                            </td>
                                        ) : (
                                            <td
                                                key={index}
                                                className="px-6 py-4"
                                            >
                                                {value}
                                            </td>
                                        ),
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
