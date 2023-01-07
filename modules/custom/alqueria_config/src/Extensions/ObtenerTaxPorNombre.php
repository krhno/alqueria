<?php
namespace Drupal\alqueria_config\Extensions;
use Drupal\alqueria_config\Controller\AlqueriaConfigController;

/**
 * Class DefaultService.
 *
 * @package Drupal\alqueria_config
 */
class ObtenerTaxPorNombre extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'obtener_tax_por_nombre';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('obtener_tax_por_nombre',
        array($this, 'obtener_tax_por_nombre'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function obtener_tax_por_nombre($nombre) {
    $alqueria_config = new AlqueriaConfigController();
    $result = $alqueria_config->obtenerTaxPorNombre($nombre);
    return $result;
  }

}
