import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[border-by-date]',
})
export class BorderByDateDirective implements OnInit {
    @Input() public date: Date;

    public constructor(
        private readonly element: ElementRef
    ) { }

    public ngOnInit() {
        const currentDate: Date = new Date();
        let minus14Days: Date = new Date();
        minus14Days.setDate(currentDate.getDate() - 14);

        if (this.date > currentDate) {
            this.element.nativeElement.style.border = '2px solid lightblue';
        } else if (this.date > minus14Days && this.date <= currentDate) {
            this.element.nativeElement.style.border = '2px solid lightgreen';
        }

    }
}
