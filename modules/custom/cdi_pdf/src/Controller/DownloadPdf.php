<?php

namespace Drupal\cdi_pdf\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * An example controller.
 */
class DownloadPdf extends ControllerBase {

  /**
   * Crear pdf por medio de una vista
   */
  public function pdf($id = 0, $page = "") {
    $view = "alqueria_webform_pdf";
    $cdi_pdf = \Drupal::entityTypeManager()->getStorage('cdi_pdf');
    $exist = $cdi_pdf->loadByProperties(['webform_id' => $id]);;

    $storage = \Drupal::entityTypeManager()->getStorage('webform_submission');
    $webform_submission = $storage->loadByProperties([
      'sid' => $id,
    ]);

    if ($webform_submission) {
      if (!$exist) {
        $entity = $cdi_pdf->create(['webform_id' => $id]);
        $entity->save();

        $html = \Drupal::service('renderer')->render(views_embed_view($view, $page, $id));
        $mpdf = new \Mpdf\Mpdf(['tempDir' => 'sites/default/files/tmp', 'format' => 'Demy']);
        $mpdf->AddPage('', '', '', '', '', 0, 0, 0, 0, 0, 0);
        $mpdf->WriteHTML($html);
        $mpdf->SetHTMLFooter('<img src="sites/default/files/2021-05/footerPdf_1.png">');

        if ($page == "formato1") {
          $mpdf->Output('colaborador.pdf', 'D');
        } else {
          $mpdf->Output('proveedor.pdf', 'D');
        }
      } else {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
      }
      throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
    }

    return [];
  }

}
