import { Course } from '../../contract';

export let storage: Array<Course> = generateData();

function generateData(): Array<Course> {
    const data = [1, 2, 3, 4].map(i => {
        return {
            id: i,
            title: 'Video course ' + i,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
            + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi '
            + 'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit '
            + 'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
            + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt '
            + 'mollit anim id est laborum',
            duration: 80 + i,
            beginTime: new Date()
        };
    });

    data[0].beginTime.setDate(data[0].beginTime.getDate() - 8);
    data[1].beginTime.setDate(data[1].beginTime.getDate() + 1);
    data[2].beginTime.setDate(data[2].beginTime.getDate() - 30);

    return data;
}
