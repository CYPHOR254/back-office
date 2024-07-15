// import {Directive, ElementRef, Input, OnChanges, TemplateRef, ViewContainerRef} from '@angular/core';
//
// @Directive({
//   selector: '[hasRole]'
// })
// export class HasRoleDirective implements OnChanges {
//
//   @Input() hasRole: string = '';
//
//   constructor(private templateRef: TemplateRef<any>,
//     private viewContainer: ViewContainerRef) {
//     const allowedRoles = this.hasRole.split(',');
//
//     let roles = localStorage.getItem("roles");
//
//     // @ts-ignore
//     const currentRolesArray = roles?.split(',');
//
//     if (!this.arraysHaveCommonElements(allowedRoles, currentRolesArray)) {
//       // User does not have the required role, disable the element
//       this.viewContainer.clear();
//       return;
//     } else {
//       // User has the required role, enable the element
//       this.viewContainer.createEmbeddedView(this.templateRef)
//     }
//   }
//
//   ngOnChanges() {
//     const allowedRoles = this.hasRole.split(',');
//
//     let roles = localStorage.getItem("roles");
//
//     // @ts-ignore
//     const currentRolesArray = roles?.split(',');
//
//     if (!this.arraysHaveCommonElements(allowedRoles, currentRolesArray)) {
//       // User does not have the required role, disable the element
//       this.viewContainer.clear();
//       return;
//     } else {
//       // User has the required role, enable the element
//       this.viewContainer.createEmbeddedView(this.templateRef);
//     }
//
//   }
//   private arraysHaveCommonElements(array1: any[], array2: any) {
//     return array1.some(element => array2.includes(element));
//   }
// }
