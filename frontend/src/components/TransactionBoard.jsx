import "../styles/Transaction.css";

const TransactionBoard = () => {

    const historyData = [
        {
            _id: "123456dvsvsdvsd",
            from: "BTC",
            to: "ETH",
            amount: 0.50000000,
            value: 71204.01548475,
            time: '04/13/2023 14:00:00'
        },
        {
            _id: "123456dvserxvsd",
            from: "BTC",
            to: "ETH",
            amount: 0.50000000,
            value: 71204.01548475,
            time: '04/13/2023 14:00:00'
        },
        {
            _id: "12dfd56dvsvsdvsd",
            from: "BTC",
            to: "ETH",
            amount: 0.50000000,
            value: 71204.01548475,
            time: '04/13/2023 14:00:00'
        },
        {
            _id: "123dfd6466vsdvsd",
            from: "BTC",
            to: "ETH",
            amount: 0.50000000,
            value: 71204.01548475,
            time: '04/13/2023 14:00:00'
        },
        {
            _id: "123456dvsvsdvsd",
            from: "BTC",
            to: "ETH",
            amount: 0.50000000,
            value: 71204.01548475,
            time: '04/13/2023 14:00:00'
        }
    ]

    const historyList = historyData.map((transaction) => (
        <tr key={transaction._id} className="history-row">
            <td>{transaction.from}</td>
            <td>{transaction.to}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.value}</td>
            <td>{transaction.time}</td>
        </tr>
    ))

    return (
        <>
            <table className="history-table">
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                    <th>Value</th>
                    <th>Time</th>
                </tr>
                {historyList}
            </table>
        </>
    )
}

export default TransactionBoard;