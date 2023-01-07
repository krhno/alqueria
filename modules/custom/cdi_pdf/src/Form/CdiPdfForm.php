<?php

namespace Drupal\cdi_pdf\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the cdi_pdf entity edit forms.
 */
class CdiPdfForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {

    $entity = $this->getEntity();
    $result = $entity->save();
    $link = $entity->toLink($this->t('View'))->toRenderable();

    $message_arguments = ['%label' => $this->entity->label()];
    $logger_arguments = $message_arguments + ['link' => render($link)];

    if ($result == SAVED_NEW) {
      $this->logger('cdi_pdf')->notice('Created new cdi_pdf %label', $logger_arguments);
    }
    else {
      $this->logger('cdi_pdf')->notice('Updated new cdi_pdf %label.', $logger_arguments);
    }

    $form_state->setRedirect('entity.cdi_pdf.canonical', ['cdi_pdf' => $entity->id()]);
  }

}
