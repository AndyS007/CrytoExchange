import "../styles/Transfer.css";
import { cryptoIcons } from "../utils/walletUtil";

const TransferHistoryBoard = ({ transfers }) => {

    let historyList = [];
    historyList = transfers.map((transfer) => (
        <tr key={transfer._id} className="history-row">
            <td>
                <span style={{ display: "flex",  alignItems: "center", justifyContent: "start" }}>
                        <img src={cryptoIcons[transfer.currency]} className="coin-icon"/>
                        <span className="coin-label">{transfer.currency}</span>
                </span>
            </td>
            <td>{transfer.toUser}</td>
            <td>{transfer.amount ? transfer.amount.toFixed(6) : 0}</td>
            <td>{new Date(transfer.createdAt).toLocaleString('zh-CN')}</td>
        </tr>
    ))

    return (
        <>
            <table className="transfer-history-table">
                <thead>
                    <tr className="history-head-row">
                        <th>Currency</th>
                        <th>To User</th>
                        <th>Amount</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    { historyList }
                </tbody>
            </table>
        </>
    )
}

export default TransferHistoryBoard;