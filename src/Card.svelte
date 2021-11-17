<div on:click class="card">
    <img src={ `cards/${background}.svg` } alt={ background } />
</div>
<script>
export let card;

$: value = $card.value;
$: background = $card.state == 'hidden' ? 'card-back' : value;
</script>
<style>
.card {
    padding: 3px;
}

img {
    width: 100%;
}
</style>