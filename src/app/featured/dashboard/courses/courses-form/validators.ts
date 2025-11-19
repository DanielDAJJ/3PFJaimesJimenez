import { Validators } from "@angular/forms";

export const formGroup = {
    id: [''],
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    duration: ['', [Validators.required]],
    beginDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    status: ['SCHEDULED', [Validators.required]]
}