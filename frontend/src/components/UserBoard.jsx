import "../styles/Wallet.css";

const UserBoard = ({ user }) => {

    return (
        <section className="user-block">
            <div className="name-block">
                <div className="info-label">
                    name
                </div>
                <div className="name-content">
                    {user.name}
                </div>
            </div>
            <div className="user-info-block">
                <div>
                    <div className="info-label">
                        email
                    </div>
                    <div className="info-content">
                        {user.email}
                    </div>
                </div>
                <div className="uid-block">
                    <div className="info-label">
                        uid
                    </div>
                    <div className="info-content">
                        {user._id}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserBoard;