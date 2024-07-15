import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-view-agent",
  templateUrl: "./view-agent.component.html",
  styleUrls: ["./view-agent.component.scss"],
})
export class ViewAgentComponent implements OnInit {
  public agentId!: any;
  
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
        this.agentId = params["id"];
      }
    });
  }
}
