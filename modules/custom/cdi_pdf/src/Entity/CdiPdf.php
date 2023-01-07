<?php

namespace Drupal\cdi_pdf\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\cdi_pdf\CdiPdfInterface;

/**
 * Defines the cdi_pdf entity class.
 *
 * @ContentEntityType(
 *   id = "cdi_pdf",
 *   label = @Translation("cdi_pdf"),
 *   label_collection = @Translation("cdi_pdfs"),
 *   handlers = {
 *     "view_builder" = "Drupal\cdi_pdf\CdiPdfViewBuilder",
 *     "list_builder" = "Drupal\cdi_pdf\CdiPdfListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "access" = "Drupal\cdi_pdf\CdiPdfAccessControlHandler",
 *     "form" = {
 *       "add" = "Drupal\cdi_pdf\Form\CdiPdfForm",
 *       "edit" = "Drupal\cdi_pdf\Form\CdiPdfForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *     }
 *   },
 *   base_table = "cdi_pdf",
 *   admin_permission = "access cdi_pdf overview",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "id",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "add-form" = "/admin/content/cdi-pdf/add",
 *     "canonical" = "/cdi_pdf/{cdi_pdf}",
 *     "edit-form" = "/admin/content/cdi-pdf/{cdi_pdf}/edit",
 *     "delete-form" = "/admin/content/cdi-pdf/{cdi_pdf}/delete",
 *     "collection" = "/admin/content/cdi-pdf"
 *   },
 * )
 */
class CdiPdf extends ContentEntityBase implements CdiPdfInterface {

  /**
   * {@inheritdoc}
   */
  public function isEnabled() {
    return (bool) $this->get('status')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setStatus($status) {
    $this->set('status', $status);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {

    $fields = parent::baseFieldDefinitions($entity_type);


    $fields['webform_id'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Webform id'))
      ->setSettings(array(
        'default_value' => '',
        'max_length' => 255,
        'text_processing' => 0,
      ))
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'number_integer',
        'weight' => -6,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -6,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setDefaultValue(0);

    return $fields;
  }
}
