import {Component, EventEmitter, Injector, Input, OnInit, Output} from "@angular/core";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "../dialog/dialog.component";
import {ToastService} from "../../services/toast-service";
import {TranslateService} from "../../translate/translate.service";

@Component({
    selector: "app-tool-aux",
    templateUrl: "./tool-aux.component.html",
    styleUrls: ["./tool-aux.component.scss"]
})
export class ToolAuxComponent implements OnInit {

    protected dialog: MatDialog = null;

    @Input()
    public component: any;

    @Input()
    public service: any;

    @Input()
    public data: any;

    @Output()
    public result = new EventEmitter();

    constructor(
        injector: Injector,
        protected toast: ToastService,
        protected translate: TranslateService
    ) {
        this.dialog = injector.get(MatDialog);
    }

    ngOnInit() {
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(this.component, {
            height: "550px",
            width: "800px",
            data: "create"
        });

        dialogRef.afterClosed().subscribe(r => {
            this.result.emit(r);
        });

    }

    openEditDialog() {
        const dialogRef = this.dialog.open(this.component, {
            height: "550px",
            width: "800px",
            data: this.data
        });

        dialogRef.afterClosed().subscribe(r => {
            this.result.emit(r);
        });

    }

    deleteItem() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {id: this.data.id, description: this.data.description}
        });

        dialogRef.afterClosed().subscribe(r => {
            if (r) {
                this.service.delete(r.id).subscribe(
                    () => {
                        this.toast.success(this.translate._("toast-success-title"), this.translate._("toast-deleted-successfully"));
                        this.result.emit(r);
                    }
                );
            }
        });
    }

}
