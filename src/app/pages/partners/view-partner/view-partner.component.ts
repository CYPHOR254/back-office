import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-view-partner",
  templateUrl: "./view-partner.component.html",
  styleUrls: ["./view-partner.component.scss"],
})
export class ViewPartnerComponent implements OnInit {
  public partnerId!: any;
  activeTab: number | undefined;
  activeId = 1;

  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.partnerId = params["id"];
      }
    });
  }
}
