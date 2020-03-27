let vegas = {};
vegas.set = function() {
	
}

let roundNum = 0; //게임 라운드
let player = 2; //플레이어 수
let player1 = {bt : 100000};
let player2 = {bt : 100000};
let bettingTotal = 100000; //최초 배당 금액
let betting = 20000; // 1회 배팅 금액
let btPlayerNum = 0; //배팅된 수
let bettingN;
let btIndex1;
let btIndex2;

$(document).ready(function () {
	vegas.gameS(); //game start!
});


// 카지노 배팅
function bettingS(bettingTotal) {
	$('.player .score').text(bettingTotal); //최초 금액 배당 표시

	// 플레이어 배팅 진행
	$('.gAreaIn li').click(function() {

		$(this).parent().addClass('start'); //배팅 시작 유무 판별 클래스
		bettingN = $(this).index()+1; // 배팅된 카지노 인덱스

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
		}else{
			alert('배팅 끝');
		}
	});
}

// 주사위 굴리기
function throwDice() {
	let randomdice=(Math.floor(Math.random()*6)+1);

	$('.diceNum').text(randomdice);
	$('.player1').removeClass('on1');
	$('.player2').removeClass('on2');

	if(randomdice == btIndex1){
		console.log('배팅1 당첨');
		player1.bt += betting;
		player2.bt -= betting;
		//$('.point').text(+20000);
		$('.player1').addClass('on1');
		$('.player2').removeClass('on2');
		//$('.gAreaIn').addClass('potinAdd'); // 득점 유무 확인 클래스

	}else if(randomdice == btIndex2){
		console.log('배팅2 당첨');
		player1.bt -= betting;
		player2.bt += betting;
		//$('.point').text(+20000);
		$('.player1').removeClass('on1');
		$('.player2').addClass('on2');
		//$('.gAreaIn').addClass('potinAdd'); // 득점 유무 확인 클래스

	}
	
	if($('.gAreaIn').hasClass('potinAdd')) {
		alert('재배팅');
		$('.gAreaIn').removeClass('potinAdd');
		reBetting();
	}
	

	$('#player1 .score').text(player1.bt); 
	$('#player2 .score').text(player2.bt);

}

// 게임 재배팅
function reBetting() {
	btPlayerNum = 0; //배팅한 플레이어 초기화
	$('.gAreaIn').removeClass('potinAdd');

	$('.diceNum').text('');
	// $('#player1 .score').text(player1.bt);
	// $('#player2 .score').text(player2.bt);

	$('.player1').removeClass('on1');
	$('.player2').removeClass('on2');
	$('.gAreaIn').removeClass('start');
	$('.gAreaIn li').removeClass();
	$('.gAreaIn li .btPlayer').remove();

	$('.reStart').hide();
	$('.startDice').show();
	
}

// 게임 재시작(초기화)
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
	$('.gAreaIn li .btPlayer').remove();

	$('.reStart').hide();
	$('.startDice').show();
	
}



vegas.gameS = function(){

	// 게임 시작
	$('.startBtn').click(function() {
		bettingS(bettingTotal); // 최초 배당 금액 배분(10만불)
		$(this).hide(); // 시작 버튼 감추기
	});

	// 주사위 굴리기
	$('.startDice').click(function() {
		if(!$('.gAreaIn').hasClass('start')) {
			alert('먼저 배팅을 진행해주세요.');
		}else if(player1.bt <= 20000 || player2.bt <= 20000){
			
			//승자 확인
			if(player1.bt > player2.bt) {
				alert('player1 승리!');
			}else if(player1.bt < player2.bt) {
				alert('player2 승리!');
			}

			alert('게임 끝!');
			
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



