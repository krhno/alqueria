<?php
namespace Drupal\alqueria_notifications\Extensions;
use Drupal\alqueria_notifications\Controller\AlqueriaNotificationsController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class ObtenerNotificacionesVisibles extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'obtener_notificaciones_visibles';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('obtener_notificaciones_visibles',
        array($this, 'obtener_notificaciones_visibles'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function obtener_notificaciones_visibles() {
    $alqueria_notifications = new AlqueriaNotificationsController();
    $result = $alqueria_notifications->obtenerNotificacionesVisiblesUsuario();
    return $result;
  }

}
