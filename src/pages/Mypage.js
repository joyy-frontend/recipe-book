import { useEffect, useState } from "react";

export default function Mypage() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
        }
    }, []);

    return (
        <div className="container mt-5">
            <h2>My Page</h2>
            <h3>Welcome, {userInfo.username}!</h3>
            <section className="my-4">
                <h4>Liked Recipes</h4>
            </section>
            <section className="my-4">
                <h4>Personal Information</h4>
                <p>Username: {userInfo.username}</p>
            </section>
        </div>
    );
}
