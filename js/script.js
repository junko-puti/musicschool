//Splide
$(function () {
  if ($('body').hasClass('top-page')) {//top-pageの時のみ使用
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
      autoplay: true,//自動再生（デフォルトはfalse）
      interval: 4000,//自動再生の間隔
      speed: 400,//スライドの移動速度
      reducedMotion: {
        autoplay: true, // ← これで「動きを減らす」設定でも autoplay を強制
        speed: 400
      }
    }).mount();
  }
});



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



//アコーディオン　//AI参照
// $('.faq-accordion__question').click(function() {
//   $(this).next().slideToggle();
//   $(this).toggleClass('active');
// });
$('.top-faq-accordion__question, .top-faq-accordion__answer').click(function() {
  const $question = $(this).hasClass('top-faq-accordion__question')//質問の取得
    ? $(this)
    : $(this).prev('.top-faq-accordion__question');//答えがクリックされたときに兄弟要素の質問を取得

  const $answer = $question.next('.top-faq-accordion__answer');//直後の答えを取得

  $answer.slideToggle();//答えの開閉
  $question.toggleClass('active');
});




//スクロールトップボタン,お問い合わせボタンの変化
//AI・検索コードを参考にカスタマイズ
$(function(){
  const btn = $('.js-btn');
  const pagetop = $('.fixed-btn--pagetop');
  const contact = $('.fixed-btn--f-contact');

  $(window).on('scroll', function(){
    const scrollTop = $(this).scrollTop();
    //スクロール位置による表示切り替え
    btn.toggleClass('active',scrollTop > 100);

    //フッター手前でストップ
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + scrollTop;
    const footHeight = $("footer").outerHeight();
    const isOverlap = scrollHeight - scrollPosition <= footHeight;

    // お問い合わせボタンの有無で offset を調整
    const contactExists = contact.length > 0;
    let offset = contactExists ? 79 : 19; // SP用（モバイルファースト）
    if (window.matchMedia('(min-width: 768px)').matches) {
      offset = contactExists ? 91 : 31; // PC用
    }
    if (isOverlap) {
      
      // let offset = 79; // SP用（モバイルファースト）
      // if (window.matchMedia('(min-width: 768px)').matches) {
      //     offset = 91; // PC用
      // }
      pagetop.css({
        position: 'absolute',
        bottom: footHeight + offset + 'px'
      });
      contact.css({
        position: 'absolute',
        bottom: footHeight + 'px'
      });
    } else {
      pagetop.css({
        position: '',
        bottom: offset + 'px'
      });
      contact.css({
        position: '',
        bottom: ''
      });
    }
  });
  // スムーススクロール
  btn.on('click', function(){
    $('body,html').animate({ scrollTop: 0 }, 500);
  });

});





