import React from "react";
import MainCard from "./Card";



export default function Cards({ games }) {

  return (
      <div>
      <section className="layout">
        {games.map((element) => (
          <div key={element.id}>
              <MainCard
                name={element.name}
                description={element.description}
                background_image={element.background_image}
                price={element.price}
              />
          </div>
        ))}
      </section>
    </div>
  );
}
