export type DISTANCE = {
    'MILES': string | undefined;
    'KMS': string | undefined;
    'METRES': string | undefined;
};

export type TIME = {
    'HOURS': string | undefined;
    'MINS': string | undefined;
    'SECS': string | undefined;
};

export type SPEED = 'WALK' | 'JOG' | 'SPRINT' | 'SELECT SPEED';

export interface IRunIntervalsData {
    readonly value: 1 | 2;
    color: string;
    'DISTANCE' ?: DISTANCE;
    'SPEED' ?: SPEED;
    'TIME' ?: TIME;
};

export type Option = 'TIME' | 'SPEED' | 'DISTANCE';

export type PieChartInitialVals = [{
    value: 1;
    color: 'COLOURS.LIGHT_GREY';
}];

export interface IOptions {
    overlay: boolean | undefined;
    option: string | undefined;
    optionColor: string;
};