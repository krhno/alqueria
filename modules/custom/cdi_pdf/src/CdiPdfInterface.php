<?php

namespace Drupal\cdi_pdf;

use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface defining a cdi_pdf entity type.
 */
interface CdiPdfInterface extends ContentEntityInterface {

  /**
   * Returns the cdi_pdf status.
   *
   * @return bool
   *   TRUE if the cdi_pdf is enabled, FALSE otherwise.
   */
  public function isEnabled();

  /**
   * Sets the cdi_pdf status.
   *
   * @param bool $status
   *   TRUE to enable this cdi_pdf, FALSE to disable.
   *
   * @return \Drupal\cdi_pdf\CdiPdfInterface
   *   The called cdi_pdf entity.
   */
  public function setStatus($status);

}
