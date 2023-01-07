<?php

namespace Drupal\alqueria_config\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\Response;
use Drupal\views\Views;
use Drupal\node\Entity\Node;
use Drupal\webform\Entity\Webform;
use Drupal\webform\WebformSubmissionForm;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Path;
use GuzzleHttp\Exception\RequestException;
use Drupal\comment\Entity\Comment;
use Drupal\alqueria_config\Model\BuscadorModel;

class AlqueriaConfigController extends ControllerBase{
  public function ObtenerTaxPorNombre($name){
    $taxes = \Drupal::entityManager()->getStorage('taxonomy_term')->loadByProperties(array('name'=>$name));
    $ids = [];

    if (!empty($taxes)) {
      foreach ($taxes as $value) {
      $ids[] = $value->id();
    }
    }
    return $ids;
  }

	public function obtenerBreadcrumb(){
		$string=\Drupal::request()->getPathInfo();
		$uri=explode("/",$string);
		$breadcrumb=array();
		$path="";
    $i = 0;
		foreach ($uri as $item) {
      $path = ($i==0) ? $item : $path.'/'.$item;
			array_push($breadcrumb,array('uri'=>$path,'name' => ucfirst(str_replace("-", " ",$item)) ));
      $i++;
		}
     foreach ($breadcrumb as $item => $value) {
       if ($value["name"] == "Conocenos") {
         $breadcrumb[$item]["name"] = "Conócenos";
       } else if ($value["name"] == "Contactenos") {
         $breadcrumb[$item]["name"] = "Contáctenos";
       } 
     }

		return $breadcrumb;
	}

  public function obtenerUri($fid){
    $uri = \Drupal\file\Entity\File::load($fid)->getFileUri();
    return $uri;
  }

	public function obtenerTaxonomia($vid){
		$vocabulary = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);
		$datos = array();
		foreach($vocabulary as $taxonomy){
      if ($vid=="momentos") {
        $url="";
        $term_obj = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($taxonomy->tid);
        if(isset($term_obj->get('field_icono_hover')->entity)){
         $url = file_create_url($term_obj->get('field_icono_hover')->entity->getFileUri());
       }
       $datos[$taxonomy->tid]['url'] = $url;
      }
      $datos[$taxonomy->tid]['name'] = $taxonomy->name;
    }
    return $datos;
  }

  public function obtenerTaxonomiaDetalle($tid,$fields){
    $term = \Drupal::entityManager()->getStorage('taxonomy_term')->loadByProperties(array('tid'=>$tid));
    $term = reset($term);
    $data = array('label' => $term->label());
    if ($fields != "") {
      $fields = explode(',', $fields);
      foreach ($fields as $value) {
        if (isset($term->get($value)->getValue()[0]['value'])) {
          $data[$value] = empty($term->get($value)->getValue()) ? 0 : $term->get($value)->getValue()[0]['value'];
        }else{
          $data[$value] = empty($term->get($value)->getValue()) ? 0 : $term->get($value)->getValue()[0]['target_id'];
        }

      }
    }
    return $data;
  }

  public function obtenerCountView($data, $view_name, $type){
    $view = Views::getView($view_name);
    $view->setDisplay($type);
    if($data != "0" || $data != 0){
      $view->setArguments(array($data));
    }
    $view->get_total_rows = TRUE;
    $view->preExecute();
    $view->execute();
    $rows = $view->total_rows;
    return $rows;
  }

  public function obtenerRecetasPorCategoria($tid){
    $view = Views::getView('nid_por_categoria');
    $view->setDisplay('block_1');
    $view->setArguments(array($tid));
    $view->preExecute();
    $view->execute();
    $result="";
    if (count($view->result)>0) {
      foreach ($view->result as $key => $data) {
        $view = Views::getView('recetas_por_producto');
        $view->setDisplay('block_1');
        $view->setArguments(array($data->nid));
        $view->preExecute();
        $view->execute();
        $result=$view->render();
      }
    }
    return $result;
  }

  public function obtenerListadoRecetas(){
   $view = Views::getView('listado_recetas');
   $arguments=array();
   $featured="";
   $arguments[]=(\Drupal::request()->request->get('nd')!="") ? \Drupal::request()->request->get('nd') : 'all';
   $arguments[]=(\Drupal::request()->request->get('tc')!="") ? \Drupal::request()->request->get('tc') : '';
   $arguments[]=(\Drupal::request()->request->get('ip')!="") ? \Drupal::request()->request->get('ip') : '';
   $arguments[]=(\Drupal::request()->request->get('m')!="") ? \Drupal::request()->request->get('m') : '';
   $block=(\Drupal::request()->request->get('o')!="") ? \Drupal::request()->request->get('o') : 'block_1';
   $arguments=array_filter($arguments,'strlen');
   if (is_object($view)) {
    $view->setDisplay($block);
    $view->setArguments($arguments);
    if (!is_null(\Drupal::request()->request->get('n'))) {
     $view->setExposedInput(['title' => \Drupal::request()->request->get('n')]);
   }
   if (is_null(\Drupal::request()->request->get('p'))){
    $view2 = Views::getView('destacado_listado_recetas');
    $view2->setDisplay('block_1');
    $view2->setArguments($arguments);
    if (!is_null(\Drupal::request()->request->get('n'))) {
      $view2->setExposedInput(['title' => \Drupal::request()->request->get('n')]);
    }
    $view2->preExecute();
    $view2->execute();
    $renderFeatured=$view2->render();
    $featured.= \Drupal::service('renderer')->render($renderFeatured);
  }else{
   $view->setCurrentPage(\Drupal::request()->request->get('p'));
  }
  $view->preExecute();
  $view->execute();
  $render=$view->render();
  $html=\Drupal::service('renderer')->render($render);
  }
  return new JsonResponse(array('html' => $html,'featured' => $featured,'results'=>count($view->result)));
  }

  public function obtenerListadoNoticias(){
   $view = Views::getView('noticias_buscador');
   $arguments=array();
   $featured="";
   $arguments[]=(\Drupal::request()->request->get('tid')!="") ? \Drupal::request()->request->get('tid') : 'notid';
   $arguments[]=(\Drupal::request()->request->get('año')!="") ? (int)\Drupal::request()->request->get('año') : 'noyear';
   $arguments[]=(\Drupal::request()->request->get('mes')!="") ? \Drupal::request()->request->get('mes') : '';
   $arguments=array_filter($arguments,'strlen');
   $block = "block_1";
   if (\Drupal::request()->request->get('o')) {
     $block = \Drupal::request()->request->get('o');
   }
   if (is_object($view)) {
    $view->setDisplay($block);
    $view->setArguments($arguments);
    if (!is_null(\Drupal::request()->request->get('n'))) {
     $view->setExposedInput(['title' => \Drupal::request()->request->get('n')]);
   }
   if (!is_null(\Drupal::request()->request->get('p'))){
     $view->setCurrentPage(\Drupal::request()->request->get('p'));
   }
   $view->preExecute();
   $view->execute();
   $render=$view->render();
   $html=\Drupal::service('renderer')->render($render);
  }
  return new JsonResponse(array('html' => $html,'results'=>count($view->result)));
  }

  public function obtenerListadoComunicados(){
   $view = Views::getView('comunicados_ordenar');
   $block = "block_1";
   if (\Drupal::request()->request->get('o')) {
     $block = \Drupal::request()->request->get('o');
   }
   if (is_object($view)) {
    $view->setDisplay($block);
   if (!is_null(\Drupal::request()->request->get('p'))){
     $view->setCurrentPage(\Drupal::request()->request->get('p'));
   }
   $view->preExecute();
   $view->execute();
   $render=$view->render();
   $html=\Drupal::service('renderer')->render($render);
  }
  return new JsonResponse(array('html' => $html,'results'=>count($view->result)));
  }

  public function obtenerListadoTags(){
    $view = Views::getView('tags_buscador');
    $block = "block_1";
    if (\Drupal::request()->request->get('o')) {
      $block = \Drupal::request()->request->get('o');
    }
    if (is_object($view)) {
      $view->setDisplay($block);
      if (!is_null(\Drupal::request()->request->get('p'))){
        $view->setCurrentPage(\Drupal::request()->request->get('p'));
      }
      $view->preExecute();
      $view->execute();
      $render=$view->render();
      $html=\Drupal::service('renderer')->render($render);
    }
    return new JsonResponse(array('html' => $html,'results'=>count($view->result)));
  }

  public function obtenerListadoNutricion(){
    $view = Views::getView('nutricion_buscador');
    $block = "block_1";
    if (\Drupal::request()->request->get('o')) {
      $block = \Drupal::request()->request->get('o');
    }
    if (is_object($view)) {
      $view->setDisplay($block);
      if (!is_null(\Drupal::request()->request->get('p'))){
        $view->setCurrentPage(\Drupal::request()->request->get('p'));
      }
      $view->preExecute();
      $view->execute();
      $render=$view->render();
      $html=\Drupal::service('renderer')->render($render);
    }
    return new JsonResponse(array('html' => $html,'results'=>count($view->result)));
  }

  public function obtenerVistaPaginada(){
    $view = Views::getView(\Drupal::request()->request->get('tipo'));
    if (is_object($view)) {
      $view->setDisplay('block_1');
      $view->setCurrentPage(\Drupal::request()->request->get('p'));
      $view->preExecute();
      $view->execute();
      $render=$view->render();
      $html=\Drupal::service('renderer')->render($render);
    }
    return new JsonResponse(array('html' => $html,'results'=>count($view->result)));
  }

  public function obtenerCiudades(){
   $term = \Drupal::entityManager()->getStorage('taxonomy_term')->loadByProperties(array('vid'=>'ciudades','field_departamento'=>\Drupal::request()->request->get('dpto')));
   $ciudades=array();
   if (!empty($term)) {
    foreach ($term as $item) {
      array_push($ciudades, array('id' => $item->id(),'name' => $item->label()));
    }
  }
  return new JsonResponse($ciudades);
  }

  public function obtenerContenidoMenu(){
    $view = Views::getView(\Drupal::request()->request->get('tipo'));
    if (\Drupal::request()->request->get('modo') == "desktop") {
      $display = "block_1";
    }else{
      $display = "block_2";
    }
    $tid = \Drupal::request()->request->get('tid');
    $urlField = \Drupal::request()->request->get('url');
    if (is_object($view)) {
      $view->setDisplay($display);
      if ($tid != 0) {
        $view->setArguments(array($tid));
      }
      $view->preExecute();
      $view->execute();
      $render = $view->render();
      $html = \Drupal::service('renderer')->render($render);
    }
    $term = \Drupal::entityManager()->getStorage('taxonomy_term')->loadByProperties(array('tid' => $tid ));
    $term = reset($term);
    $desc = "";
    $titulo = "";
    $url="";
    if ($tid != 0 ) {
     $url = empty($term->get($urlField)->getValue()[0]['value']) ? '/' : $term->get($urlField)->getValue()[0]['value'];
     $titulo = $term->label();
     if ($term->bundle()=="categoria_producto" || $term->bundle()=="momentos" ) {
      $desc = $term->get('field_descripcion')->getValue()[0]['value'];
      }
    }elseif (!is_null(\Drupal::request()->request->get('config'))) {
      $url = \Drupal::config('config.settings')->get(\Drupal::request()->request->get('config'));
    }
    $results = 1;
    if ($html == "") {
      $html = "<p>No se ha encontrado contenido</p>";
      $results = 0;
    }
    return new JsonResponse(array('html' => $html,'titulo'=>$titulo,'descripcion'=>$desc,'url' => $url,'results' => $results));
  }

  public function administrarFavoritos(){
    try {
      if (\Drupal::currentUser()->id() == 0) {
        throw new \Exception('No hay un usuario logueado en el sistema');
      }
      $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
      $key = $this->validarFavorito(\Drupal::request()->request->get('nid'));
      if (\Drupal::request()->request->get('o')=='d') {
        if (!$key) {
          throw new \Exception('No se encontró el contenido como favorito');
          $status=0;
        }else{
          $user->get('field_favoritos')->removeItem($key);
          $msg="Contenido removido como favorito";
          $status=0;
        }
      }else{
        if (!$key) {
          $user->get('field_favoritos')->appendItem(['target_id'=>\Drupal::request()->request->get('nid')]);
          $msg="Contenido agregado como favorito";
          $status=1;
        }else{
          throw new \Exception('El contenido ya esta como favorito');
          $status=1;
        }
      }
      $user->save();
    }catch (\Throwable $e) {
      $status=0;
      $msg=$e->getMessage();
    }
    return new JsonResponse(array('msg' => $msg,'status' => $status));
  }

  public function validarFavorito($nid){
    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
    $favoritos = $user->get('field_favoritos')->getValue();
    $key = array_search($nid, array_column($favoritos, 'target_id'));
    if (!$key) {
      return 0;
    }else{
      return $key;
    }
  }

  //recetas con favorito
  /*public function recetasFavoritos($nid){
    global $base_url;
    $url = $base_url . '/user-favoritos';
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    $rows[] = [];
    return new JsonResponse([ 'data' => $response, 'method' => 'GET', 'status'=> 200]);
  }*/

  public function insertarComentario() {
    $requeridos=array('nid','msg','rating');
    try {
      foreach ($requeridos as $key) {
        if (is_null(\Drupal::request()->request->get($key)) || \Drupal::request()->request->get($key)=="" ) {
          throw new \Exception('No se han enviado todos los campos necesarios');
        }
      }
      if (\Drupal::currentUser()->id()==0) {
        throw new \Exception('No hay un usuario logueado en el sistema');
      }
      $values = [
        'entity_type' => 'node',
        'entity_id'   => \Drupal::request()->request->get('nid'),
        'field_name'  => 'field_comentarios',
        'uid' => \Drupal::currentUser()->id(),
        'comment_type' => 'comment',
        'subject' => 'Comentario usuario #'.\Drupal::currentUser()->id(),
        'comment_body' => \Drupal::request()->request->get('msg'),
        'field_calificacion' =>\Drupal::request()->request->get('rating'),
        'status' => 0,
      ];
      $comment = Comment::create($values);
      $comment->save();
      $status=1;
      $msg="Comentario enviado y pendiente por aprobar";
    }catch (\Throwable $e) {
      $status=0;
      $msg=$e->getMessage();
    }
    return new JsonResponse(array('msg' => $msg,'status' => $status));
  }

  public function obtenerBuscador($query="",$limit=10){
    if ($query!="") {
      $result=BuscadorModel::obtenerBusqueda($query,$limit);
      $count=BuscadorModel::countObtenerBusqueda($query,$limit);
      $build = [
          '#theme' => 'buscadorGeneral',
          '#items' => $result,
          '#count' => $count[0]->cantidad,
          '#limit' => $limit,
          '#query' => $query,
        ];
      $build['#results'] =!empty($result) ? 1 : 0 ;
      $result = \Drupal::service('renderer')->renderRoot($build);
      print $result;
      }
    }
  }
