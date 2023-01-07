<?php

namespace Drupal\social_share\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Database\DatabaseExceptionWrapper;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Language\LanguageInterface;

class SocialShareController extends ControllerBase
{
	public function obtenerRedes(){
		$config = \Drupal::config('shareConfig.settings');
		$fields_to_load = explode(";",$config->get('fields_to_load'));
		foreach ($fields_to_load as $item) {
			$transliterated = \Drupal::transliteration()->transliterate($item, LanguageInterface::LANGCODE_DEFAULT, '_');
			$transliterated = mb_strtolower($transliterated);
			$key = preg_replace('@[^a-z0-9_.]+@', '_', $transliterated);
			$data_network = empty($config->get('data_network_'.$key)) ? '' : t($config->get('data_network_'.$key));
			$class = empty($config->get('class_'.$key)) ? '' : t($config->get('class_'.$key));
			$class_icono = empty($config->get('class_icono_'.$key)) ? '' : t($config->get('class_icono_'.$key));
			$caracter = empty($config->get('caracter_'.$key)) ? '' : t($config->get('caracter_'.$key));
      $label_texto = empty($config->get('label_texto_'.$key)) ? '' : t($config->get('label_texto_'.$key));

			$data[$key] = ['data_network' => $data_network,
			'class' => $class,
			'class_icono' => $class_icono,
			'caracter' =>  $caracter,
        'label_texto' =>  $label_texto
			];
		}
	return $data;
	}
}



