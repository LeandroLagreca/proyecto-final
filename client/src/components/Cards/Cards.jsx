import React from "react";
import MainCard from "./Card";

export default function Cards({ games }) {

  return (
      <div>
      <section>
        {games.map((element, index) => (
          <div key={element.id}>
              <MainCard
                key={index}
                id={element.id}
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
