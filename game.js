let vegas = {};
vegas.set = function() {
	
}

let roundNum = 0; //게임 라운드
let player = 2; //플레이어 수
let player1 = {bt : 100000};
let player2 = {bt : 100000};
let bettingTotal = 100000; //최초 배당 금액
let betting = 40000; // 1회 배팅 금액
let btPlayerNum = 0; //배팅된 수
let bettingN;
let btIndex1;
let btIndex2;
let btPlayerCh = 0; //선택된 캐릭터 수


$(document).ready(function () {
	vegas.gameS(); //game start!
});

// 카지노 배팅
function bettingS(bettingTotal) {
	$('.player .score').text(bettingTotal); //최초 금액 배당 표시

	// 플레이어 배팅 진행
	$('.gAreaIn li').click(function() {

		bettingN = $(this).index()+1; // 배팅된 카지노 인덱스

		$('#player1').removeClass('win');
		$('#player2').removeClass('win');
		$('#player1').removeClass('lose');
		$('#player2').removeClass('lose');
		$('.gAreaIn li').removeClass();
		$('.comment').hide();
		$('#player1 .point').text('');
		$('#player2 .point').text('');
		$('#player1 .chat').empty();
		$('#player2 .chat').empty();

		if(btPlayerNum===0) {
			btPlayerNum++;
			$(this).append('<span class="btPlayer">배팅' + btPlayerNum + '</span>');
			$(this).addClass('player1');
			btIndex1 = bettingN;
			//player1.bt = bettingTotal - betting;
			$('#player1 .score').text(player1.bt);
		}else if(btPlayerNum===1) {
			btPlayerNum++;
			$(this).append('<span class="btPlayer">배팅' + btPlayerNum + '</span>');
			$(this).addClass('player2');
			btIndex2 = bettingN;
			//player2.bt = bettingTotal - betting;
			$('#player2 .score').text(player2.bt);
			$(this).parent().addClass('start'); //모든 플레이어 배팅 완료 유무 판별 클래스
		}else{
			$('.popup').fadeIn();
			$('.popupIn p').text("이미 배팅하셨습니다.");
		}

	});
}

// 주사위 굴리기
function throwDice() {
	let randomdice=(Math.floor(Math.random()*6)+1);
	let diceImg = 'images/dice_0' + randomdice + '.png';
	$('.diceImg').attr('src', diceImg);
	$('.diceNum').text(randomdice);
	$('.player .chat span').hide();

	if(randomdice == btIndex1){
		//console.log('배팅1 당첨');
		$('.comment').show();
		$('.comment p').text('배팅1 당첨!');
		$('#player1 .point').text('+20000');
		$('#player2 .point').text('-20000');
		player1.bt += betting;
		player2.bt -= betting;
		$('#player1').addClass('win');
		$('#player2').addClass('lose');
		$('.player1').addClass('on1');
		$('.player2').removeClass('on2');
		$('#player1 .chat').append('<span>' + '후훗...!!' + '</span>');
		$('#player2 .chat').append('<span>' + '으으 분하군...!!' + '</span>');

		reBetting();

	}else if(randomdice == btIndex2){
		//console.log('배팅2 당첨');
		$('.comment').show();
		$('.comment p').text('배팅2 당첨!');
		$('#player1 .point').text('-20000');
		$('#player2 .point').text('+20000');
		player1.bt -= betting;
		player2.bt += betting;
		$('#player1').addClass('lose');
		$('#player2').addClass('win');
		$('.player1').removeClass('on1');
		$('.player2').addClass('on2');
		$('#player2 .chat').append('<span>' + '후훗...!!' + '</span>');
		$('#player1 .chat').append('<span>' + '으으 분하군...!!' + '</span>');

		reBetting();
	}

	$('#player1 .score').text(player1.bt); 
	$('#player2 .score').text(player2.bt);

}

// 게임 재배팅(일부 초기화)
function reBetting() {
	btPlayerNum = 0; //배팅한 플레이어 초기화

	$('.diceNum').text('');
	$('.gAreaIn').removeClass('start');
	$('.gAreaIn li').removeClass();
	$('.gAreaIn li .btPlayer').remove();
	$('.reStart').hide();
	$('.startDice').show();
	
}

// 게임 재시작(완전 초기화)
function reStart() {
	bettingTotal = 100000; //최초 배당 금액 다시 세팅
	player1.bt = 100000;
	player2.bt = 100000;
	btPlayerNum = 0; //배팅한 플레이어 초기화

	$('.diceNum').text('');
	$('#player1 .score').text(player1.bt);
	$('#player2 .score').text(player2.bt);
	$('.player1').removeClass('on1');
	$('.player2').removeClass('on2');
	$('.gAreaIn').removeClass('start');
	$('.gAreaIn li').removeClass();
	$('#player1').removeClass('win');
	$('#player2').removeClass('win');
	$('#player1').removeClass('lose');
	$('#player2').removeClass('lose');
	$('.gAreaIn li .btPlayer').remove();
	$('.reStart').hide();
	$('.startDice').show();
	
}

//캐릭터 선택
function playerSelect() {
	$('.playerArea').css('opacity',0);
	$('.diceWrap').hide();
	$('.gameArea').hide();
	$('.playerSelect').show();
	$('.playerSelect li').click(function() {
		let selImgIdx = $(this).index()+1;
		let selImg = 'images/player' + selImgIdx + '.png';

		if(btPlayerCh===0) {
			btPlayerCh++;
			$('#player1 img').attr('src', selImg);
			$(this).find('img').addClass('on');
		}else if(btPlayerCh===1){
			btPlayerCh++;
			$('#player2 img').attr('src', selImg);
			$(this).find('img').addClass('on');
		}else {
			$('.popup').fadeIn();
			$('.popupIn p').text("캐릭터 선정이 완료되었습니다.");
		}
	});
}

//캐릭터 텍스트 랜덤 노출
function randomTxtS() {
	let chatPopWin = ['으으 분하군...', '이런!!!'];
	let chatPopLose = ['후훗!!', '럭키가이~'];
	let randomTxt=(Math.floor(Math.random()*6));
	let txtOutputWin = chatPopWin[randomTxt];
	let txtOutputLose = chatPopLose[randomTxt];

	console.log(txtOutputWin);
	console.log(txtOutputLose);

 }

// 팝업
function popupS() {
	$('.closeBtn').click(function() {
		$('.popup').fadeOut();
		$('.popupIn p').text("");
	});
}

vegas.gameS = function(){

	popupS();

	// 게임 시작
	$('.startBtn').click(function() {
		playerSelect(); //캐릭터 선택
	});

	$('.playChBtn').click(function(){
		$('.playerArea').css('opacity',1);
		$('.playerSelect').hide();
		$('.gameArea').show();
		bettingS(bettingTotal); // 최초 배당 금액 배분(10만불)
		$('.startBtn').hide(); // 시작 버튼 감추기
		$('.comment').hide();
		$('.startDice').show();
		$('.gAreaIn').show();
		$('.player').show();
		$('.diceWrap').hide(); //인트로 주사위 감춤
		$('.dice').css('opacity',1); //게임용 주사위 등장
	});

	// 주사위 굴리기
	$('.startDice').click(function() {
		if(!$('.gAreaIn').hasClass('start')) {
			$('.popup').fadeIn();
			$('.popupIn p').text("먼저 배팅을 진행해주세요.");
		}else if(player1.bt <= 40000 || player2.bt <= 40000){
			
			//승자 확인
			if(player1.bt > player2.bt) {
				$('.comment').show();
				$('.comment p').text('player1 승리!');
				$('#player1').addClass('win');
				$('#player2').addClass('lose');
			}else if(player1.bt < player2.bt) {
				$('.comment').show();
				$('.comment p').text('player2 승리!');
				$('#player1').addClass('lose');
				$('#player2').addClass('win');
			}

			$(this).hide();
			$('.reStart').show(); //재시작 버튼

		}else {
			throwDice();			
		}
		
	});

	// 게임 재시작
	$('.reStart a').click(function() {
		reStart();
	});

}