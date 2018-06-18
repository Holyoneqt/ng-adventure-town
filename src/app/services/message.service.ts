import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

export enum MessageType {
    Success = 'message-success',
    Info = 'message-info',
    Error = 'message-error'
}

@Injectable()
export class MessageService {

    constructor(private snackBar: MatSnackBar) {}

    public writeMessage(type: MessageType, text: string): void {
        
        this.snackBar.open(text, '', {
            duration: 3000,
            panelClass: type,
        });
    }

}
