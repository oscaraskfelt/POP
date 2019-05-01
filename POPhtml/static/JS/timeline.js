$('.btn').on('click', event => {
  $(event.currentTarget).siblings('.task_content').toggle();
})

/*
function onClickHandler(element) {
  var contentElement = element.parentNode.children[0];
  if (contentElement.getAttribute('style') === 'display: none;') {
      contentElement.removeAttribute('style');
  } else {
      contentElement.setAttribute('style', 'display: none;');
  }
}
*/