<?php

namespace Drupal\alqueria_config\Model;

use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Database\Database;


class BuscadorModel
{	
	public static function obtenerBusqueda($word,$limit){		
		$connection = \Drupal::database();
		$sql="SELECT node_field_data.title AS title,node_field_data.type AS type, node_field_data.nid AS nid, node__body.body_value as 'dcorta'
		FROM
		{node_field_data} node_field_data
		INNER JOIN {node} node ON node_field_data.nid = node.nid
		LEFT JOIN {node__body} node__body ON node_field_data.nid = node__body.entity_id AND (node__body.deleted = '0' AND node__body.langcode = node_field_data.langcode)
		WHERE (node_field_data.status = '1' AND node_field_data.type IN ('blog_nutricion','interna_conocenos', 'noticia', 'preguntas_frecuentes', 'producto', 'programa_sostenibilidad', 'page', 'receta', 'terminos_y_condiciones') )
		AND ( node_field_data.title LIKE '%".$word."%' OR node__body.body_value LIKE '%".$word."%' ) ";		
		$sql.=" ORDER BY title ASC LIMIT ".$limit;
		$query = $connection->query($sql);
		$result = $query->fetchAll();
		return $result;
	}

	public static function countObtenerBusqueda($word,$limit){		
		$connection = \Drupal::database();
		$sql="SELECT count(node_field_data.nid) AS cantidad
		FROM
		{node_field_data} node_field_data
		INNER JOIN {node} node ON node_field_data.nid = node.nid
		LEFT JOIN {node__body} node__body ON node_field_data.nid = node__body.entity_id AND (node__body.deleted = '0' AND node__body.langcode = node_field_data.langcode)
		WHERE (node_field_data.status = '1' AND node_field_data.type IN ('blog_nutricion','interna_conocenos', 'noticia', 'preguntas_frecuentes', 'producto', 'programa_sostenibilidad', 'page', 'receta', 'terminos_y_condiciones') )
		AND ( node_field_data.title LIKE '%".$word."%' OR node__body.body_value LIKE '%".$word."%' ) ";	
		$query = $connection->query($sql);
		$result = $query->fetchAll();
		return $result;
	}
}
