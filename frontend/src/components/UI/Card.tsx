import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-dark-purple p-6 rounded-lg shadow-md text-center border border-soft-beige">
      <h2 className="text-lg font-semibold text-lavender">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default Card;
