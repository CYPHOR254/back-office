import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'src/app/shared/components/general/general.module';
import {
  NgbCollapse,
  NgbNav,
  NgbNavItem,
  NgbNavOutlet,
  NgbPopover,
  NgbProgressbar,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListDocumentTypesCategoriesComponent } from './document-types-categories/list-document-types-categories/list-document-types-categories.component';
import { ListDocumentCodesComponent } from './documents-codes/list-document-codes/list-document-codes.component';
import { ListIdentitiesComponent } from '../school-identities/list-identities/list-identities.component';
import { DocumentsComponent } from './documents/documents.component';
import { EditIdentityComponent } from '../school-identities/edit-identity/edit-identity.component';
import { AddIdentityComponent } from '../school-identities/add-identity/add-identity.component';
import { EditDocumentTypesCategoriesComponent } from './document-types-categories/edit-document-types-categories/edit-document-types-categories.component';
import { UpdateDocumentCodeComponent } from './documents-codes/update-document-code/update-document-code.component';
import { AddDocumentCodeComponent } from './documents-codes/add-document-code/add-document-code.component';
import { AddDocumentTypesCategoriesComponent } from './document-types-categories/add-document-types-categories/add-document-types-categories.component';

const documentsRoutes: Routes = [
  
   
      {path: '',component: DocumentsComponent,
        children:
        [
        
              {path: 'documents-types',component: ListDocumentTypesCategoriesComponent},
              { path: '', component: ListDocumentCodesComponent },
              { path: 'documents-codes', component: ListDocumentCodesComponent },

              { path: 'list-identities', component: ListIdentitiesComponent },
            ],
          },
        ]


  


@NgModule({
  declarations: [
    ListDocumentCodesComponent,
    ListDocumentTypesCategoriesComponent,
    ListIdentitiesComponent,
    EditIdentityComponent,
    AddIdentityComponent,
    EditDocumentTypesCategoriesComponent,
    UpdateDocumentCodeComponent,
    AddDocumentCodeComponent,
    AddDocumentTypesCategoriesComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(documentsRoutes),
    GeneralModule,
    NgbProgressbar,
    ReactiveFormsModule,
    NgbNavOutlet,
    NgbNavItem,
    NgbNav,
    NgbCollapse,
    NgbPopover,
    NgxDatatableModule
  ],
})
export class DocumentsModule {}
