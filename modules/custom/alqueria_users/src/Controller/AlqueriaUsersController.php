<?php

namespace Drupal\alqueria_users\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Database\DatabaseExceptionWrapper;
use Symfony\Component\HttpFoundation\RedirectResponse;

class AlqueriaUsersController extends ControllerBase {

  public function eliminarCuenta() {
    $asignacion = \Drupal::config('alqueriaUsers.settings')
      ->get('usuario_asignacion');
    $asignacion = ($asignacion == "") ? 1 : $asignacion;
    $logged_in = \Drupal::currentUser()->isAuthenticated();
    if ($logged_in) {
      $account = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
      module_load_include('inc', 'node', 'node.admin');
      $nodes = \Drupal::entityQuery('node')
        ->condition('uid', $account->id())
        ->execute();
      node_mass_update($nodes, ['uid' => $asignacion], NULL, TRUE);

      \Drupal::database()->update('node_field_revision')
        ->fields(['uid' => $asignacion])
        ->condition('uid', $account->id())
        ->execute();
      $session_manager = \Drupal::service('session_manager');
      $session_manager->delete(\Drupal::currentUser()->id());
      $account->delete();
      $url = \Drupal::config('alqueriaUsers.settings')->get('url_eliminar');
      return new RedirectResponse($url);
    }
  }

  public function eliminarDatosFacebook() {
    $asignacion = \Drupal::config('alqueriaUsers.settings')
      ->get('usuario_asignacion_datos');
    $asignacion = ($asignacion == "") ? 1 : $asignacion;
    $account = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
    module_load_include('inc', 'node', 'node.admin');
    $nodes = \Drupal::entityQuery('node')
      ->condition('uid', $account->id())
      ->execute();
    node_mass_update($nodes, ['uid' => $asignacion], NULL, TRUE);

    \Drupal::database()->update('node_field_revision')
      ->fields(['uid' => $asignacion])
      ->condition('uid', $account->id())
      ->execute();
    $session_manager = \Drupal::service('session_manager');
    $session_manager->delete(\Drupal::currentUser()->id());
    $account->delete();
    $url = \Drupal::config('alqueriaUsers.settings')->get('url_eliminar_datos');
    return new RedirectResponse($url);

  }

  public function registrarUsuario() {
    $msg = "";
    try {
      $user = \Drupal\user\Entity\User::create();
      $email = \Drupal::request()->request->get('email');
      $newsletter = 0;
      $preferencias = [];

      if ($this->validarUsuario($email) != 1) {
        throw new \Exception('El correo ya está registrado');
      }

      if (\Drupal::request()->request->get('fbid') != "") {
        $pass = \Drupal::request()->request->get('fbid');
        $user->set("field_fbid", 1);
      }
      elseif (\Drupal::request()->request->get('gid') != "") {
        $pass = \Drupal::request()->request->get('gid');
        $user->set("field_gid", 1);
      }
      else {
        $pass = \Drupal::request()->request->get('password');
      }

      $user->setPassword($pass);
      $user->enforceIsNew();
      $user->setEmail($email);
      $user->setUsername($email);
      $user->set("init", 'email');
      $user->set("langcode", "es");
      $user->set("preferred_langcode", "es");
      $user->set("preferred_admin_langcode", "es");
      $user->set("preferred_admin_langcode", "es");
      //custom fields
      $user->set("field_nombres", \Drupal::request()->request->get('nombres'));
      $nombreAvatar = explode(" ", \Drupal::request()->request->get('nombres'));
      $nombreAvatar = $nombreAvatar[0];
      $user->set("field_apellidos", \Drupal::request()->request->get('apellidos'));
      $apellidoAvatar = explode(" ", \Drupal::request()->request->get('apellidos'));
      $apellidoAvatar = $apellidoAvatar[0];
      $user->set("field_telefono", "57" . \Drupal::request()->request->get('telefono'));
      $user->set("field_ciudad", \Drupal::request()->request->get('ciudad'));
      $user->set("field_departamento", \Drupal::request()->request->get('departamento'));
      $user->set("field_genero", \Drupal::request()->request->get('genero'));
      $user->set("field_frase", \Drupal::request()->request->get('frase'));
      $avatar = ['nombre' => $nombreAvatar, 'apellido' => $apellidoAvatar];
      if (\Drupal::request()->request->get('newsletter') == "true") {
        $newsletter = 1;
      }

      $user->set("field_newsletter", $newsletter);
      $preferenciasTexto = "";

      $recetas = '';
      $nutricion = '';
      $sostenibilidad = '';
      if (\Drupal::request()->request->get('pre_recipes') == "true") {
        $recetas = 'ok';
        $preferenciasTexto = "recetas";
        $preferencias[] = 'recetas';
      }
      if (\Drupal::request()->request->get('pre_nutrition') == "true") {
        $nutricion = 'ok';
        $preferenciasTexto .= " nutrición";
        $preferencias[] = 'nutricion';
      }
      if (\Drupal::request()->request->get('pre_sustainability') == "true") {
        $sostenibilidad = 'ok';
        $preferenciasTexto .= " sostenibilidad";
        $preferencias[] = 'sostenibilidad';
      }
      $preferenciasTexto = str_replace(" ", ",", $preferenciasTexto);
      $user->set("field_preferencias", $preferencias);
      $user->addRole('usuario_alqueria');
      $user->activate();
      $user->save();
      $uid = \Drupal::service('user.auth')->authenticate($email, $pass);
      $this->cargarImagen(NULL, $avatar, $uid);
      $user = \Drupal\user\Entity\User::load($uid);
      user_login_finalize($user);
      $msg = "Usuario creado con éxito";
      $status = 1;
      $redirect = \Drupal\Core\Url::fromRoute('user.page')
          ->toString() . '/' . $uid;
    } catch (\Throwable $e) {
      $redirect = "";
      $status = 0;
      $msg = $e->getMessage();
    }

    if ($status) {
      $ciudad = \Drupal::entityManager()
        ->getStorage('taxonomy_term')
        ->loadByProperties(['tid' => \Drupal::request()->request->get('ciudad')]);
      $ciudad = reset($ciudad);
      $ciudad = $ciudad->label();
      $dpto = \Drupal::entityManager()
        ->getStorage('taxonomy_term')
        ->loadByProperties(['tid' => \Drupal::request()->request->get('departamento')]);
      $dpto = reset($dpto);
      $dpto = $dpto->label();

      try {
        $endpoint = \Drupal::config('alqueriaUsers.settings')->get('endpoint');
        $fields = [
          'email' => $email,
          'eventName' => 'registro-usuarios-content-hub',
          'attributes' => [
            'nombres' => \Drupal::request()->request->get('nombres'),
            'apellidos' => \Drupal::request()->request->get('apellidos'),
            'telefono' => "57" . \Drupal::request()->request->get('telefono'),
            'correo-electronico' => \Drupal::request()->request->get('email'),
            'departamento' => $dpto,

            //envia género a emblue, si el nombre del campo cambia
            // en emblue aca deberia hacerse ese cambio en la posicion,
            // los valores se configuran en /admin/config/people/accounts/fields
            'genero' => \Drupal::request()->request->get('genero'),
            'ciudad' => $ciudad,
            'newsletter' => $newsletter,
            'terminos' => 1,
            'preferencias' => $preferenciasTexto,
            'frase' => \Drupal::request()->request->get('frase'),
            'origen_formulario' => \Drupal::request()->getHost(),

            //intereses por separado
            'recetas' => $recetas,
            'nutricion' => $nutricion,
            'sostenibilidad' => $sostenibilidad,
          ],

        ];
        $client = \Drupal::httpClient();
        $options = [
          'headers' => [
            'Authorization' => 'Basic ' . base64_encode(\Drupal::config('alqueriaUsers.settings')
                ->get('apikey')),
            'Content-Type' => 'application/json',
          ],
        ];
        $options['body'] = json_encode($fields);
        $response = $client->request('POST', $endpoint, $options);
        $requestMsg = json_encode($fields);
        \Drupal::logger('emblue_data')
          ->notice('Only Data:' . json_encode($fields, JSON_THROW_ON_ERROR));
        \Drupal::logger('emblue_data')
          ->notice('enviado:' . json_encode($fields, JSON_THROW_ON_ERROR) . " || respuesta: " . $response->getBody());
        $request = 1;
      } catch (\Throwable $e) {
        $request = 0;
        $requestMsg = $e->getMessage();
      }
    }

    return new JsonResponse([
      'msg' => $msg,
      'status' => $status,
      'redirect' => $redirect,
      'request' => $request,
      'requestMsg' => $requestMsg,
    ]);
  }

  public function validarUsuario($email) {
    $id = \Drupal::entityQuery('user')
      ->condition('name', $email)
      ->range(0, 1)
      ->execute();
    if (empty($id)) {
      return 1;
    }
    return $id;
  }

  public function olvidarContrasena() {
    try {
      $langcode = \Drupal::languageManager()->getCurrentLanguage()->getId();
      $id = $this->validarUsuario(\Drupal::request()->request->get('name'));
      if ($id != 1) {
        $user = \Drupal::entityTypeManager()
          ->getStorage('user')
          ->load(reset($id));
      }
      else {
        throw new \Exception('El correo no se ha encontrado');
      }

      if ($user->field_fbid->value == 1) {
        throw new \Exception('Debe iniciar sesión en facebook');
      }
      if ($user->field_gid->value == 1) {
        throw new \Exception('Debe iniciar sesión en google');
      }
      $mail = _user_mail_notify('password_reset', $user, $langcode);
      if ($mail) {
        $msg = "Correo enviado";
        $status = 1;
      }
    } catch (\Throwable $e) {
      $status = 0;
      $msg = $e->getMessage();
    }
    return new JsonResponse(['msg' => $msg, 'status' => $status]);
  }

  public function iniciarSesion() {
    if (\Drupal::request()->request->get('fbid') != "") {
      $pass = \Drupal::request()->request->get('fbid');
    }
    elseif (\Drupal::request()->request->get('gid') != "") {
      $pass = \Drupal::request()->request->get('gid');
    }
    else {
      $pass = \Drupal::request()->request->get('password');
    }
    $uid = \Drupal::service('user.auth')
      ->authenticate(\Drupal::request()->request->get('username'), $pass);
    if ($uid != 0) {
      $user = \Drupal\user\Entity\User::load($uid);
      user_login_finalize($user);
      $msg = "Usuario cargado";
      $status = 1;
      $redirect = \Drupal\Core\Url::fromRoute('user.page')
          ->toString() . '/' . $uid;
    }
    else {
      $msg = "Los datos ingresados no son válidos";
      $status = 0;
      $redirect = "";
    }
    return new JsonResponse([
      'msg' => $msg,
      'status' => $status,
      'redirect' => $redirect,
    ]);
  }

  public function editarPerfil() {
    $data = \Drupal::request()->files->get('file-profile', []);
    if (!is_null($data)) {
      $cargarImagen = $this->cargarImagen($data);
      return new JsonResponse($cargarImagen);
    }

    try {
      $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
      $newsletter = 0;
      $preferencias = [];
      $user->set("field_nombres", \Drupal::request()->request->get('nombres'));
      $user->set("field_apellidos", \Drupal::request()->request->get('apellidos'));
      $user->set("field_telefono", \Drupal::request()->request->get('telefono'));
      $user->set("field_ciudad", \Drupal::request()->request->get('ciudad'));
      $user->set("field_departamento", \Drupal::request()->request->get('departamento'));
      $pass1 = \Drupal::request()->request->get('register-password1');
      $pass2 = \Drupal::request()->request->get('register-password2');
      if ((!is_null($pass1) && !is_null($pass2)) && ($pass1 == $pass2)) {
        $user->setPassword($pass1);
      }

      if (\Drupal::request()->request->get('newsletter') == "true") {
        $newsletter = 1;
      }
      $user->set("field_newsletter", $newsletter);

      if (\Drupal::request()->request->get('pre_recipes') == "on") {
        array_push($preferencias, 'recetas');
      }
      if (\Drupal::request()->request->get('pre_nutrition') == "on") {
        array_push($preferencias, 'nutricion');
      }
      if (\Drupal::request()->request->get('pre_sustainability') == "on") {
        array_push($preferencias, 'sostenibilidad');
      }
      $user->set("field_preferencias", $preferencias);
      $user->save();
      $status = 1;
      $msg = "Cambios guardados";
    } catch (\Throwable $e) {
      $status = 0;
      $msg = "Error:" . $e->getMessage();
    }

    return new JsonResponse(['msg' => $msg, 'status' => $status]);
  }

  public function cargarImagen($archivo = NULL, $uiavatar = 0, $user = 0) {
    $user = ($user == 0) ? \Drupal::currentUser()->id() : $user;
    if (is_array($uiavatar) && is_null($archivo)) {
      $extension = ".png";
      $urlContents = "https://ui-avatars.com/api/?name=" . $uiavatar['nombre'] . '+' . $uiavatar['apellido'] . '&size=100&background=random';
    }
    else {
      $extension = $archivo->getClientOriginalExtension();
      $urlContents = $archivo->getPathName();
    }
    $rutaFinal = 'public://profile-' . \Drupal::time()
        ->getRequestTime() . '-' . $user . '.' . $extension;
    $fileContent = file_get_contents($urlContents);

    $destination = $rutaFinal;
    $file = file_save_data($fileContent, $destination, FILE_EXISTS_RENAME);

    if (is_object($file)) {
      try {
        $user = \Drupal\user\Entity\User::load($user);
        $user->set("user_picture", ['target_id' => $file->id()]);
        $user->save();
        $style = \Drupal::entityTypeManager()
          ->getStorage('image_style')
          ->load('170x170');
        $url = $style->buildUrl($user->user_picture->entity->getFileUri());
        $status = 1;
        $msg = "La imagen se ha cambiado exitosamente";
      } catch (\Throwable $e) {
        $status = 0;
        $msg = "Error : " . $e->getMessage();
      }
    }
    else {
      $status = 0;
      $msg = "La imagen no se pudo cargar";
    }
    return ['msg' => $msg, 'status' => $status];
  }
}



