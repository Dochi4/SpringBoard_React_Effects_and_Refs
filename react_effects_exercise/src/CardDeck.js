import React, { useState, useEffect } from "react";
import axios from "axios";
import CardViewer from "./CardViewer";
import CardShuffle from "./CardShuffle";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const CardDeck = () => {
  const [deck, setDeck] = useState(null);
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      setDeck(res.data.deck_id);
      setRemaining(res.data.remaining);
    }
    getDeck();
  }, []);

  function handleShuffle(newDeck, remainingCards) {
    setDeck(newDeck);
    setRemaining(remainingCards);
  }

  function handleRemaining(remainingCards) {
    setRemaining(remainingCards);
  }

  return (
    <div>
      <CardViewer
        BASE_URL={BASE_URL}
        deck={deck}
        onCardDraw={handleRemaining}
        remaining={remaining}
      />
      <CardShuffle
        BASE_URL={BASE_URL}
        deck={deck}
        handleShuffle={handleShuffle}
      />
    </div>
  );
};

export default CardDeck;
