<div on:click>
    <img src={ `cards/${background}.svg` } alt={ background } />
</div>
<script>
export let card;

$: value = $card.value;
$: background = $card.hidden ? 'hidden-card' : value;
</script>
<style>

</style>