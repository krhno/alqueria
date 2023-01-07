<?php
namespace Drupal\alqueria_config\Extensions;
use Drupal\alqueria_config\Controller\AlqueriaConfigController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class ObtenerRecetasRelacionadas extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'obtener_recetas_relacionadas';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('obtener_recetas_relacionadas',
        array($this, 'obtener_recetas_relacionadas'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function obtener_recetas_relacionadas($tid) {
    $alqueria_config = new AlqueriaConfigController();
    $result = $alqueria_config->obtenerRecetasPorCategoria($tid);
    return $result;
  }

}
