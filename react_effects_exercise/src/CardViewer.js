import React, { useState, useEffect } from "react";
import axios from "axios";

const CardViewer = ({ BASE_URL, deck, onCardDraw, remaining }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    setCard(null);
  }, [deck]);

  async function handleDraw() {
    const res = await axios.get(`${BASE_URL}/${deck}/draw/?count=1`);
    const newCard = res.data.cards[0];
    setCard(newCard);
    onCardDraw(res.data.remaining);
  }

  return (
    <div>
      {card ? (
        remaining === 0 ? (
          <h2>Error: no cards remaining!</h2>
        ) : (
          <div>
            <h2>
              {card.value} of {card.suit}
            </h2>
            <img src={card.image} alt={`${card.value} of ${card.suit}`} />
          </div>
        )
      ) : (
        <h2>Press Draw Card</h2>
      )}
      <button onClick={handleDraw}>Draw Card</button>
    </div>
  );
};

export default CardViewer;
