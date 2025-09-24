import React from "react";
import { Link } from "react-router-dom";
import DiscoverPeople from "../components/DiscoverPeople";
import { USERS } from "../hook/users";
import "@/assets/styles/DiscoverPeople.css";

export default function DiscoverPage() {
  return (
    <div className="discover-page">
      <header className="discover-header">
        <h1 className="discover-title">Discover People</h1>
        <div className="user-count-badge">{USERS.length} users</div>
      </header>

      <DiscoverPeople users={USERS} />
      
      {/* Example route link area */}
      <footer className="discover-footer">
        <Link className="plain-link" to="/">← Back Home</Link>
      </footer>
    </div>
  );
}