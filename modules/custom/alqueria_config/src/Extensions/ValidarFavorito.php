<?php
namespace Drupal\alqueria_config\Extensions;
use Drupal\alqueria_config\Controller\AlqueriaConfigController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class ValidarFavorito extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'validar_favorito';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('validar_favorito',
        array($this, 'validar_favorito'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function validar_favorito($nid) {
    $alqueria_config = new AlqueriaConfigController();
    $result = $alqueria_config->validarFavorito($nid);
    return $result;
  }

}
