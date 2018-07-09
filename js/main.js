function shuffle(arra1) {
    var ctr = arra1.length,
        temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
//Global vars
let flipped = 0;


//Arrays
let memory_tiles = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let memory_tile_ids = [];
let memory_values = [];
//starting the game.
function startGame() {
    let startCov = document.getElementById('start_cover');
    startCov.style.display = 'none';
    newboard();
}

function newboard() {
    
    flipped = 0;
    let output = '',
    board = document.getElementById('board'),
    diff = document.getElementById('game-difficulties').value;
    
    if(diff === 'small'){
        board.classList.add('smallBoard');
        // 
    }else if(diff === 'medium'){
        board.classList.add('medBoard');
        memory_tiles.push('I', 'I', 'J','J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'U', 'U', 'V', 'V', 'W', 'W', 'X', 'X');

    }else if(diff === 'large'){
        board.classList.add('largeBoard');
        memory_tiles.push('I', 'I', 'J','J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'U', 'U', 'V', 'V', 'W', 'W', 'X', 'X', 'Y', 'Y', 'Z', 'Z', 'a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h', 'i', 'i');
    }
    shuffle(memory_tiles);

    for (let i = 0; i < memory_tiles.length; i++) {
        output += `<div class="tile" id="tile_${i}" onclick="tileFlip(this, '${memory_tiles[i]}')"></div>`;
    }
    board.innerHTML = output;

}
//tile flipping function.
function tileFlip(tile, val) {
    if (tile.innerHTML == '' && memory_values.length < 2) {
        tile.classList.add('flipped');
        tile.innerHTML = val;
        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if (memory_values[0] == memory_values[1]) {
                flipped += 2;
                memory_values.splice(val);
                memory_tile_ids.splice(tile.id);

                if (memory_tiles.length == flipped) {
                    // document.getElementById('board').innerHTML = '';
                    

                }
            } else {
                function flipBack() {
                    let tile_1 = document.getElementById(memory_tile_ids[0]);
                    let tile_2 = document.getElementById(memory_tile_ids[1]);

                    tile_1.classList.remove('flipped');
                    tile_1.innerHTML = '';
                    tile_2.classList.remove('flipped');
                    tile_2.innerHTML = '';
                    memory_tile_ids.splice(tile.id);
                    memory_values.splice(val);
                }

                setTimeout(flipBack, 700);
            }

        }
    }
}

//Timer Func.
function setTime() {
    let timeLeft;
    let counter = 0;
    let timer = document.getElementById('time');
    let game_over = document.getElementById('model');
    let modelContent = document.getElementById('content');
    
    



    function convertTime(s) {
        let min = Math.floor(s / 60);
        let secs = s % 60;
        if (s < 600) {
            return '0' + min + ':' + secs
        } else {
            return min + ':' + secs;

        }

    }
    let interval = setInterval(timeIt, 1000);

    function timeIt() {
        let diff = document.getElementById('game-difficulties').value;

        if (diff === 'small') {

            timeLeft = 90;
            counter++;
            timer.innerHTML = convertTime(timeLeft - counter);
            if(timer.innerHTML == '00:30'){
                timer.style.color ='#b20101';
            }

        } else if (diff === 'medium') {
            timeLeft = 300;
            counter++;
            timer.innerHTML = convertTime(timeLeft - counter);
            if(timer.innerHTML == '00:30'){
                timer.style.color ='#b20101';
            }
            
        } else if (diff === 'large') {
            timeLeft = 600;
            counter++;
            timer.innerHTML = convertTime(timeLeft - counter);
            if(timer.innerHTML == '00:30'){
                timer.style.color ='#b20101';
            }
        }
        if (timeLeft == counter) {
            timer.innerHTML = convertTime(0);
            clearInterval(interval);
            game_over.style.display ='block';

        }else if(memory_tiles.length == flipped){
            clearInterval(interval);
            game_over.style.display = 'block';
            modelContent.innerHTML = `Congratulations you've completed it just in time!<br>
            Time Left: ${timer.innerHTML}<br>
            Wanna try again?`;
            
        }

    }


}





//EventListeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('startBtn').addEventListener('click', setTime);
document.getElementById('yes').addEventListener('click', function(){window.location.reload();});
document.getElementById('no').addEventListener('click', function(){close();});