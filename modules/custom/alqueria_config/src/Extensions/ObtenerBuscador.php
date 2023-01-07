<?php
namespace Drupal\alqueria_config\Extensions;
use Drupal\alqueria_config\Controller\AlqueriaConfigController;

/**
 * Class DefaultService.
 *
 * @package Drupal\alqueria_config
 */
class ObtenerBuscador extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'obtener_buscador';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('obtener_buscador',
        array($this, 'obtener_buscador'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function obtener_buscador($query,$limit) {
    $alqueria_config = new AlqueriaConfigController();
    $result = $alqueria_config->obtenerBuscador($query,$limit);
    return $result;
  }

}
