import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myDuration' })
export class DurationPipe implements PipeTransform {
    public transform(duration: number): string {
        const hours: number = Math.floor(duration / 60);
        const minutes: number = duration % 60;

        let durationString: string = null;
        if (hours === 0) {
            durationString = `${minutes}min`;
        } else {
            if (minutes === 0) {
                durationString = `${hours}h`;
            } else {
                durationString = `${hours}h ${minutes}min`;
            }
        }

        return durationString;
    }
}
