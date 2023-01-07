<?php
/**
 * Created by PhpStorm.
 * User: cristian.delacruz
 * Date: 5/12/2017
 * Time: 6:13 PM
 */

namespace Drupal\general_ariadna\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\general_ariadna\Model\GeneralCommentModel;
use Drupal\general_ariadna\Model\GeneralMenuModel;
use Drupal\views\Views;
use Drupal\node\Entity\Node;
use Drupal\field_collection\Entity\FieldCollectionItem;
use Drupal\Core\Link;
use Drupal\block\Entity\Block;
use Drupal\webform\Element\Webform;
use Drupal\webform\Entity\WebformSubmission;
use Drupal\Core\Menu;



class GeneralAriadnaController extends ControllerBase
{


  /**
   * Accion que retorna las imagenes de un menu
   */
  public function getMenuIcons($fid){
      //Se carga path de la imagen y se verifica que no este vacio
      $file = \Drupal\file\Entity\File::load($fid);
      if (empty($file)) {
        return null;
      }
      //Se carga la ruta relativa del archivo
      $image_path = $file->getFileUri();
      //Se genera la url de la imagen para ser renderizada en los templates
      $menu_icons = file_create_url($image_path);
      return $menu_icons;
  }
  /**
   * Accion que retorna las imagenes de un menu
   */
  public function getMenuTwig($menu_id){
    $menu_tree = \Drupal::menuTree();
    $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_id);
    $tree = $menu_tree->load($menu_id, $parameters);
    $manipulators = array(
                            array('callable' => 'menu.default_tree_manipulators:checkAccess'),
                            array('callable' => 'menu.default_tree_manipulators:generateIndexAndSort'),
                        );
    $tree = $menu_tree->transform($tree, $manipulators);  
    $menu = $menu_tree->build($tree);
    return $menu;  
  }

  public function getMenuArray($menu_id){
    $menu_tree = \Drupal::menuTree();
    $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_id);
    $tree = $menu_tree->load($menu_id, $parameters);
    $manipulators = array(
                            array('callable' => 'menu.default_tree_manipulators:checkAccess'),
                            array('callable' => 'menu.default_tree_manipulators:generateIndexAndSort'),
                        );
    $tree = $menu_tree->transform($tree, $manipulators);  
    $list = array();

    foreach ($tree as $item) {
      $menu['title']=$item->link->getTitle();
      $menu['url']=$item->link->getUrlObject();   
      $menu['child']=0;
      if ($item->hasChildren) {
        $menu['child']=array();
        foreach ($item->subtree as $item2) {
          $child['title']=$item2->link->getTitle();          
          $child['url']=$item2->link->getUrlObject();    
          array_push($menu['child'], $child);
        }
      }    
      array_push($list, $menu);
      
    }
    
    return $list;
  }

  /**
   * @param $data
   * @param $view_name
   * @param $type
   * Accion que obtiene el template de una vista
   */
  public function getViewRender($data, $view_name, $type){    
  $result=""; 
    $view = Views::getView($view_name);
    if (is_object($view)) {   
    $view->setDisplay($type);       
    if($data != "0" || $data != 0){   
      $data=explode(',',$data);    
      $view->setArguments($data);      
    }
    $view->preExecute();
    $view->execute();      
    $result = $view->render();
  }
    return $result;
  }

  /**
   * @param $bid
   * Accion que obtiene el template de un bloque
   */
  public function getBlockRender($bid){
    $block = \Drupal\block\Entity\Block::load($bid);
    $render = \Drupal::entityTypeManager()->getViewBuilder('block')->view($block);
    return $render;
  }

  public function getBlockRenderId($bid){
    $block = \Drupal\block_content\Entity\BlockContent::load($bid);
    $render = \Drupal::entityTypeManager()->getViewBuilder('block_content')->view($block);
    $render= \Drupal::service('renderer')->render($render);
    return $render;
  }


  public function getDebug($row){
    
    return 1;
  }
  /**
   * @param $sid
   * Accion que obtiene el template de un webform
   */
  public function getWebFormRender($sid){
    $webform      = \Drupal::entityTypeManager()->getStorage('webform')->load($sid);
    $view_builder = \Drupal::service('entity_type.manager')->getViewBuilder('webform');
    $build        = $view_builder->view($webform);
    return $build;
  }

  public function getConfigData($config,$setting){    
    return \Drupal::config($config)->get($setting);
  }

}
