import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen : boolean = false;

  @HostListener('document:click',['$event']) onToggleDropdown(){
    this.isOpen = (this.elRef.nativeElement.contains(event.target))?!this.isOpen:false;
  }
  constructor(private elRef : ElementRef) { }

}

/*

  @HostBinding('class.open') isOpen : boolean = false;

  @HostListener('click') onToggleDropdown(){
    this.isOpen = !this.isOpen;
  }
  constructor() { }
*/