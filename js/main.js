
function initTab() {
  $('.tab-menu li').on('click', function() {
    $(this).toggleClass('active').siblings().removeClass('active');
    $(this).closest('.tab').children('.tab-content').children('.tab-item').hide().removeClass('open').eq($(this).index()).show().addClass('open')
  });
};

function initAccordeon() {
  $('.accordeon-item').on('click', function() {
    $(this).toggleClass('active').siblings().removeClass('active');
  });
};

function mobileMenu() {
  $('.burger').on('click', function() {
    $(this).toggleClass('active');
    $('.header').toggleClass('active');
  });
}

$(document).ready(function () {
  initTab();
  initAccordeon();
  mobileMenu();
});


