<?php

namespace Drupal\alqueria_notifications\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Database\DatabaseExceptionWrapper;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\alqueria_notifications\Model\NotificationsModel;

class AlqueriaNotificationsController extends ControllerBase
{	

	public function listarPublicidad(){  
		$header = array(      
			array('data' => 'titulo'),
			array('data' => 'mensaje'),			
			array('data' => 'enlace'),
			array('data' => 'fecha'),
		);
		
		$userList=NotificationsModel::listarPublicidad();
		$rows = array();

		foreach($userList as $row) {
			$ts = $row->fecha;			
			$date = new \DateTime();
			$date->setTimestamp($ts);
			$rows[] = array('data' => array(
				'titulo' => $row->titulo,
				'mensaje' => $row->mensaje,				
				'enlace' => $row->enlace,
				'fecha' => $date->format('Y-m-d H:i:s'),
			));
		}  

		$build['table'] = array(
			'#theme' => 'table',
			'#header' => $header,
			'#rows' => $rows,
		);
		
		$build['#cache']['max-age'] = 0;
		$build['#cache']['contexts'] = [];
		$build['#cache']['tags'] = [];
		
		$build['pager'] = array(
			'#type' => 'pager'
		);

		return $build;
	}

	public function obtenerNotificacionesVisiblesUsuario(){
		$notificaciones = NotificationsModel::obtenerListadoUsuarioVisibles(\Drupal::currentUser()->id());
		return $notificaciones;
	}

	public function desactivarNotificacionesVisibles(){
		$notificaciones = NotificationsModel::desactivarVisibles(\Drupal::currentUser()->id());
		return $notificaciones;
	}

	public function obtenerNotificacionesUsuario(){
		$notificaciones = NotificationsModel::obtenerListadoUsuario(\Drupal::currentUser()->id());
		$dataGeneral = array();
		foreach ($notificaciones as $notificacion) {

			switch ($notificacion->tipo) {
				case 'publicacion':
				$data=['nid' => $notificacion->nid,'fecha' => $notificacion->fecha,'tipo'=>'publicacion','titulo'=>$notificacion->titulo];
				$dataGeneral[]= $data;				
				break;

				case 'publicidad':
				$data=['titulo' => $notificacion->titulo,
				'mensaje' => $notificacion->mensaje,
				'enlace' => $notificacion->enlace,
				'foto' => $notificacion->foto,
				'fecha' => $notificacion->fecha,
				'tipo'=>'publicidad'
			];
			$dataGeneral[]= $data;				

			break;

			case 'comentario':		
			$existe=0;	
			foreach ($dataGeneral as $key => $value) {
				if ($dataGeneral[$key]['tipo'] == "comentario" && $dataGeneral[$key]['nid'] == $notificacion->nid ) {
					$existe=$key;
				}
			}
			
			if ( $existe != 0 ) {
				$dataGeneral[$existe]['count']++;
			}else{
				$data=['nid' => $notificacion->nid,
				'uid'=>$notificacion->uid_emisor,
				'fecha' => $notificacion->fecha,
				'foto' => $notificacion->foto,				
				'titulo' => $notificacion->titulo,
				'tipo'=>'comentario',
				'count'=>1
			];				
			$dataGeneral[]=$data;
		}

		break;

		default:
		break;
	}
	
}

return $dataGeneral;
}

public function registrarNotificacion($data){	
	$registro = NotificationsModel::registrar($data);
	if ($registro['status'] == 0) {
		\Drupal::logger('alqueria_notificaciones')->error('No se pudo registrar la notificación. Error:'.$registro['msg']);	
	}
	return $registro['status'];
}

}



