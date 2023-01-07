<?php
/**
 * Created by Valentina Aguirre
 */

namespace Drupal\general_ariadna\Model;

use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Database\Database;

/**
 * @author vaguirrem
 *
 */
class GeneralMenuModel
{

  /**
   * @param int $mid
   * @return records
   */
  public static function getMenuDataByMid($mid)
  {
    $db = \Drupal::database();
    $result = $db->select('menu_link_content_data','m')
      ->fields('m', array('id', 'link__options'))
      ->condition('m.id', $mid, '=')
      ->execute();

    $item = $result->fetchObject();

    return $item;
  }

}
