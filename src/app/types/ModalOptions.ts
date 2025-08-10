export interface ModalOptions{
    description:string,
    buttons:ModalButton[]
}
export interface ModalButton {
    text:string
    class:string
    onclick:()=>void
}