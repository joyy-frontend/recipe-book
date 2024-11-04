//import { useEffect, useState } from "react";

export default function Mypage({ user }) {
    if (!user || !user.email) {
        return <p>Please log in to view this page.</p>;
    }

    return (
        <div className="container mt-5">
            <h2>My Page</h2>
            <h3>Welcome, {user.username}!</h3>
            <section className="my-4">
                <h4>Liked Recipes</h4>
            </section>
            <section className="my-4">
                <h4>Personal Information</h4>
                <p>Username: {user.username}</p>
                <p>First name: {user.fname}</p>
                <p>Last name: {user.lname}</p>
                <p>Email: {user.email}</p>
            </section>
        </div>
    );
}
