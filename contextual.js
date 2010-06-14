/* $Id$ */

Drupal.contextual = Drupal.contextual || {};
Drupal.contextual.overlay = '<div class="contextual-border contextual-border-top"></div><div class="contextual-border contextual-border-right"></div><div class="contextual-border contextual-border-bottom"></div><div class="contextual-border contextual-border-left"></div>';

Drupal.behaviors.contextual = function(context) {
  $("div.contextual-enabled:not(.contextual-processed)", context).each(function () {
    var positioned = true;
    // Get the right actions from the closure region
    var classes = ($(this).attr("class"));
    var identifier = '#contextual-'+ classes.replace(/([^ ]+[ ]+)*contextual-([^ ]+)([ ]+[^ ]+)*/, '$2');
    $(this).hover(function() {
      $(this).prepend($(identifier));
      if ($(this).css('position') === 'static') {
        positioned = false;
        $(this).css({'position': 'relative'});
      }

      // hide parent actions
      $('.contextual').css('padding-left', 100);
      $('.contextual-links').hide();
      $('.contextual').hide();
      $('.contextual-border').remove();
      $('a.contextual-toggler').removeClass('contextual-toggler-active');

      // Show current actions
      $('.contextual:first', this).show().append(Drupal.contextual.overlay);
    },
    function() {
      if (!positioned) {
        $(this).css('position', 'static');
      }
      $('.contextual', this).hide();
      $('.contextual-border', this).remove();
    });
  })
  .addClass('contextual-processed');
};

/**
 * toggles visibility on an element
 */
Drupal.contextual.toggleVis = function(element) {
  element = $('#' + element);
  if (element.is(":hidden")) {
    element.slideDown('fast');
  } else {
    element.hide();
  }
  $('a.contextual-toggler', element.parent()).toggleClass('contextual-toggler-active');
};
