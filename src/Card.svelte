<div on:click class="card">
    <img src={ `cards/${background}.svg` } alt={ background } />
    <span>{ card.value }</span>
</div>
<script>
export let card;

$: background = card.state == 'hidden' ? 'card-back' : card.value;
</script>
<style>
.card {
    padding: 3px;
    position: relative;
}

img {
    width: 100%;
}

span {
    display: none;
    position: absolute;
    background-color: black;
    color: white;
    top: 15px;
    left: 15px;
}
</style>