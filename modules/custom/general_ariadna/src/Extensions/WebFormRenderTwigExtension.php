<?php
namespace Drupal\general_ariadna\Extensions;
use Drupal\general_ariadna\Controller\GeneralAriadnaController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class WebFormRenderTwigExtension extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'webform_render';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('webform_render',
        array($this, 'webform_render'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function webform_render($sid) {
    $general_ariadna = new GeneralAriadnaController;
    $result = $general_ariadna->getWebFormRender($sid);
    return $result;
  }

}
