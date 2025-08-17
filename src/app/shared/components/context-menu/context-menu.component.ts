import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent {

  contextMenuVisible:boolean = false
  contextMenuTop:number = 0
  contextMenuLeft:number = 0

  showContextMenu(event:MouseEvent){
    event.stopPropagation()
    this.contextMenuVisible = true
    console.log({contextMenuTop:event.clientY,contextMenuLeft:event.clientX})
    this.contextMenuTop = event.clientY + window.scrollY
    this.contextMenuLeft = event.clientX
  }
  hideContextMenu(){
    this.contextMenuVisible = false
    console.log("hideContextMenu");
    
  }
}
