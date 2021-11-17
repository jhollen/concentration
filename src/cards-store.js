import { writable } from 'svelte/store';
import { Deck } from 'deckofcards';

function createCard(value) {
    const initialValue = {
        state: 'hidden',
        rank: value[0],
        suit: value[1],
        value
    }

    const { subscribe, update } = writable(initialValue);

    function reveal() {
        let result = false;
        update(card => {
            if (card.state == 'hidden') {
                card.state = 'revealed';
                result = true;
            }

            return card;
        });

        return result;
    }

    function hide() {
        update(card => ({ ...card, state: 'hidden' }));
    }

    return {
        subscribe,
        reveal,
        hide
    }
}

function createCards() {
    const { subscribe, set } = writable();

    function Shuffle() {
        const deck = new Deck();

        const drawnCards = [];
        for (let i = 0; i < 52; i++) {
            const card = deck.draw();
            const cardStore = createCard(card.toString());
            drawnCards.push(cardStore);
        }

        set(drawnCards);
    }

    Shuffle();

    return {
        subscribe,
        Shuffle
    }
}

export const cards = createCards();