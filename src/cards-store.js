import { writable, derived } from 'svelte/store';
import { Deck } from 'deckofcards';

function createCards() {
    const { subscribe, set, update } = writable([]);

    function Shuffle() {
        const deck = new Deck();

        const drawnCards = [];
        for (let i = 0; i < 52; i++) {
            const card = deck.draw();
            const value = card.toString();
            const cardState = {
                rank: value[0],
                suit: value[1],
                value,
                state: 'hidden'
            }
            drawnCards.push(cardState);
        }

        set(drawnCards);
    }

    Shuffle();

    function Reveal(card) {
        if(card.state != 'hidden') {
            return false;
        }

        setCardState(card, 'revealed');
        return true;
    }

    function Hide(card) {
        setCardState(card, 'hidden');
    }

    function Match(card) {
        setCardState(card, 'matched');
    }

    function setCardState(card, state) {
        update(cards => {
            const cardIndex = cards.findIndex(x => x.value == card.value);
            return [
                ...cards.slice(0, cardIndex),
                {
                    ...card,
                    state
                },
                ...cards.slice(cardIndex + 1)
            ];
        })
    }

    return {
        subscribe,
        Shuffle,
        Reveal,
        Hide,
        Match
    }
}

export const cards = createCards();

export const allMatched = derived(cards, $cards =>
    $cards.every(card => card.state == 'matched')
);

