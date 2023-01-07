<?php

namespace Drupal\cdi_pdf;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityViewBuilder;

/**
 * Provides a view controller for a cdi_pdf entity type.
 */
class CdiPdfViewBuilder extends EntityViewBuilder {

  /**
   * {@inheritdoc}
   */
  protected function getBuildDefaults(EntityInterface $entity, $view_mode) {
    $build = parent::getBuildDefaults($entity, $view_mode);
    // The cdi_pdf has no entity template itself.
    unset($build['#theme']);
    return $build;
  }

}
