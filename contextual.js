/* $Id$ */

/*global $,Drupal */
"use strict";

Drupal.behaviors.contextual = function (context) {
  $(".contextual-enabled:not(.contextual-processed)", context).each(function () {
    var positioned = true,
      // Get the right actions from the closure region
      identifier = '#contextual-' + $(this).attr("class")
        .replace(/([^ ]+[ ]+)*contextual-([^ ]+)([ ]+[^ ]+)*/, '$2'),
      $links = $(identifier);

    $('<a class="contextual-toggler">').click(function () {
        var $menu = $('.contextual-links', $links);
        if ($menu.is(":hidden")) {
          $menu.slideDown('fast');
        } else {
          $menu.hide();
        }
        $(this).toggleClass('contextual-toggler-active');
      })
      .prependTo($('.contextual-wrapper', $links));

    $(this).prepend($links);

    $(this).hover(function () {
      if ($(this).css('position') === 'static') {
        positioned = false;
        $(this).css({'position': 'relative'});
      }

      // hide parent actions
      $('.contextual').css('padding-left', 100);
      $('.contextual-links:visible').hide();
      $('.contextual:visible').hide();
      $('.contextual-border').remove();
      $('a.contextual-toggler').removeClass('contextual-toggler-active');

      // Show current actions
      $links.show().append(Drupal.theme('contextualOverlay'));
    },
    function () {
      if (!positioned) {
        $(this).css('position', 'static');
      }
      $links.hide();
      $('.contextual-border', this).remove();
    });
  })
  .addClass('contextual-processed');
};

/**
 * Theme function for contextual overlay.
 */
Drupal.theme.prototype.contextualOverlay = function () {
  return '<div class="contextual-border contextual-border-top"></div><div class="contextual-border contextual-border-right"></div><div class="contextual-border contextual-border-bottom"></div><div class="contextual-border contextual-border-left"></div>';
};

/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, newcap: true, immed: true, strict: true, indent: 2 */
