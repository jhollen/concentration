<div class="play-field">
    {#each $cards as card}
    <Card {card} />
    {/each}
</div>
<script>
import { cards } from './cards-store';
import Card from './Card.svelte';
</script>
<style>
.play-field {
    display: grid;
    grid-template-columns: repeat(13, auto);
}
</style>