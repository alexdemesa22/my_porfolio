import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  @Input() pdfUrl: string;

  constructor(public activeModal: NgbActiveModal) {}

  downloadPdf() {
    const link = document.createElement('a');
    link.href = this.pdfUrl;
    link.download = 'AlexanderDeMesa_Resume.pdf';
    link.click();
  }
}
