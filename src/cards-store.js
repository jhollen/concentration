import { writable } from 'svelte/store';
import { Deck } from 'deckofcards';

function createCard(value) {
    const initialValue = {
        state: 'revealed',
        rank: value[0],
        suit: value[1],
        value
    }

    const { subscribe, update } = writable(initialValue);

    function reveal() {
        update(state => state.state = 'revealed');
    }

    function hide() {
        update(state => state.state = 'hidden');
    }

    function match() {
        update(state => state.state = 'matched');
    }

    return {
        subscribe,
        reveal,
        hide,
        match
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