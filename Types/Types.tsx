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
    id?: string;
    readonly value: 1 | 2;
    color: Array<string>;
    'DISTANCE' ?: DISTANCE;
    'SPEED' ?: SPEED;
    'TIME' ?: TIME;
};

export type Option = 'TIME' | 'SPEED' | 'DISTANCE';

export interface IOptions {
    overlay: boolean | undefined;
    option: string | undefined;
    optionColor: string;
};