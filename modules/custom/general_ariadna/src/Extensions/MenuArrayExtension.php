<?php
namespace Drupal\general_ariadna\Extensions;
use Drupal\general_ariadna\Controller\GeneralAriadnaController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class MenuArrayExtension extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'menu_array';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('menu_array',
        array($this, 'menu_array'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function menu_array($menu_id) {
    $general_ariadna = new GeneralAriadnaController;
    $menu = $general_ariadna->getMenuArray($menu_id);
    return $menu;
  }

}
