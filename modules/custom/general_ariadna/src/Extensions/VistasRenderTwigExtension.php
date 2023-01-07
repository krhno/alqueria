<?php
namespace Drupal\general_ariadna\Extensions;
use Drupal\general_ariadna\Controller\GeneralAriadnaController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class VistasRenderTwigExtension extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'vista_render';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('vista_render',
        array($this, 'vista_render'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function vista_render($data, $viewName, $viewDisplay) {
    $general_ariadna = new GeneralAriadnaController;
    $result = $general_ariadna->getViewRender($data, $viewName, $viewDisplay);
    return $result;
  }

}
