import React from "react";
import "@/assets/style/TableView.css";

export default function PageHeader({ title, subtitle, icon }) {
  return (
    <header className="app-header">
      <div className="app-header__title">
        {icon && <span className="app-header__icon" aria-hidden>{icon}</span>}
        <h1>{title}</h1>
      </div>
      {subtitle && <p className="app-header__subtitle">{subtitle}</p>}
    </header>
  );
}