/* хранятся наши уровни */
var dataLevels = { 
	start: levelStart,
	game: levelGame,
	endGame: levelGameOver
}


/* статистика игры */
var dataGame = {
    /* отвечает за противника (бота) */
	value: {
		player: 0,
		bot: 0
	},
    /* общее число побед и поражений */
	state: {
		win: 0,
		over: 0
	}
}



var nowLevel = dataLevels.start;


window.addEventListener("load", function() {
	initGame("body");
	loadLevel();
});

/* хранятся наши уровни */
function initGame(parent) {
	var gameContainer = document.createElement("div");
	gameContainer.id = "game";
	document.querySelector(parent).append( gameContainer );
}

/* уровни */
function levelStart() {
	document.querySelector("#game").append( createBtn(["btn"], "Старт", handlerStartGame) );
}

/* создание кнопок выбора и окон */
function levelGame() {
	var gameContent = createEl("div", ["game-content"]);
	var gameAction = createEl("div", ["game-action"]);
	var gameActionBot = createEl("div", ["game-action-bot"]);
	var gameActionBotList = createEl("div", ["game-action-bot-list"]);
	var gameBlock1 = createEl("div", ["game-block"]);

	gameActionBot.append( gameActionBotList );
	gameActionBotList.append( gameBlock1 );
	gameAction.append( gameActionBot );
	gameContent.append( gameAction );

	var gameActionCenter = createEl("div", ["game-action-center"]);
	var spanCenter = document.createElement("span");
	spanCenter.innerHTML = "vs";
	gameActionCenter.append( spanCenter );
	gameAction.append( gameActionCenter );

	var gameActionPlayer = createEl( "div", ["game-action-player"] );
	var gameBlock = createEl("div", ["game-block"]);
	gameActionPlayer.append( gameBlock );
	gameAction.append( gameActionPlayer );

	var gameInput = createEl("div", ["game-buttons"]);
	var btnB1 = createBtn( ["btn", "btn-b", "btn-b1"], "",  function() {
		selectPlayer(1);
		selectBot();
	} );
	var btnB2 = createBtn( ["btn", "btn-b", "btn-b2"], "",  function() {
		selectPlayer(2);
		selectBot();
	} );
	var btnB3 = createBtn( ["btn", "btn-b", "btn-b3"], "",  function() {
		selectPlayer(3);
		selectBot();
	} );

	gameInput.append( btnB1 );
	gameInput.append( btnB2 );
	gameInput.append( btnB3 );
	gameAction.append( gameInput );

    /* игрок (передача параметров 1-3), нужно для того что бы понять кто выиграл 
    картинка передается в зависимости от выбранного параметра */

	function selectPlayer(a) {
		var tmpPlayer = createEl("div", ["game-block", "game-block-"+ a +""]);
		gameActionPlayer.innerHTML = "";
		gameActionPlayer.append( tmpPlayer );

		dataGame.value.player = a;
	}

	function selectBot() {
		gameActionBotList.innerHTML = "";
		var value = getRandomInt(3);
		value++;

		dataGame.value.bot = value;

		var tmpBot = createEl("div", ["game-block", "game-block-"+ value +""]);
		gameActionBotList.append( tmpBot );

		resultGame();
	}

	document.querySelector("#game").append( gameContent );
}

function levelGameOver() {
	var gameContent = createEl("div", ["game-content"]);
	var title = createEl("span", ["game-text", "pb-10"]);
	title.innerHTML = "Статистика:";
	var gameState = createEl("div", ["game-state"]);
	var tableState = createEl("table", []);
	var trState1 = createEl("tr", []);
	var tdState1 = createEl("td", []);
	tdState1.innerHTML = "Побед:";
	var tdState2 = createEl("td", ["win"]);
	tdState2.innerHTML = dataGame.state.win;
	var trState2 = createEl("tr", []);
	var tdState3 = createEl("td", []);
	tdState3.innerHTML = "Поражений:";
	var tdState4 = createEl("td", ["over"]);
	tdState4.innerHTML = dataGame.state.over;
	var btnRefresh = createBtn(["btn", "btn-refresh"], "", handlerStartGame);

	gameContent.append( title );
	gameState.append( tableState );
	tableState.append( trState1 );
	trState1.append( tdState1 );
	trState1.append( tdState2 );
	tableState.append( trState2 );
	trState2.append( tdState3 );
	trState2.append( tdState4 );
	gameContent.append( gameState );
	gameContent.append( btnRefresh );

	document.querySelector("#game").append( gameContent );
}


/* подчсет результата */
function resultGame() {
	nowLevel = dataLevels.endGame;

	switch (dataGame.value.player === dataGame.value.bot || `${dataGame.value.player}${dataGame.value.bot}`) {
		case true :
			console.log('Heh..... Draw')
			break;
		case "13" :
		case "21" :
		case "32" :
			++dataGame.state.win; /* подсчет побед игрока */
			break;
		default :
			++dataGame.state.over; /* подсчет побед бота */
	}

    /* через 500 мс отчистка уровня и загрузка нового  */
	setTimeout(function (){
		levelClear();
		loadLevel();
	}, 1000);
}


function handlerStartGame() {
	nowLevel = dataLevels.game;
	levelClear();
	loadLevel();
}





function createEl(el, classList) {
	var element = document.createElement(el);
	element.classList.add(...classList);
	return element;
}

/* обработка кнопки */
function createBtn(classBtn, contentBtn, handler) {
	var btn = document.createElement("button");
	btn.classList.add(...classBtn);
	btn.innerHTML = contentBtn;
	btn.addEventListener("click", handler, {capture:false, once:true});

	return btn;
}

function loadLevel() {
	nowLevel();
}

/* отчистка экрана */
function levelClear() {
	document.querySelector("#game").innerHTML = "";
}

/* рандом целых чисел */
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
