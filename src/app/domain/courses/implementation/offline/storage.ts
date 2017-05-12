import { InternalCourse } from './internalCourse';

export let storage: Array<InternalCourse> = generateData();

function generateData(): Array<InternalCourse> {
    const data: Array<InternalCourse> = [1, 2, 3, 4]
        .map(i => new InternalCourse({
            id: i,
            title: 'Video course ' + i,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
            + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi '
            + 'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit '
            + 'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
            + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt '
            + 'mollit anim id est laborum',
            length: 28 * i,
            beginDate: new Date(),
            isTopRated: i % 2 === 1
        }));

    data[0].shiftTime(-8);
    data[1].shiftTime(1);
    data[2].shiftTime(-30);

    return data;
}
