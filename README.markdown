/* $Id */

# Summary

Works for Drupal 6.

Adds contextual links for several objects like nodes, views, blocks etc.
It's also an API which other modules can hook into to add or alter
extra links.

You need to add an extra variable to your template files:

- node: $node\_classes
- views: $views\_classes
- block: $block\_classes
- page: $page\_classes

There is still some stuff todo - cleaning up API, settings page
and other stuff which we've probably forgotten.

## Use in Zen theme

In Zen theme, page, block and node templates do not have to be modified.
Instead, implement hook_preprocess().

    /**
     * Override or insert variables into all templates.
     *
     * @param $variables
     *   An array of variables to pass to the theme template.
     * @param $hook
     *   The name of the template being rendered (name of the .tpl.php file.)
     */
    function THEME_preprocess(&$vars, $hook) {
    
      // Any additional contextual link types must be added to this array.
      $keys = array(
        'block_classes',
        'node_classes',
        'page_classes',
    
        // Zen does not override user-profile.tpl.php.
        'user_classes',
        'views_classes',
      );
    
      foreach ($keys as $key) {
        if (array_key_exists($key, $vars)) {
          $vars['classes_array'][] = $vars[$key];
          unset($vars[$key]);
        }
      }
    }


# Maintainers

- swentel - http://drupal.org/user/107403
- jyve - http://drupal.org/user/591438
