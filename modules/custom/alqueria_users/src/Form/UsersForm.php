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

class UsersForm extends FormBase  {
   /**
   * Retorna un id único para el formulario
   */
  public function getFormId() {
    return 'alqueria_users_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    //Se obtiene variable de configuracion
    $config = \Drupal::config('alqueriaUsers.settings');
    //Se genera form
    $form['#prefix'] = '<br>';
      //Generate form filter
    $form['registrarse'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Sección "Registrarse"'
    );

    $form['sube_tu_receta'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Sube tu receta'
    );

    $form['email_aprobacion'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Email aprobación receta'
    );

    $form['emblue'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Integración emBlue'
    );

    $form['recuperar'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Recuperar contraseña'
    );

    $form['eliminar'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Eliminar cuenta'
    );

    $form['eliminar_datos'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Eliminar datos Facebook'
    );

    $form['pilares'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Pilares home usuarios'
    );

    $form['perfil_usuario'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Perfil de usuario'
    );

    $form['eliminar']['url_eliminar'] = [
        '#type' => 'textfield',
        '#title' => 'URL redirección Eliminar cuenta',
        '#default_value' => $config->get('url_eliminar'),
    ];

    $form['eliminar']['usuario_asignacion'] = [
        '#type' => 'textfield',
        '#title' => 'ID del usuario que se quedará con el contenido',
        '#default_value' => $config->get('usuario_asignacion'),
    ];

    $form['eliminar_datos']['titulo_eliminar_datos'] = [
      '#type' => 'textfield',
      '#title' => 'Título eliminar datos',
      '#default_value' => $config->get('titulo_eliminar_datos'),
    ];

    $form['eliminar_datos']['descripcion_eliminar_datos'] = [
      "#type" => 'text_format',
      '#title' => 'Descripción eliminar datos',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_eliminar_datos'),
    ];

    $form['eliminar_datos']['label_boton_eliminar_datos'] = [
      '#type' => 'textfield',
      '#title' => 'Label del botón eliminar datos',
      '#default_value' => $config->get('label_boton_eliminar_datos'),
    ];

    $form['eliminar_datos']['url_boton_eliminar_datos'] = [
      '#type' => 'textfield',
      '#title' => 'URL del botón eliminar datos',
      '#default_value' => $config->get('url_boton_eliminar_datos'),
    ];

    $form['eliminar_datos']['url_eliminar_datos'] = [
      '#type' => 'textfield',
      '#title' => 'URL redirección Eliminar cuenta',
      '#default_value' => $config->get('url_eliminar_datos'),
    ];

    $form['eliminar_datos']['usuario_asignacion_datos'] = [
      '#type' => 'textfield',
      '#title' => 'ID del usuario que se quedará con el contenido',
      '#default_value' => $config->get('usuario_asignacion_datos'),
    ];

    $form['eliminar_datos']['label_boton_en_perfil'] = [
      '#type' => 'textfield',
      '#title' => 'Label del botón en el perfil',
      '#default_value' => $config->get('label_boton_en_perfil'),
    ];

    $form['emblue']['endpoint'] = [
      '#type' => 'textfield',
      '#title' => 'Endpoint emBlue',
      '#default_value' => $config->get('endpoint'),
    ];


    $form['sube_tu_receta']['enlace_sube_tu_receta'] = [
      '#type' => 'textfield',
      '#title' => 'Enlace sube tu receta',
      '#default_value' => $config->get('enlace_sube_tu_receta'),
    ];

    $form['email_aprobacion']['titulo_mail'] = [
      '#type' => 'textfield',
      '#title' => 'Título correo',
      '#default_value' => $config->get('titulo_mail'),
    ];

    $form['email_aprobacion']['descripcion_mail'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción general',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_mail'),
    ];

    $html = "Puede usar los siguientes tokens: <br>
            Email: {{email}}<br>
            Nombres: {{nombres}}<br>
            Apellidos: {{apellidos}}<br>
            Título Receta: {{titulo_receta}}<br>
            URL Receta: {{url_receta}}<br>";

    $form['email_aprobacion']['info'] = [
         '#markup' => $html,
         '#name' => 'info',
         '#id' => 'info',
       ];

    $form['sube_tu_receta']['ty_sube_tu_receta'] = [
      '#type' => 'textfield',
      '#title' => 'Enlace thank you page sube tu receta',
      '#default_value' => $config->get('ty_sube_tu_receta'),
    ];

    $form['emblue']['apikey'] = [
      '#type' => 'textfield',
      '#title' => 'apikey (normal, sin base64)',
      '#default_value' => $config->get('apikey'),
    ];

    $form['perfil_usuario']['pausar_form'] = [
      '#type' => 'textfield',
      '#title' => 'Machine name formulario pausar cuenta',
      '#default_value' => $config->get('pausar_form'),
    ];

    $form['perfil_usuario']['cancelar_form'] = [
      '#type' => 'textfield',
      '#title' => 'Machine name formulario cancelar cuenta',
      '#default_value' => $config->get('cancelar_form'),
    ];

    $form['registrarse']['titulo_general'] = [
      '#type' => 'textfield',
      '#title' => 'Título General',
      '#default_value' => $config->get('titulo_general'),
    ];

    $form['registrarse']['descripcion_general'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción general',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_general'),
    ];

    $form['registrarse']['titulo_preferencias'] = [
      '#type' => 'textfield',
      '#title' => 'Título Preferencias',
      '#default_value' => $config->get('titulo_preferencias'),
    ];

    $form['registrarse']['descripcion_preferencias'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción preferencias',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_preferencias'),
    ];

    $form['registrarse']['label_registrate'] = [
      '#type' => 'textfield',
      '#title' => 'Label Registrate con',
      '#default_value' => $config->get('label_registrate'),
    ];

    $form['registrarse']['label_registrate_login'] = [
      '#type' => 'textfield',
      '#title' => 'Label Registrate del login',
      '#default_value' => $config->get('label_registrate_login'),
    ];

    $form['registrarse']['url_registrate_login'] = [
      '#type' => 'textfield',
      '#title' => 'Url Registrate del login',
      '#default_value' => $config->get('url_registrate_login'),
    ];

    if (!is_null($config->get('autopauta'))) {
        $html = '<label>Imagen actual:</label> <br/> <img src="' .file_url_transform_relative(file_create_url(\Drupal\file\Entity\File::load($config->get('autopauta')[0])->getFileUri())).'" width="200"/>';
        $form['recuperar']['autopautaimg'] = [
         '#markup' => $html,
         '#name' => 'current image2',
         '#id' => 'current_image2',
       ];
         }

       $form['recuperar']['autopauta'] = [
         '#type' => 'managed_file',
         '#name' => 'image',
         '#title' => 'Imagen autopauta',
         '#size' => 20,
         '#default_value' => $config->get('autopauta'),
         '#upload_location' => 'public://',
       ];

    $form['perfil_usuario']['titulo_perfil'] = [
      '#type' => 'textfield',
      '#title' => 'Título perfil',
      '#default_value' => $config->get('titulo_perfil'),
    ];

    $form['perfil_usuario']['descripcion_perfil'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción perfil',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_perfil'),
    ];

    if (!is_null($config->get('imagen_recetas'))) {
      $html = '<label>Imagen actual:</label> <br/> <img src="' .file_url_transform_relative(file_create_url(\Drupal\file\Entity\File::load($config->get('imagen_recetas')[0])->getFileUri())).'" width="200"/>';
      $form['pilares']['current_image1'] = [
       '#markup' => $html,
       '#name' => 'current image1',
       '#id' => 'current_image1',
     ];
       }

    $form['pilares']['imagen_recetas'] = [
         '#type' => 'managed_file',
         '#name' => 'image',
         '#title' => 'Imagen recetas',
         '#size' => 20,
         '#default_value' => $config->get('imagen_recetas'),
         '#upload_location' => 'public://',
       ];

       $form['pilares']['url_recetas'] = [
        '#type' => 'textfield',
        '#title' => 'url_recetas',
        '#default_value' => $config->get('url_recetas'),
      ];

       if (!is_null($config->get('imagen_nutricion'))) {
        $html = '<label>Imagen actual:</label> <br/> <img src="' .file_url_transform_relative(file_create_url(\Drupal\file\Entity\File::load($config->get('imagen_nutricion')[0])->getFileUri())).'" width="200"/>';
        $form['pilares']['current_image2'] = [
         '#markup' => $html,
         '#name' => 'current image2',
         '#id' => 'current_image2',
       ];
         }

       $form['pilares']['imagen_nutricion'] = [
         '#type' => 'managed_file',
         '#name' => 'image',
         '#title' => 'Imagen nutrición',
         '#size' => 20,
         '#default_value' => $config->get('imagen_nutricion'),
         '#upload_location' => 'public://',
       ];
       $form['pilares']['url_nutricion'] = [
        '#type' => 'textfield',
        '#title' => 'url_nutricion',
        '#default_value' => $config->get('url_nutricion'),
      ];

       if (!is_null($config->get('imagen_sostenibilidad'))) {
        $html = '<label>Imagen actual:</label> <br/> <img src="' .file_url_transform_relative(file_create_url(\Drupal\file\Entity\File::load($config->get('imagen_sostenibilidad')[0])->getFileUri())).'" width="200"/>';
        $form['pilares']['current_image3'] = [
         '#markup' => $html,
         '#name' => 'current image3',
         '#id' => 'current_image3',
       ];
         }

       $form['pilares']['imagen_sostenibilidad'] = [
        '#type' => 'managed_file',
        '#name' => 'image',
        '#title' => 'Imagen sostenibilidad',
        '#size' => 20,
        '#default_value' => $config->get('imagen_sostenibilidad'),
        '#description' => 'Este será el logo que aparecerá la notificación',
        '#upload_location' => 'public://',
      ];
      $form['pilares']['url_sostenibilidad'] = [
        '#type' => 'textfield',
        '#title' => 'url_sostenibilidad',
        '#default_value' => $config->get('url_sostenibilidad'),
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
      $config = \Drupal::service('config.factory')->getEditable('alqueriaUsers.settings');
      $config->set('titulo_general', $form['registrarse']['titulo_general']['#value'])->save();
      $config->set('ty_sube_tu_receta', $form['sube_tu_receta']['ty_sube_tu_receta']['#value'])->save();
      $config->set('enlace_sube_tu_receta', $form['sube_tu_receta']['enlace_sube_tu_receta']['#value'])->save();
      $config->set('usuario_asignacion', $form['eliminar']['usuario_asignacion']['#value'])->save();
      $config->set('url_eliminar', $form['eliminar']['url_eliminar']['#value'])->save();
      $config->set('url_recetas', $form['pilares']['url_recetas']['#value'])->save();
      $config->set('url_nutricion', $form['pilares']['url_nutricion']['#value'])->save();
      $config->set('url_sostenibilidad', $form['pilares']['url_sostenibilidad']['#value'])->save();
      $config->set('pausar_form', $form['perfil_usuario']['pausar_form']['#value'])->save();
      $config->set('cancelar_form', $form['perfil_usuario']['cancelar_form']['#value'])->save();
      $config->set('descripcion_general', $form['registrarse']['descripcion_general']['value']['#value'])->save();

      $config->set('descripcion_mail', $form['email_aprobacion']['descripcion_mail']['value']['#value'])->save();
      $config->set('titulo_mail', $form['email_aprobacion']['titulo_mail']['#value'])->save();
      $config->set('titulo_preferencias', $form['registrarse']['titulo_preferencias']['#value'])->save();
      $config->set('label_registrate', $form['registrarse']['label_registrate']['#value'])->save();
       $config->set('label_registrate_login', $form['registrarse']['label_registrate_login']['#value'])->save();
       $config->set('url_registrate_login', $form['registrarse']['url_registrate_login']['#value'])->save();
      $config->set('titulo_eliminar_datos', $form['eliminar_datos']['titulo_eliminar_datos']['#value'])->save();
      $config->set('descripcion_eliminar_datos', $form['eliminar_datos']['descripcion_eliminar_datos']['value']['#value'])->save();
      $config->set('label_boton_eliminar_datos', $form['eliminar_datos']['label_boton_eliminar_datos']['#value'])->save();
      $config->set('label_boton_en_perfil', $form['eliminar_datos']['label_boton_en_perfil']['#value'])->save();
      $config->set('url_boton_eliminar_datos', $form['eliminar_datos']['url_boton_eliminar_datos']['#value'])->save();
      $config->set('url_eliminar_datos', $form['eliminar_datos']['url_eliminar_datos']['#value'])->save();
      $config->set('usuario_asignacion_datos', $form['eliminar_datos']['usuario_asignacion_datos']['#value'])->save();
      $config->set('apikey', $form['emblue']['apikey']['#value'])->save();
      $config->set('endpoint', $form['emblue']['endpoint']['#value'])->save();
      $config->set('descripcion_preferencias', $form['registrarse']['descripcion_preferencias']['value']['#value'])->save();
      $config->set('titulo_perfil', $form['perfil_usuario']['titulo_perfil']['#value'])->save();
      $config->set('descripcion_perfil', $form['perfil_usuario']['descripcion_perfil']['value']['#value'])->save();

      $fid=$form_state->getValue(['imagen_recetas', 0]);
      if (!empty($fid) && $fid != $config->get('imagen_recetas')[0] ) {
        $file = \Drupal\file\Entity\File::load($fid);
        $file->setPermanent();
        $file->save();
        $config->set('imagen_recetas', $form_state->getValue('imagen_recetas'))->save();
        drupal_set_message("La imagen de recetas se ha guardado correctamente");
      }elseif (is_null($fid) && !is_null($config->get('imagen_recetas'))) {
        file_delete($config->get('imagen_recetas')[0]);
        $config->set('imagen_recetas', null)->save();
        drupal_set_message("La imagen de recetas se ha eliminado correctamente");
      }


      $fid=$form_state->getValue(['autopauta', 0]);
      if (!empty($fid) && $fid != $config->get('autopauta')[0] ) {
        $file = \Drupal\file\Entity\File::load($fid);
        $file->setPermanent();
        $file->save();
        $config->set('autopauta', $form_state->getValue('autopauta'))->save();
        drupal_set_message("La imagen de autopauta se ha guardado correctamente");
      }elseif (is_null($fid) && !is_null($config->get('autopauta'))) {
        file_delete($config->get('autopauta')[0]);
        $config->set('autopauta', null)->save();
        drupal_set_message("La imagen de autopauta se ha eliminado correctamente");
      }

      $fid=$form_state->getValue(['imagen_nutricion', 0]);
      if (!empty($fid) && $fid != $config->get('imagen_nutricion')[0] ) {
        $file = \Drupal\file\Entity\File::load($fid);
        $file->setPermanent();
        $file->save();
        $config->set('imagen_nutricion', $form_state->getValue('imagen_nutricion'))->save();
        drupal_set_message("La imagen de nutrición se ha guardado correctamente");
      }elseif (is_null($fid) && !is_null($config->get('imagen_nutricion'))) {
        file_delete($config->get('imagen_nutricion')[0]);
        $config->set('imagen_nutricion', null)->save();
        drupal_set_message("La imagen de nutrición se ha eliminado correctamente");
      }

      $fid=$form_state->getValue(['imagen_sostenibilidad', 0]);
      if (!empty($fid) && $fid != $config->get('imagen_sostenibilidad')[0] ) {
        $file = \Drupal\file\Entity\File::load($fid);
        $file->setPermanent();
        $file->save();
        $config->set('imagen_sostenibilidad', $form_state->getValue('imagen_sostenibilidad'))->save();
        drupal_set_message("La imagen de sostenibilidad se ha guardado correctamente");
      }elseif (is_null($fid) && !is_null($config->get('imagen_sostenibilidad'))) {
        file_delete($config->get('imagen_sostenibilidad')[0]);
        $config->set('imagen_sostenibilidad', null)->save();
        drupal_set_message("La imagen de sostenibilidad se ha eliminado correctamente");
      }

      drupal_set_message(t("Se han actualizado los valores de configuración satisfactoriamente"));
     }catch (Exception $e){
      drupal_set_message(t("Se ha producido un error al actualizar los valores de configuración."), "error");
     }
    $renderCache = \Drupal::service('cache.render');
    $renderCache->invalidateAll();
    }
}
