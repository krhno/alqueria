<?php

namespace Drupal\cdi_pdf;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Defines the access control handler for the cdi_pdf entity type.
 */
class CdiPdfAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {

    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'view cdi_pdf');

      case 'update':
        return AccessResult::allowedIfHasPermissions($account, ['edit cdi_pdf', 'administer cdi_pdf'], 'OR');

      case 'delete':
        return AccessResult::allowedIfHasPermissions($account, ['delete cdi_pdf', 'administer cdi_pdf'], 'OR');

      default:
        // No opinion.
        return AccessResult::neutral();
    }

  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermissions($account, ['create cdi_pdf', 'administer cdi_pdf'], 'OR');
  }

}
