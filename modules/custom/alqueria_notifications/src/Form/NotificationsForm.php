<?php

namespace Drupal\alqueria_notifications\Form;
use Drupal\Core\Form\FormBase ;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;
use Drupal\Component\Utility\Html;
use Drupal\alqueria_notifications\Controller\AlqueriaNotificationsController;

class NotificationsForm extends FormBase  {
   /**
   * Retorna un id único para el formulario
   */
  public function getFormId() {
    return 'notifications_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    //Se obtiene variable de configuracion
    $config = \Drupal::config('notifications.settings');
    //Se genera form
    $form['#prefix'] = '<br>';
      //Generate form filter    
    $form['enviar'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Enviar notificación'
    ); 
    $form['listado'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Consultar listado'
    ); 

    $form['enviar']['titulo'] = [
      '#type' => 'textfield',
      '#title' => 'Título notificación',      
      '#default_value' => $config->get('titulo'),      
    ]; 

    $form['enviar']['mensaje'] = [
      '#type' => 'textfield',
      '#title' => 'Mensaje notificación',      
      '#default_value' => $config->get('mensaje'),      
    ]; 

    $form['enviar']['link'] = [
      '#type' => 'textfield',
      '#title' => 'Link',      
      '#default_value' => $config->get('link'),      
    ]; 
    if (!is_null($config->get('imagen'))) {
   $html = '<label>Imagen actual:</label> <br/> <img src="' .file_url_transform_relative(file_create_url(\Drupal\file\Entity\File::load($config->get('imagen')[0])->getFileUri())).'" width="200"/>';
   $form['enviar']['current_image1'] = [
    '#markup' => $html,
    '#name' => 'current image1',
    '#id' => 'current_image1',
  ];
    }

    $form['enviar']['imagen'] = [
      '#type' => 'managed_file',
      '#name' => 'image',
      '#title' => 'Imagen miniatura',
      '#size' => 20,
      '#description' => 'Este será el logo que aparecerá la notificación',      
      '#upload_location' => 'public://',
    ];

    $form['enviar']['enviar_notificación'] = [
    '#type' => 'checkbox',  
    '#title' => 'Enviar notificación a todos los usuarios',  
    '#description' => 'Si marca esta casilla su notificación se ENVIARÁ A TODOS LOS USUARIOS',    
    ];
    $url = \Drupal\Core\Url::fromRoute('alqueria_notifications.listar_publicidad')->toString();
    $form['listado']['enlace_listado'] = [
      '#type' => 'markup',
      '#markup' => "<a href='$url'>Ver listado de publicaciones enviadas</a><br>"
    ];
    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Guardar'),
    );
    
    

    return $form;
    
  }

  /**
   * Form submission handler.
   * @param array $form
   * An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   * The current state of the form.
   */
   public function submitForm(array &$form, FormStateInterface $form_state) {
     //Se obtiene variable de configuracion para editar
     try{        
      $config = \Drupal::service('config.factory')->getEditable('notifications.settings');                 
      $config->set('titulo', $form['enviar']['titulo']['#value'])->save(); 
      $config->set('mensaje', $form['enviar']['mensaje']['#value'])->save();       
      $config->set('link', $form['enviar']['link']['#value'])->save();       
      $fid=$form_state->getValue(['imagen', 0]);           
      if (!empty($fid)) {
        $file = \Drupal\file\Entity\File::load($fid);
        $file->setPermanent();
        $file->save();             
        $config->set('imagen', $form_state->getValue('imagen'))->save();     
        drupal_set_message("La imagen se ha guardado correctamente");             
      } 

      if ($form_state->getValue('enviar_notificación')==1) {
        $data = array('nid' => 0,        
        'tipo' => "publicidad",
        'titulo' => $config->get('titulo'),
        'mensaje' => $config->get('mensaje'),
        'enlace' => $config->get('link'),
        'foto' =>file_url_transform_relative(file_create_url(\Drupal\file\Entity\File::load($config->get('imagen')[0])->getFileUri())),
        'uid_emisor' => \Drupal::currentUser()->id(),
        'uid_receptor' => 0,                        
        'fecha' => \Drupal::time()->getRequestTime() );
        $controller = new AlqueriaNotificationsController();
        $controller->registrarNotificacion($data);  
      }
      

      drupal_set_message(t("Se han actualizado los valores de configuración satisfactoriamente"));
     }catch (Exception $e){
      drupal_set_message(t("Se ha producido un error al actualizar los valores de configuración."), "error");
     }
    $renderCache = \Drupal::service('cache.render');
    $renderCache->invalidateAll();
    }
}
