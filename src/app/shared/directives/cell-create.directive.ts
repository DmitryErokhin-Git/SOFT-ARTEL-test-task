import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {CellComponent} from '../components/cell/cell.component';

@Directive({
  selector: '[cell-container]',
  standalone: true,
})
export class CellCreateDirective implements OnInit {
  @Input() field!: any;
  @Input() ticket!: any;
  @Input() keyword!: any;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    if (this.field !== 'actions') {
      const factory: ComponentFactory<CellComponent> = this.componentFactoryResolver.resolveComponentFactory(CellComponent);
      const componentRef: ComponentRef<CellComponent> = factory.create(this.viewContainer.injector);
      this.viewContainer.insert(componentRef.hostView);
      const instance: CellComponent = componentRef.instance as CellComponent;
      instance.field = this.field;
      instance.ticket = this.ticket;
      instance.keyword = this.keyword;
    }
  }
}
