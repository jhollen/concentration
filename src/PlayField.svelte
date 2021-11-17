<div class="play-field" class:block>
    {#each $cards as card}
    <Card {card} on:click={ () => reveal(card) } />
    {/each}
</div>
<script>
import { cards } from './cards-store';
import Card from './Card.svelte';

const hideDelay = 2000;
let block = false;

function reveal(card) {
    const revealed = card.reveal();

    if (revealed) {
        block = true;
        setTimeout(() => {
            card.hide();
            block = false;
        }, hideDelay);
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