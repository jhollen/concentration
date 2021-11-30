import { writable, derived } from 'svelte/store';
import { Deck } from 'deckofcards';

function createCards() {
    const { subscribe, set, update } = writable([]);

    function Shuffle(pairs) {
        const deck = new Deck();

        const drawnCards = [];
        for (let i = 0; i < pairs; i++) {
            const drawnCard = deck.draw();
            let card = createCard(drawnCard, i*2);
            drawnCards.push(card);
            card = createCard(drawnCard, i*2+1);
            drawnCards.push(card);
        }

        drawnCards.sort(x => Math.random() - 0.5);

        set(drawnCards);
    }

    function createCard(deckCard, id) {
        const value = deckCard.toString();
        const card = {
            id,
            rank: value[0],
            suit: value[1],
            value,
            state: 'hidden'
        };
        return card;
    }

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
            const cardIndex = cards.findIndex(x => x.id == card.id);
            cards[cardIndex].state = state;
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

export const matchesRemaining = derived(cards, $cards =>
    $cards.filter(card => card.state != 'matched').length / 2
);

export const allMatched = derived(matchesRemaining, x => x == 0);

