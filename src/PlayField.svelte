<div class="play-field" class:block>
    {#each $cards as card}
    <Card {card} on:click={ () => reveal(card) } />
    {/each}
</div>
<script>
import { get } from 'svelte/store';
import { cards } from './cards-store';
import Card from './Card.svelte';

const hideDelay = 2000;
let block = false;

let revealedCards = [];

function reveal(card) {
    const revealed = card.reveal();

    if (revealed) {
        revealedCards.push(card);

        if (revealedCards.length == 2) {
            const card1 = get(revealedCards[0]);
            const card2 = get(revealedCards[1]);

            if (!cardsMatch(card1, card2)) {
                block = true;
                const cardsToHide = revealedCards;
                setTimeout(() => {
                    hideCards(cardsToHide);
                }, hideDelay);
            }
            
            revealedCards = [];
        }
    }
}

function cardsMatch(a, b) {
    return a.rank == b.rank &&
        (a.suit == 'C' && b.suit == 'S' ||
        a.suit == 'S' && b.suit == 'C' ||
        a.suit == 'D' && b.suit == 'H' ||
        a.suit == 'H' && b.suit == 'D');
}

function hideCards(cardsToHide) {
    for(const card of cardsToHide) {
        card.hide();
    }
    block = false;
}
</script>
<style>
.play-field {
    display: grid;
    grid-template-columns: repeat(13, auto);
}

.block {
    pointer-events: none;
}
</style>