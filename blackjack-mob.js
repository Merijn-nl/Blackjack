/* 
Blackjack Graphical for Mobile v.01
November 2015
*/

// globals
var $ = document;
var cssId = 'myCss';
var gameNumber = 1;
var bankRoll = 1000;
var totalPlyCards = 2;
var totalPlyCardsB = 2;
var totalPlyCardsC = 2;
var totalPlyCardsD = 2;
var totalDeaCards = 1;
var initialBet;
var doubleOne = false;
var doubleTwo = false;
var split = 0;
var splitAces = 0;
var busTo = 0;
var singleCardValue;
var cardStr;
var outCome;
var plyParkingCard;
var plyCardsValue;
var plyCardsValueB;
var plyCardsValueC;
var plyCardsValueD;
var deaCardsValue;
var standardBet = 1;
var cardPicSrc, 
	cardPics = [], 
	cardTable, 
	ctx,
	zeeIndex = 0,
	hposPly = 125, 
	hposDea = 125,
	increment = 50,
	coordsA = 0,
	coordsB = 0,
	windowHeight = window.innerHeight,
	windowWidth = window.innerWidth,
	valHPos = 40,
	plyValVPos = windowHeight * 0.65,
	plyValVPosSplit1 = windowHeight * 0.55,
	plyValVPosSplit2 = windowHeight * 0.725,
	deaValVPos = windowHeight * 0.175,
	delayDea = 250,
	cardHPosStart = 125,
	deaCardVPos = 75;

// Card object defined
function Card() {
	this.cardDeal = function cardDeal () {
		var dealCard = (Math.floor(Math.random() * 52));
		return dealCard;
	}
		
	this.cardPics = 
	["Ah","2h","3h","4h","5h","6h","7h","8h","9h","10h","Jh","Qh","Kh",
	"As","2s","3s","4s","5s","6s","7s","8s","9s","10s","Js","Qs","Ks",
	"Ad","2d","3d","4d","5d","6d","7d","8d","9d","10d","Jd","Qd","Kd",
	"Ac","2c","3c","4c","5c","6c","7c","8c","9c","10c","Jc","Qc","Kc"];
	
	this.assignValue = function assignValue(dealCard) {
		dealCard += 1;
		var assignValue;
		if (dealCard == 1 || dealCard == 14 || dealCard == 27 || dealCard == 40) {assignValue = "Ace";}
		else if (dealCard == 2 || dealCard == 15 || dealCard == 28 || dealCard == 41) {assignValue = "Deuce";}
		else if (dealCard == 3 || dealCard == 16 || dealCard == 29 || dealCard == 42) {assignValue = "Three";}
		else if (dealCard == 4 || dealCard == 17 || dealCard == 30 || dealCard == 43) {assignValue = "Four";}
		else if (dealCard == 5 || dealCard == 18 || dealCard == 31 || dealCard == 44) {assignValue = "Five";}
		else if (dealCard == 6 || dealCard == 19 || dealCard == 32 || dealCard == 45) {assignValue = "Six";}
		else if (dealCard == 7 || dealCard == 20 || dealCard == 33 || dealCard == 46) {assignValue = "Seven";}
		else if (dealCard == 8 || dealCard == 21 || dealCard == 34 || dealCard == 47) {assignValue = "Eight";}
		else if (dealCard == 9 || dealCard == 22 || dealCard == 35 || dealCard == 48) {assignValue = "Nine";}
		else if (dealCard == 10 || dealCard == 23 || dealCard == 36 || dealCard == 49) {assignValue = "Ten";}
		else if (dealCard == 11 || dealCard == 24 || dealCard == 37 || dealCard == 50) {assignValue = "Jack";}
		else if (dealCard == 12 || dealCard == 25 || dealCard == 38 || dealCard == 51) {assignValue = "Queen";}
		else if (dealCard == 13 || dealCard == 26 || dealCard == 39 || dealCard == 52) {assignValue = "King";}
		return assignValue;
	}
	this.cardValue = function cardValue(assignValue) {
		var cardValue = 10;
		if (assignValue == "Ace") {cardValue = 11;}
		else if (assignValue == "Deuce") {cardValue = 2;}
		else if (assignValue == "Three") {cardValue = 3;}
		else if (assignValue == "Four") {cardValue = 4;}
		else if (assignValue == "Five") {cardValue = 5;}
		else if (assignValue == "Six") {cardValue = 6;}
		else if (assignValue == "Seven") {cardValue = 7;}
		else if (assignValue == "Eight") {cardValue = 8;}
		else if (assignValue == "Nine") {cardValue = 9;}
		return cardValue;
	}
	this.bjDeal = function bjDeal(){
		var dealCard = this.cardDeal();
		var assignValue = this.assignValue(dealCard);
		this.cardPicSrc = 
			"cards/" 
			+ this.cardPics[dealCard] 
			+ ".png";
		this.singleCardValue = parseInt(this.cardValue(assignValue));
		bjCard = 
			(assignValue 
			+ " with a value of " 
			+ this.singleCardValue);
		this.cardStr = bjCard;
		return bjCard;
	}
}

// Display betting form
function displayBettingForm() {
	shuffleShuffle();
	do {
		var initBet = Number(prompt("Your bankroll is: " + bankRoll + "\nHow much would you like to bet?", standardBet));
	}
	while (isNaN(initBet) === true || initBet > bankRoll);
	return initBet;
}

function tableCanvas() {
	cardTable = document.getElementById("cardTable");
	ctx = cardTable.getContext("2d");
}

function drawTable() {
	ctx.clearRect(0, 0, windowWidth, windowHeight);
}

// Display the gaming table	
function displayTable() {
	$.body.innerHTML = "";
	if (!$.getElementById(cssId)){
	    var head  = $.getElementsByTagName('head')[0];
	    var link  = $.createElement('link');
	    link.id   = cssId;
	    link.rel  = 'stylesheet';
	    link.type = 'text/css';
	    link.href = 'blackjack.css';
	    link.media = 'all';
	    head.appendChild(link);
	    $.title = "PhoneJack!";
	}
	
	$.write (
		"<div id=\"bankroll\"></div>"
		+ "<div id=\"table\"><canvas id=\"cardTable\" height=" + windowHeight * 0.9 + " width=" + windowWidth * 0.8 + ">You're just an analogue in a digital age, aren't ya.../n/nYour browser is too old and does not support the HTML5 canvas tag. Try playing <a href=\"blackjack.html\">blackjack.html</a> instead.</canvas></div>"
		+ "<div id='outcome'></div>"
		+ "<div id=\"buttons\">"
		+ "<input type = \"button\" value = \"Double\" id = \"doubleBtn\" onclick = \"doubleBtn(); return false\" disabled=\"true\" />"
		+ "<input type = \"button\" value = \"Hit\" id = \"hitBtn\" onclick = \"hitBtn(); return false\" disabled=\"true\" />"
		+ "<input type = \"button\" value = \"Stand\" id = \"standBtn\" onclick = \"standBtn(); return false\" disabled=\"true\" />"
		+ "<input type = \"button\" value = \"Split\" id = \"splitBtn\" onclick = \"splitBtn(); return false\" disabled=\"true\" style=\"margin-bottom: 0px;\" />"
		+ "</div>");	

	// Draw the table
	tableCanvas();	
	drawTable();
}

// Display bankroll
function displayBankroll() {
	$.getElementById("bankroll").innerHTML 
		= ("<h3>Bankroll: " + bankRoll + "</h3>");
}

// (re-)draw player's and dealer's score bubble
function clearText(vPos , color) {
	ctx.beginPath();
	ctx.arc(valHPos,vPos,36,0,2*Math.PI);
	ctx.fillStyle = "#333333";
	ctx.fill();	
	ctx.strokeStyle = "#" + color;
	ctx.lineWidth = 4;
	ctx.closePath();
	ctx.stroke();	
}

// Set the text style for the player and dealer score bubbles
function setTextStyle(){
	ctx.fillStyle = "white";
	ctx.font = "36px Verdana";
	ctx.fontWeight = "bold";
	ctx.textAlign = "center";
}

function writeValueSplitCards(plyCardsValue,plyCardsValueB){
	if (split === 1) {	
		// draw new background circle player
		clearText( plyValVPosSplit1 - 10, "33ff33" );
		clearText( plyValVPosSplit2 - 10, "333333" );
		setTextStyle();	

		if(plyCardsValue > 21) {
			ctx.fillStyle = "red";
			ctx.fillText(plyCardsValue,valHPos,plyValVPosSplit1);
		}
		else {
			ctx.fillText(plyCardsValue,valHPos,plyValVPosSplit1);
		}
		ctx.fillStyle = "white";
		ctx.fillText(plyCardsValueB,valHPos,plyValVPosSplit2);	
	}
	// Second Split Value
	else {
		clearText( plyValVPosSplit1 - 10 , "333333" );
		clearText( plyValVPosSplit2 - 10 , "33ff33" );
		setTextStyle();	

		if(plyCardsValueB > 21) {
			ctx.fillStyle = "red";
			ctx.fillText(plyCardsValueB,valHPos,plyValVPosSplit2);
		}
		else {
			ctx.fillText(plyCardsValueB,valHPos,plyValVPosSplit2);
		}
		ctx.fillStyle = "white";
		ctx.fillText(plyCardsValue,valHPos,plyValVPosSplit1);
	}	
}

// Write the value of the Player's Cards
function writePlyValue(plyCardsValue) {
	clearText( plyValVPos-10 , "33ff33" );
	setTextStyle();	

	if(plyCardsValue > 21) {
		ctx.fillStyle = "red";
		ctx.fillText(plyCardsValue,valHPos,plyValVPos);
	}
	else {
		ctx.fillText(plyCardsValue,valHPos,plyValVPos);
	}
}

// Write the value of the Dealer's Cards
function writeDeaValue(deaCardsValue) {
	clearText(deaValVPos-10,"dd5500");
	setTextStyle();	
	ctx.fillText(deaCardsValue,valHPos,deaValVPos);
}

// Shuffle the Shuffling Sounds
function shuffleShuffle(){
	var rnd = Math.random();
	if (rnd < 0.5){ var shufSound = "shuffle"; }
		else { var shufSound = "shuffle2"; }
	playSound(shufSound);	
}

// Play a sound
function playSound(sound) {
	var audio = new Audio('../sounds/' + sound + '.mp3');
	audio.play();	
}

// Show the player's cards
function drawPlyCard(plyCard,vpos) {
	zeeIndex++;
	var cardImg = new Image;
	cardImg.src = plyCard.cardPicSrc;
	cardImg.style.zIndex = zeeIndex;
	cardImg.onload = setTimeout(function() {
		ctx.drawImage(cardImg,hposPly,vpos);
	}, 250);
	playSound("card");
}

// Show the dealer's cards
function drawDeaCard(deaCard) {
	zeeIndex++;
	var cardImg = new Image;
	cardImg.src = deaCard.cardPicSrc;
	cardImg.style.zIndex = zeeIndex;
	cardImg.onload = setTimeout(function() {
		ctx.drawImage(cardImg,hposDea,deaCardVPos);
		hposDea += 50;
	}, delayDea);
	delayDea += 300;
	playSound("card");
}

// Print dealt cards and decide values before the first decision
function firstRound() {

	oc = $.getElementById("outcome");
	oc.style.display = "none";
		
	// draw background circle dealer
	ctx.beginPath();
	clearText(deaValVPos-10,"dd5500")
	
	// draw background circle player
	ctx.beginPath();
	clearText(plyValVPos-10,"33ff33");

	// set style for card values
	setTextStyle();
	
	plyFirstCard.bjDeal(); // deal a random card
	var plyImg01 = new Image;
	plyImg01.src = plyFirstCard.cardPicSrc;
	plyImg01.style.zIndex = zeeIndex;
	plyImg01.onload = function() {
		ctx.drawImage(plyImg01,cardHPosStart,plyValVPos-200);
	}

	deaFirstCard.bjDeal();
	drawDeaCard(deaFirstCard);

	zeeIndex++;
		
	plySecondCard.bjDeal();
	drawPlyCard(plySecondCard,plyValVPos-200);

	hposPly += increment;
	
/* Commented out for debugging - this code displays the back of a card for the dealer's second (placeholder) card

	var deaImg02 = new Image;
	deaImg02.src = "cards/back.jpg";
	deaImg02.style.zIndex = -10;
	deaImg02.onload = function() {
		ctx.drawImage(deaImg02,225,deaCardVPos);
	}
*/
			
	plyCardsValue = plyFirstCard.singleCardValue + plySecondCard.singleCardValue;
	deaCardsValue = deaFirstCard.singleCardValue;
	if (plyFirstCard.singleCardValue == 11 && plySecondCard.singleCardValue == 11) {
		plyCardsValue = 12;
		splitAces = 1;
		ctx.fillText(plyCardsValue,valHPos,plyValVPos);
		decision();
	}
	else if (plyCardsValue == 21 && deaFirstCard.singleCardValue <= 9) {
		setTimeout(blackJack(), 1200);
	}
	else if (plyCardsValue == 21 && deaFirstCard.singleCardValue >= 10) {
		totalDeaCards++;
		document.write("<p style=\"text-align: right\">The dealer's " + cardSeq(totalDeaCards) + " card is the " + deaSecondCard.bjDeal() + "<br />");
		deaCardsValue += deaSecondCard.singleCardValue;
		ctx.fillText(deaCardsValue,valHPos,deaValVPos);
		if (deaCardsValue != 21) {
			setTimeout(blackJack(), 1000);
		}
		else {
			standOff();
		}		
	}
	else {
		ctx.fillText(plyCardsValue,valHPos,plyValVPos);
		ctx.fillText(deaCardsValue,valHPos,deaValVPos);
		decision();
	}
}

/*Buttons Setup*/
// Enable a Button
function showBtn(Btn) {
	$.getElementById(Btn).disabled = false;
}

// Disable a Button
function hideBtn(Btn) {
	$.getElementById(Btn).disabled = true;
}

// Disable all Buttons
function hideAllBtns() {
	hideBtn("hitBtn");
	hideBtn("doubleBtn");
	hideBtn("standBtn");
	hideBtn("splitBtn");
}

/*Draw Decisions*/	
// Draw decisions dialog - normal
function decision() {
	if (plyCardsValue == 21) {
		if (totalPlyCards > 2) {
			standBtn();
		}	
		else if (totalPlyCards >= 2 && split == 1) {
			standBtn();
		}
	}
	
	if (totalPlyCards == 2 && plyCardsValue >= 4 && plyCardsValue < 21 && bankRoll >= initialBet) {
		showBtn("doubleBtn");
	}

	if (doubleOne == false) {	
		if (plyCardsValue > 11 && plyCardsValue < 21) {
			showBtn("standBtn");
		} 
		if ((plyCardsValue != 21 && deaSecondCard.singleCardValue == null) || (plyCardsValueB != 21 && deaSecondCard.singleCardValue == null)) {
			showBtn("hitBtn");
		}
		if (plyFirstCard != null && plySecondCard != null && totalPlyCards == 2 && split == 0 && bankRoll >= initialBet) {
			if (plyFirstCard.singleCardValue == plySecondCard.singleCardValue) {
				showBtn("splitBtn");
			}
		}
	/* Keep the number of splits confined to two for now
		if (plyFirstCard != null && plySecondCard != null && plyThirdCard != null && totalPlyCards == 3) {
			if (plyFirstCard.singleCardValue == plySecondCard.singleCardValue == plyThirdCard.singleCardValue) {
				showSplitBtn();
			}
		}
		if (plyFirstCard != null && plySecondCard != null && plyThirdCard != null && plyFourthCard != null && totalPlyCards == 4) {
			if (plyFirstCard.singleCardValue == plySecondCard.singleCardValue == plyThirdCard.singleCardValue == plyFourthCard.singleCardValue) {
				showSplitBtn();
			}
		}
	*/
	}
}

// Draw decisions dialog - second split
function decisionB() {
	if (totalPlyCardsB == 2 && plyCardsValueB >= 4 && plyCardsValueB < 21 && bankRoll >= initialBet) {
		showBtn("doubleBtn");
	}
	if (totalPlyCardsB >= 2 && plyCardsValueB === 21) {
		standBtn();
	}
	if (doubleTwo == false) {
		if (totalPlyCardsB == 2 && plyCardsValueB > 11 && plyCardsValueB < 21) {
			showBtn("standBtn");
		} 
		if (totalPlyCardsB != 2 && plyCardsValueB > 11 && plyCardsValueB < 21) {
			showBtn("standBtn");
		} 
		if (plyCardsValueB != 21 && deaSecondCard.singleCardValue == null) {
			showBtn("hitBtn");
		}
	}
}

/*Player Actions*/
// Player hits a card
function hitBtn() {
	var bypass = gameNumber,
		vpos;
	hideAllBtns();

	// Normal player drawing a card
	if (split != 2) {
		totalPlyCards++;
		hposPly += increment;
		zeeIndex++;		
		plyCard.bjDeal();
		if (split == 1) {
			vpos = plyValVPos - 400;
			hposPly += 50;
		}
		else if (split == 2){
			vpos = plyValVPos;
		}
		else {
			vpos = plyValVPos - 200;
		}
		drawPlyCard(plyCard,vpos);

		// Compensating for too big Aces
		if (plyCardsValue >= 11 && plyCard.singleCardValue == 11) {
			plyCard.singleCardValue = 1;
		}
		plyCardsValue += plyCard.singleCardValue;
		while (plyCardsValue > 21) {

			// Compensating for past too big Aces
			if (plyFirstCard.singleCardValue == 11) {
				plyFirstCard.singleCardValue = 1;
				plyCardsValue -= 10;
			}
			else if (plyCardsValue > 21 && plySecondCard.singleCardValue == 11 && splitAces != 1) {
				plySecondCard.singleCardValue = 1;
				plyCardsValue -= 10;
			}
			else {
				if (split == 1) {
					writeValueSplitCards(plyCardsValue,plyCardsValueB);
				}
				else {
					writePlyValue(plyCardsValue);
				}
				busto();
				break;
			}
		}
		if (bypass == gameNumber && split == 0) {
			writePlyValue(plyCardsValue);
			if (doubleOne == false) {
				decision(plyCardsValue);
			}
			else {
				dealerDraw();
			}
		}
		else if (bypass == gameNumber && split == 1) {
			writeValueSplitCards(plyCardsValue,plyCardsValueB);
			if (doubleOne == false) {
				decision(plyCardsValue);
			}
			else {
				splitTwo();
			}
		}
	}
	// Split player drawing a card
	else {
		totalPlyCardsB++;
		hposPly += increment;
		plyCard.bjDeal();
		drawPlyCard(plyCard,plyValVPos);

		// Compensating for too big Aces
		if (plyCardsValueB >= 11 && plyCard.singleCardValue == 11) {
			plyCard.singleCardValue = 1;
		}
		plyCardsValueB += plyCard.singleCardValue;
		while (plyCardsValueB > 21) {

			// Compensating for past too big Aces
			if (plyFirstCard == 11) {
				plyFirstCard = 1;
				plyCardsValueB -= 10;
			}
			else if (plyCardsValueB > 21 && plySecondCard.singleCardValue == 11) {
				plySecondCard.singleCardValue = 1;
				plyCardsValueB -= 10;
			}
			else if (busTo == 1) {
				writeValueSplitCards(plyCardsValue,plyCardsValueB);
				busto();
			}
			else {
				busto();
				break;
			}
		}
		if (bypass == gameNumber) {
			writeValueSplitCards(plyCardsValue,plyCardsValueB);
			if (doubleTwo == false && plyCardsValueB < 21) {
				decisionB(plyCardsValueB);
			}
			else {
				dealerDraw();
			}
		}

	}
}

// Double button
function doubleBtn() {
	hideAllBtns();
	bankRoll -= initialBet;
	if (split != 2) {
		doubleOne = true;
	}
	else {
		doubleTwo = true;
	}
	$.getElementById("buttons").innerHTML += ("<p class='message'><i>You've doubled your bet and may only draw one card.</i></p>");
	displayBankroll();
	hitBtn();
}

// Splits the two initially dealt cards in two separate games
function displaySplitCards(plyCard,deaCard,plyCard2) {

	var cardImg = new Image;
	cardImg.src = plyCard.cardPicSrc;
	cardImg.style.zIndex = zeeIndex;
	cardImg.onload = setTimeout(function() {
		ctx.drawImage(cardImg,cardHPosStart,plyValVPos - 400);
	}, 400);
	
	var cardImg2 = new Image;
	cardImg2.src = deaCard.cardPicSrc;
	cardImg2.style.zIndex = zeeIndex;
	cardImg2.onload = setTimeout(function() {
		ctx.drawImage(cardImg2,cardHPosStart,deaCardVPos);
	}, 400);	

	var cardImg3 = new Image;
	cardImg3.src = plyCard2.cardPicSrc;
	cardImg3.style.zIndex = zeeIndex;
	cardImg3.onload = setTimeout(function() {
		ctx.drawImage(cardImg3,cardHPosStart,plyValVPos);
	}, 400);	
}

// Splitting cards
function splitBtn() {
	hideAllBtns();
	split = 1;
	plyCardsValue = plyFirstCard.singleCardValue;
	plyParkingCard = plySecondCard.cardStr.substr(0);	
	totalPlyCards--;
	plyCardsValueB = plySecondCard.singleCardValue;
	totalPlyCardsB--;
	bankRoll -= initialBet;
	$.getElementById("buttons").innerHTML += ("<p class='message'><i>You've split your cards and are now playing for double the amount wagered initially.</i></p>");
	displayBankroll();
	drawTable();
	displaySplitCards(plyFirstCard,deaFirstCard,plySecondCard);
	writeDeaValue(deaCardsValue);
	writeValueSplitCards(plyCardsValue,plyCardsValueB);
	splitOne();
}

// The first half of the split
function splitOne() {
	totalPlyCards++;
	plySecondCard.bjDeal();
	drawPlyCard(plySecondCard,plyValVPos - 400)
	plyCardsValue += plySecondCard.singleCardValue;	
	if (plyFirstCard.singleCardValue == 11 && plySecondCard.singleCardValue == 11) {
		plyCardsValue = 12;
		writeValueSplitCards(plyCardsValue,plyCardsValueB);
		decision();
	}
	else {
		writeValueSplitCards(plyCardsValue,plyCardsValueB);
		
		// A Split Ace only gets one card
		if (plyFirstCard.singleCardValue == 11 && plySecondCard.singleCardValue != 11) {
			splitTwo();
		}
		else {	
			split = 1; // Split = 1 means that there is still a split to be made after the Player's Draw, so we go to splitTwo() instead of dealerDraw()
			decision();
		}
	}
}

// The second half of the split
function splitTwo() {
	totalPlyCardsB++;
	plyFirstCard = parseInt(plyParkingCard.substr(plyParkingCard.lastIndexOf(" ")));
	plySecondCard.bjDeal();
	
	hposPly = 175;
	
	drawPlyCard(plySecondCard,plyValVPos);
	plyCardsValueB += plySecondCard.singleCardValue;	
	split = 2; // Split = 2 means that we can go to dealerDraw() after the player is done drawing, and tells the evaluation process to evaluate both splits
	if (plyFirstCard == 11 && plySecondCard.singleCardValue == 11) {
		plyCardsValueB = 12;
		writeValueSplitCards(plyCardsValue,plyCardsValueB);
		decisionB();
	}
	else {
		writeValueSplitCards(plyCardsValue,plyCardsValueB);
		if (plyFirstCard == 11 && plySecondCard.singleCardValue != 11) {
			dealerDraw();
		}
		else {
			decisionB();
		}
	}
}

// Player Stands
function standBtn() {
	if (split == 1) {
		splitTwo();
	}
	else {
		dealerDraw();
	}
}

// Dealer draws a new card
function dealerDraw() {
	hideBtnsTemp();
	totalDeaCards++;
	deaSecondCard.bjDeal();		
	
/* Commented out to debug the hposDea flaw where the second to nth cards of the dealer overlap and are shown at the same time

	drawDeaCard(deaSecondCard); 
*/
	
	zeeIndex++;
	var cardImg = new Image;
	cardImg.src = deaSecondCard.cardPicSrc;
	cardImg.style.zIndex = zeeIndex;
	cardImg.onload = setTimeout(function() {
		ctx.drawImage(cardImg,cardHPosStart+50,deaCardVPos);
	}, delayDea);
	delayDea += 300;
	
	if (deaFirstCard.singleCardValue == 11 && deaSecondCard.singleCardValue == 11) {
		deaCardsValue = 12;
	}
	else {
		deaCardsValue += deaSecondCard.singleCardValue;	
	}
	writeDeaValue(deaCardsValue);
	var count = 0;
	while(deaCardsValue < 17) {
		totalDeaCards++;
		deaThirdCard.bjDeal();
		hposDea += 50;
		count++;		
		drawDeaCard(deaThirdCard);
		if (deaCardsValue >= 11 && deaThirdCard.singleCardValue == 11) {
			deaThirdCard.singleCardValue = 1;
		}
		deaCardsValue += deaThirdCard.singleCardValue;
		if (deaCardsValue > 21){
			if (deaFirstCard.singleCardValue == 11) {
				deaFirstCard.singleCardValue = 1;
				deaCardsValue -= 10;
			} 
			else if (deaSecondCard.singleCardValue == 11) {
				deaSecondCard.singleCardValue = 1;
				deaCardsValue -= 10;
			}
		}		
		writeDeaValue(deaCardsValue);
		if (count > 1) {hposDea -= 50;}				
	}
	if (deaCardsValue > 21 && split != 2) {
		win();
	}
	else {
		evaluate(plyCardsValue,deaCardsValue,plyCardsValueB/*,plyCardsValueC,plyCardsValueD*/); // Only one split for now
	}
}	

// Card sequence
function cardSeq(x) {
	var card;
	if (x == 2) {card = "second";}
	if (x == 3) {card = "third";}
	if (x == 4) {card = "fourth";}
	if (x == 5) {card = "fifth";}
	if (x == 6) {card = "sixth";}
	if (x == 7) {card = "seventh";}
	if (x == 8) {card = "eighth";}
	return card;
}

/// Game outcomes
// Evaluate the player's cards with the dealer's (only one split for now)
function evaluate(x,y,xx/*,xxx,xxxx*/) {

	if (busTo != 1) {
		if (x <= 21 && x > y || y > 21) {
			win();
		}
		else if (x > 21 || x < y) {
			loss();
		}
		else {
			standOff();
		}
	}

	if (split == 2)	{
		split = 0;
		if (xx <= 21 && xx > y || y > 21) {
			winTwo();
		}
		else if (xx > 21 || xx < y) {
			loss();
		}
		else {
			standOff();
		}
	}
}

// Hide the controls
function hideBtnsTemp() {
	$.getElementById("buttons").style.display = "none";
}

function showBtns() {
	$.getElementById("buttons").style.display = "inline";
}

	
// Blackjack!!
function blackJack() {		
	hideBtnsTemp();
	bankRoll += (initialBet * 2.5);
	standardBet = 1;
	oc.style.display = "block";
	oc.innerHTML += ("<h3 class='win'>Congrats, you have Blackjack!</h3>");
	outCome = "had blackjack";
	gameLoop();	
}

// Standoff
function standOff() {		
	oc.style.display = "block";
	oc.innerHTML += ("<h3>Standoff. You and the dealer both have " + deaCardsValue + ".</h3>");
	bankRoll += initialBet;
	outCome = "tied with the dealer";
	if (doubleOne == true) {
		bankRoll += initialBet;
	}
	if (split == 0) {
		gameLoop();	
	}
}

// Busto
function busto() {		
	hideBtnsTemp();
	oc.style.display = "block";
	oc.innerHTML += ("<h3 class='busto'>Busto; you lose</h3>");
	outCome = "lost";
	standardBet *= 2;
	if (split != 1) {
		gameLoop();
	}
	else {
		showBtns();
		busTo++;
		splitTwo(); 
	}
}

// Loss
function loss() {		
	oc.style.display = "block";
	oc.innerHTML += ("<h3 class='busto'>Dealer beats you, you lose</h3>");
	outCome = "lost";
	standardBet *= 2;
	if (split == 0) {
		gameLoop();
	}
}
	
// Win
function win() {	
	if (doubleOne == false) {
		bankRoll += (initialBet * 2);
	}
	else {
		bankRoll += (initialBet * 4);
	}
	oc.style.display = "block";
	oc.innerHTML += ("<h3 class='win'>You Win</h3>");
	outCome = "won";
	standardBet = 1;
	if (split == 0) {
		gameLoop();
	}
}

// Win second split
function winTwo() {	
	if (doubleTwo == false) {
		bankRoll += (initialBet * 2);
	}
	else {
		bankRoll += (initialBet * 4);
	}
	oc.style.display = "block";
	oc.innerHTML += ("<h3 class='win'>You Win (the second split)</h3>");
	outCome = "won";
	standardBet = 1;
	if (split == 0) {
		gameLoop();
	}
}

// Loop
function gameLoop() {	
	oc.style.display = "block";
	oc.innerHTML += ("<p>Would you like to play again?</p>"
	+ "<button id = 'loop' onclick = 'restart()' autofocus>Yes</button>"
	+ "<button id = 'exit' onclick = 'exit()'>No</button>");
}

function restart() {	
	gameNumber++;
	showBtns();
	main();
}
function exit() {
	alert("Thank you for playing!");
	window.close();
}

// Initialize
function init() {
	doubleOne = false;
	doubleTwo = false;
	split = 0;
	splitAces = 0;
	busTo = 0;
	deaCardsValue = 0;
	plyCardsValue = 0;
	plyCardsValueB = 0;
	plyCardsValueC = 0;
	plyCardsValueD = 0;
	totalPlyCards = 2;
	totalPlyCardsB = 2;
	totalDeaCards = 1;
	plyFirstCard = new Card ();
	plySecondCard = new Card();
	plyCard = new Card();
	deaCard = new Card();
	deaFirstCard = new Card();
	deaSecondCard = new Card();
	deaThirdCard = new Card();
	hposDea = 125;
	hposPly = 125;
	delayDea = 250;
	zeeIndex = 0;
	$.write ("<h3 style=\"display: none;\">Bankroll: " + bankRoll + "</h3>");
	//outCome = null;
}

// Main routine
function main() {
	init();
	displayTable();	
	displayBankroll();
	if (bankRoll > 0) {
		initialBet = displayBettingForm();
	}
	else {
		alert("You don't have enough marbles to play!");
		return false;
	}
	bankRoll -= initialBet;
	displayBankroll();
	firstRound();
}