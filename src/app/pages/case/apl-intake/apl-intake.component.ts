import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {INTAKE_STEPS} from "../../../shared/data/stepper-appeal-data";
import {of} from "rxjs";
import {CONTACTS_USER1, CONTACTS_USER2} from "../../../../assets/addresses-sample-data";
import {DropdownsService} from "../../../services/dropdowns.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CaseContactComponent} from "../case-contact/case-contact.component";
import {AppealService} from "../../../services/appeal.service";
import {NewContactDialogComponent} from "../../../shared/dialogs/new-contact-dialog/new-contact-dialog.component";
import {ModalComponent} from "../../../shared/modal/modal.component";
import {NewPhoneDialogComponent} from "../../../shared/dialogs/new-phone-dialog/new-phone-dialog.component";
import {NewEmailDialogComponent} from "../../../shared/dialogs/new-email-dialog/new-email-dialog.component";
import {AppealTypes} from "../../../shared/data/dropdowns/intake-stage";

@Component({
    selector: 'app-apl-intake',
    templateUrl: './apl-intake.component.html',
    styleUrls: ['./apl-intake.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: {showError: true, displayDefaultIndicatorType: true},
        },
    ],
})
export class AplIntakeComponent implements OnInit {
    reps = [];
    aplData?: any;
    contactsArr?: any;
    menu = INTAKE_STEPS;
    err = 'ERROROWWERWRERE';
    completed = false;
    formTypes: any[] = [];
    receiptTypes: any[] = [];
    xRefTypes: any[] = [];
    submittedByTypes: any[] = []
    aplTypes = AppealTypes;
    intakeTypes: any[] = [];
    pendedReasons = ['Appellant Request', 'Disaster Extension', 'Escalated to MAG']


    pendedReason$ = of([{code: '1', displayText: 'option one'}]);
    benefitYear$ = of([{code: '1', displayText: 'option one'}]);
    currentYear = new Date().getFullYear();
    minDate = new Date(this.currentYear - 10, 0, 1);
    maxDate = new Date(this.currentYear + 10, 11, 31);
    processingDateValue!: number;
    isDisplayDate = false;
    isCompleted = false;
    f1 = this.fb.group(
        {
            aplType: ['', Validators.required],
            intakeType: ['', Validators.required],
            receiptType: [''],
            pendedReason: [''],
            formType: [''],
            aplSubmittedBy: [''],
            pendedReqEndDate: ['', Validators.required],
            pendedReqStartDate: ['', Validators.required],
            appCallReleaseHold: [''],
            xreferenceType: [''],
            xreference: [''],
            receiptDate: [''],
            hearingRecieptDate: [''],
            planYear: [''],
        },
        {
            // validators: Validators.required,
        }
    );

    constructor(private fb: FormBuilder, private drops: DropdownsService, public dialog: MatDialog, private aplService: AppealService) {
    }

    ngOnInit() {
        // this.aplTypes = this.drops.getAppealType();
        this.formTypes = this.drops.getFormType()
        this.receiptTypes = this.drops.getReceiptType();
        this.xRefTypes = this.drops.getXrefType();
        this.submittedByTypes = this.drops.getSourceType();
        this.intakeTypes = this.drops.getIntakeType();
        this.aplService.getArr().subscribe(r => console.log('INTAKE OBJ ARR', r))
        if (history.state.data) {
            this.aplData = history.state.data;
            this.contactsArr = this.aplData.contacts;
            console.log('HISTORY APL', this.aplData);
            this.f1.setValue({
                aplType: this.aplData.aplType || '',
                intakeType: this.aplData.intakeType || '',
                receiptType: this.aplData.receiptType || '',
                pendedReason: this.aplData.pendedReason || '',
                formType: this.aplData.formType || '',
                aplSubmittedBy: this.aplData.aplSubmittedBy || '',
                pendedReqEndDate: this.aplData.pendedReqEndDate || '',
                pendedReqStartDate: this.aplData.pendedReqStartDate || '',
                appCallReleaseHold: this.aplData.appCallReleaseHold || '',
                xreferenceType: this.aplData.xreferenceType || '',
                xreference: this.aplData.xreference || '',
                receiptDate: this.aplData.recieptDate || '',
                hearingRecieptDate: this.aplData.hearingRecieptDate || '',
                planYear: this.aplData.planYear || '',
            })
        }
        // @ts-ignore


        // submittedByTypes = []
    }

    hasError(controlName: string, errorName: string) {
        if (!this.f1.controls.hasOwnProperty(controlName)) {
            throw new Error(`Control with name ${controlName} not found in form group`);
        }
        return this.f1.get(controlName)?.hasError(errorName);
    }

    getUpdateObj() {
        return {
            ...this.aplData,
            aplType: this.f1.value.aplType,
            intakeType: this.f1.value.intakeType,
            receiptType: this.f1.value.receiptType,
            pendedReason: this.f1.value.pendedReason,
            formType: this.f1.value.formType,
            aplSubmittedBy: this.f1.value.aplSubmittedBy,
            pendedReqEndDate: this.f1.value.pendedReqEndDate,
            pendedReqStartDate: this.f1.value.pendedReqStartDate,
            appCallReleaseHold: this.f1.value.appCallReleaseHold,
            xreferenceType: this.f1.value.xreferenceType,
            xreference: this.f1.value.xreference,
            recieptDate: this.f1.value.receiptDate,
            hearingRecieptDate: this.f1.value.hearingRecieptDate,
            planYear: this.f1.value.planYear,
        }
    }

    completeStep(): void {
        const pload = this.getUpdateObj();
        this.aplService.updateApl(this.aplData.aplId, pload);
        this.aplService.getArr().subscribe(r => {
            if (r) {
                this.isCompleted = true;
                this.completed = true;
            }
        });
    }

    onUpdate() {
        const config = new MatDialogConfig();
        config.width = '600px';
        config.autoFocus = false;
        // config.data = item;
        const dialogRef = this.dialog.open(CaseContactComponent, config);
        dialogRef.afterClosed().subscribe(data => {
            console.log("Dialog output:", data)
            if (data) {
                // this.addresses1[index] = data;
            }
        });
    }

    onUpdatePhone() {
        const config = new MatDialogConfig();
        config.width = '600px';
        config.autoFocus = false;
        // config.data = item;
        const dialogRef = this.dialog.open(CaseContactComponent, config);
        dialogRef.afterClosed().subscribe(data => {
            console.log("Dialog output:", data)
            if (data) {
                // this.addresses1[index] = data;
            }
        });
    }

    onNewAplContact(obj?: any) {
        const config = new MatDialogConfig();
        config.width = '600px';
        config.autoFocus = false;

        // config.data = item;
        const foo = this.aplData.contacts;
        const dialogRef = this.dialog.open(NewContactDialogComponent, config);
        dialogRef.afterClosed().subscribe(data => {
            console.log("Dialog output:", data)
            if (data) {
                const pload = {...data, contactAddress: [], contactEmail: [], contactTellInfo: []}
                console.log('PALOAD', pload)
                this.contactsArr.push(pload);
                console.log("CONTACTS ARR:", this.contactsArr)
                // this.addresses1[index] = data;
            }
        });
    }

    onUpdateContact(obj: any, index: number) {
        const config = new MatDialogConfig();
        config.width = '600px';
        config.autoFocus = false;

        config.data = obj;
        const dialogRef = this.dialog.open(NewContactDialogComponent, config);
        dialogRef.afterClosed().subscribe(data => {
            console.log("Dialog output:", data)
            if (data) {
                // const pload = {...data, contactAddress: [], contactEmail: [], contactTellInfo:[] }
                console.log('PALOAD UPDATED', data)
                this.contactsArr[index] = {...this.contactsArr[index], ...data};

                console.log("CONTACTS ARR:", this.contactsArr)
                // this.addresses1[index] = data;
            }
        });
    }

    onNewContactAddress(index: number) {
        const config = new MatDialogConfig();
        config.width = '600px';
        config.minHeight = '400px';
        const dialogRef = this.dialog.open(ModalComponent, config);
        dialogRef.afterClosed().subscribe(data => {
            if (data.city) {
                const sadr = data.address2 ? 'two' : 'one';
                const obj = {
                    addressType: data.type,
                    stAddressType1: data.address,
                    city: data.city,
                    state: data.state,
                    zip: data.postalCode
                }
                this.contactsArr[index].contactAddress.push(obj);
            }
        })
    }

    onNewPhone(index: number) {
        const config = new MatDialogConfig();
        config.width = '400px';
        config.minHeight = '400px';
        const dialogRef = this.dialog.open(NewPhoneDialogComponent, config);
        dialogRef.afterClosed().subscribe(data => {
            this.contactsArr[index].contactTellInfo.push(data);
        })
    }

    onNewEmail(index: number) {
        const config = new MatDialogConfig();
        config.width = '400px';
        config.minHeight = '400px';
        const dialogRef = this.dialog.open(NewEmailDialogComponent, config);
        dialogRef.afterClosed().subscribe(data => {
            this.contactsArr[index].contactEmail.push(data);
        })
    }

    onCancel() {
        this.f1.reset();
    }

    onDeleteAddr(i: number, index: number) {
        this.contactsArr[i].contactAddress.splice(index, 1);
    }
}
