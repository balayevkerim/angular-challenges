import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface ForWithEmptyContext<T> {
  $implicit: T;
  index: number;
}

@Directive({
  selector: '[forWithEmpty]',
  standalone: true,
})
export class ForWithEmptyDirective<T> {
  private _data: T[] = [];
  private _emptyTemplate: TemplateRef<any> | null = null;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<ForWithEmptyContext<T>>,
  ) {}

  @Input()
  set forWithEmptyOf(data: T[]) {
    this._data = data || [];
    this.updateView();
  }

  @Input('forWithEmptyEmpty')
  set emptyTemplate(template: TemplateRef<any> | null) {
    this._emptyTemplate = template;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();

    if (this._data.length === 0 && this._emptyTemplate) {
      this.viewContainer.createEmbeddedView(this._emptyTemplate);
    } else {
      this._data.forEach((item, index) => {
        this.viewContainer.createEmbeddedView(this.templateRef, {
          $implicit: item,
          index,
        });
      });
    }
  }
}
