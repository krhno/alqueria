<?php
namespace Drupal\general_ariadna\Extensions;
use Drupal\general_ariadna\Controller\GeneralAriadnaController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class MenuTwigExtension extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'menu_twig';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('menu_twig',
        array($this, 'menu_twig'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function menu_twig($menu_id) {
    $general_ariadna = new GeneralAriadnaController;
    $menu = $general_ariadna->getMenuTwig($menu_id);
    return $menu;
  }

}
