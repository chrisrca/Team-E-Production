// dont know shape of whats being passed in yet, will need to be updated
interface CSVdata {
    value: number;
    nodeID: number;
}

export default function ViewCSV(dataArr: CSVdata[]) {
    return (
        <div>
            <h1>Table of CSV Items</h1>
            <table>
                <tbody>
                    {dataArr.map((currentValue,index) => (
                            <tr key={index}>
                                <td>{currentValue.value}</td>
                                <td>{currentValue.nodeID}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}