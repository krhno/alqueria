<?php


namespace Drupal\alqueria_notifications\Model;

use Drupal\Core\Database\Database;

class NotificationsModel
{
  public static function registrar($data){
    try {
      $db = \Drupal::database();
      $fields=['nid','tipo','uid_emisor','uid_receptor','fecha'];
      $values=[
        $data['nid'],
        $data['tipo'],          
        $data['uid_emisor'], 
        $data['uid_receptor'],        
        $data['fecha']
      ];
      if (isset($data['titulo'])) {        
        array_push($fields,'titulo');
        array_push($fields,'mensaje');
        array_push($fields,'enlace');
        array_push($fields,'foto');
        array_push($values,$data['titulo']);
        array_push($values,$data['mensaje']);
        array_push($values,$data['enlace']);
        array_push($values,$data['foto']);
      }

      $msg = $db->insert('notificaciones')
      ->fields($fields)
      ->values($values)
      ->execute();      
      $msg=['status' => 1, 'msg' => "Registro creado"];
    }catch (\Throwable $e) {
      $msg=['status' => 0, 'msg' => $e->getMessage()];  
    }
    return $msg;
  }

  public static function obtenerListadoUsuario($uid){   
    $query = \Drupal::database()->select('notificaciones','n')
    ->fields('n')
    ->condition('status',1,'=');
    $orGroup1 = $query->orConditionGroup()
    ->condition('uid_receptor', $uid)
    ->condition('uid_receptor', 0);      
    $query->condition($orGroup1);
    $query->orderBy('fecha','DESC');
    return $query->execute()->fetchAll();
  }

  public static function listarPublicidad(){   
    $query = \Drupal::database()->select('notificaciones','n')
    ->fields('n')
    ->condition('tipo','publicidad','=');          
    $query->orderBy('fecha','DESC');
    $query = $query->extend('Drupal\Core\Database\Query\PagerSelectExtender')
                        ->limit(10);
    return $query->execute()->fetchAll();
  }

  

  public static function obtenerListadoUsuarioVisibles($uid){   
    $query = \Drupal::database()->select('notificaciones','n')    
    ->condition('status',1,'=')
    ->condition('visible',1,'=')
    ->condition('uid_receptor', $uid);
    $query->addExpression('COUNT(*)');            
    return $query->execute()->fetchField();
  }

   public static function desactivarVisibles($uid){   
    try {
      $query = \Drupal::database()->update('notificaciones');
      $query->condition('uid_receptor',$uid);    
      $query->fields([
      'visible' =>0,
      ]);
      $query->execute();
      $msg=['status' => 1, 'msg' => "Registros actualizados"];
    }catch (\Throwable $e) {
      $msg=['status' => 0, 'msg' => $e->getMessage()];  
    }
   
    return $msg;
  }


}
