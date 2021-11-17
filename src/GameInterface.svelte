<div class="game-interface">
    <button on:click={ newGame }>New Game</button>
    <span>Number of Moves: {$numberOfMoves} </span>
</div>
<script>
import { cards } from './cards-store';
import { numberOfMoves } from './game-store';

function newGame() {
    if(confirm('Start a new game?')) {
        cards.Shuffle();
        numberOfMoves.set(0);
    }
}
</script>