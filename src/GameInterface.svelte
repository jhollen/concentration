<div class="game-interface">
    <button on:click={ newGame }>New Game</button>
    <span>Number of Moves: {$numberOfMoves}</span>
    <span>Matches remaining: {$matchesRemaining}</span>
</div>
<script>
import { cards, matchesRemaining } from './cards-store';
import { numberOfMoves } from './game-store';

function newGame() {
    if(confirm('Start a new game?')) {
        cards.Shuffle();
        numberOfMoves.set(0);
    }
}
</script>
<style>
.game-interface {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>