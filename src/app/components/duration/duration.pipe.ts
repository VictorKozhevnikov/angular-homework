import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myDuration' })
export class DurationPipe implements PipeTransform {
    public transform(duration: number) {
        const hours: number = Math.floor(duration / 60);
        const minutes: number = duration % 60;

        const durationString: string = hours > 0
            ? `${hours}h ${minutes}min`
            : `${minutes}min`;

        return durationString;
    }
}
