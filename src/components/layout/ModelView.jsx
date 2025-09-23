import React from "react";
import CloseIcon from "@/assets/IconComponents/Close";
import "@/assets/styles/ModelView.css";

function ModelView({ title, children, onClose }) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <section className="Model">
      <section className="model-view">
        <div className="title flex FY-center F-space">
          <div>{title}</div>
          <button onClick={onClose}><CloseIcon /></button>
        </div>

        <section className="scrollView">
          {hasChildren ? (
            children
          ) : (
            <div className="empty-message">No comment yet</div>
          )}
        </section>
        <section className="shadow"></section>
      </section>
    </section>
  );
}

export default ModelView;
