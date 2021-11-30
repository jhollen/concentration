<div class="play-field" class:block>
    {#each $cards as card}
    <Card {card} on:click={ () => reveal(card) } />
    {/each}
</div>
<script>
import { cards, allMatched } from './cards-store';
import { numberOfMoves } from './game-store';
import Card from './Card.svelte';

const hideDelay = 2000;

let revealedCards = [];

$: block = revealedCards.length == 2 || $allMatched;

function reveal(card) {
    const revealed = cards.Reveal(card);

    if (revealed) {
        revealedCards = [...revealedCards, card];

        if (revealedCards.length == 2) {
            numberOfMoves.update(n => n + 1);

            const card1 = revealedCards[0];
            const card2 = revealedCards[1];

            if (!cardsMatch(card1, card2)) {
                setTimeout(() => {
                    hideCards();
                    revealedCards = [];
                }, hideDelay);
            } else {
                matchCards();
                revealedCards = [];
            }
        }
    }
}

function cardsMatch(a, b) {
    return a.value == b.value;
}

function hideCards() {
    for(const card of revealedCards) {
        cards.Hide(card);
    }
}

function matchCards() {
    for(const card of revealedCards) {
        cards.Match(card);
    }
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