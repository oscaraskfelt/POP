$(document).ready(function(){
    $('.hide-button').on('click', () => {
        $('.first-image').hide();
      });
      $('.show-button').on('click', () => {
        $('.first-image').show();
      });
      
      $('.toggle-button').on('click', () => {
        $('.first-image').toggle();
      });
