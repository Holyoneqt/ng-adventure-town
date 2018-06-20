import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSliderModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatGridListModule,
        MatProgressBarModule,
        MatSliderModule,
        MatSnackBarModule,
    ]
})
export class MaterialModule {}
