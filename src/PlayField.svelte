<div>
    {#each $cards as card}
    <Card {card} />
    {/each}
</div>
<script>
import { cards } from './cards-store';
import Card from './Card.svelte';
</script>
<style>

</style>