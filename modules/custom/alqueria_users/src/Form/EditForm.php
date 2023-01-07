<?php
/**
 * @file
 * Contains Drupal\alqueria_users\Form\UsersForm.
 */
namespace Drupal\alqueria_users\Form;
use Drupal\Core\Form\FormBase ;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;
use Drupal\Component\Utility\Html;

class EditForm extends FormBase  {
   /**
   * Retorna un id único para el formulario
   */
  public function getFormId() {
    return 'alqueria_users_edit_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    //Se obtiene variable de configuracion
    $config = \Drupal::config('alqueriaReceta.settings');
    //Se genera form
    $form['#prefix'] = '<br>';
      //Generate form filter    
    $form['titulo'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => '1. Título'
    );

    $form['descripcion'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => '2. Descripción'
    );

    $form['ingredientes'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => '3. Ingredientes'
    );

    $form['preparacion'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => '4. Preparación'
    );

   
    $form['titulo']['titulo_titulo_tab'] = [
        '#type' => 'textfield',
        '#title' => 'Título tab',      
        '#default_value' => $config->get('titulo_titulo_tab'),      
    ]; 

    $form['titulo']['campo_titulo'] = [
      "#type" => 'text_format',
      "#title" => 'Campo título',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_titulo'),
    ];

    $form['titulo']['campo_imagen_principal'] = [
      "#type" => 'text_format',
      "#title" => 'Campo imagen principal',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_imagen_principal'),
    ];

    $form['titulo']['campo_video'] = [
      "#type" => 'text_format',
      "#title" => 'Campo vídeo youtube',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_video'),
    ];

    $form['titulo']['campo_video'] = [
      "#type" => 'text_format',
      "#title" => 'Campo vídeo youtube',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_video'),
    ];

    $form['descripcion']['descripcion_titulo_tab'] = [
        '#type' => 'textfield',
        '#title' => 'Título tab',      
        '#default_value' => $config->get('descripcion_titulo_tab'),      
    ]; 

    $form['descripcion']['campo_descripcion'] = [
      "#type" => 'text_format',
      "#title" => 'Campo descripción',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_descripcion'),
    ];

    $form['descripcion']['campo_caracteristicas'] = [
      "#type" => 'text_format',
      "#title" => 'Campo características',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_caracteristicas'),
    ];

    $form['descripcion']['campo_porciones'] = [
        '#type' => 'textfield',
        '#title' => 'Campo número de porciones',      
        '#default_value' => $config->get('campo_porciones'),      
    ]; 

    $form['descripcion']['campo_tiempo'] = [
        '#type' => 'textfield',
        '#title' => 'Campo tiempo de preparación',      
        '#default_value' => $config->get('campo_tiempo'),      
    ]; 

    $form['descripcion']['campo_nivel'] = [
        '#type' => 'textfield',
        '#title' => 'Campo nivel de dificultad',      
        '#default_value' => $config->get('campo_nivel'),      
    ]; 

    $form['descripcion']['campo_tipo_cocina'] = [
        '#type' => 'textfield',
        '#title' => 'Campo tipo de cocina',      
        '#default_value' => $config->get('campo_tipo_cocina'),      
    ]; 

    $form['descripcion']['campo_momentos'] = [
        '#type' => 'textfield',
        '#title' => 'Campo momentos',      
        '#default_value' => $config->get('campo_momentos'),      
    ]; 

    $form['descripcion']['campo_imagenes'] = [
      "#type" => 'text_format',
      "#title" => 'Campo imágenes que acompañan descripción',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_imagenes'),
    ];

    $form['ingredientes']['ingredientes_titulo_tab'] = [
        '#type' => 'textfield',
        '#title' => 'Título tab',      
        '#default_value' => $config->get('ingredientes_titulo_tab'),      
    ]; 

    $form['ingredientes']['campo_ingredientes_general'] = [
      "#type" => 'text_format',
      "#title" => 'Campo ingredientes general',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_ingredientes_general'),
    ];

    $form['ingredientes']['campo_ingrediente_principal'] = [
        '#type' => 'textfield',
        '#title' => 'Campo ingredientes principales',      
        '#default_value' => $config->get('campo_ingrediente_principal'),      
    ]; 

    $form['ingredientes']['campo_ingredientes_normales'] = [
        '#type' => 'textfield',
        '#title' => 'Campo ingredientes normales',      
        '#default_value' => $config->get('campo_ingredientes_normales'),      
    ]; 

    $form['ingredientes']['campo_productos'] = [
      "#type" => 'text_format',
      "#title" => 'Campo productos',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_productos'),
    ];


    $form['preparacion']['preparacion_titulo_tab'] = [
        '#type' => 'textfield',
        '#title' => 'Título tab',      
        '#default_value' => $config->get('preparacion_titulo_tab'),      
    ]; 

    $form['preparacion']['campo_pasos'] = [
      "#type" => 'text_format',
      "#title" => 'Campo pasos de preparación',
      '#format' => 'full_html',      
      '#default_value' => $config->get('campo_pasos'),
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
     try{        
      $config = \Drupal::service('config.factory')->getEditable('alqueriaReceta.settings');                     
      $config->set('titulo_titulo_tab', $form['titulo']['titulo_titulo_tab']['#value'])->save();
      $config->set('campo_titulo', $form['titulo']['campo_titulo']['value']['#value'])->save();
      $config->set('campo_imagen_principal', $form['titulo']['campo_imagen_principal']['value']['#value'])->save();
      $config->set('campo_video', $form['titulo']['campo_video']['value']['#value'])->save();
      
      $config->set('descripcion_titulo_tab', $form['descripcion']['descripcion_titulo_tab']['#value'])->save();
      $config->set('campo_descripcion', $form['descripcion']['campo_descripcion']['value']['#value'])->save();
      $config->set('campo_caracteristicas', $form['descripcion']['campo_caracteristicas']['value']['#value'])->save();
      $config->set('campo_porciones', $form['descripcion']['campo_porciones']['#value'])->save();
      $config->set('campo_tiempo', $form['descripcion']['campo_tiempo']['#value'])->save();
      $config->set('campo_nivel', $form['descripcion']['campo_nivel']['#value'])->save();
      $config->set('campo_tipo_cocina', $form['descripcion']['campo_tipo_cocina']['#value'])->save();
      $config->set('campo_momentos', $form['descripcion']['campo_momentos']['#value'])->save();
      $config->set('campo_imagenes', $form['descripcion']['campo_imagenes']['value']['#value'])->save();
      $config->set('ingredientes_titulo_tab', $form['ingredientes']['ingredientes_titulo_tab']['#value'])->save();
      $config->set('campo_ingredientes_general', $form['ingredientes']['campo_ingredientes_general']['value']['#value'])->save();
      $config->set('campo_ingrediente_principal', $form['ingredientes']['campo_ingrediente_principal']['#value'])->save();
      $config->set('campo_ingredientes_normales', $form['ingredientes']['campo_ingredientes_normales']['#value'])->save();
      $config->set('campo_productos', $form['ingredientes']['campo_productos']['value']['#value'])->save();
      $config->set('preparacion_titulo_tab', $form['preparacion']['preparacion_titulo_tab']['#value'])->save();
      $config->set('campo_pasos', $form['preparacion']['campo_pasos']['value']['#value'])->save();
      drupal_set_message(t("Se han actualizado los valores de configuración satisfactoriamente"));
     }catch (Exception $e){
      drupal_set_message(t("Se ha producido un error al actualizar los valores de configuración."), "error");
     }
    $renderCache = \Drupal::service('cache.render');
    $renderCache->invalidateAll();
    }
}
