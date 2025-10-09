//Splide
new Splide(".splide", {
  type: 'loop', //無限ループ
  perPage: 3,
  perMove: 1,//1枚ずつ移動
  pagination: false,//ページネーションを非表示
  arrows: true,//ここでは消さない（デフォルト矢印を無効化）
  gap: '35px',//スライド間の余白を指定
  padding: { left: 0, right: 0 }, // ← 余白をゼロに明示
  breakpoints: {
    767: {
      perPage: 1,
      perMove: 1,//SPでも1枚ずつ移動
    },
  },
  // autoplay: true,//自動再生（デフォルトはfalse）
  interval: 4000,//自動再生の間隔
  speed: 400,//スライドの移動速度
}).mount();



//AOS
AOS.init();



// スムーススクロール（ヘッダー高さ80px考慮）
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();
//     const targetId = this.getAttribute('href');

//     if (targetId === "#") {
//       // href="#" の場合はページ最上部へ
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       const targetElement = document.querySelector(targetId);
//       if (targetElement) {
//         const headerHeight = 80; // ヘッダーの高さ
//         const elementPosition = targetElement.getBoundingClientRect().top;
//         const offsetPosition = window.scrollY + elementPosition - headerHeight;

//         window.scrollTo({
//           top: offsetPosition,
//           behavior: 'smooth'
//         });
//       }
//     }
//   });
// });



///////////////////
// triggerボタン、ドロワーメニュー開閉
$(function(){
  $('.c-humburger').on('click', function() {
    $(this).toggleClass('active');
    $('#drawer').toggleClass('is-open');
    return false;
  });

  // メニュー内リンククリックで閉じる
  $('#drawer a').on('click', function() {
    $('#drawer').removeClass('is-open');
    $('.c-humburger').removeClass('active');
  });

  // メニュー外クリックで閉じる
  $(document).on('click', function(e) {
    const $drawer = $('#drawer');
    const $btn = $('.c-humburger');
    if (!$drawer.is(e.target) && $drawer.has(e.target).length === 0 &&
        !$btn.is(e.target) && $btn.has(e.target).length === 0) {
      $drawer.removeClass('is-open');
      $btn.removeClass('active');
    }
  });

  // スクロールでトップに戻ったら閉じる
  $(window).on('scroll', function() {
    if ($(window).scrollTop() === 0) {
      $('#drawer').removeClass('is-open');
      $('.c-humburger').removeClass('active');
    }
  });
});



// メニュー背景色の変化---ABOUTエリアが画面の真ん中に来たら変更する
function updateHeaderClass() {
  const $about = $('#about');
  if ($about.length === 0 || !$about.offset()) return;

  const aboutOffset = $about.offset().top;
  const scrollPosition = $(window).scrollTop();
  const windowHeight = $(window).height();

  if (scrollPosition + windowHeight / 2 > aboutOffset) {
    $('.js-header').addClass('is-colored');
  } else {
    $('.js-header').removeClass('is-colored');
  }
}

$(function () {
  updateHeaderClass();
  $(window).on('scroll', updateHeaderClass);
});



//アコーディオン
const triggers = document.querySelectorAll(".faq-accordion__trigger");
triggers.forEach((trigger) => {
  const dataanswer = trigger.dataset.answer;
  const answer = document.getElementById(dataanswer);

  trigger.addEventListener("click", (e) => {
    const target = e.currentTarget;
    const isOpen = trigger.classList.contains("__open");

    if (isOpen) {
      // アコーディオンを閉じる
      target.classList.remove("__open");
      answer.classList.add("__close");
    } else {
      // アコーディオンを開く
      target.classList.add("__open");
      answer.classList.remove("__close");
    }
  });
});











//スクロールトップボタンの変化
$(function(){
  const btn = $('.js-btn');
  $(window).on('scroll', function(){
    const scrollTop = $(this).scrollTop();
    //表示
    btn.toggleClass('active',scrollTop > 100);

    // フッター手前でストップ
    scrollHeight = $(document).height();
    scrollPosition = $(window).height() + $(window).scrollTop();
    footHeight = $("footer").innerHeight();
    
    const isOverlap = scrollHeight - scrollPosition <= footHeight;

    $('.fixed-btn--pagetop').toggleClass('is-overlap', isOverlap);
    $('.fixed-btn--f-contact').toggleClass('is-overlap', isOverlap);

    // if (scrollHeight - scrollPosition <= footHeight) {
    //   // ページトップボタンがフッター手前に来たらpositionをfixedからabsoluteに変更
    //   $('.fixed-btn--pagetop').css({ position: 'absolute', bottom: `${footHeight + 70}px` });
    //   $('.fixed-btn--f-contact').css({ position: 'absolute', bottom: `${footHeight}px` });
    // } else {
    //   $('.fixed-btn--pagetop').css({ position: 'fixed', bottom: `${70}px` });
    //   $('.fixed-btn--f-contact').css({ position: 'fixed', bottom: `${0}`});
    // }

  });
    // スムーススクロール
  btn.on('click', function(){
    $('body,html').animate({ scrollTop: 0 }, 500);
  });

});



// // ページトップボタン
// $(function () {
//   const pageTop = $("#page-top");
//   pageTop.hide();
//   $(window).scroll(function () {
//     if ($(this).scrollTop() > 100) {
//       pageTop.fadeIn();
//     } else {
//       pageTop.fadeOut();
//     }
//   });
//   pageTop.click(function () {
//     $("body,html").animate(
//       {
//         scrollTop: 0,
//       },
//       500
//     );
//     return false;
//   });
//   // フッター手前でストップ
//   $("#page-top").hide();
//   $(window).on("scroll", function () {
//     scrollHeight = $(document).height();
//     scrollPosition = $(window).height() + $(window).scrollTop();
//     footHeight = $("footer").innerHeight();
//     if (scrollHeight - scrollPosition <= footHeight) {
//  // ページトップボタンがフッター手前に来たらpositionとfixedからabsoluteに変更
//       $("#page-top").css({
//         position: "absolute",
//         bottom: footHeight,
//       });
//     } else {
//       $("#page-top").css({
//         position: "fixed",
//         bottom: "0",
//       });
//     }
//   });
// });

















//fade-in
$(window).on("scroll load", function() { // 初回ロード時にも実行
  $(".c-fade-in").each(function() {
    var scrollPosition = $(window).scrollTop() + $(window).height();
    var elementOffset = $(this).offset().top;

    if (scrollPosition > elementOffset) {
      $(this).addClass("visible");
    }
  });
});

