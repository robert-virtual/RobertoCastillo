import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalButton, ModalOptions } from '../types/ModalOptions';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  modalVisible:boolean = false
  modalDescription?:string
  modalButtons?:ModalButton[]
  showModal(options:ModalOptions){
    this.modalVisible = true
    this.modalButtons = options.buttons
    this.modalDescription = options.description
  }
  closeModal(callback?:()=>void){
    this.modalVisible = false
    callback && callback()
  }
}
