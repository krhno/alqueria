<?php
namespace Drupal\social_share\Form;
use Drupal\Core\Form\FormBase ;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;
use Drupal\Component\Utility\Html;
use Drupal\Core\Url;
use Drupal\Core\Language\LanguageInterface;

class ShareForm extends FormBase  {
   /**
   * Retorna un id único para el formulario
   */
  public function getFormId() {
    return 'share_redes_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    //Se obtiene variable de configuracion
    $config = \Drupal::config('shareConfig.settings');
    //Se genera form
    $form['#prefix'] = '<br>';
      //Generate form filter
    $form['general'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => t('General')
    );
    $form['general']['fields_to_load'] = array(
      '#type' => 'textfield',
      '#title' => 'Redes a cargar',
      '#description' => 'Ingrese el nombre de las redes que quiere manejar y en el orden que desea separados por punto y coma ";" Por ejemplo: facebook;twitter;linkedin <br><b>Asegurese de guardar la configuración una vez modifique este campo para poder visualizar el formulario completo con las redes ingresados</b>',
      '#default_value' => $config->get('fields_to_load'),
      '#required' => TRUE,
    );

    $form['general']['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Cargar redes'),
    );


    if (!empty($config->get('fields_to_load'))) {
      $fields_to_load = explode(";",$config->get('fields_to_load'));
      foreach ($fields_to_load as $item) {
        $transliterated = \Drupal::transliteration()->transliterate($item, LanguageInterface::LANGCODE_DEFAULT, '_');
        $transliterated = mb_strtolower($transliterated);
        $transliterated = preg_replace('@[^a-z0-9_.]+@', '_', $transliterated);
        $datos[$transliterated] = $item;
      }
    }


    foreach ($datos as $key => $value ) {
    $form[$key]= array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => t('Red: '.$value)
    );


    $form[$key]['data_network_'.$key]= array(
      '#type' => 'textfield',
      '#title' => 'Data-network para '.$value,
      '#description' => 'Ingrese el data-network según ShareThis para el compartir de '.$value.' (visite <a href="https://sharethis.com/support/customization/how-to-set-custom-buttons/" target="_blank">este</a> sitio para ver las disponibles)',
      '#default_value' => $config->get('data_network_'.$key),
    );

    $form[$key]['class_'.$key]= array(
      '#type' => 'textfield',
      '#title' => 'Clases css para '.$value,
      '#description' => 'Ingrese las clases separadas por espacio para el div que contiene el icono de la red social',
      '#default_value' => $config->get('class_'.$key),
    );

    $form[$key]['class_icono_'.$key]= array(
      '#type' => 'textfield',
      '#title' => 'Clases css para el icono de '.$value,
      '#description' => 'Ingrese las clases separadas por espacio para el icono que contiene la red social',
      '#default_value' => $config->get('class_icono_'.$key),
    );

    $form[$key]['caracter_'.$key]= array(
      '#type' => 'textfield',
      '#title' => 'Caracter para el icono de '.$value,
      '#description' => 'Ingrese el caracter correspondiente a la red social',
      '#default_value' => $config->get('caracter_'.$key),
    );

      $form[$key]['label_texto_'.$key]= array(
        '#type' => 'textfield',
        '#title' => 'texto para icono de '.$value,
        '#description' => 'Ingrese el texto del icono',
        '#default_value' => $config->get('label_texto_'.$key),
      );


    }


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
      $config = \Drupal::service('config.factory')->getEditable('shareConfig.settings');

      if ($config->get('fields_to_load') == $form['general']['fields_to_load']['#value'] ) {
        $fields_to_load = explode(";",$config->get('fields_to_load'));
        foreach ($fields_to_load as $item) {
          $transliterated = \Drupal::transliteration()->transliterate($item, LanguageInterface::LANGCODE_DEFAULT, '_');
          $transliterated = mb_strtolower($transliterated);
          $key = preg_replace('@[^a-z0-9_.]+@', '_', $transliterated);
          $config->set('data_network_'.$key,$form[$key]['data_network_'.$key]['#value'])->save();
          $config->set('class_'.$key,$form[$key]['class_'.$key]['#value'])->save();
          $config->set('class_icono_'.$key,$form[$key]['class_icono_'.$key]['#value'])->save();
          $config->set('caracter_'.$key,$form[$key]['caracter_'.$key]['#value'])->save();
          $config->set('label_texto_'.$key,$form[$key]['label_texto_'.$key]['#value'])->save();
        }
      }else{
        $config->set('fields_to_load', $form['general']['fields_to_load']['#value'])->save();
        drupal_set_message("Se han creado u organizado los campos para el formulario según lo ingresado en 'campos a cargar'");
      }

      $renderCache = \Drupal::service('cache.render')->invalidateAll();
      drupal_set_message(t("Se han actualizado los valores de configuración satisfactoriamente"));
     } catch (EXception $e){
      drupal_set_message(t("Se ha producido un error al actualizar los valores de configuración."), "error");
     }
    }
}
