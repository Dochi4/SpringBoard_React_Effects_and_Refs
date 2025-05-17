import React, { useState } from "react";
import axios from "axios";

const CardShuffle = ({ BASE_URL, deck, handleShuffle }) => {
  const [isShuffling, setIsShuffling] = useState(false);

  async function deckShuffle() {
    try {
      setIsShuffling(true);
      const res = await axios.get(`${BASE_URL}/${deck}/shuffle/`);
      console.log(res);
      const newDeck = res.data.deck_id;
      const remaining = res.data.remaining;
      handleShuffle(newDeck, remaining);
    } catch (e) {
      console.log(`Shuggle Failed :${e}`);
    } finally {
      setIsShuffling(false);
    }
  }
  return (
    <div>
      <button onClick={deckShuffle} disable={isShuffling}>
        {isShuffling ? "Shuffling..." : " Shuffle Deck"}
      </button>
    </div>
  );
};

export default CardShuffle;
