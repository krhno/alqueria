<?php

namespace Drupal\social_share\Plugin\Block;
use Drupal\social_share\Controller\SocialShareController;
use Drupal\Core\Block\BlockBase;


/**
 * Provides a 'shareredes' block.
 *
 * @Block(
 *   id = "share_redes",
 *   admin_label = @Translation("Share redes"),
 *   category = @Translation("ShareRedes")
 * )
 */
class ShareRedes extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $controller = new SocialShareController;
    $data = $controller->obtenerRedes();
    $config = \Drupal::config('investBlocks.settings');        
    
    return array(
      '#type' => 'markup',
      '#markup' => 'Share',
      '#theme'=> 'share-redes',      
      '#data' => $data,            
      // '#attached' => array(
      //   'library' => array("invest_blocks/investBlocks"),
      // ),            
    );
  }

   

}
