import { DBNode, Edge } from "common/src/types";

export default function ViewNodes(inputData: { data: DBNode[] | Edge[] }) {
  const data = inputData.data;
  if (data.length != 0) {
    return (
      <div className="pt-5 p-5 relative flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Data</h1>
        <table className="border-collapse border-spacing-2 border border-slate-400">
          <thead>
            <tr>
              {Object.keys(data[0]).map((value, index) => (
                <td key={index} className="border border-primary p-1">
                  {value}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((currentValue, index) => (
              <tr key={index} className="border border-primary p-1">
                {Object.values(currentValue).map((value, index) => (
                  <td key={index} className="border border-primary p-1">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
