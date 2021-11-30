<div class="game-interface">
    <button on:click={ newGame }>New Game</button>
    <span>Number of Moves: {$numberOfMoves}</span>
    <span>Matches remaining: {$matchesRemaining}</span>
</div>
<script>
import { cards, matchesRemaining } from './cards-store';
import { numberOfMoves } from './game-store';

function newGame() {
    const promptResult = prompt('Enter number of pairs');

    if(promptResult === null) {
        return;
    }
    
    const pairs = +promptResult;

    if(isNaN(pairs) || pairs < 4 || pairs > 26) {
        alert('Invalid input');
        return;
    }

    cards.Shuffle(pairs);
    numberOfMoves.set(0);
}

newGame();
</script>
<style>
.game-interface {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>