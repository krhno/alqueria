<?php
namespace Drupal\general_ariadna\Extensions;
use Drupal\general_ariadna\Controller\GeneralAriadnaController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class DebugTwigExtension extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'debug_view';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('debug_view',
        array($this, 'debug_view'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function debug_view($row) {
    $general_ariadna = new GeneralAriadnaController;
    $result = $general_ariadna->getDebug($row);
    return $result;
  }

}
