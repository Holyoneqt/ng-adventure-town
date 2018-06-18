import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSliderModule,
} from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatProgressBarModule,
        MatSliderModule,
        MatSnackBarModule,
    ]
})
export class MaterialModule {}
