<?php
namespace Drupal\general_ariadna\Extensions;
use Drupal\general_ariadna\Controller\GeneralAriadnaController;

/**
 * Class DefaultService.
 *
 * @package Drupal\general_ariadna
 */
class GetConfigDataTwigExtension extends \Twig_Extension {

  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName() {
    return 'get_config_data';
  }

  /**
   * In this function we can declare the extension function
   */
  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction('get_config_data',
        array($this, 'get_config_data'),
        array('is_safe' => array('html'))));
  }

  /**
   * The php function to load a given block
   */
  public function get_config_data($config,$setting) {
    $general_ariadna = new GeneralAriadnaController;
    $data = $general_ariadna->getConfigData($config,$setting);
    return $data;
  }

}
