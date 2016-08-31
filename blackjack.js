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
var delay = 500;

// Card object defined
function Card() {
	this.singleCardValue = singleCardValue;
	this.cardStr = cardStr;
	this.cardDeal = function cardDeal () {
		var dealCard = (Math.floor(Math.random() * 52) + 1);
		return dealCard;
	}
	this.assignSuit = function assignSuit(dealCard) {
		var assignSuit;
		if (dealCard <= 13) {assignSuit = "Hearts";}
		else if (dealCard >= 13 && dealCard <= 26) {assignSuit = "Spades";}
		else if (dealCard >= 26 && dealCard <= 39) {assignSuit = "Diamonds";}
		else {assignSuit = "Clubs";}
		return assignSuit;
	}
	this.assignValue = function assignValue(dealCard) {
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
		var assignSuit = this.assignSuit(dealCard);
		var assignValue = this.assignValue(dealCard);
		this.singleCardValue = parseInt(this.cardValue(assignValue));
		bjCard = (assignValue + " of " + assignSuit + " with a value of " + this.singleCardValue);
		this.cardStr = bjCard;
		return bjCard;
	}
}

// Display betting form
function displayBettingForm() {
	do {
		var initBet = Number(prompt("Your bankroll is: " + bankRoll + "\nHow much would you like to bet?", standardBet));
	}
	while (isNaN(initBet) === true || initBet > bankRoll);
	return initBet;
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
	}
	
	$.write ("<hr />"
	+ "<p>Game number: " + gameNumber + "</p>" 
	+ "<div id=\"outcome\"></div>"
	+ "<p id=\"yourCards\"><b>Your Cards</b><br /></p>"
	+ "<p id=\"dealersCards\"><b>Dealer's Cards</b><br /></p>" 
	+ "<div id=\"plyValue\"></div>"
	+ "<div id=\"plyValueSplit\"></div>"
	+ "<div id=\"deaValue\"></div>"
	+ "<div id=\"buttons\">"
	+ "<input type = \"button\" value = \"Double\" id = \"doubleBtn\" onclick = \"doubleBtn(); return false\" disabled=\"true\" />"
	+ "<input type = \"button\" value = \"Hit\" id = \"hitBtn\" onclick = \"hitBtn(); return false\" disabled=\"true\" />"
	+ "<input type = \"button\" value = \"Stand\" id = \"standBtn\" onclick = \"standBtn(); return false\" disabled=\"true\" />"
	+ "<input type = \"button\" value = \"Split\" id = \"splitBtn\" onclick = \"splitBtn(); return false\" disabled=\"true\" />"
	+ "</div>"
	+ "<hr class=\"under\" />"
	+ "<div id=\"bankroll\"></div>");
}

// Display bankroll
function displayBankroll() {
	$.getElementById("bankroll").innerHTML 
	= ("<h3>Bankroll: " + bankRoll + "</h3>");
	}

// Write the value of the Player's Cards
function writePlyValue(plyCardsValue) {
	if (split == 2) {
		$.getElementById("plyValueSplit").innerHTML 
		= ("<p>You have <b>" + plyCardsValue + "</b></p>");			
	}
	else if(plyCardsValue > 21) {
		$.getElementById("plyValue").innerHTML 
		= ("<p class=\"busto\">Too much! " + plyCardsValue + "</p>");		
	}
	else {
		$.getElementById("plyValue").innerHTML 
		= ("<p>You have <b>" + plyCardsValue + "</b></p>");	
	}
}

// Write the value of the Dealer's Cards
function writeDeaValue(deaCardsValue) {
	$.getElementById("deaValue").innerHTML 
	= ("<p>Dealer has <b>" + deaCardsValue + "</b></p>");	
}

// Print dealt cards and decide values before the first decision
function firstRound() {
	$.write("<div id=\"player\"><p>Your first card is the " + plyFirstCard.bjDeal() + "</p></div>");
	$.write("<div id=\"dealer\"><p>The dealer's first card is the " + deaFirstCard.bjDeal() + "</p></div>");
	$.getElementById("player").innerHTML += ("<p>Your second card is the " + plySecondCard.bjDeal() + "</p>");
	plyCardsValue = plyFirstCard.singleCardValue + plySecondCard.singleCardValue;
	deaCardsValue = deaFirstCard.singleCardValue;
	if (plyFirstCard.singleCardValue == 11 && plySecondCard.singleCardValue == 11) {
		plyCardsValue = 12;
		splitAces = 1;
		writePlyValue(plyCardsValue);
		decision();
	}
	else if (plyCardsValue == 21 && deaFirstCard.singleCardValue <= 9) {
		blackJack();
	}
	else if (plyCardsValue == 21 && deaFirstCard.singleCardValue >= 10) {
		totalDeaCards++;
		$.getElementById("dealer").innerHTML += ("<p>The dealer's " + cardSeq(totalDeaCards) + " card is the " + deaSecondCard.bjDeal() + "</p>");
		deaCardsValue += deaSecondCard.singleCardValue;
		writeDeaValue(deaCardsValue);
		if (deaCardsValue != 21) {
			blackJack();
		}
		else {
			standOff();
		}		
	}
	else {
		writePlyValue(plyCardsValue);
		writeDeaValue(deaCardsValue);
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
	var bypass = gameNumber;
	hideAllBtns();
	// Normal player drawing a card
	if (split != 2) {
		totalPlyCards++;
		$.getElementById("player").innerHTML += ("<p>Your " + cardSeq(totalPlyCards) + " card is the " + plyThirdCard.bjDeal() + "</p>");

		// Compensating for too big Aces
		if (plyCardsValue >= 11 && plyThirdCard.singleCardValue == 11) {
			plyThirdCard.singleCardValue = 1;
		}
		plyCardsValue += plyThirdCard.singleCardValue;
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
				writePlyValue(plyCardsValue);
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
			writePlyValue(plyCardsValue);
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
		$.getElementById("player").innerHTML += ("<p>Your " + cardSeq(totalPlyCardsB) + " card is the " + plyThirdCard.bjDeal() + "</p>");

		// Compensating for too big Aces
		if (plyCardsValueB >= 11 && plyThirdCard.singleCardValue == 11) {
			plyThirdCard.singleCardValue = 1;
		}
		plyCardsValueB += plyThirdCard.singleCardValue;
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
				writePlyValue(plyCardsValueB);
				busto();
			}
			else {
				$.write("<h2 style=\"color: #f00; text-align: center;\">Busto; you lose</h2>");
				break;
			}
		}
		if (bypass == gameNumber) {
			writePlyValue(plyCardsValueB);
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
	$.getElementById("player").innerHTML += ("<p style=\"text-align: center\"><i>You've doubled your bet and may only draw one card.</i></p>");
	displayBankroll();
	hitBtn();
}

// Splitting cards
function splitBtn() {
	hideAllBtns();
	plyCardsValue = plyFirstCard.singleCardValue;
	plyParkingCard = plySecondCard.cardStr.substr(0);	
	totalPlyCards--;
	plyCardsValueB = plySecondCard.singleCardValue;
	totalPlyCardsB--;
	bankRoll -= initialBet;
	$.getElementById("player").innerHTML += ("<p style=\"text-align: center\"><i>You've split your cards and are now playing for double the amount wagered initially.</i></p>");
	displayBankroll();
	splitOne();
}

// The first half of the split
function splitOne() {
	totalPlyCards++;
	$.getElementById("player").innerHTML += ("<hr style=\"width: 65%;\" /><p><b>First Split</b><br />Your first card in this first split is the " + plyFirstCard.cardStr +"<br />Your second card in this split is the " + plySecondCard.bjDeal() + "</p>");
	plyCardsValue += plySecondCard.singleCardValue;	
	if (plyFirstCard.singleCardValue == 11 && plySecondCard.singleCardValue == 11) {
		plyCardsValue = 12;
		writePlyValue(plyCardsValue);
		decision();
	}
	else {
		writePlyValue(plyCardsValue);
		//$.write("<p style=\"text-align: right\">The dealer has <b>" + deaCardsValue + "</b></p>");
		
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
	$.getElementById("player").innerHTML 
		+= ("<hr style=\"width: 65%;\" /><p><b>Second Split</b><br />Your first card in this second split is the " + plyParkingCard 
		+ "<br />Your second card in this split is the " + plySecondCard.bjDeal() + "</p>");
	plyCardsValueB += plySecondCard.singleCardValue;	
	split = 2; // Split = 2 means that we can go to dealerDraw() after the player is done drawing, and tells the evaluation process to evaluate both splits
	if (plyFirstCard == 11 && plySecondCard.singleCardValue == 11) {
		plyCardsValueB = 12;
		writePlyValue(plyCardsValueB);
		decisionB();
	}
	else {
		writePlyValue(plyCardsValueB);
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
	totalDeaCards++;
	$.getElementById("dealer").innerHTML += ("<p>The dealer's " + cardSeq(totalDeaCards) + " card is the " + deaSecondCard.bjDeal() + "</p>");
	if (deaFirstCard.singleCardValue == 11 && deaSecondCard.singleCardValue == 11) {
		deaCardsValue = 12;
	}
	else {
		deaCardsValue += deaSecondCard.singleCardValue;	
	}
	writeDeaValue(deaCardsValue);
	while(deaCardsValue < 17) {
		totalDeaCards++;
		$.getElementById("dealer").innerHTML += ("<p>The dealer's " + cardSeq(totalDeaCards) + " card is the " + deaThirdCard.bjDeal() + "</p>");
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
	}
	if (deaCardsValue > 21 && split != 2) {
		win();
	}
	else {
		evaluate(plyCardsValue,deaCardsValue,plyCardsValueB/*,plyCardsValueC,plyCardsValueD*/);
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
// Evaluate the player's cards with the dealer's
function evaluate(x,y,xx/*,xxx,xxxx*/) {
	if (busTo != 1) {
		if ((x <= 21) && x > y || y > 21) {
			win();
		}
		else if (x > 21 || x < y) {
			loss();
		}
		else {
			standOff();
		}
	}
	if (split == 2) {
		split = 0;
		if ((xx <= 21) && xx > y || y > 21) {
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
	
// Blackjack!!
function blackJack() {
	bankRoll += (initialBet * 2.5);
	standardBet = 1;
	alert("Congratulations, you have Blackjack!");
	outCome = "had blackjack";
	gameLoop();	
}

// Standoff
function standOff() {
	$.getElementById("outcome").innerHTML += ("<br /><h2>Standoff. You and the dealer both have " + deaCardsValue + ".</h2>");
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
	$.getElementById("outcome").innerHTML += ("<br /><h2 style=\"color: #f00;\">Busto; you lose</h2>");
	outCome = "lost";
	standardBet *= 2;
	if (split != 1) {
		gameLoop();
	}
	else {
		busTo++;
		splitTwo(); 
	}
}

// Loss
function loss() {
	$.getElementById("outcome").innerHTML += ("<br /><h2 style=\"color: #f00;\">Dealer beats you, you lose</h2>");
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
	$.getElementById("outcome").innerHTML += ("<br /><h2 style=\"color: #0f0;\">You Win</h2>");
	outCome = "won";
	standardBet = 1;
	if (split == 0) {
		gameLoop();
	}
}

function winTwo() {
	if (doubleTwo == false) {
		bankRoll += (initialBet * 2);
	}
	else {
		bankRoll += (initialBet * 4);
	}
	$.getElementById("outcome").innerHTML += ("<br /><h2 style=\"color: #0f0;\">You Win (the second split)</h2>");
	outCome = "won";
	standardBet = 1;
	if (split == 0) {
		gameLoop();
	}
}

// Loop
function gameLoop() {
	var loop = window.confirm("You " + outCome + ". Would you like to play again?");
	if (loop == true) {
		gameNumber++;
		main();
	}
	else {
		alert("Thank you for playing!");
	}
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
	plyThirdCard = new Card();
	deaFirstCard = new Card();
	deaSecondCard = new Card();
	deaThirdCard = new Card();
	//outCome = null;
}

// Main routine
function main() {
	init();
	$.write ("<h3 style=\"text-align: center;\">Bankroll: " + bankRoll + "</h3>");
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