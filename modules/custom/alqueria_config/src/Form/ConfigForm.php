<?php
/**
 * @file
 * Contains Drupal\booking\Form\ConfigForm.
 */
namespace Drupal\alqueria_config\Form;
use Drupal\Core\Form\FormBase ;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;
use Drupal\Component\Utility\Html;

class ConfigForm extends FormBase  {
   /**
   * Retorna un id único para el formulario
   */
  public function getFormId() {
    return 'config_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    //Se obtiene variable de configuracion
    $config = \Drupal::config('config.settings');
    //Se genera form
    $form['#prefix'] = '<br>';
      //Generate form filter
    $form['header'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Header'
    );

    $form['header']['login'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Botón iniciar sesión'
    );

    $form['footer'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Footer'
    );

    $form['momentos_home'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Momentos Home'
    );

    $form['momentos_home_recetas'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Momentos en home recetas'
    );

    $form['recetas_relacionadas'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Recetas relacionadas'
    );

    $form['noticias_relacionadas'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Noticias relacionadas'
    );

    $form['noticias'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Noticias'
    );

    $form['menu'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Menú'
    );

    $form['recetas_home'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Recetas home'
    );

    $form['listado_ingredientes'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Listado ingredientes'
    );

    $form['recetas_usuarios'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Recetas Usuarios'
    );

    $form['recetas_valoradas'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Recetas más valoradas'
    );

    $form['blog_nutricion_visto_home'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Blog nutrición más visto home'
    );

    $form['blog_nutricion_home'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Home nutrición'
    );

    $form['blog_recetas_recientes'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Blog recetas recientes'
    );

    $form['blog_nutricion_home'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Blog nutrición home'
    );

    $form['blog_sostenibilidad_prehome'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Blog sostenibilidad Prehome'
    );

    $form['productos'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Productos'
    );

    $form['comunicados'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Comunicados'
    );

    $form['sostenibilidad'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Sostenibilidad'
    );

    $form['url_menus'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'URL Menú principal'
    );

    $form['titulo_recetas_valoradas'] = array(
      '#type' => 'details',
      '#open' => FALSE,
      '#title' => 'Recetas más valoradas'
    );

    $form['titulo_recetas_valoradas']['titulo_valoradas'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas más valoradas',
      '#default_value' => $config->get('titulo_valoradas'),
    ];

    //Inicia recetas por ingredientes
    $form['titulo_recetas_valoradas']['titulo_chantilly'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas con Crema Chantilly',
      '#default_value' => $config->get('titulo_chantilly'),
    ];

    $form['titulo_recetas_valoradas']['titulo_suero_costeno'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas con Suero Costeño',
      '#default_value' => $config->get('titulo_suero_costeno'),
    ];

    $form['titulo_recetas_valoradas']['titulo_arequipe_y_obleas'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas con Arequipe y Obleas',
      '#default_value' => $config->get('titulo_arequipe_y_obleas'),
    ];

    $form['titulo_recetas_valoradas']['titulo_crema_de_leche'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas con Crema de Leche',
      '#default_value' => $config->get('titulo_crema_de_leche'),
    ];

    $form['titulo_recetas_valoradas']['titulo_crema_de_leche_light'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas con Crema de Leche Light',
      '#default_value' => $config->get('titulo_crema_de_leche_light'),
    ];

    $form['titulo_recetas_valoradas']['titulo_crema_de_leche_libre'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas con Crema de Leche Libre',
      '#default_value' => $config->get('titulo_crema_de_leche_libre'),
    ];

    $form['titulo_recetas_valoradas']['titulo_crema_de_leche_finas_hierbas'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas con Crema de Leche Finas Hierbas',
      '#default_value' => $config->get('titulo_crema_de_leche_finas_hierbas'),
    ];

    $form['titulo_recetas_valoradas']['titulo_crema_de_leche_cebolla_grille'] = [
      '#type' => 'textfield',
      '#title' => 'Título de Recetas con Crema de Leche Cebolla Grille',
      '#default_value' => $config->get('titulo_crema_de_leche_cebolla_grille'),
    ];
    //Termina recetas por ingredientes

    $form['url_menus']['recetas'] = [
      '#type' => 'textfield',
      '#title' => 'Url recetas',
      '#default_value' => $config->get('recetas'),
    ];

    $form['url_menus']['nutricion'] = [
      '#type' => 'textfield',
      '#title' => 'Url bienestar y nutrición',
      '#default_value' => $config->get('nutricion'),
    ];

    $form['url_menus']['sostenibilidad'] = [
      '#type' => 'textfield',
      '#title' => 'Url sostenibilidad',
      '#default_value' => $config->get('sostenibilidad'),
    ];

    $form['url_menus']['productos'] = [
      '#type' => 'textfield',
      '#title' => 'Url productos',
      '#default_value' => $config->get('productos'),
    ];

    $form['url_menus']['conocenos'] = [
      '#type' => 'textfield',
      '#title' => 'Url conocenos',
      '#default_value' => $config->get('conocenos'),
    ];

    $form['url_menus']['Label_prehome'] = [
      '#type' => 'textfield',
      '#title' => 'Label ir a prehome',
      '#default_value' => $config->get('Label_prehome'),
    ];

    $form['sostenibilidad']['titulo_sostenibilidad_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título sosteniblidad HOME',
      '#default_value' => $config->get('titulo_sostenibilidad_home'),
    ];

    $form['menu']['tips_cocina'] = [
      '#type' => 'textfield',
      '#title' => 'Enlace tips de cocina menú',
      '#default_value' => $config->get('tips_cocina'),
    ];

    $form['comunicados']['titulo_comunicados_destacados'] = [
      '#type' => 'textfield',
      '#title' => 'Título sección destacados',
      '#default_value' => $config->get('titulo_comunicados_destacados'),
    ];

    $form['comunicados']['titulo_comunicados_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título home destacados',
      '#default_value' => $config->get('titulo_comunicados_home'),
    ];

    $form['comunicados']['url_boton_comunidados_destacados'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón destacados',
      '#default_value' => $config->get('url_boton_comunidados_destacados'),
    ];

    $form['comunicados']['titulo_boton_comunidados_destacados'] = [
      '#type' => 'textfield',
      '#title' => 'titulo botón destacados',
      '#default_value' => $config->get('titulo_boton_comunidados_destacados'),
    ];

    $form['productos']['titulo_productos_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título productos prehome',
      '#default_value' => $config->get('titulo_productos_home'),
    ];

    $form['productos']['boton_compra_aqui'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón compra aquí',
      '#default_value' => $config->get('boton_compra_aqui'),
    ];

    $form['productos']['texto_no_almacen'] = [
      '#type' => 'textfield',
      '#title' => 'Texto cuando no hay almacen donde comprar',
      '#default_value' => $config->get('texto_no_almacen'),
    ];

    $form['productos']['titulo_categorias_productos_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título listado categorías productos home',
      '#default_value' => $config->get('titulo_categorias_productos_home'),
    ];

    $form['productos']['titulo_btn_categorias_productos_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón categorías productos home',
      '#default_value' => $config->get('titulo_btn_categorias_productos_home'),
    ];

    $form['productos']['url_btn_categorias_productos_home'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón categorías productos home',
      '#default_value' => $config->get('url_btn_categorias_productos_home'),
    ];

    $form['blog_nutricion_home']['titulo_nutricion_destacados'] = [
      '#type' => 'textfield',
      '#title' => 'Título nutrición home destacados',
      '#default_value' => $config->get('titulo_nutricion_destacados'),
    ];

    $form['blog_nutricion_home']['titulo_blog_nutricion_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título blog nutrición home',
      '#default_value' => $config->get('titulo_blog_nutricion_home'),
    ];

    $form['blog_nutricion_home']['descripcion_blog_nutricion_home'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción blog nutrición home',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_blog_nutricion_home'),
    ];

    $form['blog_sostenibilidad_prehome']['titulo_blog_sostenibilidad_prehome'] = [
      '#type' => 'textfield',
      '#title' => 'Título blog sostenibilidad prehome',
      '#default_value' => $config->get('titulo_blog_sostenibilidad_prehome'),
    ];

    $form['blog_sostenibilidad_prehome']['descripcion_blog_sostenibilidad_prehome_destacado'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción blog sostenibilidad prehome destacados',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_blog_sostenibilidad_prehome_destacado'),
    ];

    $form['blog_sostenibilidad_prehome']['titulo_blog_sostenibilidad_prehome_destacado'] = [
      '#type' => 'textfield',
      '#title' => 'Título blog sostenibilidad prehome destacados',
      '#default_value' => $config->get('titulo_blog_sostenibilidad_prehome_destacado'),
    ];

    $form['blog_sostenibilidad_prehome']['descripcion_blog_sostenibilidad_prehome'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción blog sostenibilidad prehome',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_blog_sostenibilidad_prehome'),
    ];

    $form['blog_recetas_recientes']['titulo_blog_recetas_recientes'] = [
      '#type' => 'textfield',
      '#title' => 'Título blog recetas recientes',
      '#default_value' => $config->get('titulo_blog_recetas_recientes'),
    ];
    $form['blog_recetas_recientes']['titulo_btn_blog_recetas_recientes'] = [
      '#type' => 'textfield',
      '#title' => 'Título blog recetas recientes',
      '#default_value' => $config->get('titulo_btn_blog_recetas_recientes'),
    ];

    $form['blog_recetas_recientes']['url_btn_blog_recetas_recientes'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón blog recetas recientes',
      '#default_value' => $config->get('url_btn_blog_recetas_recientes'),
    ];

    $form['blog_nutricion_visto_home']['titulo_blog_nutricion_visto'] = [
      '#type' => 'textfield',
      '#title' => 'Título blog nutrición más visto home',
      '#default_value' => $config->get('titulo_blog_nutricion_visto'),
    ];
    $form['blog_nutricion_visto_home']['titulo_btn_blog_nutricion_visto_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón blog nutrición más visto home',
      '#default_value' => $config->get('titulo_btn_blog_nutricion_visto_home'),
    ];

    $form['blog_nutricion_visto_home']['url_btn_blog_nutricion_visto_home'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón blog nutrición más visto home',
      '#default_value' => $config->get('url_btn_blog_nutricion_visto_home'),
    ];

    $form['recetas_valoradas']['titulo_recetas_valoradas'] = [
      '#type' => 'textfield',
      '#title' => 'Título recetas más valoradas',
      '#default_value' => $config->get('titulo_recetas_valoradas'),
    ];

     $form['recetas_valoradas']['titulo_btn_recetas_valoradas'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón recetas más valoradas',
      '#default_value' => $config->get('titulo_btn_recetas_valoradas'),
    ];

    $form['recetas_valoradas']['url_btn_recetas_valoradas'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón recetas más valoradas',
      '#default_value' => $config->get('url_btn_recetas_relacionadas'),
    ];

    $form['noticias_relacionadas']['titulo_noticias_relacionadas'] = [
      '#type' => 'textfield',
      '#title' => 'Título noticias relacionadas',
      '#default_value' => $config->get('titulo_noticias_relacionadas'),
    ];

     $form['noticias_relacionadas']['titulo_btn_noticias_relacionadas'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón noticias relacionadas',
      '#default_value' => $config->get('titulo_btn_noticias_relacionadas'),
    ];

    $form['noticias_relacionadas']['url_btn_noticias_relacionadas'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón noticias relacionadas',
      '#default_value' => $config->get('url_btn_noticias_relacionadas'),
    ];

    $form['noticias']['titulo_noticias'] = [
      '#type' => 'textfield',
      '#title' => 'Título bloque noticias',
      '#default_value' => $config->get('titulo_noticias'),
    ];

    $form['noticias']['titulo_noticias_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título home Noticias',
      '#default_value' => $config->get('titulo_noticias_home'),
    ];

     $form['noticias']['titulo_btn_noticias'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón noticias ',
      '#default_value' => $config->get('titulo_btn_noticias'),
    ];

    $form['noticias']['url_btn_noticias'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón noticias ',
      '#default_value' => $config->get('url_btn_noticias'),
    ];

    $form['recetas_usuarios']['titulo_recetas_usuarios'] = [
      '#type' => 'textfield',
      '#title' => 'Título recetas usuarios',
      '#default_value' => $config->get('titulo_recetas_usuarios'),
    ];

    $form['recetas_usuarios']['descripcion_recetas_usuarios'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción recetas usuarios',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_recetas_usuarios'),
    ];


     $form['recetas_usuarios']['titulo_btn_recetas_usuarios'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón recetas usuarios',
      '#default_value' => $config->get('titulo_btn_recetas_usuarios'),
    ];

    $form['recetas_usuarios']['url_btn_recetas_usuarios'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón recetas usuarios',
      '#default_value' => $config->get('url_btn_recetas_usuarios'),
    ];

    $form['recetas_home']['titulo_mas_visto'] = [
      '#type' => 'textfield',
      '#title' => 'Título recetas más vistas',
      '#default_value' => $config->get('titulo_mas_visto'),
    ];

    $form['recetas_home']['header_listado_recetas'] = [
      "#type" => 'text_format',
      "#title" => 'Header home listado recetas',
      '#format' => 'full_html',
      '#default_value' => $config->get('header_listado_recetas'),
    ];


    $form['recetas_home']['titulo_btn_recetas_prehome'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón prehome recetas',
      '#default_value' => $config->get('titulo_btn_recetas_prehome'),
    ];

     $form['recetas_home']['url_btn_recetas_prehome'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón prehome recetas',
      '#default_value' => $config->get('url_btn_recetas_prehome'),
    ];

    $form['momentos_home']['titulo_momentos_home'] = [
      '#type' => 'textfield',
      '#title' => 'Título bloque momentos home',
      '#default_value' => $config->get('titulo_momentos_home'),
    ];

    $form['recetas_relacionadas']['titulo_recetas_relacionadas'] = [
      '#type' => 'textfield',
      '#title' => 'Título bloque recetas relacionadas',
      '#default_value' => $config->get('titulo_recetas_relacionadas'),
    ];

    $form['recetas_relacionadas']['titulo_btn_recetas_relacionadas'] = [
      '#type' => 'textfield',
      '#title' => 'Título botón recetas relacionadas',
      '#default_value' => $config->get('titulo_btn_recetas_relacionadas'),
    ];

    $form['recetas_relacionadas']['url_btn_recetas_relacionadas'] = [
      '#type' => 'textfield',
      '#title' => 'URL botón recetas relacionadas',
      '#default_value' => $config->get('url_btn_recetas_relacionadas'),
    ];

    $form['header']['login']['login_label'] = [
      '#type' => 'textfield',
      '#title' => 'Label botón iniciar sesión',
      '#description' => 'Ingrese el título para el botón de iniciar sesión en el menú superior',
      '#default_value' => $config->get('login_label'),
    ];

    $form['header']['login']['login_url'] = [
      '#type' => 'textfield',
      '#title' => 'Label botón iniciar sesión',
      '#description' => 'Ingrese la url para el botón de iniciar sesión en el menú superior',
      '#default_value' => $config->get('login_url'),
    ];

    $form['footer']['servicio_label'] = [
      '#type' => 'textfield',
      '#title' => 'Label servicio al cliente',
      '#default_value' => $config->get('servicio_label'),
      '#rows' => 1
    ];

    $form['footer']['siguenos_label'] = [
      '#type' => 'textfield',
      '#title' => 'Label síguenos',
      '#default_value' => $config->get('siguenos_label'),
      '#rows' => 1
    ];

    $form['footer']['siguenos_label_recetas'] = [
      '#type' => 'textfield',
      '#title' => 'Label síguenos Recetas',
      '#default_value' => $config->get('siguenos_label_recetas'),
      '#rows' => 1
    ];

    $form['footer']['linea_nacional_label'] = [
      '#type' => 'textfield',
      '#title' => 'Label línea servicio nacional',
      '#default_value' => $config->get('linea_nacional_label'),
      '#rows' => 1
    ];

    $form['footer']['linea_nacional'] = [
      '#type' => 'textfield',
      '#title' => 'línea servicio nacional',
      '#default_value' => $config->get('linea_nacional'),
      '#rows' => 1
    ];

    $form['footer']['linea_bogota_label'] = [
      '#type' => 'textfield',
      '#title' => 'Label línea Bogotá',
      '#default_value' => $config->get('linea_bogota_label'),
      '#rows' => 1
    ];

     $form['footer']['linea_bogota'] = [
      '#type' => 'textfield',
      '#title' => 'línea Bogotá',
      '#default_value' => $config->get('linea_bogota'),
      '#rows' => 1
    ];
    $form['footer']['linea_etica_label'] = [
      '#type' => 'textfield',
      '#title' => 'Label línea Ética',
      '#default_value' => $config->get('linea_etica_label'),
      '#rows' => 1
    ];
    $form['footer']['linea_etica'] = [
      '#type' => 'textfield',
      '#title' => 'línea Ética',
      '#default_value' => $config->get('linea_etica'),
      '#rows' => 1
    ];

    $form['footer']['mail_label'] = [
      '#type' => 'textfield',
      '#title' => 'Label correo electrónico',
      '#default_value' => $config->get('mail_label'),
      '#rows' => 1
    ];

    $form['footer']['mail_footer'] = [
      '#type' => 'textfield',
      '#title' => 'Correo electrónico',
      '#default_value' => $config->get('mail_footer'),
      '#rows' => 1
    ];

    $form['footer']['certificados'] = [
      '#type' => 'textfield',
      '#title' => 'Label certificado de calidad',
      '#default_value' => $config->get('certificados'),
      '#rows' => 1
    ];

    $form['listado_ingredientes']['titulo_listado_ingredientes'] = [
      '#type' => 'textfield',
      '#title' => 'Título listado ingredientes',
      '#default_value' => $config->get('titulo_listado_ingredientes'),
      '#rows' => 1
    ];

    $form['footer']['derechos_reservados'] = [
      "#type" => 'text_format',
      "#title" => 'Texto derechos reservaados',
      '#format' => 'full_html',
      '#default_value' => $config->get('derechos_reservados'),
    ];

    $form['momentos_home_recetas']['titulo_momentos_home_recetas'] = [
      '#type' => 'textfield',
      '#title' => 'Título seccíon home momentos recetas',
      '#default_value' => $config->get('titulo_momentos_home_recetas'),
      '#rows' => 1
    ];

    $form['momentos_home_recetas']['descripcion_momentos_home_recetas'] = [
      "#type" => 'text_format',
      "#title" => 'Descripción momentos home recetas',
      '#format' => 'full_html',
      '#default_value' => $config->get('descripcion_momentos_home_recetas'),
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
      $config = \Drupal::service('config.factory')->getEditable('config.settings');
      $config->set('titulo_mas_visto', $form['recetas_home']['titulo_mas_visto']['#value'])->save();
      $config->set('titulo_btn_recetas_prehome', $form['recetas_home']['titulo_btn_recetas_prehome']['#value'])->save();
      $config->set('url_btn_recetas_prehome', $form['recetas_home']['url_btn_recetas_prehome']['#value'])->save();
      $config->set('titulo_blog_nutricion_visto', $form['blog_nutricion_visto_home']['titulo_blog_nutricion_visto']['#value'])->save();
      $config->set('titulo_btn_blog_nutricion_visto_home', $form['blog_nutricion_visto_home']['titulo_btn_blog_nutricion_visto_home']['#value'])->save();
      $config->set('url_btn_blog_nutricion_visto_home', $form['blog_nutricion_visto_home']['url_btn_blog_nutricion_visto_home']['#value'])->save();
      $config->set('titulo_blog_recetas_recientes', $form['blog_recetas_recientes']['titulo_blog_recetas_recientes']['#value'])->save();
      $config->set('titulo_btn_blog_recetas_recientes', $form['blog_recetas_recientes']['titulo_btn_blog_recetas_recientes']['#value'])->save();
      $config->set('url_btn_blog_recetas_recientes', $form['blog_recetas_recientes']['url_btn_blog_recetas_recientes']['#value'])->save();
      $config->set('descripcion_recetas_usuarios', $form['recetas_usuarios']['descripcion_recetas_usuarios']['value']['#value'])->save();
      $config->set('titulo_recetas_usuarios', $form['recetas_usuarios']['titulo_recetas_usuarios']['#value'])->save();
      $config->set('descripcion_blog_nutricion_home', $form['blog_nutricion_home']['descripcion_blog_nutricion_home']['value']['#value'])->save();
      $config->set('titulo_blog_nutricion_home', $form['blog_nutricion_home']['titulo_blog_nutricion_home']['#value'])->save();
      $config->set('descripcion_blog_sostenibilidad_prehome', $form['blog_sostenibilidad_prehome']['descripcion_blog_sostenibilidad_prehome']['value']['#value'])->save();
      $config->set('titulo_blog_sostenibilidad_prehome', $form['blog_sostenibilidad_prehome']['titulo_blog_sostenibilidad_prehome']['#value'])->save();
      $config->set('descripcion_blog_sostenibilidad_prehome_destacado', $form['blog_sostenibilidad_prehome']['descripcion_blog_sostenibilidad_prehome_destacado']['value']['#value'])->save();
      $config->set('titulo_blog_sostenibilidad_prehome_destacado', $form['blog_sostenibilidad_prehome']['titulo_blog_sostenibilidad_prehome_destacado']['#value'])->save();
      $config->set('titulo_btn_recetas_usuarios', $form['recetas_usuarios']['titulo_btn_recetas_usuarios']['#value'])->save();
      $config->set('url_btn_recetas_usuarios', $form['recetas_usuarios']['url_btn_recetas_usuarios']['#value'])->save();
      $config->set('titulo_recetas_valoradas', $form['recetas_valoradas']['titulo_recetas_valoradas']['#value'])->save();
      $config->set('titulo_btn_recetas_valoradas', $form['recetas_valoradas']['titulo_btn_recetas_valoradas']['#value'])->save();
      $config->set('url_btn_recetas_valoradas', $form['recetas_valoradas']['url_btn_recetas_valoradas']['#value'])->save();
      $config->set('titulo_mas_visto', $form['recetas_home']['titulo_mas_visto']['#value'])->save();
      $config->set('titulo_momentos_home', $form['momentos_home']['titulo_momentos_home']['#value'])->save();
      $config->set('titulo_recetas_relacionadas', $form['recetas_relacionadas']['titulo_recetas_relacionadas']['#value'])->save();
      $config->set('titulo_btn_recetas_relacionadas', $form['recetas_relacionadas']['titulo_btn_recetas_relacionadas']['#value'])->save();
      $config->set('url_btn_recetas_relacionadas', $form['recetas_relacionadas']['url_btn_recetas_relacionadas']['#value'])->save();
      $config->set('titulo_noticias_relacionadas', $form['noticias_relacionadas']['titulo_noticias_relacionadas']['#value'])->save();
      $config->set('titulo_btn_noticias_relacionadas', $form['noticias_relacionadas']['titulo_btn_noticias_relacionadas']['#value'])->save();
      $config->set('url_btn_noticias_relacionadas', $form['noticias_relacionadas']['url_btn_noticias_relacionadas']['#value'])->save();
      $config->set('titulo_noticias', $form['noticias']['titulo_noticias']['#value'])->save();
      $config->set('tips_cocina', $form['menu']['tips_cocina']['#value'])->save();
      $config->set('titulo_noticias_home', $form['noticias']['titulo_noticias_home']['#value'])->save();
      $config->set('titulo_btn_noticias', $form['noticias']['titulo_btn_noticias']['#value'])->save();
      $config->set('url_btn_noticias', $form['noticias']['url_btn_noticias']['#value'])->save();
      $config->set('login_label', $form['header']['login']['login_label']['#value'])->save();
      $config->set('login_url', $form['header']['login']['login_url']['#value'])->save();
      $config->set('servicio_label', $form['footer']['servicio_label']['#value'])->save();
      $config->set('siguenos_label', $form['footer']['siguenos_label']['#value'])->save();
      $config->set('siguenos_label_recetas', $form['footer']['siguenos_label_recetas']['#value'])->save();
      $config->set('linea_nacional_label', $form['footer']['linea_nacional_label']['#value'])->save();
      $config->set('linea_nacional', $form['footer']['linea_nacional']['#value'])->save();
      $config->set('linea_bogota_label', $form['footer']['linea_bogota_label']['#value'])->save();
      $config->set('linea_bogota', $form['footer']['linea_bogota']['#value'])->save();
      $config->set('linea_etica_label', $form['footer']['linea_etica_label']['#value'])->save();
      $config->set('linea_etica', $form['footer']['linea_etica']['#value'])->save();
      $config->set('mail_label', $form['footer']['mail_label']['#value'])->save();
      $config->set('mail_footer', $form['footer']['mail_footer']['#value'])->save();
      $config->set('certificados', $form['footer']['certificados']['#value'])->save();
      $config->set('titulo_nutricion_destacados', $form['blog_nutricion_home']['titulo_nutricion_destacados']['#value'])->save();
      $config->set('titulo_productos_home', $form['productos']['titulo_productos_home']['#value'])->save();
      $config->set('titulo_categorias_productos_home', $form['productos']['titulo_categorias_productos_home']['#value'])->save();
      $config->set('titulo_btn_categorias_productos_home', $form['productos']['titulo_btn_categorias_productos_home']['#value'])->save();
      $config->set('url_btn_categorias_productos_home', $form['productos']['url_btn_categorias_productos_home']['#value'])->save();
      $config->set('boton_compra_aqui', $form['productos']['boton_compra_aqui']['#value'])->save();
      $config->set('texto_no_almacen', $form['productos']['texto_no_almacen']['#value'])->save();
      $config->set('titulo_sostenibilidad_home', $form['sostenibilidad']['titulo_sostenibilidad_home']['#value'])->save();
      $config->set('titulo_comunicados_home', $form['comunicados']['titulo_comunicados_home']['#value'])->save();
      $config->set('titulo_comunicados_destacados', $form['comunicados']['titulo_comunicados_destacados']['#value'])->save();
      $config->set('url_boton_comunidados_destacados', $form['comunicados']['url_boton_comunidados_destacados']['#value'])->save();
      $config->set('titulo_boton_comunidados_destacados', $form['comunicados']['titulo_boton_comunidados_destacados']['#value'])->save();
      $config->set('titulo_momentos_home_recetas', $form['momentos_home_recetas']['titulo_momentos_home_recetas']['#value'])->save();
      $config->set('titulo_listado_ingredientes', $form['listado_ingredientes']['titulo_listado_ingredientes']['#value'])->save();
      $config->set('derechos_reservados', $form['footer']['derechos_reservados']['value']['#value'])->save();
      $config->set('descripcion_momentos_home_recetas', $form['momentos_home_recetas']['descripcion_momentos_home_recetas']['value']['#value'])->save();
      $config->set('header_listado_recetas', $form['recetas_home']['header_listado_recetas']['value']['#value'])->save();
      $config->set('recetas', $form['url_menus']['recetas']['#value'])->save();
      $config->set('nutricion', $form['url_menus']['nutricion']['#value'])->save();
      $config->set('sostenibilidad', $form['url_menus']['sostenibilidad']['#value'])->save();
      $config->set('productos', $form['url_menus']['productos']['#value'])->save();
      $config->set('conocenos', $form['url_menus']['conocenos']['#value'])->save();
      $config->set('Label_prehome', $form['url_menus']['Label_prehome']['#value'])->save();
      $config->set('titulo_valoradas', $form['titulo_recetas_valoradas']['titulo_valoradas']['#value'])->save();
      $config->set('titulo_chantilly', $form['titulo_recetas_valoradas']['titulo_chantilly']['#value'])->save();

      drupal_set_message(t("Se han actualizado los valores de configuración satisfactoriamente"));
     }catch (Exception $e){
      drupal_set_message(t("Se ha producido un error al actualizar los valores de configuración."), "error");
     }
    $renderCache = \Drupal::service('cache.render');
    $renderCache->invalidateAll();
    }
}
