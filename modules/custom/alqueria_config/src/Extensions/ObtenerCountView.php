<?php
namespace Drupal\alqueria_config\Extensions;
use Drupal\alqueria_config\Controller\AlqueriaConfigController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class ObtenerCountView extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'obtener_count_view';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('obtener_count_view',
        array($this, 'obtener_count_view'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function obtener_count_view($data, $viewName, $viewDisplay) {
    $alqueria_config = new AlqueriaConfigController();
    $result = $alqueria_config->obtenerCountView($data, $viewName, $viewDisplay);
    return $result;
  }

}
